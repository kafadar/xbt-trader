<template>
  <div class="full-height flex justify-center items-center border-gray-800">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { CURRENCY_SUMMARY_INTERVAL_MILL } from '@/types/constants';

@Component({})
export default class App extends Vue {
  updateInterval = null

  created(): void {
    document.addEventListener('beforeunload', () => {
      clearInterval(this.updateInterval);
    });
  }

  mounted(): void {
    this.$store.dispatch('LoadCurrencyMarketSummaries');

    this.updateInterval = setInterval(() => {
      this.$store.dispatch('LoadCurrencyMarketSummaries');
    }, CURRENCY_SUMMARY_INTERVAL_MILL);
  }
}
</script>

<style>
.full-height {
  height: 100vh;
}
</style>
