<template>
  <div class="" id="modal" uk-modal>
    <div class="uk-modal-dialog uk-margin-auto-vertical modal">
      <button class="uk-modal-close-default" type="button" uk-close></button>

      <div class="uk-modal-header modal uk-flex uk-flex-middle">
        <div class="uk-modal-title uk-margin-large-right"><em>GME</em></div>
        <div>
          <div class="header-price">
            <span class="header-price__currency">$</span
            ><span>{{ price }}</span>
          </div>
        </div>
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
        <button class="btn-trade" type="button">{{ tradetype }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import BaseCounter from "@/components/BaseCounter";
export default {
  name: "BaseModal",
  components: {
    BaseCounter,
  },
  props: {
    tradetype: String,
    marketprice: String,
    shareCount: Number,
  },
  setup(props) {
    const store = useStore();
    const amountHeader = ref("");
    const count = ref(0);
    const price = ref("0");
    const wallet = ref(0);

    price.value = parseInt(props.marketprice);
    const maxCount = computed(() => {
      if (props.shareCount) {
        return parseInt(props.shareCount);
      }
      return parseInt(wallet.value / price.value);
    });

    let balance = computed(() => {
      if (props.tradetype == "buy") {
        return (wallet.value - amount.value).toFixed(2);
      } else {
        return wallet.value + amount.value;
      }
    });
    // let amount = computed(() => {
    //   let val = price.value * count.value;
    //   console.log('val', val);
    //   return val;
    // });
    const amount = ref(0);
    const countChange = (e) => {
      count.value = e.value;
    };

    watchEffect(() => {
      wallet.value = store.state.wallet;
      price.value = parseInt(props.marketprice);
      amountHeader.value = props.tradetype == "buy" ? "investment" : "income";
    });
    return {
      amountHeader,
      countChange,
      wallet,
      balance,
      amount,
      price,
      maxCount,
    };
  },
};
</script>

<style>
</style>