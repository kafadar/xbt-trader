export type OnlyPrimaryCurrency = 'Xbt';
export type SecondaryCurrency = 'Usd' | 'Aud' | 'Nzd' | 'Sgd';

export interface MarketSummary{
  CreatedTimestampUtc: string;
  CurrentHighestBidPrice: number;
  CurrentLowestOfferPrice: number;
  PrimaryCurrencyCode: OnlyPrimaryCurrency;
  SecondaryCurrencyCode: SecondaryCurrency;
  Message?: string;
}

export interface CurrencyMarketSummary {
  Code: SecondaryCurrency;
  Summary: MarketSummary;
}

export interface SelectOption {
  Code: string;
  Text: string;
}
