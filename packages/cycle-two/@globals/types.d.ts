declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN_SECRET: string;
      PORT: string;
      DATABASE_URL: string;
    }
  }

  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}

export {};
