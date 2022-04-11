import offlineStorage from '../lib/offlineStorage';

interface SWConfig {
  publicKey: string;
  hash: number;
}

const defaultConfig: SWConfig = {
  publicKey: '',
  hash: 0
};

export const getConfig = async (): Promise<SWConfig> => (await offlineStorage.get('config')) || defaultConfig;

export const saveConfig = async (config: SWConfig): Promise<IDBValidKey> => offlineStorage.set('config', config);
