<template>
  <!-- portfolio header -->
  <div
    v-if="stonks.length"
    class="uk-flex uk-flex-middle uk-flex-between dashboard-header"
  >
    <DashboardPortfolio
      title="Portfolio"
      icon="chart-pie"
      :value="investment"
      align="left"
      :oldVal="capital"
      :newVal="investment"
      :stonks="stonks"
    />

    <DashboardWallet
      title="Wallet"
      :value="wallet"
      icon="wallet"
      align="right"
    />
  </div>

  <!-- Portfolio grouping & sorting -->
  <div
    v-if="stonks.length"
    class="uk-flex uk-flex-middle uk-flex-right uk-margin-small-bottom"
  >
    <!-- <BaseSwitch @valueChange="switchValueChange" :state="isGrouped" /> -->

    <!-- List and Gallery Views -->
    <div class="uk-width-auto uk-text-nowrap">
      <span :class="{ 'active': galleryView }" class="view-icons">
        <FontAwesomeIcon
          icon="th-large"
          style="margin-right: 18px; cursor: pointer"
          uk-tooltip="Gallery View"
          @click.prevent="changeView('gallery')"
        />
      </span>
      <span :class="{ 'active': listView }" class="view-icons">
        <FontAwesomeIcon
          icon="list-alt"
          uk-tooltip="List View"
          style="margin-right: 24px; cursor: pointer"
          @click.prevent="changeView('list')"
        />
      </span>
    </div>
  </div>

  <!-- Portfolio List View -->
  <table
    v-if="listView && stonks.length"
    class="uk-table uk-table-justify uk-table-small uk-table-divider"
  >
    <thead>
      <tr>
        <th>Symbol</th>
        <th class="">Name</th>
        <th class="uk-text-right">Shares</th>
        <th class="uk-text-right">Paid Price</th>
        <th class="uk-text-right">Market Price</th>
        <th class="uk-text-right uk-width-small">Date</th>
        <th class="uk-text-right"></th>
      </tr>
    </thead>
    <tbody style="font-weight: 500">
      <tr v-for="stonk in stonks" :key="stonk.symbol">
        <td class="uk-text-left">{{ stonk.symbol }}</td>
        <td class="uk-text-left">{{ stonk.name }}</td>
        <td class="uk-text-right">{{ stonk.shares }}</td>
        <td class="uk-text-right">{{ stonk.bought_price }}</td>
        <td class="uk-text-right">{{ stonk.market_price }}</td>
        <td class="uk-text-right">{{ formatDate(stonk.date, "short") }}</td>
        <td class="uk-text-right">
          <!-- <div> -->
          <BaseButton
            @btnClick="btnClick(stonk)"
            text="sell"
            size="small"
            type="filled"
            color="light"
            style="margin: 0 auto"
          />
          <!-- </div> -->
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Portfolio card grid -->
  <div
    v-if="stonks.length && galleryView"
    class="uk-grid-small uk-grid-match uk-child-width-1-2@s uk-text-center uk-text-center"
    uk-grid
  >
    <div v-for="stonk in stonks" :key="stonk.symbol">
      <BaseCard @btnClick="btnClick" :stonk="stonk" :isGrouped="isGrouped" />
    </div>
  </div>

  <div v-if="!stonks.length" class="no-stocks">
    <div>
      <div class="no-stocks__wallet-container">
        <i class="fas fa-wallet uk-margin-small-right"></i>
        <span class="uk-text-bold uk-text-uppercase">Wallet</span>
        <div class="no-stocks__wallet">{{ wallet.toLocaleString() }}</div>
      </div>
      <!-- <img src="https://media.giphy.com/media/BmX38GoChnxRe/giphy.gif" alt="" /> -->
      <FontAwesomeIcon icon="lemon" style="font-size: 3em" />
      <div class="uk-margin-small-top">
        Your portfolio is <strong> empty </strong>.
      </div>
      <div>Use the <strong>search bar</strong> to</div>
      <div>find a stock to buy.</div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "vue";
import { mapState, mapGetters, useStore } from "vuex";
import { formatDate } from "@/composables/useUtils";

import DashboardWallet from "@/components/DashboardWallet";
import DashboardPortfolio from "@/components/DashboardPortfolio";
import BaseSwitch from "@/components/BaseSwitch.vue";
import BaseCard from "@/components/BaseCard.vue";
import BaseButton from "@/components/BaseButton.vue";
import FontAwesomeIcon from "@/components/FontAwesomeIcon.vue";
export default {
  name: "BasePortfolio",
  components: {
    DashboardWallet,
    DashboardPortfolio,
    BaseSwitch,
    BaseCard,
    BaseButton,
    FontAwesomeIcon,
  },
  props: ["stonks"],
  emits: ["showModal"],
  setup(props, { emit }) {
    const store = useStore();
    const wallet = ref(0);
    // orginal investment
    const capital = ref(0);
    // investment at current market price
    const investment = ref(0);
    const isGrouped = ref();

    const stonk = ref();
    const tradetype = ref();

    const galleryView = ref(true);
    const listView = ref(false);

    const groupedStonks = computed(() => {
      if (isGrouped.value) {
        return groupBySymbolHandler();
      } else {
        // console.log('state', store.state.portfolio)
        return store.state.portfolio;
      }
    });

    // show modal
    const showModal = (data) => {
      stonk.value = data.stonk.value;
      tradetype.value = data.type;

      
      UIkit.modal("#modal").show();
    };

    const changeView = (view) => {
      if (view === "list") {
        listView.value = true;
        galleryView.value = false;
      } else {
        galleryView.value = true;
        listView.value = false;
      }
    };

    const btnClick = (data) => {
      emit("showModal", data);
    };

    const switchValueChange = (val) => {
      isGrouped.value = val;
      store.dispatch("isGroupedHandler", { isGrouped: val });
      // console.log('switch value', val);
      // notify(`groupBySymbol - ${isGrouped.value}`, "success");
    };

    onMounted(() => {
      // groupedStonks.value = ;
      // console.log('MountedGroupedStonks', groupedStonks.value)
    });

    watchEffect(() => {
      wallet.value = Number(store.state.wallet);
      investment.value = store.state.portfolio.reduce(
        (prev, next) => prev + Number(next.market_price) * Number(next.shares),
        0
      );
      capital.value = store.state.portfolio.reduce(
        (prev, next) => prev + Number(next.bought_price) * Number(next.shares),
        0
      );
      isGrouped.value = store.state.isGrouped;
      console.log('stonks', props.stonks);
      // groupedStonks.value = groupBySymbolHandler()
    });

    return {
      wallet,
      isGrouped,
      groupedStonks,
      capital,
      investment,
      showModal,
      btnClick,
      switchValueChange,
      formatDate,
      changeView,
      galleryView,
      listView,
    };
  },
};
</script>

<style lang="scss">
@import "../styles/global.scss";

.view-icons {
  font-size: 1.4em;
  color: $theme1-primary-500;
}

.active {
  color: $theme1-primary-800;
}

.no-stocks {
  height: 64vh;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 100px;
    border-radius: 20px;
    padding: 10px;
  }

  &__wallet-container {
    padding: 14px 6px;
    // background: blue;
    border: 2px solid;
    border-radius: 20px;
    margin-bottom: 2em;
  }

  &__wallet {
    font-size: 2em;
    font-weight: 800;
    line-height: 1;
  }
}
</style>