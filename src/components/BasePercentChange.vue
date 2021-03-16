<template>
  <span
    v-if="percentchange"
    class="percent-change uk-animation-fade"
    :class="{ 'uk-text-success': tendies, 'uk-text-danger': !tendies }"
  >
    <span v-if="tendies" uk-icon="triangle-up"></span>
    <span v-if="!tendies" uk-icon="triangle-down"></span>
    <span>{{ percentchange }}%</span>
  </span>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
  name: "BasePercentChange",
  props: {
    oldVal: Number,
    newVal: Number,
  },
  setup(props) {
    const percentchange = ref(0);
    const tendies = ref(false);

    const getPercentChange = () => {
      let diff = props.newVal - props.oldVal;
      tendies.value = diff > 0 ? true : false;
      let res = Math.abs((diff * 100) / props.oldVal).toFixed(2);
      return Number(res);
    };

    watchEffect(() => {
      percentchange.value = getPercentChange();
    });
    return { percentchange, tendies };
  },
};
</script>

<style>
.percent-change {
  justify-content: center;
  align-items: center;
  margin-left: 4px;
  font-size: 12px;
  padding: 2px 6px;
}
</style>