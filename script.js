// Global variables
let selectedModel = null;
let kyariDatabase = [];
let selectedKyari = null;
let selectedFarmId = null;

// Plantation models data based on Navchetna Kyari combinations
const plantationModels = {
    // Shisham Boundary Combinations
    combo1_shisham: {
        name: "Combination 1 + Shisham",
        description: "50% Mango, 30% Amla, 10% Custard Apple, 10% Guava",
        boundaryTree: "Shisham",
        treeComposition: {
            "Mango": 50,
            "Amla": 30,
            "Custard Apple": 10,
            "Guava": 10
        }
    },
    combo2_shisham: {
        name: "Combination 2 + Shisham",
        description: "40% Mango, 30% Amla, 10% Custard Apple, 20% Guava",
        boundaryTree: "Shisham",
        treeComposition: {
            "Mango": 40,
            "Amla": 30,
            "Custard Apple": 10,
            "Guava": 20
        }
    },
    combo3_shisham: {
        name: "Combination 3 + Shisham",
        description: "30% Mango, 30% Amla, 20% Custard Apple, 20% Guava",
        boundaryTree: "Shisham",
        treeComposition: {
            "Mango": 30,
            "Amla": 30,
            "Custard Apple": 20,
            "Guava": 20
        }
    },
    combo4_shisham: {
        name: "Combination 4 + Shisham",
        description: "50% Mango, 30% Amla, 0% Custard Apple, 20% Guava",
        boundaryTree: "Shisham",
        treeComposition: {
            "Mango": 50,
            "Amla": 30,
            "Custard Apple": 0,
            "Guava": 20
        }
    },
    combo5_shisham: {
        name: "Combination 5 + Shisham",
        description: "60% Mango, 40% Amla, 0% Custard Apple, 0% Guava",
        boundaryTree: "Shisham",
        treeComposition: {
            "Mango": 60,
            "Amla": 40,
            "Custard Apple": 0,
            "Guava": 0
        }
    },
    
    // Teak Boundary Combinations
    combo1_teak: {
        name: "Combination 1 + Teak",
        description: "50% Mango, 30% Amla, 10% Custard Apple, 10% Guava",
        boundaryTree: "Teak",
        treeComposition: {
            "Mango": 50,
            "Amla": 30,
            "Custard Apple": 10,
            "Guava": 10
        }
    },
    combo2_teak: {
        name: "Combination 2 + Teak",
        description: "40% Mango, 30% Amla, 10% Custard Apple, 20% Guava",
        boundaryTree: "Teak",
        treeComposition: {
            "Mango": 40,
            "Amla": 30,
            "Custard Apple": 10,
            "Guava": 20
        }
    },
    combo3_teak: {
        name: "Combination 3 + Teak",
        description: "30% Mango, 30% Amla, 20% Custard Apple, 20% Guava",
        boundaryTree: "Teak",
        treeComposition: {
            "Mango": 30,
            "Amla": 30,
            "Custard Apple": 20,
            "Guava": 20
        }
    },
    combo4_teak: {
        name: "Combination 4 + Teak",
        description: "50% Mango, 30% Amla, 0% Custard Apple, 20% Guava",
        boundaryTree: "Teak",
        treeComposition: {
            "Mango": 50,
            "Amla": 30,
            "Custard Apple": 0,
            "Guava": 20
        }
    },
    combo5_teak: {
        name: "Combination 5 + Teak",
        description: "60% Mango, 40% Amla, 0% Custard Apple, 0% Guava",
        boundaryTree: "Teak",
        treeComposition: {
            "Mango": 60,
            "Amla": 40,
            "Custard Apple": 0,
            "Guava": 0
        }
    },
    
    // Mahogany Boundary Combinations
    combo1_mahogany: {
        name: "Combination 1 + Mahogany",
        description: "50% Mango, 30% Amla, 10% Custard Apple, 10% Guava",
        boundaryTree: "Mahogany",
        treeComposition: {
            "Mango": 50,
            "Amla": 30,
            "Custard Apple": 10,
            "Guava": 10
        }
    },
    combo2_mahogany: {
        name: "Combination 2 + Mahogany",
        description: "40% Mango, 30% Amla, 10% Custard Apple, 20% Guava",
        boundaryTree: "Mahogany",
        treeComposition: {
            "Mango": 40,
            "Amla": 30,
            "Custard Apple": 10,
            "Guava": 20
        }
    },
    combo3_mahogany: {
        name: "Combination 3 + Mahogany",
        description: "30% Mango, 30% Amla, 20% Custard Apple, 20% Guava",
        boundaryTree: "Mahogany",
        treeComposition: {
            "Mango": 30,
            "Amla": 30,
            "Custard Apple": 20,
            "Guava": 20
        }
    },
    combo4_mahogany: {
        name: "Combination 4 + Mahogany",
        description: "50% Mango, 30% Amla, 0% Custard Apple, 20% Guava",
        boundaryTree: "Mahogany",
        treeComposition: {
            "Mango": 50,
            "Amla": 30,
            "Custard Apple": 0,
            "Guava": 20
        }
    },
    combo5_mahogany: {
        name: "Combination 5 + Mahogany",
        description: "60% Mango, 40% Amla, 0% Custard Apple, 0% Guava",
        boundaryTree: "Mahogany",
        treeComposition: {
            "Mango": 60,
            "Amla": 40,
            "Custard Apple": 0,
            "Guava": 0
        }
    }
};

// Boundary tree spacing (in meters)
const boundarySpacing = {
    "Teak": 3,
    "Mahogany": 3,
    "Sheesham": 4,
    "Fruit": 5  // All fruit bearing trees
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeModelCards();
    loadKyariDatabase();
});

// Load kyari database from CSV
async function loadKyariDatabase() {
    try {
        const response = await fetch('csv data.csv');
        const csvText = await response.text();
        kyariDatabase = parseCSV(csvText);
        populateFarmDropdown();
        console.log(`Loaded ${kyariDatabase.length} kyaris from database`);
    } catch (error) {
        console.error('Error loading kyari database:', error);
        // Fallback: create sample data for testing
        createSampleData();
    }
}

// Parse CSV text to JavaScript objects
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''));
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
            const values = [];
            let currentValue = '';
            let inQuotes = false;
            
            for (let j = 0; j < line.length; j++) {
                const char = line[j];
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    values.push(currentValue.trim());
                    currentValue = '';
                } else {
                    currentValue += char;
                }
            }
            values.push(currentValue.trim());
            
            if (values.length === headers.length) {
                const obj = {};
                headers.forEach((header, index) => {
                    obj[header] = values[index];
                });
                data.push(obj);
            }
        }
    }
    
    return data;
}

// Create sample data if CSV loading fails
function createSampleData() {
    kyariDatabase = [
        {
            Kyari_ID: '75112',
            Farm_ID: '68174',
            Farmer_Name: 'Surendra pratap Singh',
            Total_Area: '0.6879',
            perimeter: '311',
            area: '2782',
            District: 'Sonbhadra',
            Block: 'Kone',
            Kyari_Name: 'Kyaari 5'
        },
        {
            Kyari_ID: '75111',
            Farm_ID: '68174', 
            Farmer_Name: 'Surendra pratap Singh',
            Total_Area: '0.5135',
            perimeter: '309',
            area: '2077',
            District: 'Sonbhadra',
            Block: 'Kone',
            Kyari_Name: 'Kyaari 4'
        }
    ];
    populateFarmDropdown();
}

// Populate farm dropdown
function populateFarmDropdown() {
    const farmSelect = document.getElementById('farmSelect');
    const farms = {};
    
    // Group kyaris by farm
    kyariDatabase.forEach(kyari => {
        const farmId = kyari.Farm_ID;
        const farmerName = kyari.Farmer_Name;
        
        if (!farms[farmId]) {
            farms[farmId] = {
                farmId: farmId,
                farmerName: farmerName,
                kyaris: []
            };
        }
        farms[farmId].kyaris.push(kyari);
    });
    
    // Clear existing options
    farmSelect.innerHTML = '<option value="">Choose a farm...</option>';
    
    // Add farm options
    Object.values(farms).forEach(farm => {
        const option = document.createElement('option');
        option.value = farm.farmId;
        option.textContent = `${farm.farmId} - ${farm.farmerName} (${farm.kyaris.length} kyaris)`;
        farmSelect.appendChild(option);
    });
}

// Load kyaris for selected farm
function loadKyarisForFarm() {
    const farmSelect = document.getElementById('farmSelect');
    const kyariSelect = document.getElementById('kyariSelect');
    const selectedFarmId = farmSelect.value;
    
    // Clear kyari dropdown
    kyariSelect.innerHTML = '<option value="">Choose a kyari...</option>';
    kyariSelect.disabled = !selectedFarmId;
    
    // Hide kyari details
    document.getElementById('kyariDetailsContainer').style.display = 'none';
    selectedKyari = null;
    
    if (selectedFarmId) {
        // Filter kyaris for this farm
        const farmKyaris = kyariDatabase.filter(kyari => kyari.Farm_ID === selectedFarmId);
        
        // Add kyari options
        farmKyaris.forEach(kyari => {
            const option = document.createElement('option');
            option.value = kyari.Kyari_ID;
            option.textContent = `${kyari.Kyari_ID} - ${kyari.Kyari_Name || 'Kyari'} (${kyari.Total_Area} acres)`;
            kyariSelect.appendChild(option);
        });
        
        kyariSelect.disabled = false;
    }
}

// Load details for selected kyari
function loadKyariDetails() {
    const kyariSelect = document.getElementById('kyariSelect');
    const selectedKyariId = kyariSelect.value;
    
    if (selectedKyariId) {
        selectedKyari = kyariDatabase.find(kyari => kyari.Kyari_ID === selectedKyariId);
        
        if (selectedKyari) {
            // Show kyari details
            document.getElementById('selectedKyariId').textContent = selectedKyari.Kyari_ID;
            document.getElementById('selectedFarmerName').textContent = selectedKyari.Farmer_Name;
            document.getElementById('selectedArea').textContent = selectedKyari.Total_Area;
            document.getElementById('selectedPerimeter').textContent = selectedKyari.perimeter;
            document.getElementById('selectedDistrict').textContent = selectedKyari.District || '-';
            document.getElementById('selectedBlock').textContent = selectedKyari.Block || '-';
            
            // Show kyari details container
            document.getElementById('kyariDetailsContainer').style.display = 'block';
            
            // Create basic plot visualization
            createPlotVisualization();
        }
    } else {
        document.getElementById('kyariDetailsContainer').style.display = 'none';
        selectedKyari = null;
    }
}

// Create plot visualization using actual coordinates
function createPlotVisualization() {
    const plotContainer = document.getElementById('plotContainer');
    
    if (selectedKyari && selectedKyari.coordinates) {
        const area = parseFloat(selectedKyari.Total_Area);
        const perimeter = parseFloat(selectedKyari.perimeter);
        const areaInSqM = parseFloat(selectedKyari.area);
        
        try {
            // Parse coordinates from JSON string
            const coordinates = JSON.parse(selectedKyari.coordinates);
            
            // Create actual plot SVG using coordinates
            const plotSvg = createActualPlotSVG(coordinates, selectedKyari.Kyari_ID);
            
            plotContainer.innerHTML = `
                <div style="text-align: center;">
                    <h4 style="margin: 0 0 15px 0; color: #2d5a2d;">Kyari ${selectedKyari.Kyari_ID} - ${selectedKyari.Kyari_Name}</h4>
                    
                    <div style="background: white; border: 2px solid #4a7c4a; border-radius: 10px; 
                                padding: 15px; margin: 10px auto; display: inline-block;">
                        ${plotSvg}
                    </div>
                    
                    <div style="margin-top: 20px; display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                        <div style="text-align: center; min-width: 120px;">
                            <strong style="color: #2d5a2d;">Area (Acres)</strong><br>
                            <span style="font-size: 1.3em; font-weight: bold; color: #4a7c4a;">${area}</span>
                        </div>
                        <div style="text-align: center; min-width: 120px;">
                            <strong style="color: #2d5a2d;">Area (Sq.M)</strong><br>
                            <span style="font-size: 1.3em; font-weight: bold; color: #4a7c4a;">${areaInSqM.toLocaleString()}</span>
                        </div>
                        <div style="text-align: center; min-width: 120px;">
                            <strong style="color: #2d5a2d;">Perimeter</strong><br>
                            <span style="font-size: 1.3em; font-weight: bold; color: #4a7c4a;">${perimeter} m</span>
                        </div>
                    </div>
                    
                    <div style="margin-top: 15px; padding: 15px; background: #f8fff8; border-radius: 8px; max-width: 400px; margin: 15px auto;">
                        <div style="color: #2d5a2d; font-weight: bold; margin-bottom: 8px;">Plot Analysis:</div>
                        <div style="font-size: 0.9em; color: #666; line-height: 1.4;">
                            • Boundary setback: 5m from edges<br>
                            • Inside tree spacing: 2.5m × 2.5m<br>
                            • Inside area available: ${Math.max(0, areaInSqM - (perimeter * 5)).toLocaleString()} sq.m
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error parsing coordinates:', error);
            // Fallback to simple visualization
            plotContainer.innerHTML = `
                <div style="text-align: center; color: #666;">
                    <h4 style="color: #2d5a2d;">Kyari ${selectedKyari.Kyari_ID} - ${selectedKyari.Kyari_Name}</h4>
                    <p>Area: ${area} acres | Perimeter: ${perimeter} meters</p>
                    <p><em>Plot coordinates not available for visualization</em></p>
                </div>
            `;
        }
    } else {
        plotContainer.innerHTML = `
            <div style="text-align: center; color: #666;">
                <p>No kyari selected</p>
            </div>
        `;
    }
}

// Create actual plot SVG using real coordinates
function createActualPlotSVG(coordinates, kyariId) {
    if (!coordinates || coordinates.length === 0) {
        return '<p>No coordinates available</p>';
    }
    
    // Find bounds of the coordinates
    const lons = coordinates.map(coord => coord[0]);
    const lats = coordinates.map(coord => coord[1]);
    
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    
    // Calculate plot dimensions
    const lonRange = maxLon - minLon;
    const latRange = maxLat - minLat;
    
    // Set SVG dimensions (keep aspect ratio)
    const svgWidth = 350;
    const aspectRatio = lonRange / latRange;
    const svgHeight = aspectRatio > 1 ? svgWidth / aspectRatio : svgWidth;
    const actualWidth = aspectRatio > 1 ? svgWidth : svgWidth * aspectRatio;
    
    // Convert coordinates to SVG points
    const svgPoints = coordinates.map(coord => {
        const x = ((coord[0] - minLon) / lonRange) * actualWidth;
        const y = svgHeight - ((coord[1] - minLat) / latRange) * svgHeight; // Flip Y axis
        return `${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ');
    
    return `
        <svg width="${actualWidth}" height="${svgHeight}" viewBox="0 0 ${actualWidth} ${svgHeight}" 
             style="border: 1px solid #d0e0d0; background: #f8fff8; border-radius: 8px;">
            <!-- Main plot polygon -->
            <polygon points="${svgPoints}" 
                     fill="#c8e6c9" 
                     stroke="#4a7c4a" 
                     stroke-width="2" 
                     opacity="0.8"/>
            
            <!-- Plot label -->
            <text x="${actualWidth/2}" y="25" 
                  text-anchor="middle" 
                  dominant-baseline="middle" 
                  fill="#2d5a2d" 
                  font-size="14" 
                  font-weight="bold">
                Kyari ${kyariId}
            </text>
            
            <!-- Legend -->
            <text x="${actualWidth/2}" y="${svgHeight - 10}" 
                  text-anchor="middle" 
                  fill="#666" 
                  font-size="11">
                Actual Plot Shape (GPS coordinates)
            </text>
        </svg>
    `;
}





// Initialize model cards with data
function initializeModelCards() {
    generateModelCards('all');
}

// Generate model cards dynamically
function generateModelCards(filter = 'all') {
    const container = document.getElementById('modelCardsContainer');
    container.innerHTML = '';
    
    Object.entries(plantationModels).forEach(([modelKey, model]) => {
        // Apply filter
        if (filter !== 'all' && model.boundaryTree !== filter) {
            return;
        }
        
        // Create model card
        const card = document.createElement('div');
        card.className = 'model-card';
        card.dataset.model = modelKey;
        
        // Create tree composition display with colors
        const composition = Object.entries(model.treeComposition)
            .filter(([tree, percentage]) => percentage > 0)
            .map(([tree, percentage]) => `${tree}: ${percentage}%`)
            .join(', ');
        
        card.innerHTML = `
            <h3>${model.name}</h3>
            <p>${model.description}</p>
            <div class="model-details">
                <small><strong>Boundary:</strong> ${model.boundaryTree} (${getBoundarySpacing(model.boundaryTree)}m spacing)</small><br>
                <small><strong>Trees:</strong> ${composition}</small>
            </div>
        `;
        
        // Add click event listener
        card.addEventListener('click', () => selectModel(modelKey, card));
        
        container.appendChild(card);
    });
}

// Filter models by boundary tree
function filterModels() {
    const filter = document.getElementById('boundaryFilter').value;
    generateModelCards(filter);
    
    // Clear selection when filtering
    selectedModel = null;
}

// Get boundary spacing for a tree type
function getBoundarySpacing(treeType) {
    switch(treeType) {
        case 'Teak':
        case 'Mahogany':
            return 3;
        case 'Shisham':
            return 4;
        default:
            return 5;
    }
}

// Handle model selection
function selectModel(modelKey, cardElement) {
    // Remove previous selection
    document.querySelectorAll('.model-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card
    cardElement.classList.add('selected');
    selectedModel = modelKey;
    
    console.log(`Selected model: ${plantationModels[modelKey].name}`);
}

// Convert selected kyari to calculation format
function getKyariForCalculation() {
    if (!selectedKyari) {
        return null;
    }
    
    return {
        id: selectedKyari.Kyari_ID,
        farmId: selectedKyari.Farm_ID,
        farmerName: selectedKyari.Farmer_Name,
        area: parseFloat(selectedKyari.Total_Area), // in acres
        perimeter: parseFloat(selectedKyari.perimeter), // in meters from table
        areaInSqMeters: parseFloat(selectedKyari.area) // in square meters from table
    };
}

// Main calculation function
function calculatePlantation() {
    if (!selectedModel) {
        alert('Please select a plantation model');
        return;
    }
    
    if (!selectedKyari) {
        alert('Please select a kyari first');
        return;
    }
    
    const model = plantationModels[selectedModel];
    const kyari = getKyariForCalculation();
    
    if (!kyari) {
        alert('Error loading kyari data');
        return;
    }
    
    // Calculate for the selected kyari
    const kyariResult = calculateKyariTrees(kyari, model);
    
    const totalResults = {
        totalBoundaryTrees: kyariResult.boundaryTrees.total,
        totalInsideTrees: kyariResult.insideTrees.total,
        totalTrees: kyariResult.boundaryTrees.total + kyariResult.insideTrees.total,
        kyariResults: [kyariResult]
    };
    
    displayResults(totalResults, model);
}

// Calculate trees for a single kyari
function calculateKyariTrees(kyari, model) {
    const result = {
        kyari: kyari,
        boundaryTrees: calculateBoundaryTrees(kyari, model),
        insideTrees: calculateInsideTrees(kyari, model)
    };
    
    return result;
}

// Calculate boundary trees
function calculateBoundaryTrees(kyari, model) {
    const boundaryTrees = {
        byType: {},
        total: 0
    };
    
    // For boundary, we only plant the specific boundary tree type
    const boundaryTreeType = model.boundaryTree;
    const boundarySpacing = getBoundarySpacing(boundaryTreeType);
    
    // Calculate total boundary trees based on perimeter and spacing
    const totalBoundaryTrees = Math.floor(kyari.perimeter / boundarySpacing);
    
    // All boundary trees are of the same type
    boundaryTrees.byType[boundaryTreeType] = totalBoundaryTrees;
    boundaryTrees.total = totalBoundaryTrees;
    
    return boundaryTrees;
}

// Calculate inside plantation trees
function calculateInsideTrees(kyari, model) {
    const insideTrees = {
        byType: {},
        total: 0
    };
    
    // New approach: Total Area - (Perimeter × 5m setback)
    const boundarySetback = 5; // meters
    const perimeter = kyari.perimeter;
    const totalAreaSqMeters = kyari.areaInSqMeters;
    
    // Calculate inside area by subtracting boundary buffer area
    const boundaryBufferArea = perimeter * boundarySetback;
    const insideArea = Math.max(0, totalAreaSqMeters - boundaryBufferArea);
    
    // Calculate number of trees with 2.5m x 2.5m spacing (6.25 sq.m per tree)
    const areaPerTree = 2.5 * 2.5; // 6.25 sq.m
    const totalInsidePositions = Math.floor(insideArea / areaPerTree);
    
    // Distribute trees according to model composition
    const composition = model.treeComposition;
    Object.entries(composition).forEach(([treeType, percentage]) => {
        const treeCount = Math.floor(totalInsidePositions * percentage / 100);
        insideTrees.byType[treeType] = treeCount;
        insideTrees.total += treeCount;
    });
    
    return insideTrees;
}

// Calculate combined tree totals for display
function calculateCombinedTreeTotals(results, model) {
    const combinedTotals = {};
    
    // Initialize all tree types from model composition
    Object.keys(model.treeComposition).forEach(treeType => {
        combinedTotals[treeType] = { boundary: 0, inside: 0, total: 0 };
    });
    
    // Add boundary tree type if not already in composition
    if (!combinedTotals[model.boundaryTree]) {
        combinedTotals[model.boundaryTree] = { boundary: 0, inside: 0, total: 0 };
    }
    
    // Sum up all kyari results
    results.kyariResults.forEach(result => {
        // Add boundary trees
        Object.entries(result.boundaryTrees.byType).forEach(([treeType, count]) => {
            if (combinedTotals[treeType]) {
                combinedTotals[treeType].boundary += count;
            }
        });
        
        // Add inside trees
        Object.entries(result.insideTrees.byType).forEach(([treeType, count]) => {
            if (combinedTotals[treeType]) {
                combinedTotals[treeType].inside += count;
            }
        });
    });
    
    // Calculate totals
    Object.keys(combinedTotals).forEach(treeType => {
        combinedTotals[treeType].total = combinedTotals[treeType].boundary + combinedTotals[treeType].inside;
    });
    
    return combinedTotals;
}

// Display calculation results
function displayResults(results, model) {
    const container = document.getElementById('resultsContainer');
    const summaryDiv = document.getElementById('summaryResults');
    const detailedDiv = document.getElementById('detailedResults');
    
    // Show results container
    container.classList.add('show');
    
    // Create summary
    const kyari = results.kyariResults[0].kyari;
    const insideArea = Math.max(0, kyari.areaInSqMeters - (kyari.perimeter * 5));
    
    summaryDiv.innerHTML = `
        <div class="summary-grid">
            <div class="summary-card">
                <h4>Total Trees</h4>
                <div class="number">${results.totalTrees.toLocaleString()}</div>
            </div>
            <div class="summary-card">
                <h4>Boundary Trees</h4>
                <div class="number">${results.totalBoundaryTrees.toLocaleString()}</div>
            </div>
            <div class="summary-card">
                <h4>Inside Trees</h4>
                <div class="number">${results.totalInsideTrees.toLocaleString()}</div>
            </div>
            <div class="summary-card">
                <h4>Inside Area</h4>
                <div class="number">${(insideArea / 4047).toFixed(2)}</div>
                <small>acres (usable)</small>
            </div>
        </div>
        <p style="margin-top: 20px; text-align: center; color: #666;">
            <strong>Kyari:</strong> ${kyari.id} - ${kyari.farmerName} | 
            <strong>Model:</strong> ${model.name}
        </p>
    `;
    
    // Create detailed breakdown
    let detailedHTML = '<div class="detailed-table"><table>';
    detailedHTML += `
        <thead>
            <tr>
                <th>Kyari</th>
                <th>Farmer</th>
                <th>Area (acres)</th>
                <th>Boundary Trees</th>
                <th>Inside Trees</th>
                <th>Total Trees</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    results.kyariResults.forEach(result => {
        const totalTrees = result.boundaryTrees.total + result.insideTrees.total;
        detailedHTML += `
            <tr>
                <td>${result.kyari.farmId}</td>
                <td>${result.kyari.farmerName}</td>
                <td>${result.kyari.area}</td>
                <td>${result.boundaryTrees.total.toLocaleString()}</td>
                <td>${result.insideTrees.total.toLocaleString()}</td>
                <td><strong>${totalTrees.toLocaleString()}</strong></td>
            </tr>
        `;
    });
    
    detailedHTML += '</tbody></table></div>';
    
    // Add tree type breakdown
    detailedHTML += '<h4 style="margin-top: 30px; color: #2d5a2d;">Tree Type Distribution</h4>';
    detailedHTML += `<p style="margin-bottom: 15px; color: #666; font-style: italic;">
        <strong>Boundary Trees:</strong> ${model.boundaryTree} only (${getBoundarySpacing(model.boundaryTree)}m spacing) | 
        <strong>Inside Trees:</strong> Mixed according to model percentages (2.5m × 2.5m spacing)<br>
        <strong>New Method:</strong> Inside Area = Total Area - (Perimeter × 5m setback)
    </p>`;
    
    detailedHTML += '<div class="detailed-table"><table>';
    detailedHTML += `
        <thead>
            <tr>
                <th>Tree Type</th>
                <th>Inside %</th>
                <th>Total Count</th>
                <th>Boundary Count</th>
                <th>Inside Count</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    // Calculate combined tree totals
    const combinedTotals = calculateCombinedTreeTotals(results, model);
    
    // Display boundary tree first
    const boundaryTree = model.boundaryTree;
    if (combinedTotals[boundaryTree] && combinedTotals[boundaryTree].total > 0) {
        detailedHTML += `
            <tr style="background-color: #e8f5e8;">
                <td><strong>${boundaryTree} (Boundary)</strong></td>
                <td>-</td>
                <td><strong>${combinedTotals[boundaryTree].total.toLocaleString()}</strong></td>
                <td><strong>${combinedTotals[boundaryTree].boundary.toLocaleString()}</strong></td>
                <td>${combinedTotals[boundaryTree].inside.toLocaleString()}</td>
            </tr>
        `;
    }
    
    // Display inside plantation trees
    Object.entries(model.treeComposition).forEach(([treeType, percentage]) => {
        if (percentage > 0 && combinedTotals[treeType]) {
            const counts = combinedTotals[treeType];
            detailedHTML += `
                <tr>
                    <td><strong>${treeType}</strong></td>
                    <td>${percentage}%</td>
                    <td><strong>${counts.total.toLocaleString()}</strong></td>
                    <td>${counts.boundary.toLocaleString()}</td>
                    <td><strong>${counts.inside.toLocaleString()}</strong></td>
                </tr>
            `;
        }
    });
    
    detailedHTML += '</tbody></table></div>';
    
    detailedDiv.innerHTML = detailedHTML;
    
    // Scroll to results
    container.scrollIntoView({ behavior: 'smooth' });
} 