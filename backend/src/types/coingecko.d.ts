declare module 'coingecko-api' {
  export default class CoinGecko {
    constructor();
    
    simple: {
      price(options: {
        ids: string[];
        vs_currencies: string[];
        include_market_cap?: boolean;
        include_24hr_vol?: boolean;
        include_24hr_change?: boolean;
        include_last_updated_at?: boolean;
      }): Promise<{
        success: boolean;
        message?: string;
        code?: number;
        data: Record<string, any>;
      }>;
    };

    coins: {
      fetch(
        coinId: string,
        options?: {
          localization?: boolean;
          tickers?: boolean;
          market_data?: boolean;
          community_data?: boolean;
          developer_data?: boolean;
          sparkline?: boolean;
        }
      ): Promise<{
        success: boolean;
        message?: string;
        code?: number;
        data: any;
      }>;

      fetchMarketChart(
        coinId: string,
        options: {
          days: string;
          vs_currency: string;
        }
      ): Promise<{
        success: boolean;
        message?: string;
        code?: number;
        data: {
          prices: [number, number][];
          market_caps: [number, number][];
          total_volumes: [number, number][];
        };
      }>;
    };

    global(): Promise<{
      success: boolean;
      message?: string;
      code?: number;
      data: {
        total_market_cap: Record<string, number>;
        total_volume: Record<string, number>;
        market_cap_percentage: Record<string, number>;
        market_cap_change_percentage_24h_usd: number;
      };
    }>;
  }
} 