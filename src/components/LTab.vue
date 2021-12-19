<template>
  <div
    class="flex-grow text-center tab cursor-pointer"
    :class="{ 'active': active }"
    @click="tabSelected"
  >
    <span class="text-xl font-bold">
      {{ label }}
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  props: {
    label: String,
    activeTab: String,
  },
})
export default class LTab extends Vue {
  get active(): boolean {
    return this.label === this.activeTab;
  }

  tabSelected(): void {
    this.$emit('select', this.label);
  }
}
</script>

<style>
.tab {
  padding-top: 12px;
  padding-bottom: 10px;

  color: #6B7176;

  background:
    linear-gradient(
      90deg,
      #C5C5C5 -28.11%,
      rgba(219, 220, 223, 0.851047) 12.12%,
      rgba(222, 223, 226, 0.833333) 100%);
}
.tab:first-child {
  border-radius: 5px 0 0 0;
}
.tab:last-child {
  border-radius: 0 5px 0 0;
}

.tab:not(.active):hover {
  padding-top: 16px;
}
.tab.active {
  padding-top: 19px;
  color: #000;
  border-radius: 5px 5px 0 0;
  background: white;
}
</style>
