import { describe, expect, it } from 'bun:test';

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

    try {
      await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, {
        test: '',
      });

      expect(savim).toBeDefined();
      expect(savim.providers).toBeDefined();
      expect(Object.keys(savim.providers)).toHaveLength(0);
    } catch (error) {}

    savim = new Savim();

    try {
      await savim.addProvider<SavimSampleProviderConfig>(
        SavimSampleProviderNotHealthy,
        { test: '' },
      );

      expect(savim).toBeDefined();
      expect(savim.providers).toBeDefined();
      expect(Object.keys(savim.providers)).toHaveLength(0);
    } catch (error) {}
  });

  it('should be able to add transport with custom provider name', async () => {
    const savim = new Savim();

    await savim.addProvider<SavimSampleProviderConfig>(
      SavimSampleProvider,
      { test: '' },
      'custom-name',
    );

    expect(Object.keys(savim.providers)).toHaveLength(1);
    expect(savim.providers['custom-name']).toBeDefined();
  });

  it('should be able to remove transport', async () => {
    const savim = new Savim();

    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, {
      test: '',
    });

    expect(savim).toBeDefined();
    expect(savim.providers).toBeDefined();
    expect(Object.keys(savim.providers)).toHaveLength(1);
    //@ts-ignore
    await savim.removeProvider(new SavimSampleProvider().name);
    expect(savim).toBeDefined();
    expect(savim.providers).toBeDefined();
    expect(Object.keys(savim.providers)).toHaveLength(0);
  });

  it('should be able to remove non-existent transport without error', async () => {
    const savim = new Savim();
    await savim.removeProvider('nonexistent');
    expect(Object.keys(savim.providers)).toHaveLength(0);
  });

  it('should be able to upload file', async () => {
    const savim = new Savim();
    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, { test: '' });
    expect(await savim.uploadFile('toto', 'base64fake', {})).toEqual(true);
  });

  it('should be able to upload file by provider name', async () => {
    const savim = new Savim();
    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, { test: '' }, 'named');
    expect(await savim.uploadFile('toto', 'base64fake', {}, 'named')).toEqual(true);
  });

  it('should return undefined on upload with no provider', async () => {
    const savim = new Savim();
    expect(await savim.uploadFile('toto', 'base64fake')).toBeUndefined();
  });

  it('should be able to get file', async () => {
    const savim = new Savim();
    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, { test: '' });
    expect(await savim.getFile('toto', {})).toEqual('data');
  });

  it('should return undefined on getFile with no provider', async () => {
    const savim = new Savim();
    expect(await savim.getFile('toto')).toBeUndefined();
  });

  it('should be able to remove file', async () => {
    const savim = new Savim();
    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, { test: '' });
    expect(await savim.deleteFile('toto', {})).toBe(undefined);
  });

  it('should return undefined on deleteFile with no provider', async () => {
    const savim = new Savim();
    expect(await savim.deleteFile('toto')).toBeUndefined();
  });

  it('should be able to create folder', async () => {
    const savim = new Savim();
    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, { test: '' });
    expect(await savim.createFolder('toto', {})).toEqual(true);
  });

  it('should return undefined on createFolder with no provider', async () => {
    const savim = new Savim();
    expect(await savim.createFolder('toto')).toBeUndefined();
  });

  it('should be able to remove folder', async () => {
    const savim = new Savim();
    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, { test: '' });
    expect(await savim.deleteFolder('toto', {})).toBe(undefined);
  });

  it('should return undefined on deleteFolder with no provider', async () => {
    const savim = new Savim();
    expect(await savim.deleteFolder('toto')).toBeUndefined();
  });

  it('should be able to list folders', async () => {
    const savim = new Savim();
    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, { test: '' });
    expect(await savim.getFolders('toto', {})).toEqual(['data']);
  });

  it('should return undefined on getFolders with no provider', async () => {
    const savim = new Savim();
    expect(await savim.getFolders('toto')).toBeUndefined();
  });

  it('should be able to list files', async () => {
    const savim = new Savim();
    await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, { test: '' });
    expect(await savim.getFiles('toto', {})).toEqual(['data.txt']);
  });

  it('should return undefined on getFiles with no provider', async () => {
    const savim = new Savim();
    expect(await savim.getFiles('toto')).toBeUndefined();
  });
});
