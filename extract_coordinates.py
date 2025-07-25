import xml.etree.ElementTree as ET
import csv
import json

def extract_coordinates_from_kml():
    """Extract coordinates from KML file and create a mapping"""
    tree = ET.parse("18-7-2025_to_21-7-2025.kml")
    root = tree.getroot()
    
    namespace = {'kml': 'http://www.opengis.net/kml/2.2'}
    placemarks = root.findall('.//kml:Placemark', namespace)
    
    coordinates_map = {}
    
    for placemark in placemarks:
        # Get Kyari ID
        name = placemark.find('kml:name', namespace)
        if name is not None:
            kyari_id = name.text
            
            # Get coordinates
            coordinates_elem = placemark.find('.//kml:coordinates', namespace)
            if coordinates_elem is not None:
                coords_text = coordinates_elem.text.strip()
                coordinates = []
                for coord in coords_text.split():
                    if coord:
                        parts = coord.split(',')
                        if len(parts) >= 2:
                            lon, lat = float(parts[0]), float(parts[1])
                            coordinates.append([lon, lat])
                
                coordinates_map[kyari_id] = coordinates
    
    return coordinates_map

def update_csv_with_coordinates():
    """Add coordinates to the existing CSV file"""
    # Get coordinates from KML
    coordinates_map = extract_coordinates_from_kml()
    
    # Read existing CSV
    rows = []
    with open('csv data.csv', 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        fieldnames = reader.fieldnames
        
        # Add coordinates column if not present
        if 'coordinates' not in fieldnames:
            fieldnames = list(fieldnames) + ['coordinates']
        
        for row in reader:
            kyari_id = row.get('Kyari_ID', '')
            if kyari_id in coordinates_map:
                row['coordinates'] = json.dumps(coordinates_map[kyari_id])
            else:
                row['coordinates'] = '[]'
            rows.append(row)
    
    # Write updated CSV
    with open('csv data.csv', 'w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    
    print(f"Updated CSV with coordinates for {len([r for r in rows if r.get('coordinates', '[]') != '[]'])} kyaris")

if __name__ == "__main__":
    update_csv_with_coordinates()
    print("CSV file updated with coordinates!") 