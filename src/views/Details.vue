<template>
  <div class="uk-container">
    <div class="uk-flex uk-flex-between">
      <div class="uk-text-left">Item</div>
      <BaseButton
        text="buy stock"
        icon="plus"
        uk-toggle="target: #modal-overflow"
      ></BaseButton>

      <div id="modal-overflow" uk-modal>
        <div class="uk-modal-dialog">
          <button
            class="uk-modal-close-default"
            type="button"
            uk-close
          ></button>

          <div class="uk-modal-header">
            <div class="uk-modal-title">
              GME
              <span><span class="uk-text-muted uk-text-light">$</span>42</span>
            </div>
          </div>

          <div class="uk-modal-body">
            <div class="uk-text-center">
              <BaseCounter
                v-on:count-change="countChange($event)"
                header="Number of shares"
              />
            </div>

             
            <div class="uk-text-center uk-text-large">
              <div class="uk-text-small uk-text-uppercase">Investment</div>
              <span class="uk-text-muted uk-text-light">$</span>{{ price }}
            </div>
          </div>

          <div class="uk-modal-footer uk-flex uk-flex-between uk-flex-middle">
            <div>
              <div class="uk-flex uk-flex-middle">
                <i class="fas fa-wallet"></i
                ><span
                  style="
                    margin-left: 4px;
                    text-transform: uppercase;
                    font-size: 12px;
                  "
                  >Wallet</span
                >
              </div>
              <div class="uk-text-bold uk-text-large">
                <span class="uk-text-muted uk-text-light">$</span>{{ balance }}
              </div>
            </div>
            <button class="uk-button" type="button">Buy</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton";
import BaseCounter from "@/components/BaseCounter";
import { ref, computed } from "vue";

export default {
  props: ['id'],
  name: 'Details',
  components: { BaseButton, BaseCounter },
  setup(props) {
    const count = ref(0);
    const cost = ref(20);
    const wallet = ref(10000);
    console.log(props);
    const countChange = (e) => {
      console.log(e.value);
      count.value = e.value;
    };
    let price = computed(() => count.value * cost.value);
    let balance = computed(() => wallet.value - price.value);

    return { count, cost, price, balance, wallet, countChange };
  },
};
</script>

<style>
.stock-overview {
  color: #b8c8dc;
  padding-bottom: 20px;
  margin-bottom: 20px;
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
.stock-change {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  font-size: 12px;
  border: 1px solid #3e5974;
  color: #3e5974;
  padding: 2px 6px;
}
.btn-buy {
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 400;
  padding: 4px 18px;
  background: #3e5974;
  color: white;
  border-radius: 20px;
  transition: 0.2s ease-out;
}
.btn-buy:hover {
  background: white;
  color: #3e5974;
}
.share-count {
  text-align: center;
  /* padding: 10px; */
  border: none;
  /* font-size: 3em; */
}
</style>