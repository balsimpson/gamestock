<template>
  <div class="uk-container">
    <nav class="uk-flex uk-flex-between uk-flex-middle uk-margin-medium-top">
      <img
        src="../assets/paperhand_logo.png"
        alt=""
        style="width: 30%; height: auto; object-fit: contain"
      />

      <div>
        <div class="uk-flex uk-flex-middle">
          <img
            :src="photoURL"
            alt=""
            style="width: 16px; border-radius: 50%; margin-right: 6px"
          />
          <span class="user-name">{{ username }}</span>
        </div>

        <div class="uk-text-right">
          <button @click="signOut" class="btn-signout uk-text-right">
            sign out
          </button>
        </div>
      </div>
    </nav>

    <div class="uk-margin uk-container uk-container-small">
      <div>Search for a stock</div>
      <BaseSearch v-on:search-query="doSearch($event)" placeholder="e.g. GME" />
      <BaseSearchResults :results="searchResults" />
    </div>

    <div class="uk-flex uk-flex-middle uk-flex-between stock-overview">
      <div class="uk-text-left">
        <div class="uk-text-small uk-text-uppercase">Current Portfolio</div>
        <div
          class="uk-text-large uk-text-bold uk-flex uk-flex-middle uk-animation-fade"
        >
          ${{ investment }}
          <BasePercentChange :oldVal="oldVal" :newVal="newVal"></BasePercentChange>
          
        </div>
      </div>
      <!-- <div class="uk-text-large uk-text-uppercase" style="color: #6a7d91">
        Portfolio
      </div> -->
      <div>
        <div class="uk-text-small uk-text-uppercase uk-text-right">
          <i class="fas fa-wallet uk-margin-small-right"></i> Wallet
        </div>

        <div class="uk-text-large uk-text-bold uk-text-right uk-animation-fade">
          <span>${{ wallet.toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <div
      v-if="stonks.length"
      class="uk-grid-small uk-grid-match uk-child-width-1-2@s uk-text-center uk-text-center"
      uk-grid
    >
      <div v-for="stonk in stonks" :key="stonk.symbol">
        <BaseCard :stonk="stonk" />
      </div>
    </div>

    <div v-else>No stocks</div>

    <!-- <div class="uk-margin-large-top">
      <div class="uk-grid-collapse uk-child-width-expand table-header" uk-grid>
        <div class="uk-text-left">Symbol</div>
        <div class="uk-text-left">Name</div>
        <div class="uk-text-right">Shares</div>
        <div class="uk-text-right">Buying Price</div>
        <div class="uk-text-right">Current Price</div>
        <div class="uk-text-right">Value</div>
        <div class="uk-text-right">%Change</div>
      </div>

      <div class="uk-grid-collapse uk-child-width-expand table-item" uk-grid>
        <div class="uk-text-left">GME</div>
        <div class="uk-text-left">Gamestop</div>
        <div class="uk-text-right">200</div>
        <div class="uk-text-right">42</div>
        <div class="uk-text-right">48</div>
        <div class="uk-text-right">4,318</div>
        <div class="uk-text-right"><span uk-icon="triangle-up"></span>2.6%</div>
      </div>

      <div class="uk-grid-collapse uk-child-width-expand table-item" uk-grid>
        <div class="uk-text-left">GME</div>
        <div class="uk-text-left">Gamestop</div>
        <div class="uk-text-right">200</div>
        <div class="uk-text-right">42</div>
        <div class="uk-text-right">48</div>
        <div class="uk-text-right">4,318</div>
        <div class="uk-text-right">
          <span uk-icon="triangle-down"></span>2.6%
        </div>
      </div>

      <div class="uk-grid-collapse uk-child-width-expand table-item" uk-grid>
        <div class="uk-text-left">GME</div>
        <div class="uk-text-left">Gamestop</div>
        <div class="uk-text-right">200</div>
        <div class="uk-text-right">42</div>
        <div class="uk-text-right">48</div>
        <div class="uk-text-right">4,318</div>
        <div class="uk-text-right"><span uk-icon="triangle-up"></span>2.6%</div>
      </div>
    </div> -->

    <!-- <BaseChart /> -->
  </div>
</template>

<script>
import { computed, onMounted, ref, reactive, toRefs, watchEffect } from "vue";
import { mapState, mapGetters, useStore } from "vuex";
import Chart from "chart.js";
import BaseCard from "@/components/BaseCard.vue";
import BaseSearch from "@/components/BaseSearch.vue";
import BaseSearchResults from "@/components/BaseSearchResults.vue";
import BasePercentChange from "@/components/BasePercentChange";

import stocks from "@/composables/fetchStocks";

export default {
  components: {
    BaseSearch,
    BaseSearchResults,
    BaseCard,
    BasePercentChange,
  },
  setup() {
    const store = useStore();
    const searchResults = ref([]);
    const searchNews = ref([]);
    const user = ref("");
    const username = ref("");
    const photoURL = ref("");
    const wallet = ref(0);
    const balance = ref(0);
    const investment = ref(0);

    const stonks = ref([]);
    const count = ref(0);

    const oldVal = ref(0);
    const newVal = ref(0);

    const signOut = () => {
      store.dispatch("signOut");
    };

    const countChange = (e) => {
      console.log(e.value);
      count.value = e.value;
    };

    // const percentchange = computed(() => {
    //   let oldprice = props.stonk.bought_price * props.stonk.shares;
    //   let newprice = marketprice.value * props.stonk.shares;

    //   let pricediff = newprice - oldprice;

    //   if (pricediff < 0) {
    //     tendies.value = false;
    //   } else {
    //     tendies.value = true;
    //   }
    //   return Math.abs(((pricediff * 100) / oldprice).toFixed(0));
    // });

    const doSearch = async (query = "gamestop") => {
      let result = await stocks.searchSome(query);

      searchResults.value = result.quotes;
      searchNews.value = result.news;
      console.log(result);
    };

    watchEffect(() => {
      user.value = store.state.userProfile;
      stonks.value = store.state.portfolio;
      username.value = store.state.userProfile.name;
      photoURL.value = store.state.userProfile.photoURL;
      wallet.value = store.state.wallet;
      investment.value = store.state.portfolio.reduce(
        (prev, next) => prev + Number(next.market_price) * Number(next.shares),
        0
      );

      // console.log(
      // stonks.value,
      // reduced,
      // store.state.portfolio.value,
      // store.state.portfolio,
      // investment.value
      // );
    });

    return {
      username,
      photoURL,
      wallet,
      balance,
      investment,
      stonks,
      signOut,
      doSearch,
      searchResults,
      count,
      countChange,
      oldVal,
      newVal,
    };
  },
};

function doReduce(prev, next) {
  console.log("next", next);
  return prev + Number(next.market_price) * Number(next.shares);
}
</script>

<style lang="scss">
.user-name {
  text-transform: uppercase;
  text-align: right;
  color: #6a7d91;
}
.btn-signout {
  border: none;
  background: transparent;
  color: #6a7d91;
  font-size: 10px;
  text-transform: uppercase;
  padding: 2px 10px;
  border: 1px solid;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.2s ease-out;

  &:active,
  &:focus {
    outline: none;
  }
  &:hover {
    background: #6a7d91;
    color: #0f1923;
  }
}
.btn-trade {
  border: none;
  background: #32d296;
  padding: 4px 10px;
  color: #333;
  font-size: 1em;
  font-weight: 600;
  border-radius: 4px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background: transparent;
    border: 1px solid #32d296;
    color: #32d296;
  }
}
.header-price {
  font-size: 20px;
  font-weight: 700;
  // background: #3e5974;
  color: #6a7d91;
  border: 1px solid;
  border-radius: 10px;
  padding: 2px 8px;

  &__currency {
    font-weight: 400;
    color: #444f5a;
    margin-right: 4px;
  }
}
.wallet-amount {
  font-size: 20px;
  font-weight: 700;
  // background: #3e5974;
  color: #6a7d91;

  &__currency {
    font-weight: 400;
    color: #444f5a;
    margin-right: 4px;
  }
}
.modal {
  background: #202a35;
  color: #3e5974;
}
.uk-modal-header {
  border-bottom: 1px solid #2c3a48;
}
.uk-modal-footer {
  border-top: 1px solid #2c3a48;
}
.stock-overview {
  color: #b8c8dc;
  padding: 20px;
  margin-top: 60px;
  margin-bottom: 20px;
  border-top: 1px solid #2c3e50;
  border-bottom: 1px solid #2c3e50;
}

.table-header {
  color: #b8c8dc;
  text-transform: uppercase;
  font-size: 0.8em;
  margin-bottom: 6px;
  padding: 0 10px;
}
.table-item {
  background: #2c3e50;
  color: #b8c8dc;
  padding: 10px;
  margin-bottom: 6px;
  border-radius: 8px;
  transition: background 0.3s ease-out;
}
.table-item:hover {
  background: #3e5974;
  /* color: #fff; */
}
</style>