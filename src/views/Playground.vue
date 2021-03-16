<template>
  <div>percent change</div>
  <div class="uk-width-1-2">
    <input type="number" class="uk-input" v-model.number="oldVal" />
    <input type="number" class="uk-input" v-model.number="newVal" />
  </div>
  <BasePercentChange :oldVal="oldVal" :newVal="newVal"></BasePercentChange>
</template>

<script>
import BasePercentChange from "@/components/BasePercentChange";
import { ref } from "vue";
export default {
  name: "Playground",
  components: {
    BasePercentChange,
  },
  setup() {
    const oldVal = ref(0);
    const newVal = ref(0);

    return { oldVal, newVal };
  },
};
</script>

<style>
</style>