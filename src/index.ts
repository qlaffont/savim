/* eslint-disable @typescript-eslint/ban-ts-comment */
import Pino, { Level } from 'pino';

export type SavimFunctions = {
  uploadFile: <TParams>(params: TParams) => Promise<void>;
  deleteFile: <TParams>(params: TParams) => Promise<void>;
  getFile: <TParams, TFile>(params: TParams) => Promise<TFile>;
};

export type SavimProvider = SavimFunctions & {
  name: string;

  isHealthy: () => Promise<boolean>;
};

export class Savim implements SavimFunctions {
  providers: Record<string, SavimProvider> = {};
  logger: Pino.BaseLogger;

  constructor(log?: Level) {
    this.logger = Pino({ level: log || 'info' });
  }

  async addProvider<T>(
    provider: new (...args: any[]) => SavimProvider,
    config: T,
  ) {
    const newProvider: SavimProvider = new provider(config);

    if (!(await newProvider.isHealthy())) {
      this.logger.error(
        `[SAVIM] Transport ${newProvider.name} is not healthy !`,
      );
      return;
    }

    this.providers[newProvider.name] = newProvider;
  }

  async uploadFile<TParams>(params: TParams, providerName?: string) {
    const provider = this.getInvolvedProvider(providerName);

    this.logger.debug(
      `[SAVIM] Upload file ${
        provider ? `(Provider: ${provider.name})` : '(No provider)'
      }`,
    )
    this.logger.debug(params);

    if (provider) {
      await provider.uploadFile(params);
    }
  }

  private getInvolvedProvider = (
    providerName?: string,
  ): SavimProvider | undefined => {
    const ProvidersKeys = Object.keys(this.providers);

    let provider: SavimProvider | undefined = undefined;

    if (providerName && this.providers[providerName]) {
      provider = this.providers[providerName];
    } else if (ProvidersKeys?.length > 0) {
      provider = this.providers[ProvidersKeys[0]];
    }

    return provider;
  };
}
