export interface SentimentScore {
  score: number;        // -1 ile 1 arası (negatif -> pozitif)
  confidence: number;   // 0 ile 1 arası
  magnitude: number;    // Duygu yoğunluğu
  positive: string[];   // Tespit edilen pozitif kelimeler
  negative: string[];   // Tespit edilen negatif kelimeler
}

export interface SentimentAnalysis {
  text: string;
  sentiment: SentimentScore;
  timestamp: string;
  source: string;
}

export interface AggregateSentiment {
  overallScore: number;
  averageConfidence: number;
  totalAnalyzed: number;
  timeRange: {
    start: string;
    end: string;
  };
  sources: {
    [key: string]: number;  // Her kaynak için sentiment skoru
  };
} 