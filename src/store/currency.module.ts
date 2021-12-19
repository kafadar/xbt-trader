import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';

// eslint-disable-next-line import/no-cycle
import { State } from '.';

// services
import { getMarketSummary } from '@/services/api.service';
import { formatMoney } from '@/services/misc.service';

// types
import { SecondaryCurrencyDictionary } from '@/types/constants';
import { CurrencyMarketSummary, SecondaryCurrency, SelectOption } from '@/types';

Vue.use(Vuex);

export interface CurrencyState {
  MarketSummaries: Array<CurrencyMarketSummary>;
  SecondaryCurrency: SelectOption | null;
}

type Context = ActionContext<CurrencyState, State>;

export default {
  state: (): CurrencyState => ({
    MarketSummaries: Array<CurrencyMarketSummary>(),
    SecondaryCurrency: null,
  }),
  getters: {
    SecondaryCurrency: (state: CurrencyState) => state.SecondaryCurrency,
    // eslint-disable-next-line max-len
    CurrencyMarketSummary: (state: CurrencyState) => (code: SecondaryCurrency): CurrencyMarketSummary | undefined => state.MarketSummaries.find((x: CurrencyMarketSummary) => x.Code === code),
    // eslint-disable-next-line max-len
    PriceXbt: (state: CurrencyState) => (code: SecondaryCurrency, formatted = false): number | string | null => {
      const curr = state.MarketSummaries.find((x: CurrencyMarketSummary) => x.Code === code);

      if (curr === undefined) return null;

      if (formatted) return formatMoney(curr.Summary.CurrentLowestOfferPrice);

      return curr.Summary.CurrentLowestOfferPrice;
    },
    // eslint-disable-next-line max-len
    PriceCurrency: (state: CurrencyState) => (code: SecondaryCurrency, fixedNum = 10): string | null => {
      const curr = state.MarketSummaries.find((x: CurrencyMarketSummary) => x.Code === code);

      if (curr === undefined) return null;

      return (1 / curr.Summary.CurrentHighestBidPrice).toFixed(fixedNum);
    },
  },
  mutations: {
    SetSummaries(state: CurrencyState, summaries: Array<CurrencyMarketSummary>): void {
      state.MarketSummaries = summaries;
    },
    SetSecondaryCurrency(state: CurrencyState, currency: SelectOption): void {
      state.SecondaryCurrency = currency;
    },
  },
  actions: {
    async LoadCurrencyMarketSummaries(context: Context): Promise<Array<CurrencyMarketSummary>> {
      const result: Array<CurrencyMarketSummary> = Array<CurrencyMarketSummary>();

      Promise.all(
        SecondaryCurrencyDictionary.map(async (x: SelectOption) => {
          const marketSummary = await getMarketSummary(x.Code as SecondaryCurrency);
          return { Code: x.Code as SecondaryCurrency, Summary: marketSummary };
        }),
      ).then((summaries:Array<CurrencyMarketSummary>) => {
        result.push(...summaries);
        context.commit('SetSummaries', summaries);
      });

      return result;
    },
  },
};
