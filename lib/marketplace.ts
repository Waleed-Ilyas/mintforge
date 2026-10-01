export type MintConfig = {
  basePrice: number;
  royaltyBps: number;
  totalSupply: number;
  mintCount: number;
  feePercent: number;
};

export function calculateMintCost({ basePrice, royaltyBps, totalSupply, mintCount, feePercent }: MintConfig) {
  const royalty = (basePrice * royaltyBps) / 10000;
  const fee = ((basePrice + royalty) * feePercent) / 100;
  const unitCost = basePrice + royalty + fee;
  const totalCost = unitCost * mintCount;

  return {
    unitCost,
    totalCost,
    fee,
    royalty,
    fillRate: Math.min(100, (mintCount / totalSupply) * 100),
    listingPrice: basePrice * 1.12,
  };
}

export function formatToken(value: number, digits = 2) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function scanCollectionHealth(minted: number, totalSupply: number) {
  const ratio = minted / totalSupply;
  return {
    ratio,
    status: ratio > 0.75 ? 'Hot' : ratio > 0.45 ? 'Trending' : 'Early',
    confidence: Math.min(100, Math.round((1 - ratio) * 100 + 45)),
  };
}
