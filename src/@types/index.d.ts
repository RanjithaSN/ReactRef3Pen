import AppConfig from 'AppConfig';
import { CacheClient } from 'server/cache/cacheClient';

declare global {
  interface Window {
    __BROWSER_CONFIG__: typeof AppConfig;
    zE: {
      activate: (options: {
        hideOnClose?: boolean
      }) => void;
    };
    zESettings: {
      webWidget: {
        chat?: {
          suppress: boolean;
        };
        contactForm?: {
          suppress: boolean;
        };
        helpCenter?: {
          suppress: boolean;
        };
        talk?: {
          suppress: boolean;
        };
        answerBot?: {
          suppress: boolean;
        };
        authenticate: {
          chat: {
            jwtFn: (callback: (token?: string) => void) => void
          }
        }
      }
    }
  }
  namespace Express {
    interface Request {
      cacheClient: CacheClient | null;
      session: {
        locale: 'sv-SE' | 'en-US' | null;
      } | null;
    }
  }
}