[![Test Coverage](https://api.codeclimate.com/v1/badges/82ebbb63cf10115c4a09/test_coverage)](https://codeclimate.com/github/qlaffont/savim/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/82ebbb63cf10115c4a09/maintainability)](https://codeclimate.com/github/qlaffont/savim/maintainability) ![npm](https://img.shields.io/npm/v/savim) ![npm](https://img.shields.io/npm/dm/savim) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/savim) ![NPM](https://img.shields.io/npm/l/savim)

# Savim

A simple library to send email cross providers. Old Owner: [@flexper](https://github.com/flexper)

## Usage

```typescript
import { Savim } from 'savim';

const savim = new Savim();

await savim.addProvider<SavimSampleProviderConfig>(SavimSampleProvider, {});
```

### addProvider(savimProvider, config?)

Add provider to savim

***Params***

| Field Name    | Type                                     | Default  | Description         |
| ------------- | ---------------------------------------- | -------- | ------------------- |
| savimProvider | Class implements SavimTransportInterface | required | Provider to use     |
| config        | object                                   | {}       | Config for provider |

### uploadFile(filenameWithPath, content, params?, providerName?)

Upload file

***Params***

| Field Name       | Type                 | Default  | Description                    |
| ---------------- | -------------------- | -------- | ------------------------------ |
| filenameWithPath | string               | required | where to upload file           |
| content          | string/Buffer/Stream | required | file content                   |
| config           | object               | {}       | Additional Config for provider |
| providerName     | object               | optional | provider name                  |

### getFile(filenameWithPath, params?, providerName?)

Get file

***Params***

| Field Name       | Type   | Default  | Description                    |
| ---------------- | ------ | -------- | ------------------------------ |
| filenameWithPath | string | required | where to get file              |
| config           | object | {}       | Additional Config for provider |
| providerName     | object | optional | provider name                  |

### deleteFile(filenameWithPath, params?, providerName?)

Delete file

***Params***

| Field Name       | Type   | Default  | Description                    |
| ---------------- | ------ | -------- | ------------------------------ |
| filenameWithPath | string | required | where to delete file           |
| config           | object | {}       | Additional Config for provider |
| providerName     | object | optional | provider name                  |

### createFolder(path, params?, providerName?)

Create folder

***Params***

| Field Name   | Type   | Default  | Description                    |
| ------------ | ------ | -------- | ------------------------------ |
| path         | string | required | where to create folder         |
| config       | object | {}       | Additional Config for provider |
| providerName | object | optional | provider name                  |

### deleteFolder(path, params?, providerName?)

Delete folder

***Params***

| Field Name   | Type   | Default  | Description                    |
| ------------ | ------ | -------- | ------------------------------ |
| path         | string | required | where to delete folder         |
| config       | object | {}       | Additional Config for provider |
| providerName | object | optional | provider name                  |

### getFolders(path, params?, providerName?)

Get folders path in path

***Params***

| Field Name   | Type   | Default  | Description                    |
| ------------ | ------ | -------- | ------------------------------ |
| path         | string | required | where to get folders           |
| config       | object | {}       | Additional Config for provider |
| providerName | object | optional | provider name                  |

### getFiles(path, params?, providerName?)

Get files path in path

***Params***

| Field Name   | Type   | Default  | Description                    |
| ------------ | ------ | -------- | ------------------------------ |
| path         | string | required | where to get files           |
| config       | object | {}       | Additional Config for provider |
| providerName | object | optional | provider name                  |

## Tests

To execute jest tests (all errors, type integrity test)

```
pnpm test
```

## Maintain

This package use [TSdx](https://github.com/jaredpalmer/tsdx). Please check documentation to update this package.
