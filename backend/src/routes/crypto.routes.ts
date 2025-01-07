import { Router } from 'express';
import { CryptoController } from '../controllers/crypto.controller';

const router = Router();
const cryptoController = new CryptoController();

// Get current prices for all supported cryptocurrencies
router.get('/prices', (req, res) => cryptoController.getPrices(req, res));

// Get historical data for a specific coin
router.get('/historical/:coinId', (req, res) => cryptoController.getHistoricalData(req, res));

// Get global market data
router.get('/global', (req, res) => cryptoController.getGlobalMarketData(req, res));

// Get detailed information about a specific coin
router.get('/coins/:coinId', (req, res) => cryptoController.getCoinDetails(req, res));

export default router; 