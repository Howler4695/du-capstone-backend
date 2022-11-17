import { idIncrement } from '../utils/tools.js';

describe('tools', () => {
  describe('idIncrement', () => {
    it('should return new Id', () => {
      const ids = ['1', '2', '3', '4'];
      const ids2 = ['1', '2', '4', '3'];
      expect(idIncrement(ids)).toBe('5');
      expect(idIncrement(ids2)).toBe('5');
    });
  });
});
