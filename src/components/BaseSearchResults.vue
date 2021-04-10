<template>
  <!-- <router-link :to="{name: 'Details', params: { id: result.symbol}}"> -->
  <div
  v-if="results"
    class="uk-grid-small uk-grid-match uk-child-width-1-3@s uk-text-center"
    uk-grid
  >
    <div v-for="result in results" :key="result.symbol">
      <a @click="btnHandler(result)">
        <div
          class="uk-card uk-card-default uk-card-small uk-card-body search-card"
        >
          <div class="search-card-symbol">{{ result.symbol }}</div>
          <div class="search-card-name">{{ result.shortname }}</div>

          <div
            class="uk-flex uk-flex-middle uk-margin-top uk-flex-between uk-width-expand"
          >
            <div>
              <div class="search-card-exchange">
                {{ result.exchange }}
              </div>
              <div class="search-card-exchange-title">exchange</div>
            </div>

            <div class="search-card-type">
              {{ result.quoteType }}
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
  <div class="uk-width-expand">{{ displayMsg }}</div>
</template>

<script>
import { ref, reactive, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import stocks from "@/composables/fetchStocks";
import BaseCounter from "@/components/BaseCounter";
import BaseCard from "@/components/BaseCard";
export default {
  components: {
    BaseCounter,
    BaseCard
  },
  props: ["results", "displayMsg"],
  emits: ["showModal"],
  setup(props, { emit }) {
    const store = useStore();
    const symbol = ref("");
    const amountHeader = ref("");
    const amount = computed(() =>
      (stonk.market_price * count.value).toFixed(2)
    );
    const count = ref(0);

    // console.log('search results', props.results);
    // const price = ref("0");
    // const marketprice = ref(0);
    const needConfirmation = ref(false);

    const wallet = ref(0);
    const stonk = reactive({
      name: "",
      symbol: "",
      type: "",
      bought_price: 0,
      market_price: 0,
      currency: "",
      shares: 0,
      date: Date.now(),
      exchangeName: "",
      regularMarketTime: "",
      previousClose: 0,
    });

    const maxCount = computed(() => {
      return parseInt(wallet.value / stonk.market_price);
    });

    const getMarketprice = async (data) => {
      const result = await stocks.details(data.symbol);
      stonk.name = data.shortname;
      stonk.symbol = data.symbol;
      stonk.type = data.typeDisp;
      stonk.bought_price = result.meta.regularMarketPrice.toFixed(2);
      stonk.market_price = result.meta.regularMarketPrice.toFixed(2);
      stonk.currency = result.meta.currency;
      stonk.exchangeName = result.meta.exchangeName;
      stonk.exchangeTimezone = result.meta.exchangeTimezoneName;
      stonk.regularMarketTime = result.meta.regularMarketTime;
      stonk.previousClose = result.meta.previousClose || 'not available';

      console.log("stonk", stonk);
    };

    const btnHandler = async (result) => {
      console.log("clicked", result);
      let data = {
        type: "buy",
        stonk: stonk,
      };
      emit("showModal", data);
      await getMarketprice(result);
    };

    const buyStock = () => {
      stonk.shares = count.value;

      let data = {
        stonk: stonk,
        wallet: {
          wallet: balance.value,
        },
      };
      store.dispatch("buyStonk", data);
    };

    const countChange = (evt) => {
      count.value = evt.value;
    };

    let balance = computed(() => {
      return wallet.value - amount.value;
    });

    watchEffect(() => {
      wallet.value = store.state.wallet;
    });

    return {
      stonk,
      countChange,
      getMarketprice,
      buyStock,
      amountHeader,
      symbol,
      amount,
      count,
      balance,
      wallet,
      maxCount,
      needConfirmation,
      btnHandler,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/global.scss";

a:hover {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
.btn-confirmation {
  background: transparent;
  border: 1px solid #6a7d91;
  text-transform: uppercase;
  border-radius: 2px;
  color: #6a7d91;
  padding: 4px 10px;
  font-size: 12px;
}
.search-card {
  background: $light-accent-200;
  color: $light-contrast-300;
  border-radius: 10px;
  transition: background 0.2s ease-out;

  &:hover {
    background: $light-accent-100;
  }
}
.search-card-symbol {
  font-weight: 600;
  // color: $color-accent;
}

.search-card-name {
  font-weight: 400;
  font-size: 12px;
}

.search-card-exchange {
  /* border: 1px solid; */
  font-weight: 600;
  font-size: 12px;
  line-height: 1;
  text-align: left;
}

.search-card-exchange-title {
  /* border: 1px solid; */
  font-weight: 300;
  font-size: 8px;
  text-align: left;
  text-transform: uppercase;
}

.search-card-type {
  /* border: 1px solid; */
  font-size: 12px;
  line-height: 1;
}
</style>