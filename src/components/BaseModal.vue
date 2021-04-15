<template>
  <div class="" id="modal" uk-modal>
    <div
      class="uk-modal-dialog uk-margin-auto-vertical modal uk-border-rounded"
    >
      <button
        v-if="!clickedTrade"
        class="uk-modal-close-default"
        type="button"
        uk-close
      ></button>

      <div v-if="!clickedTrade">
        <div>
          <div class="uk-modal-header modal uk-flex uk-flex-middle">
            <div class="header-title uk-margin-large-right">
              {{ stonk.symbol }}
            </div>
            <div>
              <div class="header-price">
                <span>{{ stonk.market_price }}</span>
              </div>
            </div>
            <!-- <BasePercentChange
              :oldVal="Number(stonk.bought_price)"
              :newVal="Number(stonk.market_price)"
            ></BasePercentChange> -->
          </div>

          <div class="uk-modal-body">
            <div class="uk-text-center">
              <BaseCounter
                v-on:count-change="countChange($event)"
                :header="'shares to ' + tradetype"
                :maxCount="maxCount"
              />
            </div>

             
            <div class="uk-text-center uk-text-large">
              <div class="content-title">
                {{ amountHeader }}
              </div>
              <span class="content-value">{{ amount.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <BaseConfirmationMsg @msgDone="closeModal" :message="confirmationMsg" />
      </div>

      <div
        v-if="!clickedTrade"
        class="uk-modal-footer uk-flex uk-flex-between uk-flex-middle modal"
      >
        <div>
          <div class="uk-flex uk-flex-middle footer-title">
            <i class="fas fa-wallet"></i
            ><span style="margin-left: 4px; text-transform: uppercase"
              >Wallet</span
            >
          </div>
          <div class="wallet-amount">
            {{ balance }}
          </div>
        </div>
        <button @click="btnHandler" class="btn-trade" type="button">
          {{ btnText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watchEffect, onMounted, onUpdated } from "vue";
import { useStore } from "vuex";
import BaseCounter from "@/components/BaseCounter";
import BasePercentChange from "@/components/BasePercentChange";
import BaseConfirmationMsg from "@/components/BaseConfirmationMsg";

export default {
  name: "BaseModal",
  components: {
    BaseCounter,
    BasePercentChange,
    BaseConfirmationMsg,
  },
  props: ["stonk", "tradetype"],
  setup(props, { emit }) {
    const store = useStore();
    const amountHeader = ref("");
    const count = ref(0);
    // const newCount = ref(0);
    const price = ref("0");
    const wallet = ref(0);
    const btnText = ref("");
    const clickedTrade = ref(false);
    const confirmationMsg = ref("");
    let el;

    // console.log("props", props);
    price.value = parseInt(props.stonk.market_price);
    const maxCount = computed(() => {
      if (props.tradetype === "buy") {
        return parseInt(wallet.value / props.stonk.market_price);
      } else {
        // if (props.stonk.shares) {
        return parseInt(props.stonk.shares);
        // }
      }
    });

    let balance = computed(() => {
      if (props.tradetype == "buy") {
        return (Number(wallet.value) - Number(amount.value))
          .toFixed(2)
          .toLocaleString();
      } else {
        return (Number(wallet.value) + Number(amount.value))
          .toFixed(2)
          .toLocaleString();
      }
    });
    let amount = computed(() => {
      return Number(props.stonk.market_price) * count.value;
    });
    // const amount = ref(0);
    const countChange = (e) => {
      count.value = e.value;
    };

    const btnHandler = () => {
      if (props.tradetype === "buy" && count.value !== 0) {
        // props.stonk.shares = count.value;
        props.stonk.bought_price = props.stonk.market_price;
        clickedTrade.value = true;

        confirmationMsg.value = `You bought ${count.value} shares of ${props.stonk.symbol} for ${props.stonk.bought_price}`;
        buyStock();
      } else if (props.tradetype === "sell" && count.value !== 0) {
        props.stonk.shares = props.stonk.shares - count.value;
        clickedTrade.value = true;

        confirmationMsg.value = `You sold ${count.value} shares of ${props.stonk.symbol} for ${props.stonk.market_price}`;
        sellStock();
      }
    };

    const sellStock = () => {
      let data = {
        stonk: props.stonk,
        count: count.value,
        wallet: {
          wallet: balance.value,
        },
      };
      console.log("sellstock data", data);
      store.dispatch("sellStonk", data);
    };

    const buyStock = () => {
      let stonk = {
        name: props.stonk.name,
        symbol: props.stonk.symbol,
        type: props.stonk.type,
        bought_price: props.stonk.bought_price,
        market_price: props.stonk.market_price,
        currency: props.stonk.currency,
        shares: count.value,
        date: Date.now(),
        exchangeName: props.stonk.exchangeName,
        regularMarketTime: props.stonk.regularMarketTime,
        previousClose: props.stonk.previousClose,
      };

      let data = {
        stonk: stonk,
        wallet: {
          wallet: balance.value,
        },
      };
      store.dispatch("buyStonk", data);
    };

    const closeModal = () => {
      // console.log("close trade modal");
      UIkit.modal("#modal").hide();
    };

    onMounted(() => {
      btnText.value = props.tradetype;

      UIkit.util.on("#modal", "beforeshow", function () {
        clickedTrade.value = false;
        count.value = 0;
        emit("count-change", count);
      });
    });

    watchEffect(() => {
      btnText.value = props.tradetype;
      wallet.value = store.state.wallet;
      price.value = parseInt(props.stonk.market_price);
      amountHeader.value = props.tradetype == "buy" ? "investment" : "income";
      // console.log(props.tradetype + ":" + props.stonk.symbol);
    });

    return {
      amountHeader,
      countChange,
      wallet,
      balance,
      amount,
      price,
      maxCount,
      count,
      btnText,
      btnHandler,
      clickedTrade,
      closeModal,
      confirmationMsg,
    };
  },
};
</script>

<style lang="scss">
@import "../styles/global.scss";

.header-title {
  font-size: 20px;
  font-weight: 700;
  color: $theme1-primary-300;
}

.footer-title {
  font-size: 12px;
  font-weight: 400;
  color: $theme1-primary-600;
}

.content-title {
  font-size: 1.1em;
  text-transform: uppercase;
  color: $theme1-primary-600;
  line-height: 1;
  padding-top: 10px;
}

.content-value {
  font-size: 1.1em;
  text-transform: uppercase;
  color: $theme1-primary-500;
}

.header-price {
  font-size: 14px;
  font-weight: 400;
  // background: #3e5974;
  color: $theme1-primary-300;
  border: 1px solid;
  border-radius: 6px;
  padding: 2px 8px;

  &__currency {
    font-weight: 400;
    color: $theme1-primary-300;
    margin-right: 4px;
  }
}

.wallet-amount {
  font-size: 20px;
  font-weight: 700;
  // background: #3e5974;
  color: $theme1-primary-500;

  &__currency {
    font-weight: 400;
    color: $theme1-primary-800;
    margin-right: 4px;
  }
}

.btn-trade {
  cursor: pointer;
  text-transform: uppercase;
  line-height: 1.5;
  font-weight: 900;
  padding: 4px 18px;
  border-radius: 20px;
  width: fit-content;
  // box-shadow: 0px 3px 8px #00000024;
  transition: all 0.2s ease-out;
  background: transparent;
  color: $theme1-primary-600;
  border: 2px solid $theme1-primary-600;

  &:hover {
    background: $theme1-primary-500;
    border: 2px solid $theme1-primary-500;
    color: $theme1-primary-800;
  }
}

.modal {
  background: $theme1-primary-800;
  color: $light-contrast-300;
  border-radius: 20px;
  line-height: 1;
}

.uk-modal-header {
  border-bottom: 0px solid $light-accent-100;
}

.uk-modal-footer {
  border-top: 0px solid $light-accent-200;
}
</style>