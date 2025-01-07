import { Request, Response } from 'express';
import { CryptoService } from '../services/data/crypto.service';

export class CryptoController {
  private cryptoService: CryptoService;

  constructor() {
    this.cryptoService = new CryptoService();
  }

  async getPrices(req: Request, res: Response): Promise<void> {
    try {
      const currency = (req.query.currency as string) || 'usd';
      const prices = await this.cryptoService.getPrices(currency);
      res.json({ success: true, data: prices });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch crypto prices'
      });
    }
  }

  async getHistoricalData(req: Request, res: Response): Promise<void> {
    try {
      const { coinId } = req.params;
      const days = parseInt(req.query.days as string) || 7;
      const data = await this.cryptoService.getHistoricalData(coinId, days);
      res.json({ success: true, data });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch historical data'
      });
    }
  }

  async getGlobalMarketData(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.cryptoService.getGlobalMarketData();
      res.json({ success: true, data });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch global market data'
      });
    }
  }

  async getCoinDetails(req: Request, res: Response): Promise<void> {
    try {
      const { coinId } = req.params;
      const data = await this.cryptoService.getCoinDetails(coinId);
      res.json({ success: true, data });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch coin details'
      });
    }
  }
} 