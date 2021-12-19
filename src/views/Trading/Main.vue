<template>
  <div class="flex flex-col items-end">
      <l-select
        class="mb-10"
      />

      <div class="w-430">
        <div class="flex justify-between items-baseline">
          <l-tab label="Buy" :activeTab="activeTab" @select="setActive"/>
          <l-tab label="Sell" :activeTab="activeTab" @select="setActive"/>
        </div>
        <div class="trade-form bg-white rounded-b">

          <div class="mb-8">
            <h2 class="font-semibold">Live Price</h2>
            <div class="text-xl" v-show="activeTab === 'Buy'">
              1 BTC /
              <span class="font-bold">
              {{ liveBitcoinPriceFormatted }}
              {{ secondaryCurrencyDisplayCode }}
            </span>
            </div>
            <div class="text-xl" v-show="activeTab === 'Sell'">
              1 {{ secondaryCurrencyDisplayCode }} /
              <span class="font-bold">
              {{ liveSecondaryCurrencyPrice }}
              BTC
            </span>
            </div>
          </div>

          <div>
            <router-view />
          </div>

        </div>
    </div>
  </div>
</template>

<script lang="ts">
// vue dependencies
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

// custom-components
import LIcon from '@/components/LIcon.vue';
import LSelect from '@/components/LSelect.vue';
import LTab from '@/components/LTab.vue';
import LInput from '@/components/LInput.vue';
import LButton from '@/components/LButton.vue';

// types
import { SelectOption } from '@/types';

@Component({
  components: {
    LIcon,
    LSelect,
    LTab,
    LInput,
    LButton,
  },
  computed: {
    ...mapGetters({
      getBitcoinPrice: 'PriceXbt',
      getCurrencyPrice: 'PriceCurrency',
      secondaryCurrency: 'SecondaryCurrency',
    }),
  },
})
export default class Trading extends Vue {
  // vuex-bindings
  getBitcoinPrice!: () => any;

  getCurrencyPrice!: () => any;

  secondaryCurrency!: SelectOption;

  // data
  activeTab = 'Buy';

  // computed
  get secondaryCurrencyDisplayCode(): string {
    return this.secondaryCurrency?.Text;
  }

  get liveBitcoinPriceFormatted(): string {
    return this.getBitcoinPrice(this.secondaryCurrency?.Code, true);
  }

  get liveSecondaryCurrencyPrice(): number {
    return this.getCurrencyPrice(this.secondaryCurrency?.Code);
  }

  // methods

  setActive(tab: string): void {
    if (this.activeTab === tab) return;

    this.activeTab = tab;
    this.$router.push({ name: tab.toLowerCase() });
  }

  mounted(): void {
    if (this.$route.name === this.activeTab.toLowerCase()) return;

    this.$router.push({ name: this.activeTab.toLowerCase() });
  }
}
</script>

<style>
.w-430 {
  width: 430px;
}

.trade-form {
  padding: 35px 30px 45px 30px;
}
</style>
