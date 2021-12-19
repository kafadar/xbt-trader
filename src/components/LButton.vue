<template>
  <div
    class="l-button"
    :class="{'disabled': disabled}"
  >
      {{ label }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  props: {
    label: String,
    disabled: Boolean,
  },
})
export default class LButton extends Vue {

}
</script>

<style>
.l-button {
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;

  width: 150px;
  height: 50px;

  font-weight: 500;
  font-size: 18px;
  line-height: 21px;

  background: #FE9A01;
  border-radius: 78px;

  cursor: pointer;
}

.l-button.disabled {
  background: #666;
}
</style>
