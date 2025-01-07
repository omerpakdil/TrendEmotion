// backend/src/types/twitter.types.ts

export interface Tweet {
    id: string;
    text: string;
    createdAt: string;
    metrics: {
      retweet_count: number;
      reply_count: number;
      like_count: number;
      quote_count: number;
    };
    authorId: string;
  }
  
  export interface TwitterError {
    code: number;
    message: string;
  }