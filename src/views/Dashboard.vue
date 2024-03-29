<template>
  <div class="uk-container">
    <BaseNav
      @itemClick="navClick"
      @submitFeedback="logFeedback($event)"
      :user="user"
    />

    <!-- Search -->
    <div class="uk-margin uk-container uk-container-small">
      <BaseSearch
        @searchQuery="doSearch($event)"
        @clearResults="clearResults()"
        placeholder="e.g. GME"
      />
      <BaseSearchResults
        v-if="searchResults"
        @showModal="showModal"
        :results="searchResults"
        :displayMsg="displayMsg"
      />
    </div>

    <!-- Ticker -->
    <BaseTicker />

    <!-- <BaseChart title="Chart title"/> -->

    <!-- Portfolio -->
    <BasePortfolio @showModal="showModal" :stonks="stonks" />
  </div>
  <BaseModal :stonk="stonk" :tradetype="tradetype" />
</template>

<script>
import { computed, onMounted, ref, reactive, toRefs, watchEffect } from "vue";
import { mapState, mapGetters, useStore } from "vuex";
import Chart from "chart.js";
import BaseNav from "@/components/BaseNav.vue";
import BaseSearch from "@/components/BaseSearch.vue";
import BaseSearchResults from "@/components/BaseSearchResults.vue";
import BaseTicker from "@/components/BaseTicker.vue";
import BasePortfolio from "@/components/BasePortfolio.vue";
import BaseModal from "@/components/BaseModal.vue";

import BaseChart from "@/components/BaseChart";
import stocks from "@/composables/fetchStocks";
import {
  notify,
  submitFeedback,
  sortArrayOfObjects,
} from "@/composables/useUtils";

export default {
  components: {
    BaseNav,
    BaseTicker,
    BaseSearch,
    BaseSearchResults,
    BasePortfolio,
    BaseModal,
    BaseChart,
  },
  setup() {
    const store = useStore();
    const searchResults = ref([]);
    const searchNews = ref([]);
    const user = ref("");
    const username = ref("");
    const photoURL = ref("");

    const stonks = ref([]);
    const count = ref(0);

    const oldVal = ref(0);
    const newVal = ref(0);

    const stonk = ref("");
    const tradetype = ref("");

    const displayMsg = ref("");
    const groupBySymbol = ref();

    const signOut = () => {
      store.dispatch("signOut");
    };

    const navClick = (e) => {
      if (e === "SIGN OUT") {
        store.dispatch("signOut");
      }
    };

    const logFeedback = (val) => {
      submitFeedback(store.state.userProfile.email, val);

      // notify
      let msg = `Hey ${store.state.userProfile.name.split(" ")[0]},  Thank you for your feedback. `;
      notify(msg, "success");
    };

    const countChange = (e) => {
      console.log(e.value);
      count.value = e.value;
    };

    const showModal = (data) => {
      console.log("DashboardShowModal", data);
      stonk.value = data.stonk;
      tradetype.value = data.type;

      UIkit.modal("#modal").show();
    };

    const closeModal = () => {
      console.log("modal close");
    };

    onMounted(() => {
      groupBySymbol.value = store.state.isGrouped;
    });

    const doSearch = async (query = "gamestop") => {
      // console.log("query", query);
      let result = await stocks.searchSome(query);

      if (result.quotes?.length) {
        // console.log("results", query);
        searchResults.value = result.quotes;
        searchNews.value = result.news;
      } else {
        searchResults.value = [];
        // console.log("no results", query);
        if (query.length > 0) {
          displayMsg.value = `No results found for ${query}`;
        } else {
          displayMsg.value = "";
        }
      }
      // console.log(result);
    };

    const clearResults = () => {
      searchResults.value = [];
    };

    watchEffect(() => {
      user.value = store.state.userProfile;
      stonks.value = store.state.portfolio;
      // stonks.value = sortArrayOfObjects(store.state.portfolio, 'date', false) ;
      username.value = store.state.userProfile.name;
      photoURL.value = store.state.userProfile.photoURL;
      // console.log(store.state.portfolio);
      // console.log("store", store.state.isGrouped);
      // stonks.value,
      // reduced,
      // store.state.portfolio.value,
      // store.state.portfolio,
      // investment.value
      // );
    });

    return {
      user,
      username,
      photoURL,
      stonks,
      signOut,
      doSearch,
      searchResults,
      clearResults,
      count,
      countChange,
      oldVal,
      newVal,
      showModal,
      stonk,
      tradetype,
      displayMsg,
      groupBySymbol,
      closeModal,
      navClick,
      logFeedback,
    };
  },
};

function doReduce(prev, next) {
  console.log("next", next);
  return prev + Number(next.market_price) * Number(next.shares);
}
</script>

<style lang="scss">
@import "../styles/global.scss";
// .stock-overview {
//   color: #b8c8dc;
//   padding: 20px;
//   margin-top: 60px;
//   margin-bottom: 20px;
//   border-top: 1px solid #2c3e50;
//   border-bottom: 1px solid #2c3e50;
// }

// Switch
.uk-switch {
  position: relative;
  display: inline-block;
  height: 24px;
  width: 50px;
}
.uk-switch input {
  display: none;
}
/* Slider */
.uk-switch-slider {
  background-color: rgba(0, 0, 0, 0.22);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 500px;
  bottom: 0;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.2s;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.07);
}
/* Switch pointer */
.uk-switch-slider:before {
  content: "";
  background-color: #fff;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 2px;
  bottom: 2px;
  border-radius: 50%;
  transition-property: transform, box-shadow;
  transition-duration: 0.2s;
}
/* Slider active color */
input:checked + .uk-switch-slider {
  background-color: #39f !important;
}
/* Pointer active animation */
input:checked + .uk-switch-slider:before {
  transform: translateX(26px);
}
</style>