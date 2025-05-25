import { openModal } from './modal.js';
import { getHumanReadableColor } from './utils.js';
import { ALLOWED_POLYMERS_FOR_DISPLAY } from './config.js'; // Import the list

/**
 * Processes the compatible_polymers data for a dye.
 * @param {object} dye - The dye object.
 * @returns {object} An object containing lists of polymers for schema and modal display.
 *                   { schemaPolymers: { recommended: string[], limited: string[] },
 *                     modalPolymers: { recommended: string[], limited: string[] } }
 */
function _processCompatiblePolymers(dye) {
    const schemaPolymers = { recommended: [], limited: [] };
    const modalPolymers = { recommended: [], limited: [] };

    if (dye.compatible_polymers) {
        const dyePolymersMap = new Map();
        dye.compatible_polymers.forEach(p => {
            if (p.status !== 'not recommended') {
                const existingStatus = dyePolymersMap.get(p.polymer);
                if (!existingStatus || (existingStatus === 'limited' && p.status === 'recommended')) {
                    dyePolymersMap.set(p.polymer, p.status);
                } else if (!existingStatus) {
                    dyePolymersMap.set(p.polymer, p.status);
                }
            }
        });

        ALLOWED_POLYMERS_FOR_DISPLAY.forEach(targetPolymer => {
            const finalStatus = dyePolymersMap.get(targetPolymer);
            if (finalStatus === 'recommended') {
                schemaPolymers.recommended.push(targetPolymer);
                modalPolymers.recommended.push(targetPolymer);
            } else if (finalStatus === 'limited') {
                schemaPolymers.limited.push(`${targetPolymer} (Limited Suitability)`);
                modalPolymers.limited.push(targetPolymer);
            }
        });
    }
    return { schemaPolymers, modalPolymers };
}

/**
 * Creates the basic DOM elements for a dye swatch.
 * @param {object} dye - The dye object.
 * @returns {object} An object containing the swatch element and its main child elements.
 *                   { swatchElement, colorBox, nameLabel, codeLabel, commonNamePreviewLabel }
 */
function _createSwatchDomElements(dye) {
    const swatchElement = document.createElement('article');
    swatchElement.className = 'dye-swatch';
    swatchElement.setAttribute('role', 'button');
    swatchElement.setAttribute('tabindex', '0');
    swatchElement.setAttribute('aria-label', `查看 ${dye.name} 詳細資訊`);

    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = dye.color;

    const nameLabel = document.createElement('p');
    nameLabel.className = 'dye-name';
    nameLabel.textContent = dye.name;

    const codeLabel = document.createElement('p');
    codeLabel.className = 'dye-code';
    codeLabel.textContent = `(${dye.code})`;

    const commonNamePreviewLabel = document.createElement('p');
    commonNamePreviewLabel.className = 'dye-common-name-preview';
    commonNamePreviewLabel.textContent = dye.common_name_en || '';

    swatchElement.appendChild(colorBox);
    swatchElement.appendChild(nameLabel);
    swatchElement.appendChild(codeLabel);
    if (dye.common_name_en) {
        swatchElement.appendChild(commonNamePreviewLabel);
    }

    return { swatchElement, colorBox, nameLabel, codeLabel, commonNamePreviewLabel };
}

/**
 * Generates the JSON-LD script element for product schema.
 * @param {object} dye - The dye object.
 * @param {string} productPageUrl - The base URL for the product page.
 * @param {object} processedSchemaPolymers - Processed polymer data for schema.
 * @returns {HTMLScriptElement} The script element containing JSON-LD.
 */
function _generateProductSchemaScript(dye, productPageUrl, processedSchemaPolymers) {
    const compatiblePolymersForSchema = [
        ...processedSchemaPolymers.recommended,
        ...processedSchemaPolymers.limited
    ];

    let productDescription = `高品質溶劑染料 ${dye.name} (${dye.common_name_en || dye.code})，專為塑膠應用設計，由華翔興業有限公司提供。HEX 色碼: ${dye.color}. `;
    if (compatiblePolymersForSchema.length > 0) {
        productDescription += `適用樹脂: ${compatiblePolymersForSchema.join(', ')}。`;
    } else {
        productDescription += `適用於多種塑膠應用。`;
    }
    productDescription += `查詢產品代號 ${dye.code} 獲取更多資訊。`;

    const additionalProperties = [];
    if (dye.colour_index_no && dye.colour_index_no !== 'C.I. Not Available') {
        productDescription += ` Colour Index No.: ${dye.colour_index_no}.`;
        additionalProperties.push({ "@type": "PropertyValue", "name": "Colour Index Number", "value": dye.colour_index_no });
    }
    if (dye.cas_no && dye.cas_no !== 'Not Available') {
        productDescription += ` CAS No.: ${dye.cas_no}.`;
        additionalProperties.push({ "@type": "PropertyValue", "name": "CAS Number", "value": dye.cas_no });
    }
    if (dye.ec_no && dye.ec_no !== 'Not Available') {
        productDescription += ` EC No.: ${dye.ec_no}.`;
        additionalProperties.push({ "@type": "PropertyValue", "name": "EC Number", "value": dye.ec_no });
    }

    if (dye.heat_stability_data) {
        additionalProperties.push({
            "@type": "PropertyValue",
            "name": "耐熱性 (Heat Stability)",
            "value": dye.heat_stability_data.map(item => `${item.polymer}: ${item.temp}°C`).join(', '),
            "description": `Tested according to ${dye.heat_stability_test}`
        });
    } else if (dye.heat_stability && dye.heat_stability.toLowerCase() !== 'consult tds') {
            additionalProperties.push({ "@type": "PropertyValue", "name": "耐熱性 (Heat Stability)", "value": dye.heat_stability });
    }

    if (dye.light_fastness_data) {
        const polymerKeys = Object.keys(dye.light_fastness_data);
        if (polymerKeys.length > 0) {
                const lightFastnessValues = polymerKeys
                .map((polymer) => {
                    const data = dye.light_fastness_data[polymer] || {};
                    return `${polymer}: ` + Object.entries(data).map(([condition, value]) => `${condition}: ${value}`).join(', ');
                })
                .join('; ');

            additionalProperties.push({
                "@type": "PropertyValue",
                "name": "耐光性 (Light Fastness)",
                "value": lightFastnessValues,
                "description": `Tested according to ${dye.light_fastness_test}`
            });
        }
    } else if (dye.light_fastness && dye.light_fastness.toLowerCase() !== 'consult tds') {
            additionalProperties.push({ "@type": "PropertyValue", "name": "耐光性 (Light Fastness)", "value": dye.light_fastness });
    }

    if (compatiblePolymersForSchema.length > 0) {
            additionalProperties.push({ "@type": "PropertyValue", "name": "適用樹脂 (Compatible Polymers)", "value": compatiblePolymersForSchema.join(', ') });
    }

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `${dye.name} (${dye.common_name_en || dye.code})`,
        "description": productDescription,
        "sku": dye.code,
        "color": getHumanReadableColor(dye),
        "brand": { "@type": "Organization", "name": "華翔興業有限公司" },
        "url": `${productPageUrl}#product-${dye.code.replace(/\s|\./g, '-')}`,
        "material": compatiblePolymersForSchema.length > 0 ? compatiblePolymersForSchema.join(', ') : "Plastics",
        "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "seller": { "@type": "Organization", "name": "華翔興業有限公司", "url": "https://hwashine.tw/" }
        }
    };
    if (additionalProperties.length > 0) {
        productSchema.additionalProperty = additionalProperties;
    }

    const scriptLDJSON = document.createElement('script');
    scriptLDJSON.type = 'application/ld+json';
    scriptLDJSON.textContent = JSON.stringify(productSchema);
    return scriptLDJSON;
}

// Helper function to extract a single light fastness value from a data object (moved from displayDyes)
function _extractLightFastnessValueForModal(dataObject) {
    if (!dataObject || typeof dataObject !== 'object') return null;

    if (dataObject['Rating']) return dataObject['Rating']; 
    if (dataObject['Transp.']) return dataObject['Transp.']; 

    const transparentKeys = Object.keys(dataObject).filter(k => k.toLowerCase().includes('transparent') || k.toLowerCase().includes('transp.'));
    if (transparentKeys.length > 0) {
        const preferredTransparentKey = 
            transparentKeys.find(k => !k.includes('TiO₂')) || 
            transparentKeys.find(k => k.includes('0.05%')) || 
            transparentKeys[0];
        if (preferredTransparentKey && dataObject[preferredTransparentKey]) return dataObject[preferredTransparentKey];
    }

    const opaqueKeys = Object.keys(dataObject).filter(k => k.toLowerCase().includes('opaque'));
    if (opaqueKeys.length > 0) {
        const preferredOpaqueKey = 
            opaqueKeys.find(k => k.includes('1.0%TiO₂') || k.includes('2.0%TiO₂')) || 
            opaqueKeys[0];
        if (preferredOpaqueKey && dataObject[preferredOpaqueKey]) return dataObject[preferredOpaqueKey];
    }
    
    for (const key in dataObject) {
        const lowerKey = key.toLowerCase();
        if (!lowerKey.includes('染料') && !lowerKey.includes('%') && !lowerKey.includes('concentration') && !lowerKey.includes('dye content')) {
            return dataObject[key]; 
        }
    }
    return null;
}


/**
 * Generates the HTML content for the dye details modal.
 * @param {object} dye - The dye object.
 * @param {object} processedModalPolymers - Processed polymer data for modal display.
 * @returns {string} HTML string for the modal content.
 */
function _generateModalHtml(dye, processedModalPolymers) {
    let tdsSection = "";
    if (dye.tds_pdf_path) {
        tdsSection = `<p><strong>技術資料表 (TDS):</strong> <a href="${dye.tds_pdf_path}" target="_blank" rel="noopener noreferrer" class="modal-tds-link">點此下載 ${dye.code} TDS</a></p>`;
    } else {
            tdsSection = `<p><strong>技術資料表 (TDS):</strong> 請洽詢業務取得。</p>`;
    }

    let basicPropertiesHtml = '<h4>基本物性資料</h4><ul class="properties-list">';
    let hasCAS = dye.cas_no && dye.cas_no !== 'Not Available';
    if (hasCAS) {
            basicPropertiesHtml += `<li><strong>CAS No.:</strong> ${dye.cas_no}</li>`;
    }
    if (!hasCAS) { // If no specific properties are available to list for this section
            basicPropertiesHtml += `<li><p>詳細物性資料請洽詢業務。</p></li>`;
    }
    basicPropertiesHtml += '</ul>';

    let heatStabilityHtml = '<h4>耐熱性 (Heat Stability)</h4>';
    let heatValue = null;
    if (dye.heat_stability && typeof dye.heat_stability === 'string' && dye.heat_stability.toLowerCase() !== 'consult tds') {
        heatValue = dye.heat_stability;
    } else if (Array.isArray(dye.heat_stability_data) && dye.heat_stability_data.length > 0) {
        const psData = dye.heat_stability_data.find(item => item.polymer === 'PS');
        if (psData && psData.temp) {
            heatValue = `${psData.temp}°C`;
        } else if (dye.heat_stability_data[0] && dye.heat_stability_data[0].temp) {
            heatValue = `${dye.heat_stability_data[0].temp}°C`;
        }
    }
    if (heatValue) {
        heatStabilityHtml += `<p>${heatValue}</p>`;
    } else {
        heatStabilityHtml += `<p>請洽詢業務取得相關資料。</p>`;
    }

    let lightFastnessHtml = '<h4>耐光性 (Light Fastness)</h4>';
    let lightValue = null;
    if (dye.light_fastness && typeof dye.light_fastness === 'string' && dye.light_fastness.toLowerCase() !== 'consult tds') {
        lightValue = dye.light_fastness;
    } else if (dye.light_fastness_data && typeof dye.light_fastness_data === 'object' && Object.keys(dye.light_fastness_data).length > 0) {
        let potentialLightValue = null;
        const psRatingData = dye.light_fastness_data['PS'];
        if (psRatingData) {
            potentialLightValue = _extractLightFastnessValueForModal(psRatingData);
        }
        if (!potentialLightValue) {
            const polymersWithData = Object.keys(dye.light_fastness_data).filter(
                p => dye.light_fastness_data[p] && Object.keys(dye.light_fastness_data[p]).length > 0
            );
            const firstOtherPolymerKey = polymersWithData.find(p => p !== 'PS') || (polymersWithData.length > 0 ? polymersWithData[0] : null);
            if (firstOtherPolymerKey) {
                const polymerData = dye.light_fastness_data[firstOtherPolymerKey];
                potentialLightValue = _extractLightFastnessValueForModal(polymerData);
            }
        }
        lightValue = potentialLightValue;
    }

    if (lightValue) {
        lightFastnessHtml += `<p>${lightValue}</p>`;
    } else {
            lightFastnessHtml += `<p>請洽詢業務取得相關資料。</p>`;
    }

    let compatiblePolymersHtml = '<h4>建議適用樹脂</h4>';
    if (processedModalPolymers.recommended.length > 0 || processedModalPolymers.limited.length > 0) {
        compatiblePolymersHtml += `
            <div class="polymer-tags">
                ${processedModalPolymers.recommended.map(p => `<span class="polymer-tag">${p}</span>`).join('')}
                ${processedModalPolymers.limited.map(p => `<span class="polymer-tag limited">${p} (有限適用)</span>`).join('')}
            </div>
        `;
    } else {
            compatiblePolymersHtml += `<p>針對標準建議樹脂 (${ALLOWED_POLYMERS_FOR_DISPLAY.join(', ')})，未列出特定適用性。請參考完整技術資料或洽詢業務。</p>`;
    }

    let relatedInfoHtml = '<h4>相關資訊</h4>';
    if (dye.related_info_link) {
            const linkText = dye.code === 'S.O. 60' ? 'SO60的應用與注意事項' : '更多相關資訊';
            relatedInfoHtml += `<p><a href="${dye.related_info_link}" target="_blank" rel="noopener noreferrer">${linkText}</a></p>`;
    } else {
            relatedInfoHtml += `<p>暫無相關資料</p>`;
    }

    return `
        <h3>${dye.name} (${dye.common_name_en || dye.code})</h3>
        <p><strong>產品代號 (Code):</strong> ${dye.code}</p>
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <strong style="margin-right: 5px;">代表色 (Color):</strong>
            <span style="display: inline-block; width: 1.5em; height: 1.5em; background-color:${dye.color}; border: 1px solid #fff; margin-right: 0.5em; vertical-align: middle;"></span>
            ${dye.color}
        </div>
        ${basicPropertiesHtml}
        ${heatStabilityHtml}
        ${lightFastnessHtml}
        ${compatiblePolymersHtml}
        ${relatedInfoHtml}
        <hr style="margin: 20px 0;">
        ${tdsSection}
        <a href="${dye.inquiry_link || 'https://hwashine.tw/contact/'}" target="_blank" rel="noopener noreferrer" class="modal-cta-button">索取樣品 / 產品諮詢</a>
        <p style="margin-top:20px;"><small><i>以上資訊為初步參考資料。實際應用請參考完整技術規格書或洽詢本公司業務代表。部分特性可能因加工條件與樹脂種類而異。</i></small></p>
    `;
}


export function displayDyes(dyesToDisplay, dyeGalleryElement, noResultsMessageElement) {
    if (!dyeGalleryElement) {
        console.error('Dye gallery container not found for displayDyes!');
        return;
    }
    dyeGalleryElement.innerHTML = ''; // Clear previous results

    if (noResultsMessageElement) {
        noResultsMessageElement.style.display = dyesToDisplay.length === 0 ? 'block' : 'none';
    }

    const productPageUrl = typeof window !== 'undefined' ? window.location.href.split('?')[0].split('#')[0] : 'https://your-live-domain.com/solvent-dyes-showcase/';

    dyesToDisplay.forEach((dye, index) => {
        const { swatchElement } = _createSwatchDomElements(dye);

        const { schemaPolymers, modalPolymers } = _processCompatiblePolymers(dye);
        
        const scriptLDJSON = _generateProductSchemaScript(dye, productPageUrl, schemaPolymers);
        swatchElement.appendChild(scriptLDJSON);

        dyeGalleryElement.appendChild(swatchElement);

        setTimeout(() => {
            swatchElement.classList.add('visible');
        }, index * 50); 

        const handleActivation = () => {
            const modalContentHtml = _generateModalHtml(dye, modalPolymers);
            openModal(`${dye.name} - 產品資訊`, modalContentHtml);
        };

        swatchElement.addEventListener('click', handleActivation);
        swatchElement.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleActivation();
            }
        });
    });
}

export function setupFilterControls(colorFiltersContainerElement, categories, initialFilter, onFilterChangeCallback) {
    if (!colorFiltersContainerElement) {
        console.error('Color filters container not found for setupControls!');
        return;
    }
    colorFiltersContainerElement.innerHTML = ''; 

    Object.keys(categories).forEach(categoryKey => {
        const button = document.createElement('button');
        button.className = 'filter-btn color-filter-btn';
        button.dataset.filter = categoryKey;
        button.textContent = categories[categoryKey];
        if (categoryKey === initialFilter) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            colorFiltersContainerElement.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            onFilterChangeCallback(categoryKey);
        });
        colorFiltersContainerElement.appendChild(button);
    });
}

export function populatePolymerFilterDropdown(dropdownElement, polymers, initialFilter, onFilterChangeCallback) {
     if (!dropdownElement) {
        console.error('Polymer filter dropdown not found!');
        return;
     }

     dropdownElement.innerHTML = '<option value="all">所有樹脂</option>';

     polymers.forEach(polymer => {
        const option = document.createElement('option');
        option.value = polymer;
        option.textContent = polymer;
        dropdownElement.appendChild(option);
     });

     dropdownElement.value = initialFilter; 

     dropdownElement.addEventListener('change', (event) => {
        onFilterChangeCallback(event.target.value);
     });
}