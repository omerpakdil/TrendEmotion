import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiPlus, FiBell, FiSettings, FiTrendingUp, FiBarChart2, FiDollarSign } from 'react-icons/fi';
import { AddAssetModal } from '../components/watchlist/AddAssetModal';
import { AlertSettingsModal } from '../components/watchlist/AlertSettingsModal';

interface WatchlistAsset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  sentiment: {
    score: number;
    change: number;
  };
  alerts: {
    price: number | null;
    sentiment: number | null;
    volume: number | null;
    enabled: boolean;
  };
  addedAt: string;
  lastUpdated: string;
}

// Mock data
const mockWatchlist: WatchlistAsset[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 43250.80,
    change24h: 2.5,
    marketCap: 892400000000,
    volume24h: 42100000000,
    sentiment: {
      score: 75,
      change: 5.2
    },
    alerts: {
      price: 45000,
      sentiment: 70,
      volume: null,
      enabled: true
    },
    addedAt: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-01-20T14:25:00Z'
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2280.45,
    change24h: -1.2,
    marketCap: 274800000000,
    volume24h: 15600000000,
    sentiment: {
      score: 68,
      change: -2.1
    },
    alerts: {
      price: 2500,
      sentiment: 65,
      volume: 20000000000,
      enabled: true
    },
    addedAt: '2024-01-14T15:45:00Z',
    lastUpdated: '2024-01-20T14:25:00Z'
  }
];

export const Watchlist = (): JSX.Element => {
  const [showAddAsset, setShowAddAsset] = useState(false);
  const [showAlertSettings, setShowAlertSettings] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<WatchlistAsset | null>(null);

  const handleAddAsset = (symbol: string) => {
    // TODO: Implement add asset functionality
    console.log('Adding asset:', symbol);
  };

  const handleSaveAlertSettings = (settings: any) => {
    // TODO: Implement save alert settings functionality
    console.log('Saving alert settings:', settings);
  };

  const handleOpenAlertSettings = (asset: WatchlistAsset) => {
    setSelectedAsset(asset);
    setShowAlertSettings(true);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">
              Watchlist
            </h1>
            <p className="mt-1 text-gray-400">
              Track and monitor your favorite assets
            </p>
          </div>
          <button
            onClick={() => setShowAddAsset(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-500/20 text-primary-300 border border-primary-500/30 hover:bg-primary-500/30 transition-colors"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add Asset</span>
          </button>
        </div>

        {/* Portfolio Overview */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: FiDollarSign, label: 'Total Value', value: '$12,450.80', change: 3.2 },
            { icon: FiBarChart2, label: 'Assets Tracked', value: '8 Assets', change: null },
            { icon: FiBell, label: 'Active Alerts', value: '12 Alerts', change: null },
            { icon: FiTrendingUp, label: 'Avg. Sentiment', value: '72%', change: 4.5 }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/20 backdrop-blur-xl rounded-xl border border-gray-700/20 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-500/10 rounded-lg">
                    <stat.icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-lg font-semibold text-gray-200">{stat.value}</p>
                  </div>
                </div>
                {stat.change !== null && (
                  <div className={`text-sm font-medium ${stat.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change >= 0 ? '+' : ''}{stat.change}%
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Watchlist Table */}
        <div className="mt-8">
          <div className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/20 overflow-hidden">
            <div className="p-4 border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-200">Your Assets</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 transition-colors">
                    <FiSettings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Asset</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">24h Change</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Sentiment</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Alerts</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {mockWatchlist.map((asset) => (
                    <motion.tr
                      key={asset.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-300">{asset.symbol}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200">{asset.name}</p>
                            <p className="text-xs text-gray-400">Added {new Date(asset.addedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <p className="text-sm font-medium text-gray-200">${asset.price.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">MCap: ${(asset.marketCap / 1e9).toFixed(1)}B</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className={`text-sm font-medium ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="inline-flex flex-col items-end">
                          <div className="text-sm font-medium text-primary-400">{asset.sentiment.score}%</div>
                          <div className={`text-xs ${asset.sentiment.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {asset.sentiment.change >= 0 ? '+' : ''}{asset.sentiment.change}%
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {asset.alerts.price && (
                            <div className="px-2 py-1 rounded-full text-xs font-medium bg-primary-500/10 text-primary-300">
                              ${asset.alerts.price.toLocaleString()}
                            </div>
                          )}
                          {asset.alerts.sentiment && (
                            <div className="px-2 py-1 rounded-full text-xs font-medium bg-primary-500/10 text-primary-300">
                              {asset.alerts.sentiment}%
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 rounded-lg bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 transition-colors">
                            <FiBell className={`w-4 h-4 ${asset.alerts.enabled ? 'text-primary-400' : 'text-gray-400'}`} />
                          </button>
                          <button
                            onClick={() => handleOpenAlertSettings(asset)}
                            className="p-2 rounded-lg bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 transition-colors"
                          >
                            <FiSettings className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Asset Modal */}
      <AddAssetModal
        isOpen={showAddAsset}
        onClose={() => setShowAddAsset(false)}
        onAdd={handleAddAsset}
      />

      {/* Alert Settings Modal */}
      {selectedAsset && (
        <AlertSettingsModal
          isOpen={showAlertSettings}
          onClose={() => setShowAlertSettings(false)}
          asset={{
            symbol: selectedAsset.symbol,
            name: selectedAsset.name,
            price: selectedAsset.price,
            sentiment: {
              score: selectedAsset.sentiment.score
            },
            volume24h: selectedAsset.volume24h
          }}
          currentSettings={{
            price: {
              above: selectedAsset.alerts.price,
              below: null
            },
            sentiment: {
              above: selectedAsset.alerts.sentiment,
              below: null
            },
            volume: {
              above: selectedAsset.alerts.volume,
              below: null
            },
            enabled: selectedAsset.alerts.enabled
          }}
          onSave={handleSaveAlertSettings}
        />
      )}
    </div>
  );
}; 