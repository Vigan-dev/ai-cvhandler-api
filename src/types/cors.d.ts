declare module 'cors' {
  import { RequestHandler } from 'express';

  type CorsOriginCallback = (error: Error | null, allow?: boolean) => void;
  type CorsOriginResolver = (
    origin: string | undefined,
    callback: CorsOriginCallback,
  ) => void;

  interface CorsOptions {
    origin?:
      | string
      | boolean
      | RegExp
      | Array<string | RegExp>
      | CorsOriginResolver;
    credentials?: boolean;
  }

  export default function cors(options?: CorsOptions): RequestHandler;
}
