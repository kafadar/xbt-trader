<template>
  <div>
    <div class="relative">
      <div
        v-if="selected"
        class="flex px-4 py-2 cursor-pointer rounded bg-white"
        @click="optionsVisible = !optionsVisible"
      >
        <l-icon class="mr-2" :tag="selected.Code"/>
        {{ selected.Text }}
        <img
          class="ml-4"
          src="@/assets/icons/chevron.svg"
          alt="chevron"
        />
      </div>
      <div v-show="optionsVisible" class="absolute top-12 right-0 bg-gray-300 rounded">
        <div
          class="flex px-4 py-2 cursor-pointer rounded hover:bg-gray-400"
          :key="option.Code"
          v-for="option in notSelectedOptions"
          @click="selectOption(option)"
        >
          <l-icon class="mr-2" :tag="option.Code"/>
          {{ option.Text }}
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
// vue dependencies
import { Vue, Component } from 'vue-property-decorator';

// services
import { loadSecondaryCurrency, saveSecondaryCurrency } from '@/services/local-storage.service';

// custom-components
import LIcon from '@/components/LIcon.vue';

// types
import { SecondaryCurrency, SelectOption } from '@/types';
import { SecondaryCurrencyDictionary } from '@/types/constants';

@Component({
  components: {
    LIcon,
  },
})
export default class LSelect extends Vue {
  selected: SelectOption | null = null;

  currencies: Array<SelectOption> = SecondaryCurrencyDictionary;

  optionsVisible = false;

  get notSelectedOptions(): Array<SelectOption> {
    return this.currencies.filter((x: SelectOption) => x !== this.selected);
  }

  selectOption(option: SelectOption): void {
    this.selected = option;
    this.optionsVisible = false;
    this.$store.commit('SetSecondaryCurrency', option);
    saveSecondaryCurrency(this.selected.Code as SecondaryCurrency);
  }

  mounted(): void {
    const savedCode = loadSecondaryCurrency();
    this.selected = this.currencies.find((x: SelectOption) => x.Code === savedCode)
      || null;
    this.$store.commit('SetSecondaryCurrency', this.selected);
  }
}
</script>
