[![Test Coverage](https://api.codeclimate.com/v1/badges/82ebbb63cf10115c4a09/test_coverage)](https://codeclimate.com/github/flexper/savim/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/82ebbb63cf10115c4a09/maintainability)](https://codeclimate.com/github/flexper/savim/maintainability) ![npm](https://img.shields.io/npm/v/savim) ![npm](https://img.shields.io/npm/dm/savim) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/savim) ![NPM](https://img.shields.io/npm/l/savim)

# Savim

A simple library to send email cross providers.

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

## Tests

To execute jest tests (all errors, type integrity test)

```
pnpm test
```

## Maintain

This package use [TSdx](https://github.com/jaredpalmer/tsdx). Please check documentation to update this package.
