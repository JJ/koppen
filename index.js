/**
 * Köppen Climate Classification Calculator
 * 
 * This module implements the Köppen climate classification system,
 * specifically for B (arid) zones.
 */

/**
 * Classifies zone B (arid) into BS (steppe) or BW (desert)
 * 
 * @param {number} pma - Precipitation Mean Annual (mm)
 * @param {number} tma - Temperature Mean Annual (°C)
 * @returns {string} Climate zone classification: 'BS' or 'BW'
 */
function classifyBZone(pma, tma) {
  // If PMA > TMA * 12, zone is BS (steppe)
  // If PMA < TMA * 12, zone is BW (desert)
  
  const threshold = tma * 12;
  
  if (pma > threshold) {
    return 'BS';
  } else if (pma < threshold) {
    return 'BW';
  } else {
    // When PMA equals TMA * 12, we'll classify as BS by default
    return 'BS';
  }
}

/**
 * Main classification function for Köppen zones
 * 
 * @param {number} pma - Precipitation Mean Annual (mm)
 * @param {number} tma - Temperature Mean Annual (°C)
 * @param {string} zone - Climate zone (e.g., 'B' for arid)
 * @returns {string} Detailed climate classification
 */
function classify(pma, tma, zone = 'B') {
  if (zone === 'B') {
    return classifyBZone(pma, tma);
  }
  
  throw new Error(`Classification for zone ${zone} is not yet implemented`);
}

module.exports = {
  classify,
  classifyBZone
};
