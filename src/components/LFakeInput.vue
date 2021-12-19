<template>
  <div class="flex" v-if="currency">
    <div
      class="w-1/4 py-2 px-3 bg-gray-200 border-2 border-r-0 rounded-l"
    >
      <l-icon
        :tag="currency.Code"
        rounded
      />
      <span> {{ currency.Text }} </span>
    </div>
    <div class="flex-grow flex items-center px-2 border-2 rounded-r">{{ amount }} </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

// custom-components
import LIcon from '@/components/LIcon.vue';

@Component({
  components: {
    LIcon,
  },
  props: {
    currency: {
      required: true,
    },
    amount: {
      required: true,
    },
  },
})
export default class LFakeInput extends Vue {
}
</script>
