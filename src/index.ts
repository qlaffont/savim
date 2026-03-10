import Stream from 'node:stream';

import Pino, { Level } from 'pino';

export interface SavimProviderInterface {
  name: string;

  isHealthy: () => Promise<boolean>;

  uploadFile: (
    filenameWithPath: string,
    content: Buffer | string | Stream,
    params: object,
  ) => Promise<unknown>;
  deleteFile: (filenameWithPath: string, params: object) => Promise<void>;
  getFile: (
    filenameWithPath: string,
    params: object,
  ) => Promise<unknown | undefined>;

  createFolder: (path: string, params: object) => Promise<unknown>;
  deleteFolder: (path: string, params: object) => Promise<void>;
  getFolders: (path: string, params: object) => Promise<string[] | undefined>;
  getFiles: (path: string, params: object) => Promise<string[] | undefined>;
}

export class Savim {
  providers: Record<string, SavimProviderInterface> = {};
  logger: Pino.BaseLogger;

  constructor(public log?: Level | undefined) {
    this.logger = Pino({ level: log || 'info' });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async addProvider<T = any>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provider: new (...args: any[]) => SavimProviderInterface,
    config: T,
    providerName?: string,
  ): Promise<void> {
    const newProvider: SavimProviderInterface = new provider(config);

    if (!(await newProvider.isHealthy())) {
      this.logger.error(
        `[SAVIM] Provider ${newProvider.name} is not healthy !`,
      );
      throw 'Provider is not healthy !';
    }

    if (this.providers[providerName || newProvider.name]) {
      this.logger.error(
        `[SAVIM] Provider ${providerName || newProvider.name} already exists !`,
      );
      throw 'Provider already exist !';
    }

    this.providers[providerName || newProvider.name] = newProvider;
  }

  async removeProvider(providerName: string): Promise<void> {
    if (this.providers[providerName]) {
      delete this.providers[providerName];
    }
  }

  async uploadFile(
    filenameWithPath: string,
    content: Buffer | string | Stream,
    params: object = {},
    providerName?: string,
  ): Promise<unknown> {
    const provider = this.getInvolvedProvider(providerName);

    this.logger.debug(
      `[SAVIM] Upload file ${
        provider ? `(Provider: ${provider.name})` : '(No provider)'
      } ${filenameWithPath}`,
    );
    this.logger.debug(params);

    if (provider) {
      return provider.uploadFile(filenameWithPath, content, params);
    }

    return undefined;
  }

  async getFile(
    filenameWithPath: string,
    params: object = {},
    providerName?: string,
  ): Promise<unknown> {
    const provider = this.getInvolvedProvider(providerName);

    this.logger.debug(
      `[SAVIM] Get file ${
        provider ? `(Provider: ${provider.name})` : '(No provider)'
      } ${filenameWithPath}`,
    );
    this.logger.debug(params);

    if (provider) {
      return provider.getFile(filenameWithPath, params);
    }

    return undefined;
  }

  async deleteFile(
    filenameWithPath: string,
    params: object = {},
    providerName?: string,
  ): Promise<unknown> {
    const provider = this.getInvolvedProvider(providerName);

    this.logger.debug(
      `[SAVIM] Delete file ${
        provider ? `(Provider: ${provider.name})` : '(No provider)'
      }`,
    );
    this.logger.debug(params);

    if (provider) {
      return provider.deleteFile(filenameWithPath, params);
    }

    return undefined;
  }

  async createFolder(path: string, params: object = {}, providerName?: string): Promise<unknown> {
    const provider = this.getInvolvedProvider(providerName);

    this.logger.debug(
      `[SAVIM] Create folder ${
        provider ? `(Provider: ${provider.name})` : '(No provider)'
      } ${path}`,
    );
    this.logger.debug(params);

    if (provider) {
      return provider.createFolder(path, params);
    }

    return undefined;
  }

  async deleteFolder(path: string, params: object = {}, providerName?: string): Promise<unknown> {
    const provider = this.getInvolvedProvider(providerName);

    this.logger.debug(
      `[SAVIM] Delete folder ${
        provider ? `(Provider: ${provider.name})` : '(No provider)'
      }`,
    );
    this.logger.debug(params);

    if (provider) {
      return provider.deleteFolder(path, params);
    }

    return undefined;
  }

  async getFolders(path: string, params: object = {}, providerName?: string): Promise<string[] | undefined> {
    const provider = this.getInvolvedProvider(providerName);

    this.logger.debug(
      `[SAVIM] Get folders ${
        provider ? `(Provider: ${provider.name})` : '(No provider)'
      } ${path}`,
    );
    this.logger.debug(params);

    if (provider) {
      return provider.getFolders(path, params);
    }

    return undefined;
  }

  async getFiles(path: string, params: object = {}, providerName?: string): Promise<string[] | undefined> {
    const provider = this.getInvolvedProvider(providerName);

    this.logger.debug(
      `[SAVIM] Get files ${
        provider ? `(Provider: ${provider.name})` : '(No provider)'
      } ${path}`,
    );
    this.logger.debug(params);

    if (provider) {
      return provider.getFiles(path, params);
    }

    return undefined;
  }

  private getInvolvedProvider = (
    providerName?: string,
  ): SavimProviderInterface | undefined => {
    const providersKeys = Object.keys(this.providers);

    if (providerName && this.providers[providerName]) {
      return this.providers[providerName];
    } else if (providersKeys.length > 0) {
      return this.providers[providersKeys[0]];
    }

    return undefined;
  };
}
