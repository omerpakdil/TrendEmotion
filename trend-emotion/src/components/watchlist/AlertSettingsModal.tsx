import { useState } from 'react';
import { Modal } from '../common/Modal';
import { FiDollarSign, FiTrendingUp, FiBarChart2, FiPercent } from 'react-icons/fi';

interface AlertSettings {
  price: {
    above: number | null;
    below: number | null;
  };
  sentiment: {
    above: number | null;
    below: number | null;
  };
  volume: {
    above: number | null;
    below: number | null;
  };
  enabled: boolean;
}

interface AlertSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: {
    symbol: string;
    name: string;
    price: number;
    sentiment: {
      score: number;
    };
    volume24h: number;
  };
  currentSettings: AlertSettings;
  onSave: (settings: AlertSettings) => void;
}

export const AlertSettingsModal = ({
  isOpen,
  onClose,
  asset,
  currentSettings,
  onSave
}: AlertSettingsModalProps): JSX.Element => {
  const [settings, setSettings] = useState<AlertSettings>(currentSettings);
  const [activeTab, setActiveTab] = useState<'price' | 'sentiment' | 'volume'>('price');

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const renderPriceTab = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Alert when price goes above</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiDollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            value={settings.price.above || ''}
            onChange={(e) => setSettings({
              ...settings,
              price: {
                ...settings.price,
                above: e.target.value ? Number(e.target.value) : null
              }
            })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-700/50 rounded-lg bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent"
            placeholder={`Current: $${asset.price.toLocaleString()}`}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Alert when price goes below</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiDollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            value={settings.price.below || ''}
            onChange={(e) => setSettings({
              ...settings,
              price: {
                ...settings.price,
                below: e.target.value ? Number(e.target.value) : null
              }
            })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-700/50 rounded-lg bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent"
            placeholder={`Current: $${asset.price.toLocaleString()}`}
          />
        </div>
      </div>
    </div>
  );

  const renderSentimentTab = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Alert when sentiment goes above</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiPercent className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            min="0"
            max="100"
            value={settings.sentiment.above || ''}
            onChange={(e) => setSettings({
              ...settings,
              sentiment: {
                ...settings.sentiment,
                above: e.target.value ? Number(e.target.value) : null
              }
            })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-700/50 rounded-lg bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent"
            placeholder={`Current: ${asset.sentiment.score}%`}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Alert when sentiment goes below</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiPercent className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            min="0"
            max="100"
            value={settings.sentiment.below || ''}
            onChange={(e) => setSettings({
              ...settings,
              sentiment: {
                ...settings.sentiment,
                below: e.target.value ? Number(e.target.value) : null
              }
            })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-700/50 rounded-lg bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent"
            placeholder={`Current: ${asset.sentiment.score}%`}
          />
        </div>
      </div>
    </div>
  );

  const renderVolumeTab = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Alert when volume goes above</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiBarChart2 className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            value={settings.volume.above || ''}
            onChange={(e) => setSettings({
              ...settings,
              volume: {
                ...settings.volume,
                above: e.target.value ? Number(e.target.value) : null
              }
            })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-700/50 rounded-lg bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent"
            placeholder={`Current: $${(asset.volume24h / 1e9).toFixed(1)}B`}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Alert when volume goes below</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiBarChart2 className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            value={settings.volume.below || ''}
            onChange={(e) => setSettings({
              ...settings,
              volume: {
                ...settings.volume,
                below: e.target.value ? Number(e.target.value) : null
              }
            })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-700/50 rounded-lg bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent"
            placeholder={`Current: $${(asset.volume24h / 1e9).toFixed(1)}B`}
          />
        </div>
      </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Alert Settings - ${asset.symbol}`} maxWidth="md">
      {/* Asset Info */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
          <span className="text-lg font-medium text-gray-300">{asset.symbol}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-200">{asset.name}</p>
          <p className="text-xs text-gray-400">Configure price, sentiment, and volume alerts</p>
        </div>
      </div>

      {/* Alert Tabs */}
      <div className="flex space-x-4 mb-6">
        {[
          { id: 'price' as const, icon: FiDollarSign, label: 'Price' },
          { id: 'sentiment' as const, icon: FiTrendingUp, label: 'Sentiment' },
          { id: 'volume' as const, icon: FiBarChart2, label: 'Volume' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                : 'text-gray-400 hover:text-gray-300 border border-gray-700/30 hover:border-gray-700/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'price' && renderPriceTab()}
      {activeTab === 'sentiment' && renderSentimentTab()}
      {activeTab === 'volume' && renderVolumeTab()}

      {/* Enable/Disable Alerts */}
      <div className="mt-6 flex items-center justify-between py-3 px-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
        <div>
          <p className="text-sm font-medium text-gray-200">Alert Status</p>
          <p className="text-xs text-gray-400">Enable or disable all alerts for this asset</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
        </label>
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
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-primary-500/20 text-primary-300 border border-primary-500/30 hover:bg-primary-500/30 transition-colors"
        >
          Save Settings
        </button>
      </div>
    </Modal>
  );
}; 