import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import './App.css';

const App = () => {
  const [latestBlocks, setLatestBlocks] = useState([]);
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const provider = new ethers.providers.JsonRpcProvider("https://eth.llamarpc.com");

  const truncateHash = (hash) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 6)}`;
  };

  const fetchLatestBlocksAndTransactions = async () => {
    try {
      const latestBlockNumber = await provider.getBlockNumber();
      const blockPromises = [];
      const transactionPromises = [];

      for (let i = 0; i < 5; i++) {
        blockPromises.push(provider.getBlock(latestBlockNumber - i));
      }

      const blocks = await Promise.all(blockPromises);
      setLatestBlocks(blocks);

      blocks.forEach(block => {
        transactionPromises.push(provider.getTransaction(block.transactions[0]));
      });

      const transactions = await Promise.all(transactionPromises);
      setLatestTransactions(transactions.filter(tx => tx !== null));

    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please check the console for more details.");
    }
  };

  useEffect(() => {
    fetchLatestBlocksAndTransactions();
  }, []);

  return (
    <>
      <nav>
        <div className="nav-brand">GSCxBT</div>
        <div className="nav-links">
          <a href="#home">Explorer</a>
          <a href="#blockchain">Blockchains</a>
          <a href="#tokens">Tokens</a>
          <a href="#nfts">NFTs</a>
        </div>
      </nav>
      <div className="hero-section">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Search blocks or transactions on GSC20"
        />
        <button onClick={() => alert("Search functionality is not implemented")}>SearchGSCxBT</button>
      </div>
      <div className="app-container">
        <div className="data-sections">
          <section className="panel">
            <h2>Latest GSC20 Blocks</h2>
            <ul>
              {latestBlocks.map((block) => (
                <li key={block.number}>
                  <div className="block-info">
                    <div>
                      <strong>GSC20 Block:</strong> {block.number}<br />
                      <span>{Math.floor((Date.now() / 1000 - block.timestamp))}s ago</span>
                    </div>
                    <div>
                      <strong>{block.transactions.length} txns</strong> in 12 seconds
                    </div>
                    <div>
                      <strong>0.052 ETH</strong>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className="panel">
            <h2>Latest GSC20 Transactions</h2>
            <ul>
              {latestTransactions.map((tx) => (
                <li key={tx.hash}>
                  <div className="tx-info">
                    <div>
                      <strong>{truncateHash(tx.hash)}</strong><br />
                      <span>6s ago</span>
                    </div>
                    <div>
                      <strong>From:</strong> {truncateHash(tx.from)}<br />
                      <strong>To:</strong> {truncateHash(tx.to)}
                    </div>
                    <div>
                      <strong>0.02 ETH</strong>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <footer>
        <div className="footer-section">
          <div className="footer-column">
            <div className="footer-header">
              <span>Powered by LeadTechDeFi LTE7g</span>
            </div>
            <p>GSCxBT is a Block Explorer and Analytics Platform for Crypto-Currency, a decentralized smart contracts platform.</p>
          </div>
          <div className="footer-column">
            <h4>Decentralized Financial OS</h4>
            <ul>
              <li><a href="">About GSCxBT SuperChain</a></li>
              <li><a href="">Brand Assets</a></li>
              <li><a href="">Support & GSC20 Help Center</a></li>
              <li><a href="">Careers & Developers</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>xBTA Community</h4>
            <ul>
              <li><a href="" target="_blank" rel="noopener noreferrer">API Documentation</a></li>
              <li><a href="">Knowledge Base</a></li>
              <li><a href="">Network Status</a></li>
              <li><a href="">Newsletters</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Products & Services</h4>
            <ul>
              <li><a href="">Advertise on GSC20</a></li>
              <li><a href="">Explorer-as-a-Service</a></li>
              <li><a href="">GSCxBT API Plans</a></li>
              <li><a href="">SuperChain Support</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
