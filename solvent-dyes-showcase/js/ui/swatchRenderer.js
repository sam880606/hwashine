/**
 * Creates the basic DOM elements for a dye swatch.
 * @param {object} dye - The dye object.
 * @returns {object} An object containing the swatch element and its main child elements.
 *                   { swatchElement, colorBox, nameLabel, codeLabel, commonNamePreviewLabel }
 */
export function createSwatchDomElements(dye) {
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