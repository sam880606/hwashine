// This file is now the main entry point and orchestrator for the application.
// Original code has been refactored into modules in the js/ directory.

import { allDyes as rawDyes } from './js/data/dyeData.js'; 
import { colorPrefixOrder, colorCategories, ALLOWED_POLYMERS_FOR_DISPLAY } from './js/config.js';
import { parseDyeCode } from './js/utils.js'; 
import { initModal } from './js/modal.js'; 
import { displayDyes, setupFilterControls, populatePolymerFilterDropdown } from './js/ui.js';

// DOM Elements
const searchInput = document.getElementById('search-input');
const dyeGallery = document.getElementById('dye-gallery');
const noResultsMessage = document.getElementById('no-results-message');
const colorFiltersContainer = document.getElementById('color-filters');
const polymerFilterDropdown = document.getElementById('polymer-filter');

// Application State
let currentSearchTerm = '';
let currentColorFilter = 'all'; 
let currentPolymerFilter = 'all'; 

// Process and sort dyes once upon script load
const sortedDyes = [...rawDyes].sort((a, b) => {
    const parsedA = parseDyeCode(a.code); 
    const parsedB = parseDyeCode(b.code);
    const orderA = colorPrefixOrder[parsedA.prefix] || 99; 
    const orderB = colorPrefixOrder[parsedB.prefix] || 99;
    if (orderA !== orderB) return orderA - orderB;
    return parsedA.number - parsedB.number;
});

// Use the allowed polymers directly for the filter dropdown
const uniquePolymers = [...ALLOWED_POLYMERS_FOR_DISPLAY]; 

// Main filtering and display function
function filterAndSearchDyes() {
    let filteredDyes = [...sortedDyes];

    // Apply color filter
    if (currentColorFilter !== 'all') {
        filteredDyes = filteredDyes.filter(dye => dye.code.startsWith(currentColorFilter));
    }

    // Apply polymer filter
    if (currentPolymerFilter !== 'all') {
        filteredDyes = filteredDyes.filter(dye => {
            if (!dye.compatible_polymers) return false;
            
            // Simplified logic: currentPolymerFilter will be 'PET' (or other single polymer)
            // if selected from the dropdown. This correctly filters for dyes
            // compatible with the selected polymer.
            return dye.compatible_polymers.some(p =>
                p.polymer === currentPolymerFilter && p.status !== 'not recommended'
            );
        });
    }

    // Apply search term
    const searchTerm = currentSearchTerm.toLowerCase().trim();
    if (searchTerm) {
        filteredDyes = filteredDyes.filter(dye => {
            const matchName = dye.name.toLowerCase().includes(searchTerm);
            const matchCode = dye.code.toLowerCase().includes(searchTerm);
            const matchCommonNameEn = dye.common_name_en && dye.common_name_en.toLowerCase().includes(searchTerm);
            const matchCI = dye.colour_index_no && dye.colour_index_no.toLowerCase().includes(searchTerm);
            const matchCAS = dye.cas_no && dye.cas_no.toLowerCase().includes(searchTerm);
            const matchEC = dye.ec_no && dye.ec_no.toLowerCase().includes(searchTerm);
            const matchPolymers = dye.compatible_polymers && dye.compatible_polymers.some(p => p.polymer.toLowerCase().includes(searchTerm));
            const matchApplications = dye.applications && dye.applications.some(a => a.toLowerCase().includes(searchTerm));
            const matchHeat = dye.heat_stability && dye.heat_stability.toLowerCase().includes(searchTerm);
            const matchLight = dye.light_fastness && dye.light_fastness.toLowerCase().includes(searchTerm);

            return matchName || matchCode || matchCommonNameEn || matchCI || matchCAS || matchEC || matchPolymers || matchApplications || matchHeat || matchLight;
        });
    }
    
    displayDyes(filteredDyes, dyeGallery, noResultsMessage);
}

// Initialization function
function initializeApp() {
    initModal(); 

    setupFilterControls(
        colorFiltersContainer,
        colorCategories, 
        currentColorFilter,
        (newFilter) => { 
            currentColorFilter = newFilter;
            filterAndSearchDyes();
        }
    );

    populatePolymerFilterDropdown(polymerFilterDropdown, uniquePolymers, currentPolymerFilter, (newPolymerFilter) => {
        currentPolymerFilter = newPolymerFilter;
        filterAndSearchDyes();
    });

    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            currentSearchTerm = event.target.value;
            filterAndSearchDyes();
        });
    } else {
        console.error("Search input not found.");
    }

    filterAndSearchDyes(); 
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', initializeApp);