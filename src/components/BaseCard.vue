<template>
  <div class="card light uk-animation-fade" >
    <div class="uk-flex uk-flex-between uk-width-expand">
      <div class="card-header-left" :data-text="displayDate">
        {{ stonk.symbol }}
      </div>
      <div class="card-header-right" data-text="paid price">
        {{ stonk.bought_price }}
      </div>
    </div>

    <!-- <BaseChart title="Chart title" :chart="stonk.chart"/> -->

    <div class="card-title">{{ stonk.name }}</div>
    <div class="uk-flex uk-flex-middle">
      <span class="card-text-accent">{{ stonk.shares }} </span>
      <span class="card-text-small uk-text-uppercase"> {{ countLegend }}</span>
    </div>
    <div class="card-subtitle">current price</div>
    <div class="card-text-large">
      {{ marketprice }}
    </div>

    <div v-if="oldVal" class="uk-animation-fade">
      <span class="card-text-accent">{{ amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) }} </span>
      <BasePercentChange :oldVal="Number(oldVal)" :newVal="Number(newVal)"></BasePercentChange>
    </div>

    <div class="uk-flex uk-flex-between uk-width-expand uk-margin-small-top">
      
      <BaseButton
        @btnClick="btnHandler('sell')"
        text="sell"
        type="outline"
        color="light"
        size="small"
      />
      
      <BaseButton
        @btnClick="btnHandler('buy')"
        text="buy"
        type="outline"
        color="light"
        size="small"
      />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "vue";
import { formatDate } from "@/composables/useUtils";
import store from "../store";
import stocks from "@/composables/fetchStocks";
import BasePercentChange from "@/components/BasePercentChange";
import BaseButton from "@/components/BaseButton";
import BaseChart from "@/components/BaseChart";

export default {
  props: ["stonk", "tradetype", "isGrouped"],
  name: "BaseCard",
  components: {
    BasePercentChange,
    BaseButton,
    BaseChart
  },
  emits: ["btnClick"],
  setup(props, { emit }) {
    const oldVal = ref(0);
    const newVal = ref(0);

    const countLegend = ref("");
    const tradetype = ref("");
    const marketprice = ref("0");
    // const stockchange = ref("");
    const amount = computed(() =>
      (marketprice.value * props.stonk.shares)
    );
    const displayDate = computed(
      () => formatDate(props.stonk.date)
      // moment(props.stonk.date)
    );
    // const tendies = ref(true);

    const btnHandler = (type) => {
      let data = {
        type: type,
        stonk: props.stonk,
      };
      tradetype.value = type;
      
      emit("btnClick", data);
    };

    const getMarketprice = async () => {
      // console.log(props.stonk)

      const result = await stocks.details(props.stonk.symbol);
      // console.log('getMarketprice', result);
      marketprice.value = result.meta.regularMarketPrice.toFixed(2) || props.stonk.bought_price;

      let val = {
        symbol: props.stonk.symbol,
        market_price: marketprice.value,
        chart: {
          labels: result.timestamp,
          // close | high | low | open | volume
          data: result.indicators.quote[0].close,
          title: 'close'
        }
      };

      if (marketprice.value > 0) {
        store.commit("setMarketPrice", val);
      }
    };

    onMounted(() => {
      getMarketprice();
    });

    watchEffect(() => {
      oldVal.value = props.stonk.bought_price * props.stonk.shares;
      newVal.value = marketprice.value * props.stonk.shares;
      countLegend.value = props.stonk.shares > 1 ? "shares" : "share";
      // console.log(props);
    });

    return {
      formatDate,
      btnHandler,
      amount,
      marketprice,
      tradetype,
      oldVal,
      newVal,
      displayDate,
      countLegend,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/global.scss";

// .grouped {
//   background: #e0cc95;
//   box-shadow: 5px 5px #f1d5879d;
// }

.card {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 20px;
  line-height: 1;
  background: $theme1-primary-800;
  color: $theme1-primary-400;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  padding: 10px 0 4px 0;
}

.card-subtitle {
  font-size: 12px;
  font-weight: 200;
  text-transform: uppercase;
  opacity: 0.5;
  padding: 10px 0 4px 0;
}

.card-text-small {
  font-size: 12px;
  font-weight: 200;
}

.card-text-large {
  font-size: 2em;
  font-weight: 600;
  padding-bottom: 6px;

  .fa-gem {
    font-size: 1.6rem;
    opacity: 0.4;
    margin-right: 4px;
  }
}

.card-text-accent {
  font-size: 1.3em;
  font-weight: 600;
  padding: 6px;
  color: $theme1-primary-600;

  .fa-gem {
    font-size: 1.6rem;
    opacity: 0.4;
    margin-right: 4px;
  }
}

.card-header-left {
  position: relative;
  font-size: 1em;
  font-weight: 600;
  font-style: italic;
  color: $theme1-primary-600;
  padding-right: 4px;

  &::before {
    content: attr(data-text);
    position: absolute;
    // color: $accent-200;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    text-align: left;
    top: -10px;
    left: 0;
    opacity: 0.5;
    width: 160px;
  }
}

.card-header-right {
  position: relative;
  font-size: 1em;
  font-weight: 600;
  color:$theme1-primary-600;

  &::before {
    content: attr(data-text);
    position: absolute;
    font-size: 10px;
    text-transform: uppercase;
    text-align: right;
    top: -10px;
    right: 0;
    opacity: 0.5;
    width: 160px;
  }
}
</style>