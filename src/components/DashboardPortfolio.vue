<template>
  <div class="uk-text-left">
    <div class="uk-text-small uk-text-uppercase">
      <i
        v-if="icon"
        class="fas uk-margin-small-right"
        :class="'fa-' + icon"
      ></i>
      <span class="uk-text-bold">
        {{ title }}
      </span>
    </div>
    <div
      class="uk-text-large uk-text-bold uk-flex uk-flex-middle uk-animation-fade"
    >
      {{
        value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      }}
      <BasePercentChange
        :oldVal="Number(oldVal)"
        :newVal="Number(newVal)"
      ></BasePercentChange>
    </div>
    <div>
      <span class="uk-text-bold">{{ count_company }} </span>
      <span class="uk-text-uppercase"> {{ subtitleOneTxt }}</span>
      |

      <span class="uk-text-bold">{{ count_shares }}</span>
      <span class="uk-text-uppercase"> {{ subtitleTwoTxt }}</span>
    </div>
  </div>
</template>

<script>
import BasePercentChange from "@/components/BasePercentChange";
import { computed } from "vue";
export default {
  props: {
    title: String,
    icon: String,
    value: [String, Number],
    oldVal: [String, Number],
    newVal: [String, Number],
    count_company: [Number],
    count_shares: [Number],
    stonks: Array,
  },
  components: {
    BasePercentChange,
  },
  setup(props) {

    const subtitleOneTxt = computed(() =>
      props.count_company === 1 ? " company" : " companies"
    );

    const subtitleTwoTxt = computed(() =>
      props.count_shares === 1 ? " share" : " shares"
    );

    return { subtitleOneTxt, subtitleTwoTxt };
  },
};
</script>

<style>
</style>