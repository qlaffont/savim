/* eslint-disable @typescript-eslint/no-unused-vars */
import { Stream } from 'node:stream';

import { SavimProviderInterface } from '../../src';

export interface SavimSampleProviderConfig {
  test: string;
}

export class SavimSampleProvider implements SavimProviderInterface {
  name = 'sample';

  constructor(public config: SavimSampleProviderConfig) {}

  async isHealthy() {
    return true;
  }

  async uploadFile(
    _filenameWithPath: string,
    _content: Buffer | string | Stream,
    _params: boolean,
  ): Promise<boolean> {
    return true;
  }

  async deleteFile(_filenameWithPath: string, _params: boolean): Promise<void> {
    return;
  }

  async getFile(_filenameWithPath: string, _params: boolean): Promise<string> {
    return 'data';
  }
}
export class SavimSampleProviderNotHealthy implements SavimProviderInterface {
  name = 'sample';

  constructor(public config: SavimSampleProviderConfig) {}

  async isHealthy() {
    return false;
  }

  async uploadFile(
    _filenameWithPath: string,
    _content: Buffer | string | Stream,
    _params: boolean,
  ): Promise<boolean> {
    return true;
  }

  async deleteFile(_filenameWithPath: string, _params: boolean): Promise<void> {
    return;
  }

  async getFile(_filenameWithPath: string, _params: boolean): Promise<string> {
    return '';
  }
}
