<template>
  <div class="uk-container">
    what is 
    <div>percent change</div>
    <div class="uk-width-1-2">
      <input type="number" class="uk-input" v-model.number="oldVal" />
      <input type="number" class="uk-input" v-model.number="newVal" />
    </div>
    <BasePercentChange :oldVal="oldVal" :newVal="newVal"></BasePercentChange>

    <div>Update store array</div>
    <div class="uk-width-1-2">
      <input type="number" class="uk-input" v-model.number="marketprice" />
    </div>
  </div>
</template>

<script>
import BasePercentChange from "@/components/BasePercentChange";
import { ref, watchEffect } from "vue";
import store from "../store";

export default {
  name: "Playground",
  components: {
    BasePercentChange,
  },
  setup(_, { commit }) {
    const oldVal = ref(0);
    const newVal = ref(0);
    const marketprice = ref(0);

    watchEffect(() => {
      let val = {
        symbol: "GME",
        market_price: marketprice.value,
      };

      if (marketprice.value > 0) {
        store.commit("setMarketPrice", val);
        console.log(marketprice.value);
      } else {
        
      }
    });

    return { oldVal, newVal, marketprice };
  },
};
</script>

<style>
</style>