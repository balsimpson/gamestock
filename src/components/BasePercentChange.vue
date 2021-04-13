<template>
  <span
    v-if="changeDisplay"
    class="percent-change uk-animation-fade"
    :class="{ 'uk-text-success': tendies, 'uk-text-danger': !tendies }"
  >
    <span v-if="tendies" uk-icon="triangle-up"></span>
    <span v-if="!tendies" uk-icon="triangle-down"></span>
    <span @click="showVal()">{{ changeDisplay }}</span>
  </span>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
export default {
  name: "BasePercentChange",
  props: {
    oldVal: Number,
    newVal: Number,
  },
  setup(props) {
    const percentchange = ref(0);
    const valuechange = ref(0);
    const showpercent = ref(true);
    const changeDisplay = ref();
    const tendies = ref(false);

    const getPercentChange = () => {
      if (Number(props.newVal) && Number(props.oldVal)) {
        let diff = props.newVal - props.oldVal;
        valuechange.value = Math.abs(diff).toFixed(2);
        tendies.value = diff > 0 ? true : false;
        let res = (diff * 100) / props.oldVal;
        // console.log("res", Math.abs(res).toFixed(2));
        return Math.abs(res);
      } else {
        // console.log("newVal", props.newVal);
        // console.log("oldVal", props.oldVal);
        return
      }
    };

    const showVal = () => {
      // console.log(showpercent.value, props.oldVal, props.newVal);
      if (showpercent.value && Number(percentchange.value)) {
        // console.log('showpercent.value', showpercent.value, Number(percentchange.value));
        changeDisplay.value = (percentchange.value).toFixed(2) + "%";
        showpercent.value = !showpercent.value;
      } else {
        changeDisplay.value = valuechange.value;
        showpercent.value = !showpercent.value;
      }
    };

    onMounted(() => {
      showVal();
    });

    watchEffect(() => {
      percentchange.value = getPercentChange();
      if (Number(percentchange.value)) {
        changeDisplay.value = (percentchange.value).toFixed(2) + "%";
      }
    });

    return { percentchange, valuechange, changeDisplay, tendies, showVal };
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
  cursor: pointer;
}
</style>