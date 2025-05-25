import { ALLOWED_POLYMERS_FOR_DISPLAY } from '../config.js';

// Helper function to extract a single light fastness value from a data object
function _extractLightFastnessValueForModal(dataObject) {
    if (!dataObject || typeof dataObject !== 'object') return null;

    // Prioritize 'Rating' if available (common in simpler structures)
    if (dataObject['Rating']) return dataObject['Rating']; 
    // Prioritize 'Transp.' if available (common from previous logic)
    if (dataObject['Transp.']) return dataObject['Transp.']; 

    // Find a 'Transparent' value, prefer without TiO2 or standard 0.05%
    const transparentKeys = Object.keys(dataObject).filter(k => k.toLowerCase().includes('transparent') || k.toLowerCase().includes('transp.'));
    if (transparentKeys.length > 0) {
        const preferredTransparentKey = 
            transparentKeys.find(k => !k.includes('TiO₂')) || // Prefer if no TiO2 specified
            transparentKeys.find(k => k.includes('0.05%')) || // Then prefer 0.05%
            transparentKeys[0]; // Fallback to first transparent key
        if (preferredTransparentKey && dataObject[preferredTransparentKey]) return dataObject[preferredTransparentKey];
    }

    // Find an 'Opaque' value, prefer standard TiO2 concentrations
    const opaqueKeys = Object.keys(dataObject).filter(k => k.toLowerCase().includes('opaque'));
    if (opaqueKeys.length > 0) {
        const preferredOpaqueKey = 
            opaqueKeys.find(k => k.includes('1.0%TiO₂') || k.includes('2.0%TiO₂')) || // Prefer common TiO2 levels
            opaqueKeys[0]; // Fallback to first opaque key
        if (preferredOpaqueKey && dataObject[preferredOpaqueKey]) return dataObject[preferredOpaqueKey];
    }
    
    // Fallback: iterate and return the first value that is not a descriptor key
    for (const key in dataObject) {
        const lowerKey = key.toLowerCase();
        // Avoid keys that seem to be labels or descriptors rather than values
        if (!lowerKey.includes('染料') && !lowerKey.includes('%') && !lowerKey.includes('concentration') && !lowerKey.includes('dye content')) {
            return dataObject[key]; 
        }
    }
    return null; // No suitable value found
}


/**
 * Generates the HTML content for the dye details modal.
 * @param {object} dye - The dye object.
 * @param {object} processedModalPolymers - Processed polymer data for modal display.
 * @returns {string} HTML string for the modal content.
 */
export function generateModalHtmlContent(dye, processedModalPolymers) {
    let tdsSection = "";
    if (dye.tds_pdf_path) {
        tdsSection = `<p><strong>技術資料表 (TDS):</strong> <a href="${dye.tds_pdf_path}" target="_blank" rel="noopener noreferrer" class="modal-tds-link">點此下載 ${dye.code} TDS</a></p>`;
    } else {
            tdsSection = `<p><strong>技術資料表 (TDS):</strong> 請洽詢業務取得。</p>`;
    }

    let basicPropertiesHtml = '<h4>基本物性資料</h4><ul class="properties-list">';
    let hasCAS = dye.cas_no && dye.cas_no !== 'Not Available';
    // Removed Colour Index No. display from here as per previous user instruction.
    if (hasCAS) {
            basicPropertiesHtml += `<li><strong>CAS No.:</strong> ${dye.cas_no}</li>`;
    }
    // Check if any basic property was added. If not, provide a generic message.
    if (!hasCAS) { 
            basicPropertiesHtml += `<li><p>詳細物性資料請洽詢業務。</p></li>`;
    }
    basicPropertiesHtml += '</ul>';

    let heatStabilityHtml = '<h4>耐熱性 (Heat Stability)</h4>';
    let heatValue = null;
    // Prefer direct string value if available and not "Consult TDS"
    if (dye.heat_stability && typeof dye.heat_stability === 'string' && dye.heat_stability.toLowerCase() !== 'consult tds') {
        heatValue = dye.heat_stability;
    } else if (Array.isArray(dye.heat_stability_data) && dye.heat_stability_data.length > 0) {
        // Try to find PS data first as a common reference
        const psData = dye.heat_stability_data.find(item => item.polymer === 'PS');
        if (psData && psData.temp) {
            heatValue = `${psData.temp}°C`;
        } else if (dye.heat_stability_data[0] && dye.heat_stability_data[0].temp) { // Fallback to first available data
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
        // Try to get PS data first
        const psRatingData = dye.light_fastness_data['PS'];
        if (psRatingData) {
            potentialLightValue = _extractLightFastnessValueForModal(psRatingData);
        }
        // If no PS data or no value from PS, try other polymers
        if (!potentialLightValue) {
            const polymersWithData = Object.keys(dye.light_fastness_data).filter(
                p => dye.light_fastness_data[p] && Object.keys(dye.light_fastness_data[p]).length > 0
            );
            // Find the first polymer (that is not PS, if PS was already checked) that has data
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
            // If no specific polymers from ALLOWED_POLYMERS_FOR_DISPLAY are listed as recommended or limited.
            compatiblePolymersHtml += `<p>針對標準建議樹脂 (${ALLOWED_POLYMERS_FOR_DISPLAY.join(', ')})，未列出特定適用性。請參考完整技術資料或洽詢業務。</p>`;
    }

    let relatedInfoHtml = '<h4>相關資訊</h4>';
    if (dye.related_info_link && dye.related_info_link !== '#') { // Ensure link is not just '#'
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
