import Vue from 'vue';
import Vuex from 'vuex';

// eslint-disable-next-line import/no-cycle
import currencyModule, { CurrencyState } from './currency.module';

Vue.use(Vuex);

export interface State {
  currModule: CurrencyState;
}

export default new Vuex.Store<State>({
  modules: {
    currency: currencyModule,
  },
});
