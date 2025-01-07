// backend/src/middleware/rateLimit.middleware.ts

import rateLimit from 'express-rate-limit';

export const twitterRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // Her IP için maksimum istek sayısı
  message: 'Too many requests from this IP, please try again later.',
});