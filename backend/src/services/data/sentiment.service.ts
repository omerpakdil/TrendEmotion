import { SentimentScore, SentimentAnalysis } from '../../types/sentiment.types';

export class SentimentService {
  private readonly positiveWords = new Set([
    // Market durumu
    'bullish', 'bull', 'buy', 'long', 'support', 'breakout', 'uptrend', 'accumulate',
    'bounce', 'recovery', 'surge', 'rally', 'gain', 'profit', 'growth', 'strong',
    'strength', 'momentum', 'opportunity', 'potential', 'promising', 'confidence',
    'optimistic', 'positive', 'upgrade', 'outperform', 'beat', 'exceed', 'success',
    
    // Olumlu duygular
    'good', 'great', 'excellent', 'amazing', 'fantastic', 'wonderful', 'incredible',
    'perfect', 'happy', 'excited', 'confident', 'secure', 'safe', 'reliable',
    'innovative', 'revolutionary', 'game-changing', 'breakthrough', 'leading',
    
    // Kripto özellikleri
    'adoption', 'integration', 'partnership', 'collaboration', 'development',
    'update', 'upgrade', 'improvement', 'solution', 'efficient', 'scalable',
    'secure', 'decentralized', 'transparent', 'sustainable'
  ]);

  private readonly negativeWords = new Set([
    // Market durumu
    'bearish', 'bear', 'sell', 'short', 'resistance', 'breakdown', 'downtrend',
    'dump', 'crash', 'collapse', 'plunge', 'decline', 'loss', 'weak', 'weakness',
    'correction', 'volatile', 'volatility', 'risk', 'risky', 'uncertain',
    'uncertainty', 'pessimistic', 'negative', 'downgrade', 'underperform',
    'miss', 'fail', 'failure',
    
    // Olumsuz duygular
    'bad', 'poor', 'terrible', 'horrible', 'awful', 'worried', 'concerned',
    'fear', 'fearful', 'scared', 'panic', 'anxiety', 'anxious', 'doubt',
    'skeptical', 'suspicious', 'unreliable', 'dangerous', 'threat',
    
    // Kripto sorunları
    'hack', 'scam', 'fraud', 'manipulation', 'exploit', 'vulnerability', 'bug',
    'issue', 'problem', 'delay', 'congestion', 'centralized', 'expensive',
    'unsustainable', 'regulatory', 'ban', 'restrict', 'limitation'
  ]);

  private readonly intensifiers = new Set([
    'very', 'extremely', 'highly', 'super', 'really', 'absolutely', 'completely',
    'totally', 'utterly', 'definitely', 'certainly', 'surely', 'clearly',
    'obviously', 'undoubtedly'
  ]);

  analyzeSentiment(text: string): SentimentScore {
    const words = text.toLowerCase().split(/\s+/);
    const positiveFound: string[] = [];
    const negativeFound: string[] = [];
    let score = 0;
    let magnitude = 0;
    let hasIntensifier = false;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      // İntensifier kontrolü
      if (this.intensifiers.has(word)) {
        hasIntensifier = true;
        continue;
      }

      // Pozitif kelime kontrolü
      if (this.positiveWords.has(word)) {
        score += hasIntensifier ? 1.5 : 1;
        magnitude += hasIntensifier ? 1.5 : 1;
        positiveFound.push(word);
        hasIntensifier = false;
        continue;
      }

      // Negatif kelime kontrolü
      if (this.negativeWords.has(word)) {
        score -= hasIntensifier ? 1.5 : 1;
        magnitude += hasIntensifier ? 1.5 : 1;
        negativeFound.push(word);
        hasIntensifier = false;
        continue;
      }

      hasIntensifier = false;
    }

    // Skoru normalize et (-1 ile 1 arasına)
    const normalizedScore = magnitude > 0 ? score / magnitude : 0;
    
    // Güven skorunu hesapla
    const confidence = Math.min(
      (positiveFound.length + negativeFound.length) / words.length,
      1
    );

    return {
      score: normalizedScore,
      confidence,
      magnitude,
      positive: positiveFound,
      negative: negativeFound
    };
  }

  analyzeTexts(texts: { text: string; timestamp: string; source: string }[]): SentimentAnalysis[] {
    return texts.map(({ text, timestamp, source }) => ({
      text,
      sentiment: this.analyzeSentiment(text),
      timestamp,
      source
    }));
  }

  aggregateAnalyses(analyses: SentimentAnalysis[]): number {
    if (analyses.length === 0) return 0;

    const totalScore = analyses.reduce(
      (sum, analysis) => sum + analysis.sentiment.score,
      0
    );

    return totalScore / analyses.length;
  }
} 