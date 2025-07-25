import xml.etree.ElementTree as ET
import csv
import re

def extract_kml_to_csv(kml_file, csv_file):
    # Parse the KML file
    tree = ET.parse(kml_file)
    root = tree.getroot()
    
    # Define namespace
    namespace = {'kml': 'http://www.opengis.net/kml/2.2'}
    
    # Find all placemarks
    placemarks = root.findall('.//kml:Placemark', namespace)
    
    # Extract data
    kyari_data = []
    
    for placemark in placemarks:
        data = {}
        
        # Get name (Kyari ID)
        name = placemark.find('kml:name', namespace)
        if name is not None:
            data['kyari_id'] = name.text
        
        # Get extended data
        extended_data = placemark.find('kml:ExtendedData', namespace)
        if extended_data is not None:
            for data_elem in extended_data.findall('kml:Data', namespace):
                name_attr = data_elem.get('name')
                value_elem = data_elem.find('kml:value', namespace)
                if value_elem is not None:
                    data[name_attr.lower().replace(' ', '_')] = value_elem.text
        
        # Get coordinates for plot visualization and perimeter calculation
        coordinates_elem = placemark.find('.//kml:coordinates', namespace)
        if coordinates_elem is not None:
            coords_text = coordinates_elem.text.strip()
            coordinates = []
            for coord in coords_text.split():
                if coord:
                    lon, lat, alt = coord.split(',')
                    coordinates.append((float(lon), float(lat)))
            
            # Store coordinates for plot visualization (as JSON string)
            import json
            data['coordinates'] = json.dumps(coordinates)
            
            # Calculate perimeter (approximate using Haversine formula)
            perimeter = calculate_perimeter(coordinates)
            data['calculated_perimeter'] = round(perimeter, 2)
        
        kyari_data.append(data)
    
    # Write to CSV
    if kyari_data:
        fieldnames = set()
        for row in kyari_data:
            fieldnames.update(row.keys())
        
        fieldnames = sorted(list(fieldnames))
        
        with open(csv_file, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(kyari_data)
        
        print(f"Successfully extracted {len(kyari_data)} kyaris to {csv_file}")
        
        # Print sample data
        print("\nSample data:")
        for i, row in enumerate(kyari_data[:3]):
            print(f"Kyari {i+1}:")
            for key, value in row.items():
                if key in ['kyari_id', 'farm_id', 'farmer_name', 'total_area', 'calculated_perimeter']:
                    print(f"  {key}: {value}")
            print()
    
    return kyari_data

def calculate_perimeter(coordinates):
    """Calculate perimeter using Haversine formula for lat/lon coordinates"""
    import math
    
    def haversine_distance(lat1, lon1, lat2, lon2):
        # Convert latitude and longitude from degrees to radians
        lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
        
        # Haversine formula
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
        c = 2 * math.asin(math.sqrt(a))
        
        # Radius of earth in meters
        r = 6371000
        return c * r
    
    perimeter = 0
    for i in range(len(coordinates)):
        current = coordinates[i]
        next_coord = coordinates[(i + 1) % len(coordinates)]
        
        distance = haversine_distance(current[1], current[0], next_coord[1], next_coord[0])
        perimeter += distance
    
    return perimeter

if __name__ == "__main__":
    kml_file = "18-7-2025_to_21-7-2025.kml"
    csv_file = "kyari_database.csv"
    
    try:
        kyari_data = extract_kml_to_csv(kml_file, csv_file)
        print(f"\nExtraction complete! CSV file created: {csv_file}")
    except Exception as e:
        print(f"Error: {e}") 