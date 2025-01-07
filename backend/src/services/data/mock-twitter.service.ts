import { Tweet } from '../../types/twitter.types';

export class MockTwitterService {
  private mockTweets: Tweet[] = [
    // Pozitif Tweet'ler - Bitcoin
    {
      id: '1',
      text: 'Bitcoin looking very bullish today! Major breakout incoming. #BTC #Crypto',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 145, reply_count: 32, like_count: 378, quote_count: 15 },
      authorId: 'user123'
    },
    {
      id: '2',
      text: 'BTC showing incredible strength! Support level holding strong. Time to accumulate more Bitcoin! 🚀',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 234, reply_count: 56, like_count: 567, quote_count: 23 },
      authorId: 'user456'
    },
    {
      id: '3',
      text: 'Bitcoin adoption growing exponentially! More institutions joining every day. The future is bright for #BTC',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 567, reply_count: 123, like_count: 890, quote_count: 45 },
      authorId: 'user789'
    },

    // Negatif Tweet'ler - Bitcoin
    {
      id: '4',
      text: 'BTC looking weak at these levels. Might see a major correction soon. Be careful! #Bitcoin',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 89, reply_count: 45, like_count: 234, quote_count: 12 },
      authorId: 'user101'
    },
    {
      id: '5',
      text: 'Bitcoin showing bearish signals. Multiple resistance levels ahead. Might be time to take profits.',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 123, reply_count: 67, like_count: 345, quote_count: 21 },
      authorId: 'user202'
    },

    // Pozitif Tweet'ler - Ethereum
    {
      id: '6',
      text: 'Ethereum 2.0 upgrade is revolutionary! ETH showing massive potential for growth. #ETH',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 456, reply_count: 89, like_count: 678, quote_count: 34 },
      authorId: 'user303'
    },
    {
      id: '7',
      text: 'ETH gas fees at historic lows! Perfect time to use the Ethereum network. DeFi season incoming! 🌟',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 345, reply_count: 78, like_count: 567, quote_count: 28 },
      authorId: 'user404'
    },

    // Negatif Tweet'ler - Ethereum
    {
      id: '8',
      text: 'ETH network congestion issues continue. High gas fees making it unusable. Need better solutions.',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 234, reply_count: 89, like_count: 345, quote_count: 23 },
      authorId: 'user505'
    },

    // Pozitif Tweet'ler - Cardano
    {
      id: '9',
      text: 'Cardano smart contracts are game-changing! ADA ecosystem growing rapidly. Great development team! #Cardano',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 567, reply_count: 123, like_count: 890, quote_count: 45 },
      authorId: 'user606'
    },

    // Negatif Tweet'ler - Cardano
    {
      id: '10',
      text: 'ADA development too slow. Other chains moving faster. Cardano might lose market share. #Crypto',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 123, reply_count: 45, like_count: 234, quote_count: 12 },
      authorId: 'user707'
    },

    // Pozitif Tweet'ler - Solana
    {
      id: '11',
      text: 'Solana TPS numbers are insane! SOL ecosystem expanding rapidly. Future of DeFi! #Solana',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 678, reply_count: 145, like_count: 1234, quote_count: 67 },
      authorId: 'user808'
    },

    // Negatif Tweet'ler - Solana
    {
      id: '12',
      text: 'Another Solana network outage... Reliability issues need to be fixed. $SOL',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 345, reply_count: 89, like_count: 567, quote_count: 34 },
      authorId: 'user909'
    },

    // Market Genel Durum - Pozitif
    {
      id: '13',
      text: 'Crypto market showing strong recovery! Multiple coins breaking resistance. Bull run continues! 🚀',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 789, reply_count: 234, like_count: 1567, quote_count: 89 },
      authorId: 'user111'
    },
    {
      id: '14',
      text: 'Institutional adoption of crypto accelerating! Major banks joining the space. Future is bright! #Crypto',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 890, reply_count: 345, like_count: 2345, quote_count: 123 },
      authorId: 'user222'
    },

    // Market Genel Durum - Negatif
    {
      id: '15',
      text: 'Market looking overextended. Multiple bearish signals. Prepare for correction! #CryptoTrading',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 456, reply_count: 123, like_count: 789, quote_count: 45 },
      authorId: 'user333'
    },
    {
      id: '16',
      text: 'Regulatory concerns growing. Major countries considering crypto restrictions. Be cautious.',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 234, reply_count: 78, like_count: 456, quote_count: 23 },
      authorId: 'user444'
    },

    // Teknik Analiz Tweet'leri - Bitcoin
    {
      id: '17',
      text: 'BTC forming a perfect cup and handle pattern! Golden cross incoming on the daily. Very bullish! #Bitcoin #TechnicalAnalysis',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 567, reply_count: 123, like_count: 890, quote_count: 45 },
      authorId: 'user555'
    },
    {
      id: '18',
      text: 'Bitcoin death cross on the weekly. RSI showing overbought conditions. Prepare for a pullback! #BTC',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 345, reply_count: 89, like_count: 567, quote_count: 34 },
      authorId: 'user666'
    },

    // DeFi Tweet'leri
    {
      id: '19',
      text: 'DeFi TVL reaching new ATH! Ethereum leading the charge with innovative protocols. #ETH #DeFi',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 678, reply_count: 145, like_count: 1234, quote_count: 67 },
      authorId: 'user777'
    },
    {
      id: '20',
      text: 'Another DeFi hack! Protocol exploited for millions. Need better security measures. #CryptoSecurity',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 890, reply_count: 234, like_count: 1567, quote_count: 89 },
      authorId: 'user888'
    },

    // NFT Tweet'leri
    {
      id: '21',
      text: 'NFT market booming on Ethereum! New collections selling out instantly. Mass adoption incoming! #NFTs #ETH',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 456, reply_count: 123, like_count: 789, quote_count: 45 },
      authorId: 'user999'
    },
    {
      id: '22',
      text: 'NFT bubble about to burst? Floor prices dropping across all collections. Be careful! #NFTs',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 234, reply_count: 78, like_count: 456, quote_count: 23 },
      authorId: 'user1010'
    },

    // Layer 2 Tweet'leri
    {
      id: '23',
      text: 'Ethereum L2s showing massive growth! Arbitrum and Optimism leading the scaling revolution. #ETH',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 567, reply_count: 123, like_count: 890, quote_count: 45 },
      authorId: 'user1111'
    },
    {
      id: '24',
      text: 'L2 adoption slower than expected. High fees still a problem on some networks. #Ethereum',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 345, reply_count: 89, like_count: 567, quote_count: 34 },
      authorId: 'user1212'
    },

    // Mining Tweet'leri
    {
      id: '25',
      text: 'Bitcoin hashrate at all-time high! Network security stronger than ever. #BTC #Mining',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 678, reply_count: 145, like_count: 1234, quote_count: 67 },
      authorId: 'user1313'
    },
    {
      id: '26',
      text: 'Mining profitability dropping due to high energy costs. Many miners shutting down operations. #Bitcoin',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 890, reply_count: 234, like_count: 1567, quote_count: 89 },
      authorId: 'user1414'
    },

    // Regülasyon Tweet'leri
    {
      id: '27',
      text: 'Major country announces crypto-friendly regulations! This is huge for adoption. #Crypto #Regulation',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 456, reply_count: 123, like_count: 789, quote_count: 45 },
      authorId: 'user1515'
    },
    {
      id: '28',
      text: 'New crypto regulations could hurt innovation. Industry leaders expressing concerns. #Cryptocurrency',
      createdAt: new Date().toISOString(),
      metrics: { retweet_count: 234, reply_count: 78, like_count: 456, quote_count: 23 },
      authorId: 'user1616'
    }
  ];

  async getRecentTweets(symbol: string, limit: number = 100): Promise<Tweet[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return this.mockTweets
      .filter(tweet => tweet.text.toLowerCase().includes(symbol.toLowerCase()))
      .slice(0, limit);
  }

  async getTrendingCryptoTweets(): Promise<Tweet[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return this.mockTweets.sort((a, b) => 
      (b.metrics.like_count + b.metrics.retweet_count) - 
      (a.metrics.like_count + a.metrics.retweet_count)
    );
  }
} 