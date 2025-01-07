import { useState } from 'react';
import { Modal } from '../common/Modal';
import { FiSearch, FiStar } from 'react-icons/fi';

interface Asset {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (symbol: string) => void;
}

const mockAssets: Asset[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 43250.80, change24h: 2.5 },
  { symbol: 'ETH', name: 'Ethereum', price: 2280.45, change24h: -1.2 },
  { symbol: 'SOL', name: 'Solana', price: 98.45, change24h: 5.8 },
  { symbol: 'AVAX', name: 'Avalanche', price: 34.20, change24h: 8.2 },
  { symbol: 'DOT', name: 'Polkadot', price: 6.85, change24h: -0.5 }
];

export const AddAssetModal = ({ isOpen, onClose, onAdd }: AddAssetModalProps): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const filteredAssets = mockAssets.filter(
    asset => 
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    if (selectedAsset) {
      onAdd(selectedAsset);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Asset to Watchlist" maxWidth="md">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-700/50 rounded-lg bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent"
          placeholder="Search by name or symbol..."
        />
      </div>

      {/* Assets List */}
      <div className="mt-4 space-y-2 max-h-[300px] overflow-y-auto">
        {filteredAssets.map((asset) => (
          <div
            key={asset.symbol}
            onClick={() => setSelectedAsset(asset.symbol)}
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
              selectedAsset === asset.symbol
                ? 'bg-primary-500/20 border-primary-500/30'
                : 'bg-gray-800/30 border-gray-700/30 hover:bg-gray-800/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-300">{asset.symbol}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-200">{asset.name}</p>
                <p className="text-xs text-gray-400">{asset.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-200">${asset.price.toLocaleString()}</p>
              <p className={`text-xs ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg text-gray-300 hover:text-gray-200 hover:bg-gray-800/50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleAdd}
          disabled={!selectedAsset}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            selectedAsset
              ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30 hover:bg-primary-500/30'
              : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 cursor-not-allowed'
          }`}
        >
          <FiStar className="w-4 h-4" />
          <span>Add to Watchlist</span>
        </button>
      </div>
    </Modal>
  );
}; 