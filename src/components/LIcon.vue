<template>
  <img
    :src="iconSource()"
    class="inline-block"
    :class="{'round-clipped' : rounded}"
    width="29"
    :alt="tag"
  />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  props: {
    tag: {
      type: String,
      required: true,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
  },
})
export default class LIcon extends Vue {
  iconSource(): string {
    const images = require.context('../assets/icons/', false, /\.svg$/);
    return images(`./${this.tag.toLowerCase()}.svg`);
  }
}
</script>

<style scoped>
.round-clipped {
  clip-path: circle(10px at center);
}
</style>
