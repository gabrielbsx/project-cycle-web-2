declare global {
  namespace Express {
    export interface Request {
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
