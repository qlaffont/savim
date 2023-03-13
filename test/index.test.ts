import { describe, expect, it } from '@jest/globals';

import { Savim } from '../src';
import {
  SavimSampleProvider,
  SavimSampleProviderConfig,
  SavimSampleProviderNotHealthy,
} from './utils/SavimSampleProvider';

describe('Savim', () => {
  it('should be Defined', () => {
    expect(Savim).toBeDefined();
  });

  it('should be able to define log', () => {
    expect(new Savim('debug')).toBeDefined();
  });

  it('should be able to add transport', async () => {
    let savim = new Savim();

    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, {
      test: '',
    });

    expect(savim).toBeDefined();
    expect(savim.providers).toBeDefined();
    expect(Object.keys(savim.providers)).toHaveLength(1);

    savim = new Savim();

    await savim.addProvider<SavimSampleProviderConfig>(
      SavimSampleProviderNotHealthy,
      { test: '' },
    );

    expect(savim).toBeDefined();
    expect(savim.providers).toBeDefined();
    expect(Object.keys(savim.providers)).toHaveLength(0);
  });

  it('should be able to upload file', async () => {
    const savim = new Savim();

    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, {
      test: '',
    });

    expect(await savim.uploadFile('toto', 'base64fake', {})).toEqual(true);
  });

  it('should be able to get file', async () => {
    const savim = new Savim();

    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, {
      test: '',
    });

    expect(await savim.getFile('toto', {})).toEqual('data');
  });

  it('should be able to remove file', async () => {
    const savim = new Savim();

    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, {
      test: '',
    });

    expect(await savim.deleteFile('toto', {})).toBe(undefined);
  });

  it('should be able to create folder', async () => {
    const savim = new Savim();

    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, {
      test: '',
    });

    expect(await savim.createFolder('toto', {})).toEqual(true);
  });

  it('should be able to remove folder', async () => {
    const savim = new Savim();

    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, {
      test: '',
    });

    expect(await savim.deleteFolder('toto', {})).toBe(undefined);
  });

  it('should be able to list folders', async () => {
    const savim = new Savim();

    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, {
      test: '',
    });

    expect(await savim.getFolders('toto', {})).toEqual(['data']);
  });

  it('should be able to list files', async () => {
    const savim = new Savim();

    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, {
      test: '',
    });

    expect(await savim.getFiles('toto', {})).toEqual(['data.txt']);
  });
});
