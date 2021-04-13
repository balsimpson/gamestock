<template>
  <div class="uk-text-left">
    <div class="uk-text-small uk-text-uppercase">
      <i v-if="icon" class="fas uk-margin-small-right" :class="'fa-' + icon"></i>
      <span class="uk-text-bold">
        {{ title }}
      </span>
    </div>
    <div
      class="uk-text-large uk-text-bold uk-flex uk-flex-middle uk-animation-fade"
    >
      {{ value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}
      <BasePercentChange :oldVal="Number(oldVal)" :newVal="Number(newVal)"></BasePercentChange>
    </div>
    <div>
      <span class="uk-text-bold">{{ subtitleOne }} </span>
      <span class="uk-text-uppercase"> {{ subtitleOneTxt }}</span>
      |

      <span class="uk-text-bold">{{ subtitleTwo }}</span>
      <span class="uk-text-uppercase"> {{ subtitleTwoTxt }}</span>
    </div>
  </div>
</template>

<script>
import BasePercentChange from "@/components/BasePercentChange";
import { ref } from "@vue/reactivity";
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
export default {
  props: {
    title: String,
    icon: String,
    value: [String, Number],
    oldVal: [String, Number],
    newVal: [String, Number],
    stonks: Array,
  },
  components: {
    BasePercentChange,
  },
  setup(props) {
    const subtitleOne = ref("");
    const subtitleTwo = ref("");

    const getUniqueCompanyCount = () => {
      let grouped = groupBy(props.stonks, "symbol");
      let keys = Object.keys(grouped);
      return keys.length;
    };

    const getTotalShareCount = () => {
      let total = props.stonks.reduce(
        (prev, next) => prev + Number(next.shares),
        0
      );
      // console.log("total shares", total);
      return total;
    };


    const groupBySymbolHandler = () => {
      let grouped = groupBy(props.stonks, "symbol");

      let resultarr = [];

      let keys = Object.keys(grouped);
      console.log("keys", keys, props.stonks);

      for (const key of keys) {
        const element = grouped[key];

        if (element.length > 1) {
          let avg_price = 0;
          let total_shares = 0;
          let total_market_price = 0;
          let total_bought_price = 0;

          for (let i = 0; i < element.length; i++) {
            const el = element[i];
            total_shares += el.shares;
            total_market_price += Number(el.market_price) * Number(el.shares);
            total_bought_price += Number(el.bought_price);
          }
          console.log(
            "total_shares",
            total_shares,
            total_market_price,
            total_bought_price / element.length
          );

          element[0].isGrouped = true;
          element[0].shares = total_shares;
          element[0].buys = element.length;
          element[0].bought_price = total_bought_price / element.length;
          resultarr.push(element[0]);
        } else {
          element[0].isGrouped = false;
          resultarr.push(element[0]);
        }
        console.log(element.length);
      }
      console.log("resultarr", resultarr);
      return resultarr;
    };

    const groupBy = (xs, key) => {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };

    const subtitleOneTxt = computed(() =>
      subtitleOne.value === 1 ? " company" : " companies"
    );

    const subtitleTwoTxt = computed(() =>
      subtitleTwo.value === 1 ? " share" : " shares"
    );

    onMounted(() => {});

    watchEffect(() => {
      subtitleOne.value = getUniqueCompanyCount();
      subtitleTwo.value = getTotalShareCount();
    });

    return { subtitleOne, subtitleOneTxt, subtitleTwo, subtitleTwoTxt };
  },
};
</script>

<style>
</style>