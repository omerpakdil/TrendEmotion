import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiBarChart2, FiTrendingUp, FiActivity, FiPieChart, FiCalendar, FiGlobe } from 'react-icons/fi';

interface AnalysisData {
  symbol: string;
  name: string;
  timeframe: string;
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
  };
  correlation: {
    price: number;
    volume: number;
    social: number;
  };
  performance: {
    roi: number;
    accuracy: number;
    signals: number;
  };
}

interface SectorAnalysis {
  name: string;
  sentiment: number;
  change: number;
  assets: number;
  topAsset: {
    symbol: string;
    sentiment: number;
  };
}

// Mock data
const mockAnalysisData: AnalysisData = {
  symbol: 'BTC',
  name: 'Bitcoin',
  timeframe: '30d',
  sentiment: {
    positive: 65,
    negative: 15,
    neutral: 20
  },
  correlation: {
    price: 0.82,
    volume: 0.65,
    social: 0.78
  },
  performance: {
    roi: 12.5,
    accuracy: 78,
    signals: 45
  }
};

const mockSectors: SectorAnalysis[] = [
  {
    name: 'DeFi',
    sentiment: 72,
    change: 5.2,
    assets: 12,
    topAsset: { symbol: 'UNI', sentiment: 78 }
  },
  {
    name: 'Layer 1',
    sentiment: 68,
    change: -2.1,
    assets: 8,
    topAsset: { symbol: 'ETH', sentiment: 75 }
  },
  {
    name: 'Gaming',
    sentiment: 82,
    change: 8.4,
    assets: 15,
    topAsset: { symbol: 'AXS', sentiment: 85 }
  }
];

export const Analysis = (): JSX.Element => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d' | '90d'>('30d');

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">
              Market Analysis
            </h1>
            <p className="mt-1 text-gray-400">
              Analyze market sentiment and performance metrics
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-2">
            {(['24h', '7d', '30d', '90d'] as const).map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedTimeframe === timeframe
                    ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                    : 'text-gray-400 hover:text-gray-300 border border-gray-700/30 hover:border-gray-700/50'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: FiBarChart2, label: 'Sentiment Score', value: '78%', change: 5.2 },
            { icon: FiTrendingUp, label: 'Signal Accuracy', value: '82%', change: 3.1 },
            { icon: FiActivity, label: 'Active Signals', value: '45', change: -2.5 },
            { icon: FiPieChart, label: 'ROI from Signals', value: '12.5%', change: 8.4 }
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
                {stat.change && (
                  <div className={`text-sm font-medium ${stat.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change >= 0 ? '+' : ''}{stat.change}%
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Sentiment Analysis Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/20 p-6"
          >
            <h2 className="text-lg font-medium text-gray-200">Sentiment Distribution</h2>
            <div className="mt-6">
              <div className="relative pt-1">
                <div className="flex h-4 overflow-hidden rounded-full bg-gray-700/50">
                  <div
                    className="bg-green-500/70 transition-all duration-500"
                    style={{ width: `${mockAnalysisData.sentiment.positive}%` }}
                  />
                  <div
                    className="bg-red-500/70 transition-all duration-500"
                    style={{ width: `${mockAnalysisData.sentiment.negative}%` }}
                  />
                  <div
                    className="bg-gray-500/70 transition-all duration-500"
                    style={{ width: `${mockAnalysisData.sentiment.neutral}%` }}
                  />
                </div>
                <div className="mt-4 flex justify-between text-xs text-gray-400">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500/70 mr-2" />
                    <span>Positive ({mockAnalysisData.sentiment.positive}%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/70 mr-2" />
                    <span>Negative ({mockAnalysisData.sentiment.negative}%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-500/70 mr-2" />
                    <span>Neutral ({mockAnalysisData.sentiment.neutral}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Correlation Analysis Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/20 p-6"
          >
            <h2 className="text-lg font-medium text-gray-200">Correlation Analysis</h2>
            <div className="mt-6 space-y-4">
              {Object.entries(mockAnalysisData.correlation).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
                      <FiActivity className="w-4 h-4 text-primary-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-300 capitalize">{key} Correlation</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                        style={{ width: `${value * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-primary-400">{(value * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sector Analysis Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/20 p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-200">Sector Analysis</h2>
              <button className="p-1.5 rounded-lg bg-primary-500/10 text-primary-400">
                <FiGlobe className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {mockSectors.map((sector) => (
                <div key={sector.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-300">{sector.topAsset.symbol}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-200">{sector.name}</p>
                      <p className="text-xs text-gray-400">{sector.assets} assets</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary-400">{sector.sentiment}%</p>
                    <p className={`text-xs ${sector.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {sector.change >= 0 ? '+' : ''}{sector.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Metrics Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/20 p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-200">Performance Metrics</h2>
              <button className="p-1.5 rounded-lg bg-primary-500/10 text-primary-400">
                <FiCalendar className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {Object.entries(mockAnalysisData.performance).map(([key, value]) => (
                <div key={key} className="p-4 rounded-lg bg-gray-800/30">
                  <p className="text-sm text-gray-400 capitalize">{key}</p>
                  <p className="mt-1 text-lg font-medium text-primary-400">
                    {typeof value === 'number' ? (key === 'roi' ? `${value}%` : value) : value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}; 