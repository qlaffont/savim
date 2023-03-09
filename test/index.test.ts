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

    expect(
      await savim.deleteFile('toto', {} as SavimSampleProviderConfig),
    ).toBe(undefined);
  });
});
