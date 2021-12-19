<template>
  <div>
    <div class="mb-5">
      <h2 class="text-sm mb-3">You pay</h2>
      <l-input
        :amount.sync="primaryCurrencyAmount"
        :currency="primaryCurrency"
      />
    </div>
    <div class="mb-16">
      <h2 class="text-sm mb-3">You receive</h2>
      <l-fake-input
        :amount="secondaryCurrencyAmount"
        :currency="secondaryCurrency"
      />
    </div>
    <l-button label="Sell" @click.native="confirm" :disabled="nothing2trade"/>
  </div>
</template>

<script lang="ts">
// vue dependencies
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

// custom-components
import LInput from '@/components/LInput.vue';
import LFakeInput from '@/components/LFakeInput.vue';
import LButton from '@/components/LButton.vue';

// types
import { SecondaryCurrency, SelectOption } from '@/types';
import { PrimaryCurrency } from '@/types/constants';

@Component({
  components: {
    LInput,
    LButton,
    LFakeInput,
  },
  computed: {
    ...mapGetters({
      bitcoinPrice: 'PriceXbt',
      secondaryCurrency: 'SecondaryCurrency',
    }),
  },
})
export default class Sell extends Vue {
  // vuex-bindings
  bitcoinPrice!: () => any;

  secondaryCurrency!: SelectOption;

  // data
  primaryCurrency: SelectOption = PrimaryCurrency;

  primaryCurrencyAmount = 0;

  // computed
  get secondaryCurrencyAmount(): number {
    if (!this.bitcoinPrice) return 0;

    return this.bitcoinPrice(this.secondaryCurrency?.Code) * this.primaryCurrencyAmount;
  }

  get nothing2trade(): boolean {
    return this.primaryCurrencyAmount === 0;
  }

  // methods
  confirm(): void {
    if (this.nothing2trade) return;

    this.$router.push({
      name: 'confirm',
      params: {
        action: 'sold',
        primary: `${this.primaryCurrencyAmount} ${this.primaryCurrency.Text}`,
        secondary: `${this.secondaryCurrencyAmount} ${this.secondaryCurrency.Text}`,
      },
    });
  }
}
</script>
