import CoinGecko from 'coingecko-api';
import { CryptoPrice, CryptoHistoricalData, CryptoMarketData } from '../../types/crypto.types';

export class CryptoService {
  private client: CoinGecko;
  private readonly supportedCurrencies = ['btc', 'eth', 'ada', 'sol', 'xrp', 'dot', 'link', 'avax'];

  constructor() {
    this.client = new CoinGecko();
  }

  async getPrices(currency: string = 'usd'): Promise<CryptoPrice[]> {
    try {
      const response = await this.client.simple.price({
        ids: this.supportedCurrencies,
        vs_currencies: [currency],
        include_market_cap: true,
        include_24hr_vol: true,
        include_24hr_change: true,
        include_last_updated_at: true
      });

      return Object.entries(response.data).map(([id, data]: [string, any]) => ({
        id,
        symbol: id,
        name: id.toUpperCase(),
        current_price: data[currency],
        market_cap: data[`${currency}_market_cap`],
        market_cap_rank: 0, // Will be updated with additional call
        price_change_percentage_24h: data[`${currency}_24h_change`],
        total_volume: data[`${currency}_24h_vol`],
        circulating_supply: 0, // Will be updated with additional call
        last_updated: new Date(data.last_updated_at * 1000).toISOString()
      }));
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
      throw new Error('Failed to fetch crypto prices');
    }
  }

  async getHistoricalData(coinId: string, days: number = 7): Promise<CryptoHistoricalData> {
    try {
      const response = await this.client.coins.fetchMarketChart(coinId, {
        days: days.toString(),
        vs_currency: 'usd'
      });

      return {
        prices: response.data.prices,
        market_caps: response.data.market_caps,
        total_volumes: response.data.total_volumes
      };
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw new Error('Failed to fetch historical data');
    }
  }

  async getGlobalMarketData(): Promise<CryptoMarketData> {
    try {
      const response = await this.client.global();
      
      return {
        total_market_cap: response.data.total_market_cap,
        total_volume: response.data.total_volume,
        market_cap_percentage: response.data.market_cap_percentage,
        market_cap_change_percentage_24h_usd: response.data.market_cap_change_percentage_24h_usd
      };
    } catch (error) {
      console.error('Error fetching global market data:', error);
      throw new Error('Failed to fetch global market data');
    }
  }

  async getCoinDetails(coinId: string): Promise<any> {
    try {
      const response = await this.client.coins.fetch(coinId, {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching coin details:', error);
      throw new Error('Failed to fetch coin details');
    }
  }
} 