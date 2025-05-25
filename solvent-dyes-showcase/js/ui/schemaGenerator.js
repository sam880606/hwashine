import { getHumanReadableColor } from '../utils.js';

/**
 * Generates the JSON-LD script element for product schema.
 * @param {object} dye - The dye object.
 * @param {string} productPageUrl - The base URL for the product page.
 * @param {object} processedSchemaPolymers - Processed polymer data for schema.
 * @returns {HTMLScriptElement} The script element containing JSON-LD.
 */
export function generateProductSchemaScript(dye, productPageUrl, processedSchemaPolymers) {
    const compatiblePolymersForSchema = [
        ...processedSchemaPolymers.recommended,
        ...processedSchemaPolymers.limited // Limited polymers include "(Limited Suitability)" text
    ];

    let productDescription = `高品質溶劑染料 ${dye.name} (${dye.common_name_en || dye.code})，專為塑膠應用設計，由華翔興業有限公司提供。HEX 色碼: ${dye.color}. `;
    if (compatiblePolymersForSchema.length > 0) {
        productDescription += `適用樹脂: ${compatiblePolymersForSchema.join(', ')}。`;
    } else {
        productDescription += `適用於多種塑膠應用。`;
    }
    productDescription += `查詢產品代號 ${dye.code} 獲取更多資訊。`;

    const additionalProperties = [];
    // Removed Colour Index No. from here as per previous instruction.
    if (dye.cas_no && dye.cas_no !== 'Not Available') {
        productDescription += ` CAS No.: ${dye.cas_no}.`; // Still good to have in description
        additionalProperties.push({ "@type": "PropertyValue", "name": "CAS Number", "value": dye.cas_no });
    }
    if (dye.ec_no && dye.ec_no !== 'Not Available') {
        productDescription += ` EC No.: ${dye.ec_no}.`;
        additionalProperties.push({ "@type": "PropertyValue", "name": "EC Number", "value": dye.ec_no });
    }

    // Add Heat Stability to additionalProperties
    if (dye.heat_stability_data && Array.isArray(dye.heat_stability_data)) {
        additionalProperties.push({
            "@type": "PropertyValue",
            "name": "耐熱性 (Heat Stability)",
            "value": dye.heat_stability_data.map(item => `${item.polymer}: ${item.temp}°C`).join(', '),
            "description": dye.heat_stability_test || "耐熱性測試數據"
        });
    } else if (dye.heat_stability && dye.heat_stability.toLowerCase() !== 'consult tds') {
            additionalProperties.push({ "@type": "PropertyValue", "name": "耐熱性 (Heat Stability)", "value": dye.heat_stability });
    }

    // Add Light Fastness to additionalProperties
    if (dye.light_fastness_data && typeof dye.light_fastness_data === 'object') {
        const polymerKeys = Object.keys(dye.light_fastness_data);
        if (polymerKeys.length > 0) {
                const lightFastnessValues = polymerKeys
                .map((polymer) => {
                    const data = dye.light_fastness_data[polymer] || {};
                    // Format each polymer's light fastness data nicely
                    return `${polymer}: ` + Object.entries(data).map(([condition, value]) => `${condition.replace(/%/g, '％')}: ${value}`).join(', ');
                })
                .join('; ');

            additionalProperties.push({
                "@type": "PropertyValue",
                "name": "耐光性 (Light Fastness)",
                "value": lightFastnessValues,
                "description": dye.light_fastness_test || "耐光性測試數據"
            });
        }
    }

    // Add Compatible Polymers to additionalProperties if available
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