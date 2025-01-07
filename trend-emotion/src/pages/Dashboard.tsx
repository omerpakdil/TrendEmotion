import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiTwitter, FiMessageCircle, FiTrendingUp, FiAlertCircle, FiBarChart2, FiGlobe } from 'react-icons/fi';

// Types for sentiment data
interface SentimentData {
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

interface AssetSentiment {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  sentiment: SentimentData;
  riskScore: number;
  trendStrength: number;
}

interface NewsItem {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impact: number;
}

interface SocialTrend {
  platform: string;
  hashtag: string;
  mentions: number;
  sentiment: number;
  change: number;
}

// Add new interfaces for watchlist and trending
interface WatchlistItem extends AssetSentiment {
  addedAt: string;
  alertThreshold: number;
  notifications: boolean;
}

interface TrendingItem extends AssetSentiment {
  rank: number;
  volumeChange: number;
  socialScore: number;
}

// Temporary mock data
const mockSentimentData: AssetSentiment[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 43250.80,
    change24h: 2.5,
    sentiment: {
      positive: 65,
      negative: 15,
      neutral: 20,
      total: 100
    },
    riskScore: 72,
    trendStrength: 85
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2280.45,
    change24h: -1.2,
    sentiment: {
      positive: 58,
      negative: 22,
      neutral: 20,
      total: 100
    },
    riskScore: 65,
    trendStrength: 78
  }
];

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Bitcoin Surges Past $43K as Market Sentiment Improves',
    source: 'CryptoNews',
    timestamp: '2 hours ago',
    sentiment: 'positive',
    impact: 85
  },
  {
    id: '2',
    title: 'Ethereum Layer 2 Solutions Show Promising Growth',
    source: 'BlockchainDaily',
    timestamp: '4 hours ago',
    sentiment: 'positive',
    impact: 72
  },
  {
    id: '3',
    title: 'Market Volatility Concerns as Trading Volume Decreases',
    source: 'TradingView',
    timestamp: '6 hours ago',
    sentiment: 'negative',
    impact: 65
  }
];

const mockSocialTrends: SocialTrend[] = [
  {
    platform: 'Twitter',
    hashtag: '#Bitcoin',
    mentions: 125000,
    sentiment: 78,
    change: 12.5
  },
  {
    platform: 'Reddit',
    hashtag: 'r/cryptocurrency',
    mentions: 45000,
    sentiment: 82,
    change: 8.3
  },
  {
    platform: 'Twitter',
    hashtag: '#Ethereum',
    mentions: 85000,
    sentiment: 75,
    change: -3.2
  }
];

// Add mock data for new sections
const mockWatchlist: WatchlistItem[] = [
  {
    ...mockSentimentData[0],
    addedAt: '2024-01-15',
    alertThreshold: 5,
    notifications: true
  },
  {
    ...mockSentimentData[1],
    addedAt: '2024-01-14',
    alertThreshold: 3,
    notifications: false
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 98.45,
    change24h: 5.8,
    sentiment: {
      positive: 72,
      negative: 12,
      neutral: 16,
      total: 100
    },
    riskScore: 68,
    trendStrength: 82,
    addedAt: '2024-01-13',
    alertThreshold: 4,
    notifications: true
  }
];

const mockTrending: TrendingItem[] = [
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 98.45,
    change24h: 5.8,
    sentiment: {
      positive: 72,
      negative: 12,
      neutral: 16,
      total: 100
    },
    riskScore: 68,
    trendStrength: 82,
    rank: 1,
    volumeChange: 125.4,
    socialScore: 92
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 34.20,
    change24h: 8.2,
    sentiment: {
      positive: 68,
      negative: 18,
      neutral: 14,
      total: 100
    },
    riskScore: 71,
    trendStrength: 79,
    rank: 2,
    volumeChange: 95.2,
    socialScore: 88
  },
  {
    ...mockSentimentData[0],
    rank: 3,
    volumeChange: 45.8,
    socialScore: 85
  }
];

export function Dashboard(): JSX.Element {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'watchlist' | 'trending'>('overview');

  const renderOverviewTab = () => (
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Sentiment Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/20 p-6"
      >
        <h2 className="text-lg font-medium text-gray-200">{t('dashboard.overview.marketSentiment')}</h2>
        <div className="mt-6 grid grid-cols-3 gap-6">
          {mockSentimentData.slice(0, 3).map((asset) => (
            <div key={asset.symbol} className="text-center">
              <div className="relative inline-flex">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-400/20 rounded-full blur-sm"></div>
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 border border-gray-700/50">
                  <span className="text-2xl font-bold text-primary-400">{asset.sentiment.positive}%</span>
                </div>
              </div>
              <p className="mt-2 text-sm font-medium text-gray-300">{asset.symbol}</p>
              <p className={`text-xs ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Risk Analysis Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/20 p-6"
      >
        <h2 className="text-lg font-medium text-gray-200">{t('dashboard.overview.riskAnalysis')}</h2>
        <div className="mt-6 space-y-4">
          {mockSentimentData.slice(0, 2).map((asset) => (
            <div key={asset.symbol} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-300">{asset.symbol}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">{asset.name}</p>
                  <div className="mt-1 flex items-center space-x-2">
                    <div className="flex-1 h-1.5 w-32 bg-gray-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                        style={{ width: `${asset.riskScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400">{asset.riskScore}%</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-300">${asset.price.toLocaleString()}</p>
                <p className={`text-xs ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* News and Impact Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/20 p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-200">{t('dashboard.overview.marketNews')}</h2>
          <button className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
            {t('common.viewAll')}
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {mockNews.map((news) => (
            <div key={news.id} className="flex items-start space-x-4">
              <div className={`mt-1 w-2 h-2 rounded-full ${
                news.sentiment === 'positive' ? 'bg-green-400' :
                news.sentiment === 'negative' ? 'bg-red-400' : 'bg-gray-400'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-300">{news.title}</p>
                <div className="mt-1 flex items-center space-x-2 text-xs text-gray-400">
                  <span>{news.source}</span>
                  <span>•</span>
                  <span>{news.timestamp}</span>
                  <span>•</span>
                  <span>{t('dashboard.overview.impact')}: {news.impact}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Social Media Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/20 p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-200">{t('dashboard.overview.socialTrends')}</h2>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 rounded-lg bg-primary-500/10 text-primary-400">
              <FiTwitter className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-lg bg-primary-500/10 text-primary-400">
              <FiGlobe className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {mockSocialTrends.map((trend, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
                  {trend.platform === 'Twitter' ? (
                    <FiTwitter className="w-4 h-4 text-primary-400" />
                  ) : (
                    <FiGlobe className="w-4 h-4 text-primary-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">{trend.hashtag}</p>
                  <p className="text-xs text-gray-400">{trend.mentions.toLocaleString()} {t('dashboard.overview.mentions')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-300">{trend.sentiment}%</p>
                <p className={`text-xs ${trend.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {trend.change >= 0 ? '+' : ''}{trend.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Trend Strength Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="lg:col-span-2 bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/20 p-6"
      >
        <h2 className="text-lg font-medium text-gray-200">{t('dashboard.overview.trendStrength')}</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockSentimentData.map((asset) => (
            <div key={asset.symbol} className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
                <span className="text-lg font-medium text-gray-300">{asset.symbol}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-300">{asset.name}</p>
                  <span className="text-sm text-primary-400">{asset.trendStrength}%</span>
                </div>
                <div className="mt-2 h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500"
                    style={{ width: `${asset.trendStrength}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderWatchlistTab = () => (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-200">{t('dashboard.watchlist.title')}</h2>
        <button className="px-4 py-2 rounded-lg bg-primary-500/20 text-primary-300 border border-primary-500/30 hover:bg-primary-500/30 transition-colors">
          {t('dashboard.watchlist.addAsset')}
        </button>
      </div>
      <div className="grid gap-4">
        {mockWatchlist.map((item) => (
          <motion.div
            key={item.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/20 backdrop-blur-xl rounded-xl border border-gray-700/20 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-300">{item.symbol}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-base font-medium text-gray-200">{item.name}</p>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-300">
                      {t('dashboard.watchlist.addedOn')}: {item.alertThreshold}%
                    </span>
                  </div>
                  <div className="mt-1 flex items-center space-x-4">
                    <p className="text-sm text-gray-400">{t('dashboard.watchlist.addedOn')} {item.addedAt}</p>
                    <div className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      <span className="text-sm text-gray-400">
                        {t(item.notifications ? 'dashboard.watchlist.notificationsOn' : 'dashboard.watchlist.notificationsOff')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-200">${item.price.toLocaleString()}</p>
                <p className={`text-sm font-medium ${item.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change24h >= 0 ? '+' : ''}{item.change24h}%
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-gray-800/30">
                <p className="text-sm text-gray-400">{t('dashboard.watchlist.metrics.sentiment')}</p>
                <p className="mt-1 text-lg font-medium text-primary-400">{item.sentiment.positive}%</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-800/30">
                <p className="text-sm text-gray-400">{t('dashboard.watchlist.metrics.riskScore')}</p>
                <p className="mt-1 text-lg font-medium text-primary-400">{item.riskScore}%</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-800/30">
                <p className="text-sm text-gray-400">{t('dashboard.watchlist.metrics.trend')}</p>
                <p className="mt-1 text-lg font-medium text-primary-400">{item.trendStrength}%</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderTrendingTab = () => (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-200">{t('dashboard.trending.title')}</h2>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-800/70 transition-colors">
            {t('dashboard.trending.timeframes.24h')}
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-800/70 transition-colors">
            {t('dashboard.trending.timeframes.7d')}
          </button>
        </div>
      </div>
      <div className="grid gap-4">
        {mockTrending.map((item) => (
          <motion.div
            key={item.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/20 backdrop-blur-xl rounded-xl border border-gray-700/20 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 font-bold">
                  #{item.rank}
                </div>
                <div className="w-12 h-12 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-300">{item.symbol}</span>
                </div>
                <div>
                  <p className="text-base font-medium text-gray-200">{item.name}</p>
                  <div className="mt-1 flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-400">{t('dashboard.trending.metrics.volume')}:</span>
                      <span className={`text-sm font-medium ${item.volumeChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {item.volumeChange >= 0 ? '+' : ''}{item.volumeChange}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-400">{t('dashboard.trending.metrics.social')}:</span>
                      <span className="text-sm font-medium text-primary-400">{item.socialScore}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-200">${item.price.toLocaleString()}</p>
                <p className={`text-sm font-medium ${item.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change24h >= 0 ? '+' : ''}{item.change24h}%
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500"
                  style={{ width: `${item.trendStrength}%` }}
                ></div>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                <span>{t('dashboard.trending.metrics.trendStrength')}</span>
                <span>{item.trendStrength}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">
              {t('dashboard.welcome', { name: user?.name })}
            </h1>
            <p className="mt-1 text-gray-400">
              {t('dashboard.subtitle')}
            </p>
          </motion.div>

          <div className="mt-4 md:mt-0 flex space-x-2">
            {(['1h', '24h', '7d', '30d'] as const).map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedTimeframe === timeframe
                    ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                    : 'text-gray-400 hover:text-gray-300 border border-gray-700/30 hover:border-gray-700/50'
                }`}
              >
                {t(`common.timeframes.${timeframe}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        {selectedTab === 'overview' && (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: FiBarChart2, label: t('dashboard.stats.marketCap'), value: '$892.4B', change: 2.5 },
              { icon: FiTrendingUp, label: t('dashboard.stats.volume'), value: '$42.1B', change: -1.2 },
              { icon: FiMessageCircle, label: t('dashboard.stats.socialMentions'), value: '245K', change: 15.8 },
              { icon: FiAlertCircle, label: t('dashboard.stats.riskLevel'), value: t('dashboard.stats.moderate'), change: null }
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
        )}

        {/* Tabs */}
        <div className="mt-8 border-b border-gray-700/50">
          <nav className="-mb-px flex space-x-8">
            {(['overview', 'watchlist', 'trending'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  selectedTab === tab
                    ? 'border-primary-500 text-primary-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                }`}
              >
                {t(`dashboard.tabs.${tab}`)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && renderOverviewTab()}
        {selectedTab === 'watchlist' && renderWatchlistTab()}
        {selectedTab === 'trending' && renderTrendingTab()}
      </div>
    </div>
  );
} 