const { classify, classifyBZone } = require('./index');

describe('Köppen Climate Classification - B Zone', () => {
  describe('classifyBZone', () => {
    test('should classify as BS when PMA > TMA * 12', () => {
      // PMA = 300mm, TMA = 20°C
      // Threshold = 20 * 12 = 240mm
      // 300 > 240, so it should be BS (steppe)
      expect(classifyBZone(300, 20)).toBe('BS');
    });

    test('should classify as BW when PMA < TMA * 12', () => {
      // PMA = 200mm, TMA = 20°C
      // Threshold = 20 * 12 = 240mm
      // 200 < 240, so it should be BW (desert)
      expect(classifyBZone(200, 20)).toBe('BW');
    });

    test('should classify as BS when PMA equals TMA * 12', () => {
      // PMA = 240mm, TMA = 20°C
      // Threshold = 20 * 12 = 240mm
      // 240 == 240, edge case - we classify as BS
      expect(classifyBZone(240, 20)).toBe('BS');
    });

    test('should work with different temperature values', () => {
      // PMA = 360mm, TMA = 25°C
      // Threshold = 25 * 12 = 300mm
      // 360 > 300, so it should be BS
      expect(classifyBZone(360, 25)).toBe('BS');

      // PMA = 250mm, TMA = 25°C
      // Threshold = 25 * 12 = 300mm
      // 250 < 300, so it should be BW
      expect(classifyBZone(250, 25)).toBe('BW');
    });

    test('should work with low temperature values', () => {
      // PMA = 100mm, TMA = 10°C
      // Threshold = 10 * 12 = 120mm
      // 100 < 120, so it should be BW
      expect(classifyBZone(100, 10)).toBe('BW');

      // PMA = 150mm, TMA = 10°C
      // Threshold = 10 * 12 = 120mm
      // 150 > 120, so it should be BS
      expect(classifyBZone(150, 10)).toBe('BS');
    });

    test('should work with very low precipitation (typical desert)', () => {
      // PMA = 50mm, TMA = 22°C
      // Threshold = 22 * 12 = 264mm
      // 50 < 264, so it should be BW
      expect(classifyBZone(50, 22)).toBe('BW');
    });

    test('should work with moderate precipitation (typical steppe)', () => {
      // PMA = 400mm, TMA = 18°C
      // Threshold = 18 * 12 = 216mm
      // 400 > 216, so it should be BS
      expect(classifyBZone(400, 18)).toBe('BS');
    });
  });

  describe('classify', () => {
    test('should classify B zone correctly', () => {
      expect(classify(300, 20, 'B')).toBe('BS');
      expect(classify(200, 20, 'B')).toBe('BW');
    });

    test('should use B zone as default', () => {
      expect(classify(300, 20)).toBe('BS');
      expect(classify(200, 20)).toBe('BW');
    });

    test('should throw error for unimplemented zones', () => {
      expect(() => classify(1000, 15, 'A')).toThrow('Classification for zone A is not yet implemented');
      expect(() => classify(500, 10, 'C')).toThrow('Classification for zone C is not yet implemented');
    });
  });
});
