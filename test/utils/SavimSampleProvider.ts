import { SavimProviderInterface } from '../../src';

export interface SendimSampleProviderConfig {
  test: string;
}

export class SavimSampleProvider implements SavimProviderInterface {
  name = 'sample';

  constructor(public config: SendimSampleProviderConfig) {}

  uploadFile: <T>(
    filenameWithPath: string,
    content: string | Buffer | import('stream'),
    params: T,
  ) => Promise<void> = {};

  deleteFile: <T>(params: T) => Promise<void>;
  getFile: <T, TFile>(
    filenameWithPath: string,
    params: T,
  ) => Promise<TFile | undefined>;

  async isHealthy() {
    return true;
  }
}

export class SendimSampleProviderNotHealthy
  implements SendimTransportInterface
{
  name = 'sample';

  constructor(public config: SendimSampleProviderConfig) {}

  async isHealthy() {
    return false;
  }
}
