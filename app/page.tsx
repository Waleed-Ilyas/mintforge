'use client';

import { useState } from 'react';

function calculateMintCost(params: { basePrice: number, royaltyBps: number, totalSupply: number, mintCount: number, feePercent: number }) {
  const royaltyAmount = params.basePrice * (params.royaltyBps / 10000);
  const feeAmount = params.basePrice * (params.feePercent / 100);
  const unitCost = params.basePrice + royaltyAmount + feeAmount;
  return {
    unitCost,
    totalCost: unitCost * params.mintCount,
    royaltyAmount,
    feeAmount
  };
}

function scanCollectionHealth(minted: number, total: number) {
  const confidence = Math.round((minted / total) * 100);
  let status = 'Good';
  if (confidence < 30) status = 'Slow';
  if (confidence > 80) status = 'Hot';
  return { confidence, status };
}

export default function Page() {
  const [supply, setSupply] = useState(888);
  const [price, setPrice] = useState(1.2);
  const [royalty, setRoyalty] = useState(250);
  const [mints, setMints] = useState(8);
  const [isMinting, setIsMinting] = useState(false);
  const [txSig, setTxSig] = useState('');

  const launch = calculateMintCost({
    basePrice: price,
    royaltyBps: royalty,
    totalSupply: supply,
    mintCount: mints,
    feePercent: 2.5,
  });

  const collectionState = scanCollectionHealth(210, supply);

  const handleMint = async () => {
    setIsMinting(true);
    setTxSig('');
    // Simulate transaction
    await new Promise(r => setTimeout(r, 2000));
    setTxSig('3x' + Math.random().toString(36).substring(2, 15) + '...devnet');
    setIsMinting(false);
  };

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-dot" />
          <span>MintForge</span>
        </div>

        <div className="mini-actions" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: '4px 8px', borderRadius: 4 }}>Devnet Only</span>
          <button className="primary" onClick={handleMint} disabled={isMinting}>
            {isMinting ? 'Confirming...' : 'Mint Collection'}
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="card">
          <div className="kicker">Collection Designer</div>
          <h1>Design and mint NFTs on Solana Devnet</h1>
          
          <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8, color: '#94a3b8' }}>
                <span>Total Supply</span>
                <span>{supply} NFTs</span>
              </label>
              <input type="range" min="10" max="10000" value={supply} onChange={e => setSupply(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8, color: '#94a3b8' }}>
                <span>Base Price (SOL)</span>
                <span>{price.toFixed(2)} SOL</span>
              </label>
              <input type="range" min="0.1" max="10" step="0.1" value={price} onChange={e => setPrice(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8, color: '#94a3b8' }}>
                <span>Creator Royalty (BPS)</span>
                <span>{royalty} bps ({(royalty/100).toFixed(1)}%)</span>
              </label>
              <input type="range" min="0" max="1000" step="50" value={royalty} onChange={e => setRoyalty(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8, color: '#94a3b8' }}>
                <span>Batch Mint Count</span>
                <span>{mints} NFTs</span>
              </label>
              <input type="range" min="1" max="20" value={mints} onChange={e => setMints(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
          </div>
          
          {txSig && (
            <div style={{ marginTop: 20, padding: 12, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: 8, fontSize: 13, border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <strong>Success!</strong> Mint confirmed. <br/>Signature: {txSig}
            </div>
          )}
        </div>

        <div className="card">
          <div className="meta">Cost Estimator</div>
          <div className="stat-value">{launch.totalCost.toFixed(3)} SOL</div>
          <p className="note">For {mints} mints at {launch.unitCost.toFixed(3)} SOL each (includes {launch.royaltyAmount.toFixed(3)} royalty + {launch.feeAmount.toFixed(3)} marketplace fee).</p>
          
          <div style={{ marginTop: 32 }}>
            <div className="meta">Collection Health Check</div>
            <div className="progress">
              <span style={{ width: collectionState.confidence + '%', background: collectionState.status === 'Hot' ? '#ef4444' : (collectionState.status === 'Good' ? '#10b981' : '#f59e0b') }} />
            </div>
            <p className="note">Confidence: {collectionState.confidence}% &mdash; Status: {collectionState.status}</p>
          </div>
        </div>
      </section>

      <section className="stats">
        {[
          { label: 'Collection size', value: supply, note: 'max supply' },
          { label: 'Royalty', value: (royalty/100).toFixed(1) + '%', note: 'creator cut' },
          { label: 'Avg mint', value: launch.unitCost.toFixed(3) + ' SOL', note: 'with fee' },
          { label: 'Market Signal', value: collectionState.status, note: 'health check' },
        ].map((stat) => (
          <div key={stat.label} className="card">
            <div className="meta">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
            <p className="note">{stat.note}</p>
          </div>
        ))}
      </section>
      
      <section style={{ marginTop: 32 }} className="card">
         <h3 style={{ margin: '0 0 12px 0', fontSize: 16 }}>About this project</h3>
         <p className="note">MintForge is a Devnet-only Metaplex Core (Umi) collection designer and cost estimator. It demonstrates React state management, complex financial modeling, and mock Web3 transaction flows on the Solana blockchain. Built for educational and portfolio purposes.</p>
         <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            <a href="https://github.com/Waleed-Ilyas/mintforge" target="_blank" rel="noreferrer" style={{ color: '#38bdf8', fontSize: 13, textDecoration: 'none' }}>View on GitHub</a>
            <a href="/work/mintforge" target="_blank" rel="noreferrer" style={{ color: '#38bdf8', fontSize: 13, textDecoration: 'none' }}>Read Case Study</a>
         </div>
      </section>
    </main>
  );
}
