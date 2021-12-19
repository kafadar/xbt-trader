import { MarketSummary, OnlyPrimaryCurrency, SecondaryCurrency } from '@/types';

const PRIMARY_API_ROOT = 'https://proxy.independentreserve.com/Public';

export const getMarketSummary = async (
  secondaryCurrency: SecondaryCurrency,
  primaryCurrency: OnlyPrimaryCurrency = 'Xbt',
)
: Promise<MarketSummary> => {
  if (!secondaryCurrency) return Promise.reject(new Error('NO_SECONDARY_CURRENCY_PROVIDED'));

  const params: URLSearchParams = new URLSearchParams(
    {
      primaryCurrencyCode: primaryCurrency,
      secondaryCurrencyCode: secondaryCurrency,
    },
  );
  const response = await fetch(`${PRIMARY_API_ROOT}/GetMarketSummary?${params.toString()}`);
  const marketSummary: MarketSummary = await response.json();

  if (marketSummary.Message) return Promise.reject(new Error(marketSummary.Message));

  return marketSummary;
};

export default {
  getMarketSummary,
};
