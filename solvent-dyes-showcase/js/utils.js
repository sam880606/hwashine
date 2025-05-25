// Helper function to convert hex color to HSL (kept for potential future use, but not primary for sorting now)
export function hexToHSL(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, sval, lval = (max + min) / 2;

    if (max === min) {
        h = sval = 0; // achromatic
    } else {
        const d = max - min;
        sval = lval > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: sval * 100, l: lval * 100 };
}

// Helper function to parse dye code into prefix and number
export function parseDyeCode(codeStr) {
    const parts = codeStr.split(' ');
    if (parts.length >= 2) {
        const prefix = parts[0];
        const number = parseInt(parts[parts.length - 1], 10); // Take the last part as number
        return { prefix, number: isNaN(number) ? Infinity : number }; // Handle cases if number parsing fails
    }
    return { prefix: '', number: Infinity }; // Fallback for malformed codes
}

// Function to extract a human-readable color name from dye data for schema.org
export function getHumanReadableColor(dye) {
    if (dye.common_name_en) {
        const lowerEnName = dye.common_name_en.toLowerCase();
        if (lowerEnName.includes('yellow')) return 'Yellow';
        if (lowerEnName.includes('green')) return 'Green';
        if (lowerEnName.includes('orange')) return 'Orange';
        if (lowerEnName.includes('red')) return 'Red';
        if (lowerEnName.includes('blue')) return 'Blue';
        if (lowerEnName.includes('violet')) return 'Violet';
    }
    // Fallback based on code prefix
    if (dye.code.startsWith('S.Y.')) return 'Yellow';
    if (dye.code.startsWith('S.G.')) return 'Green';
    if (dye.code.startsWith('S.O.')) return 'Orange';
    if (dye.code.startsWith('S.R.')) return 'Red';
    if (dye.code.startsWith('S.B.')) return 'Blue';
    if (dye.code.startsWith('S.V.')) return 'Violet';
    return dye.color; // Fallback to hex if no category matches, though schema.org prefers named colors
}