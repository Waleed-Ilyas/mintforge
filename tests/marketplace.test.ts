import { describe, expect, it } from 'vitest';
import { calculateMintCost, formatToken, scanCollectionHealth } from '@/lib/marketplace';

describe('MintForge marketplace math', () => {
  it('calculates the mint cost with royalties and fees', () => {
    const result = calculateMintCost({
      basePrice: 1.2,
      royaltyBps: 250,
      totalSupply: 888,
      mintCount: 8,
      feePercent: 2.5,
    });

    expect(result.unitCost).toBeCloseTo(1.26, 2);
    expect(result.totalCost).toBeCloseTo(10.09, 2);
    expect(result.fillRate).toBeCloseTo(0.9, 2);
  });

  it('formats token values', () => {
    expect(formatToken(12.5)).toBe('12.50');
    expect(formatToken(42, 0)).toBe('42');
  });

  it('assigns collection health states correctly', () => {
    expect(scanCollectionHealth(200, 300).status).toBe('Trending');
    expect(scanCollectionHealth(100, 300).status).toBe('Early');
    expect(scanCollectionHealth(20, 300).status).toBe('Early');
  });
});
