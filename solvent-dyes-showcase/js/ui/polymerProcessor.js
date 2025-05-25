import { ALLOWED_POLYMERS_FOR_DISPLAY } from '../config.js';

/**
 * Processes the compatible_polymers data for a dye.
 * @param {object} dye - The dye object.
 * @returns {object} An object containing lists of polymers for schema and modal display.
 *                   { schemaPolymers: { recommended: string[], limited: string[] },
 *                     modalPolymers: { recommended: string[], limited: string[] } }
 */
export function processCompatiblePolymers(dye) {
    const schemaPolymers = { recommended: [], limited: [] };
    const modalPolymers = { recommended: [], limited: [] };

    if (dye.compatible_polymers) {
        const dyePolymersMap = new Map();
        dye.compatible_polymers.forEach(p => {
            if (p.status !== 'not recommended') {
                const existingStatus = dyePolymersMap.get(p.polymer);
                // Prioritize 'recommended' over 'limited' if a polymer appears multiple times with different statuses.
                if (!existingStatus || (existingStatus === 'limited' && p.status === 'recommended')) {
                    dyePolymersMap.set(p.polymer, p.status);
                } else if (!existingStatus) { // If not set at all, set it.
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
                // For schema, include the "Limited Suitability" text
                schemaPolymers.limited.push(`${targetPolymer} (Limited Suitability)`);
                // For modal, just the polymer name, the UI will add the qualifier
                modalPolymers.limited.push(targetPolymer);
            }
        });
    }
    return { schemaPolymers, modalPolymers };
}