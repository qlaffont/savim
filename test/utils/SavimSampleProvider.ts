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
    _params: object,
  ): Promise<boolean> {
    return true;
  }

  async deleteFile(_filenameWithPath: string, _params: object): Promise<void> {
    return;
  }

  async getFile(_filenameWithPath: string, _params: object): Promise<string> {
    return 'data';
  }

  async createFolder(_path: string, _params: object): Promise<boolean> {
    return true;
  }

  async deleteFolder(_path: string, _params: object): Promise<void> {
    return;
  }

  async getFolders(_path: string, _params: object): Promise<string[]> {
    return ['data'];
  }

  async getFiles(
    _filenameWithPath: string,
    _params: object,
  ): Promise<string[]> {
    return ['data.txt'];
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
    _params: object,
  ): Promise<boolean> {
    return true;
  }

  async deleteFile(_filenameWithPath: string, _params: object): Promise<void> {
    return;
  }

  async getFile(_filenameWithPath: string, _params: object): Promise<string> {
    return '';
  }

  async createFolder(_path: string, _params: object): Promise<boolean> {
    return true;
  }

  async deleteFolder(_path: string, _params: object): Promise<void> {
    return;
  }

  async getFolders(_path: string, _params: object): Promise<string[]> {
    return ['data'];
  }

  async getFiles(
    _filenameWithPath: string,
    _params: object,
  ): Promise<string[]> {
    return ['data.txt'];
  }
}
