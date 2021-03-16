<template>
  <!-- <router-link :to="{name: 'Details', params: { id: result.symbol}}"> -->
  <div
    class="uk-grid-small uk-grid-match uk-child-width-1-3@s uk-text-center"
    uk-grid
  >
    <div v-for="result in results" :key="result.symbol">
      <a @click="getMarketprice(result)" href="#modal-buy-search" uk-toggle>
        <div
          class="uk-card uk-card-default uk-card-small uk-card-body stock-card"
        >
          <div class="stock-card-symbol">{{ result.symbol }}</div>
          <div class="stock-card-name">{{ result.shortname }}</div>
          <div class="stock-card-region">{{ result["4. region"] }}</div>
          <div class="uk-flex uk-flex-between uk-width-expand">
            <div class="uk-width-1-4 stock-card-exchange">
              {{ result.exchange }}
            </div>

            <div class="uk-width-3-4 uk-text-right stock-card-type">
              {{ result.quoteType }}
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>

  <div class="" id="modal-buy-search" uk-modal>
    <div class="uk-modal-dialog uk-margin-auto-vertical modal">
      <button class="uk-modal-close-default" type="button" uk-close></button>

      <div class="uk-modal-header modal uk-flex uk-flex-middle">
        <div class="uk-modal-title uk-margin-large-right">
          <em>{{ stonk.symbol }}</em>
        </div>
        <div>
          <div class="header-price">
            <span class="header-price__currency">$</span
            ><span>{{ stonk.market_price }}</span>
          </div>
        </div>
      </div>

      <div class="uk-modal-body">
        <div class="uk-text-center">
          <BaseCounter
            v-on:count-change="countChange($event)"
            header="shares to buy"
            :maxCount="maxCount"
          />
        </div>

         
        <div class="uk-text-center uk-text-large">
          <div class="uk-text-small uk-text-uppercase">{{ amountHeader }}</div>
          <span class="uk-text-muted uk-text-light">$</span>{{ amount }}
        </div>
      </div>

      <div class="uk-modal-footer uk-flex uk-flex-between uk-flex-middle modal">
        <div>
          <div class="uk-flex uk-flex-middle" style="font-size: 12px">
            <i class="fas fa-wallet"></i
            ><span style="margin-left: 4px; text-transform: uppercase"
              >Wallet</span
            >
          </div>
          <div class="wallet-amount">
            <span class="wallet-amount__currency">$</span
            >{{ balance.toLocaleString() }}
          </div>
        </div>
        <div v-if="needConfirmation">
          <div>are you sure?</div>
          <div class="uk-flex uk-flex-between">
            <button class="btn-confirmation" href="#">yes</button>
            <button class="btn-confirmation" href="#">no</button>
          </div>
        </div>
        <button @click="buyStock" class="btn-trade" type="button">Buy</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import stocks from "@/composables/fetchStocks";
import BaseCounter from "@/components/BaseCounter";
export default {
  components: {
    BaseCounter,
  },
  props: ["results"],
  setup() {
    const store = useStore();
    const symbol = ref("");
    const amountHeader = ref("");
    const amount = computed(() => (stonk.market_price * count.value).toFixed(2));
    const count = ref(0);
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
      stonk.previousClose = result.meta.previousClose;
      
      console.log('stonk', stonk);
    };

    const buyStock = () => {
      stonk.shares = count.value;

      let data = {
        stonk: stonk,
        wallet: {
          wallet: balance.value
        }
      }
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
    };
  },
};
</script>

<style>
.btn-confirmation {
  background: transparent;
  border: 1px solid #6a7d91;
  text-transform: uppercase;
  border-radius: 2px;
  color: #6a7d91;
  padding: 4px 10px;
  font-size: 12px;
}

.stock-card-exchange {
  border: 1px solid;
  font-size: 12px;
  line-height: 2;
}
</style>