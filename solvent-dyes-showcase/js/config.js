// This file primarily stores the dye data and related configuration.
// The allDyes array is large due to the amount of data per dye.
// It is kept as a single source of truth for dye information.

// Configuration for color sorting and display
export const colorPrefixOrder = {
    'S.Y.': 1, 
    'S.O.': 2, 
    'S.R.': 3, 
    'S.V.': 4, 
    'S.B.': 5, 
    'S.G.': 6  
};

// Configuration for color filter button labels
export const colorCategories = {
    'all': '所有顏色',
    'S.Y.': '黃色系列',
    'S.G.': '綠色系列',
    'S.O.': '橙色系列',
    'S.R.': '紅色系列',
    'S.B.': '藍色系列',
    'S.V.': '紫色系列'
};

// Whitelist of polymers to be actively displayed in filters and summarized views.
// Other polymers in dye data (like PBT, PA-6, Nylon) will still be part of the dye's full data
// but might not be primary filter options or explicitly listed in all UIs unless handled.
export const ALLOWED_POLYMERS_FOR_DISPLAY = ['PS', 'SAN', 'ABS', 'PMMA', 'PC', 'PA6', 'PET'];