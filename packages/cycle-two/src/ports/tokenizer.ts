type TokenizerOptions = {
  expiresIn?: string;
};

export interface Tokenizer {
  sign: (
    payload: any,
    secretKey: string,
    options?: TokenizerOptions
  ) => Promise<string>;
  verify: (token: string, secretKey: string) => Promise<any>;
}
