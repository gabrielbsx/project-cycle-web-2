declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      TOKEN_SECRET: string;
      PORT: string;
      DATABASE_URL: string;
    }
  }
}

export {};
