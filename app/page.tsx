import { calculateMintCost, formatToken, scanCollectionHealth } from '@/lib/marketplace';

const drops = [
  { name: 'Pixel Chrome', minted: 120, total: 300, price: 1.2 },
  { name: 'Waveform', minted: 195, total: 300, price: 1.5 },
  { name: 'Glass Bloom', minted: 90, total: 240, price: 1.1 },
];

const launch = calculateMintCost({
  basePrice: 1.2,
  royaltyBps: 250,
  totalSupply: 888,
  mintCount: 8,
  feePercent: 2.5,
});

export default function Page() {
  const collectionState = scanCollectionHealth(210, 300);

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-dot" />
          <span>MintForge</span>
        </div>

        <div className="mini-actions" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="pill">Devnet only</button>
          <button className="primary">Mint collection</button>
        </div>
      </header>

      <section className="hero">
        <div className="card">
          <div className="kicker">Metaplex collection launch</div>
          <h1>Build a collection and mint with clear permission paths.</h1>
          <p className="subtitle">
            MintForge is a devnet-only NFT collection designer. It models collection sizing, mint pricing, creator royalties, and marketplace conditions before a real Metaplex program is deployed.
          </p>

          <div className="hero-actions">
            <button className="primary">Begin mint</button>
            <button className="ghost">View collection health</button>
          </div>
        </div>

        <div className="card">
          <div className="meta">Launch estimate</div>
          <div className="stat-value">{formatToken(launch.totalCost)} SOL</div>
          <p className="note">8 mint batches × {formatToken(launch.unitCost)} SOL each including royalties and marketplace fee.</p>
          <div className="progress">
            <span style={{ width: `${collectionState.confidence}%` }} />
          </div>
          <p className="note">Collection confidence: {collectionState.confidence}% · {collectionState.status}</p>
        </div>
      </section>

      <section className="stats">
        {[
          { label: 'Collection size', value: '888', note: 'max supply' },
          { label: 'Royalty', value: '2.5%', note: 'creator cut' },
          { label: 'Avg mint', value: `${formatToken(launch.unitCost)} SOL`, note: 'with fee' },
          { label: 'Hotness', value: collectionState.status, note: 'market signal' },
        ].map((stat) => (
          <div key={stat.label} className="card">
            <div className="meta">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
            <p className="note">{stat.note}</p>
          </div>
        ))}
      </section>

      <section className="grid">
        <div className="card">
          <div className="meta">Drops</div>
          <table className="table">
            <thead>
              <tr>
                <th>Collection</th>
                <th>Minted</th>
                <th>Avg price</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {drops.map((drop) => {
                const health = scanCollectionHealth(drop.minted, drop.total);
                return (
                  <tr key={drop.name}>
                    <td>{drop.name}</td>
                    <td>{drop.minted}/{drop.total}</td>
                    <td>{formatToken(drop.price)} SOL</td>
                    <td>
                      <span className={`badge ${health.status.toLowerCase()}`}>
                        {health.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <aside className="card">
          <div className="meta">Launch constraints</div>
          <p className="note">
            This project explicitly avoids claiming a live marketplace deployment without an audited Metaplex Core flow, devnet wallet validation, and confirmed metadata hosting.
          </p>
          <p className="note">
            The real next step is a verified collection mint with Irys uploads, token metadata checks, and wallet-based buy/sell logic on devnet only.
          </p>
        </aside>
      </section>
    </main>
  );
}
