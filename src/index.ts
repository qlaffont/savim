import Stream from 'node:stream';

import Pino, { Level } from 'pino';

export type SavimFunctions = {
  uploadFile: <T, TReturn>(
    filenameWithPath: string,
    content: Buffer | string | Stream,
    params: T,
    providerName?: string,
  ) => Promise<TReturn | undefined>;
  deleteFile: <T>(params: T, providerName?: string) => Promise<void>;
  getFile: <T, TFile>(
    filenameWithPath: string,
    params: T,
    providerName?: string,
  ) => Promise<TFile | undefined>;
};

export abstract class SavimProviderInterface {
  name!: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  constructor(_config: object) {}

  isHealthy!: () => Promise<boolean>;

  uploadFile!: <T, TReturn>(
    filenameWithPath: string,
    content: Buffer | string | Stream,
    params: T,
  ) => Promise<TReturn>;
  deleteFile!: <T>(params: T) => Promise<void>;
  getFile!: <T, TFile>(
    filenameWithPath: string,
    params: T,
  ) => Promise<TFile | undefined>;
}

export class Savim implements SavimFunctions {
  providers: Record<string, SavimProviderInterface> = {};
  logger: Pino.BaseLogger;

  constructor(log?: Level) {
    this.logger = Pino({ level: log || 'info' });
  }

  async addProvider<T>(
    provider: new (...args: any[]) => SavimProviderInterface,
    config: T,
  ) {
    const newProvider: SavimProviderInterface = new provider(config);

    if (!(await newProvider.isHealthy())) {
      this.logger.error(
        `[SAVIM] Transport ${newProvider.name} is not healthy !`,
      );
      return;
    }

    this.providers[newProvider.name] = newProvider;
  }

  async uploadFile<T, TReturn>(
    filenameWithPath: string,
    content: Buffer | string | Stream,
    params: T,
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
      return provider.uploadFile<T, TReturn>(filenameWithPath, content, params);
    }

    return undefined;
  }

  async getFile<T, Tfile>(
    filenameWithPath: string,
    params: T,
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
      return provider.getFile<T, Tfile>(filenameWithPath, params);
    }

    return undefined;
  }

  async deleteFile<T>(params: T, providerName?: string) {
    const provider = this.getInvolvedProvider(providerName);

    this.logger.debug(
      `[SAVIM] Delete file ${
        provider ? `(Provider: ${provider.name})` : '(No provider)'
      } ${provider ? `(Provider: ${provider.name})` : '(No provider)'}`,
    );
    this.logger.debug(params);

    if (provider) {
      return provider.deleteFile<T>(params);
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
