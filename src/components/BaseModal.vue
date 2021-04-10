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
            <div class="uk-modal-title uk-margin-large-right accent">
              {{ stonk.symbol }}
            </div>
            <div>
              <div class="header-price">
                <span>{{ stonk.market_price }}</span>
              </div>
            </div>
            <BasePercentChange
              :oldVal="Number(stonk.bought_price)"
              :newVal="Number(stonk.market_price)"
            ></BasePercentChange>
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
              <div class="uk-text-small uk-text-uppercase">
                {{ amountHeader }}
              </div>
              <span class="uk-text-muted uk-text-light"></span
              >{{ amount.toFixed(2) }}
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <BaseConfirmationMsg @msgDone="closeModal" />
      </div>

      <div
        v-if="!clickedTrade"
        class="uk-modal-footer uk-flex uk-flex-between uk-flex-middle modal"
      >
        <div>
          <div class="uk-flex uk-flex-middle" style="font-size: 12px">
            <i class="fas fa-wallet"></i
            ><span style="margin-left: 4px; text-transform: uppercase"
              >Wallet</span
            >
          </div>
          <div class="wallet-amount">
            {{ balance.toLocaleString() }}
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
      // console.log(props.tradetype + ":" + btnText.value, props.stonk.symbol);
      if (props.tradetype == "buy") {
        return Number(wallet.value) - Number(amount.value);
      } else {
        return Number(wallet.value) + Number(amount.value);
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
      if (props.tradetype === "buy") {
        props.stonk.shares = props.stonk.shares + count.value;
        props.stonk.bought_price = props.stonk.market_price;
        buyStock();
      } else {
        props.stonk.shares = props.stonk.shares - count.value;
        sellStock();
      }
      
      clickedTrade.value = true;
      console.log("clicked", props.tradetype);
    };

    const closeModal = () => {
      console.log("close trade modal");
      UIkit.modal("#modal").hide();
    };

    onMounted(() => {
      btnText.value = props.tradetype;

      UIkit.util.on("#modal", "beforeshow", function () {
        console.log("showing modal");
        // do something
        count.value = 0;
        emit("count-change", count);
      });
    });

    watchEffect(() => {
      console.log('stonk', props.stonk)
      btnText.value = props.tradetype;
      wallet.value = store.state.wallet;
      price.value = parseInt(props.stonk.market_price);
      amountHeader.value = props.tradetype == "buy" ? "investment" : "income";
    });

    const sellStock = () => {
      let data = {
        stonk: props.stonk,
        wallet: {
          wallet: balance.value,
        },
      };
      store.dispatch("sellStonk", data);
    };

    const buyStock = () => {
      let data = {
        stonk: props.stonk,
        wallet: {
          wallet: balance.value,
        },
      };
      store.dispatch("buyStonk", data);
    };

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
    };
  },
};
</script>

<style lang="scss">
@import "../styles/global.scss";
</style>