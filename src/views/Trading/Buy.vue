<template>
  <div>
    <div class="mb-5">
      <h2 class="text-sm mb-3">You pay</h2>
      <l-input
        :amount.sync="secondaryCurrencyAmount"
        :currency="secondaryCurrency"
      />
    </div>
    <div class="mb-16">
      <h2 class="text-sm mb-3">You receive</h2>
      <l-fake-input
        :amount="primaryCurrencyAmount"
        :currency="primaryCurrency"
      />
    </div>
    <l-button label="Buy" @click.native="confirm" :disabled="nothing2trade"/>
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
import { SelectOption } from '@/types';
import { PrimaryCurrency } from '@/types/constants';

@Component({
  components: {
    LInput,
    LButton,
    LFakeInput,
  },
  computed: {
    ...mapGetters({
      currencyPrice: 'PriceCurrency',
      secondaryCurrency: 'SecondaryCurrency',
    }),
  },
})
export default class Buy extends Vue {
  // vuex-bindings
  currencyPrice!: () => any;

  secondaryCurrency!: SelectOption;

  // data
  primaryCurrency: SelectOption = PrimaryCurrency;

  secondaryCurrencyAmount = 0;

  // computed
  get primaryCurrencyAmount(): number {
    if (!this.currencyPrice || !this.secondaryCurrency) return 0;

    return this.currencyPrice(this.secondaryCurrency?.Code) * this.secondaryCurrencyAmount;
  }

  get nothing2trade(): boolean {
    return this.secondaryCurrencyAmount === 0;
  }

  // methods
  confirm(): void {
    if (this.nothing2trade) return;

    this.$router.push({
      name: 'confirm',
      params: {
        action: 'bought',
        primary: `${this.primaryCurrencyAmount} ${this.primaryCurrency.Text}`,
        secondary: `${this.secondaryCurrencyAmount} ${this.secondaryCurrency.Text}`,
      },
    });
  }
}
</script>
