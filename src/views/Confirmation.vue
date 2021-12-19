<template>
 <div class="text-center text-white font-bold text-4xl">
   You {{ props.action }} {{ props.primary }} <br> for {{ props.secondary }}
 </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
})
export default class Confirmation extends Vue {
  get props() {
    return this.$route.params;
  }
}
</script>
