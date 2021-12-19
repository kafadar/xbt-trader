import { SelectOption } from '@/types/index';

export const CURRENCY_SUMMARY_INTERVAL_MILL = 15000;

export const PrimaryCurrency:
  SelectOption = { Code: 'Xbt', Text: 'BTC' };

export const SecondaryCurrencyDictionary:
  Array<SelectOption> = [
    { Code: 'Aud', Text: 'AUD' },
    { Code: 'Nzd', Text: 'NZD' },
    { Code: 'Sgd', Text: 'SGD' },
    { Code: 'Usd', Text: 'USD' },
  ];
