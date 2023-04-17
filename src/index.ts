/* eslint-disable @typescript-eslint/no-explicit-any */
import Stream from 'node:stream';

import Pino, { Level } from 'pino';

export abstract class SavimProviderInterface {
  name!: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  constructor(_config: object) {}

  isHealthy!: () => Promise<boolean>;

  uploadFile!: (
    filenameWithPath: string,
    content: Buffer | string | Stream,
    params: any,
  ) => Promise<unknown>;
  deleteFile!: (filenameWithPath: string, params: any) => Promise<void>;
  getFile!: (
    filenameWithPath: string,
    params: any,
  ) => Promise<unknown | undefined>;

  createFolder!: (path: string, params: any) => Promise<unknown>;
  deleteFolder!: (path: string, params: any) => Promise<void>;
  getFolders!: (path: string, params: any) => Promise<string[] | undefined>;
  getFiles!: (path: string, params: any) => Promise<string[] | undefined>;
}

export class Savim {
  providers: Record<string, SavimProviderInterface> = {};
  logger: Pino.BaseLogger;

  constructor(public log?: Level) {
    this.logger = Pino({ level: log || 'info' });
  }

  async addProvider<T>(
    provider: new (...args: any[]) => SavimProviderInterface,
    config: T,
    providerName?: string,
  ) {
    const newProvider: SavimProviderInterface = new provider(config);

    if (!(await newProvider.isHealthy())) {
      this.logger.error(
        `[SAVIM] Provider ${newProvider.name} is not healthy !`,
      );
      throw 'Provider is not healthy !';
    }

    if (this.providers[providerName || newProvider.name]) {
      this.logger.error(
        `[SAVIM] Provider ${providerName || newProvider.name} is not healthy !`,
      );
      throw 'Provider already exist !';
    }

    this.providers[providerName || newProvider.name] = newProvider;
  }

  async removeProvider(providerName: string) {
    if (this.providers[providerName]) {
      delete this.providers[providerName];
    }
  }

  async uploadFile(
    filenameWithPath: string,
    content: Buffer | string | Stream,
    params: object = {},
    providerName?: string,
  ) {
    const provider = this.getInvolvedProvider(providerName);

    this.logger.debug(
      `[SAVIM] Upload file ${
        provider ? `(Provider: ${provider.name})` : '(No provider)'
      } ${
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
  ) {
    const provider = this.getInvolvedProvider(providerName);

    this.logger.debug(
      `[SAVIM] Get file ${
        provider ? `(Provider: ${provider.name})` : '(No provider)'
      } ${
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
  ) {
    const provider = this.getInvolvedProvider(providerName);

    this.logger.debug(
      `[SAVIM] Delete file ${
        provider ? `(Provider: ${provider.name})` : '(No provider)'
      } ${provider ? `(Provider: ${provider.name})` : '(No provider)'}`,
    );
    this.logger.debug(params);

    if (provider) {
      return provider.deleteFile(filenameWithPath, params);
    }

    return undefined;
  }

  async createFolder(path: string, params: object = {}, providerName?: string) {
    const provider = this.getInvolvedProvider(providerName);

    this.logger.debug(
      `[SAVIM] Create folder ${
        provider ? `(Provider: ${provider.name})` : '(No provider)'
      } ${provider ? `(Provider: ${provider.name})` : '(No provider)'} ${path}`,
    );
    this.logger.debug(params);

    if (provider) {
      return provider.createFolder(path, params);
    }

    return undefined;
  }

  async deleteFolder(path: string, params: object = {}, providerName?: string) {
    const provider = this.getInvolvedProvider(providerName);

    this.logger.debug(
      `[SAVIM] Delete folder ${
        provider ? `(Provider: ${provider.name})` : '(No provider)'
      } ${provider ? `(Provider: ${provider.name})` : '(No provider)'}`,
    );
    this.logger.debug(params);

    if (provider) {
      return provider.deleteFolder(path, params);
    }

    return undefined;
  }

  async getFolders(path: string, params: object = {}, providerName?: string) {
    const provider = this.getInvolvedProvider(providerName);

    this.logger.debug(
      `[SAVIM] Get folders ${
        provider ? `(Provider: ${provider.name})` : '(No provider)'
      } ${provider ? `(Provider: ${provider.name})` : '(No provider)'} ${path}`,
    );
    this.logger.debug(params);

    if (provider) {
      return provider.getFolders(path, params);
    }

    return undefined;
  }

  async getFiles(path: string, params: object = {}, providerName?: string) {
    const provider = this.getInvolvedProvider(providerName);

    this.logger.debug(
      `[SAVIM] Get files ${
        provider ? `(Provider: ${provider.name})` : '(No provider)'
      } ${provider ? `(Provider: ${provider.name})` : '(No provider)'} ${path}`,
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
    const ProvidersKeys = Object.keys(this.providers);

    let provider: SavimProviderInterface | undefined = undefined;

    if (providerName && this.providers[providerName]) {
      provider = this.providers[providerName];
    } else if (ProvidersKeys?.length > 0) {
      provider = this.providers[ProvidersKeys[0]];
    }

    return provider;
  };
}
