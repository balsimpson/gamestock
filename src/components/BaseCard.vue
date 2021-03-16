<template>
  <div class="stock-card uk-animation-fade">
    <div class="uk-flex uk-flex-between uk-width-expand">
      <div class="card-text-accent">
        {{ stonk.symbol }}
      </div>
      <div class="buying-price">
       {{ stonk.bought_price }}
      </div>
    </div>
    <div class="card-title">{{ stonk.name }}</div>
    <div class="uk-flex uk-flex-middle">
      <span class="card-text-accent">{{ stonk.shares }} </span>
      <span class="card-text-small"> SHARES</span>
    </div>
    <div class="card-subtitle">current price</div>
    <div class="card-text-large">
      {{ marketprice }}
    </div>

    <div class="amount uk-animation-fade">
      <span>{{ amount }} </span>
      <BasePercentChange :oldVal="oldVal" :newVal="newVal"></BasePercentChange>
    </div>
    <div class="uk-flex uk-flex-between uk-width-expand uk-margin-small-top">
      <button
        @click.prevent="btnHandler('sell')"
        class="btn"
        href="#modal"
        uk-toggle
      >
        Sell
      </button>
      <button
        @click.prevent="btnHandler('buy')"
        class="btn"
        href="#modal"
        uk-toggle
      >
        Buy
      </button>
    </div>
  </div>

  <BaseModal
    :tradetype="tradetype"
    :marketprice="marketprice"
    :shareCount="stonk.shares"
  />
</template>

<script>
import { computed, ref, watchEffect } from "vue";
import stocks from "@/composables/fetchStocks";
import BaseModal from "@/components/BaseModal.vue";
import BasePercentChange from "@/components/BasePercentChange";

export default {
  props: ["stonk", "tradetype"],
  name: "BaseCard",
  components: {
    BaseModal,
    BasePercentChange
  },
  emits: ["buyBtn", "sellBtn"],
  setup(props) {
    const oldVal = ref(0);
    const newVal = ref(0);
    // console.log(props.stonk);
    const tradetype = ref("");
    const marketprice = ref("0");
    // const stockchange = ref("");
    const amount = computed(() =>
      (marketprice.value * props.stonk.shares).toFixed(2)
    );
    const tendies = ref(true);

    const btnHandler = (type) => {
      tradetype.value = type;
    };

    const getMarketprice = async () => {
      const result = await stocks.details(props.stonk.symbol);
      marketprice.value = result.meta.regularMarketPrice.toFixed(2);
    };

    getMarketprice();

    watchEffect(() => {
      oldVal.value = props.stonk.bought_price * props.stonk.shares;
      newVal.value = marketprice.value * props.stonk.shares;
    });

    return { btnHandler, amount, marketprice, tradetype, oldVal, newVal };
  },
};
</script>

<style lang="scss">
.uk-link-toggle:focus .uk-link,
.uk-link-toggle:hover .uk-link,
.uk-link:hover,
a:hover {
  color: #202a35;
  text-decoration: none;
}

.fa-gem {
  // color: salmon;
  opacity: 0.4;
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
  font-size: 1em;
  font-weight: 600;
  font-style: italic;
  color: #f0506e;
  padding-right: 4px;
}

.card-text-box {
  font-size: 14px;
  font-weight: 600;
  padding: 2px 8px;
  // background: #a3b2c3;
  color: #a3b2c3;
  // border: 1px solid;
  // margin-right: 3px;
  line-height: 1.4;
}

.stock-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 20px;
  background: #202a35;
  color: #a3b2c3;
  line-height: 1;

  .btn {
    text-transform: uppercase;
    font-size: 0.7em;
    padding: 2px 6px;
    border: 1px solid #a3b2c3;
    background: transparent;
    color: #a3b2c3;
    cursor: pointer;

    &:hover {
      background: #a3b2c3;
      color: #202a35;
    }
  }

  .buying-price {
    position: relative;

    &::before {
      content: "Price";
      position: absolute;
      font-size: 10px;
      text-transform: uppercase;
      // text-align: right;
      top: -10px;
      right: 0;
      opacity: 0.3;
    }
  }
}

.stock-change {
  // display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 4px;
  font-size: 12px;
  padding: 2px 6px;
}
</style>