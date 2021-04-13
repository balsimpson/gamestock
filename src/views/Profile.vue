<template>
  <div class="uk-container">
    <BaseNav :user="user" />

    <div class="uk-container uk-margin-large-top">
      <div>
        <img :src="user.photoURL" alt="" style="border-radius: 50%" />
        <div class="uk-margin-top uk-text-bolder">{{ user.email }}</div>
        <div class="uk-margin-large-top">
          <div>Your nickname</div>
          <input
            type="text"
            v-model="nickname"
            placeholder="e.g. Paper Hand Luke"
            class="uk-input uk-width-1-3 uk-text-bold uk-text-center uk-border-pill"
          />
        </div>
        
      </div>
    </div>

    <BaseTable />
  </div>

</template>

<script>
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { formatDate } from "@/composables/useUtils";
import BaseNav from "@/components/BaseNav.vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseFooter from "@/components/BaseFooter.vue";
import FontAwesomeIcon from "@/components/FontAwesomeIcon";

export default {
  components: {
    BaseNav,
    BaseFooter,
    BaseTable,
    FontAwesomeIcon,
  },
  setup() {
    const store = useStore();
    const user = ref();
    const nickname = ref("");
    const trades = ref();

    watchEffect(() => {
      trades.value = store.state.trades;
      user.value = store.state.userProfile;
      nickname.value = store.state.userProfile.name.split(" ")[0];
    });

    return {
      trades,
      user,
      nickname,
      formatDate,
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
.no-stocks {
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 100px;
    border-radius: 20px;
    padding: 10px;
  }
}

.item-tag {
  font-size: 12px;
  text-transform: uppercase;
  padding: 2px 4px;
  border: 1px solid;
  border-radius: 4px;
  background: blanchedalmond;
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
  background: $light-primary-100;
  color: $light-contrast-300;
}
// .uk-modal-header {
//   // border-bottom: 1px solid $light-accent-100;
// }
.uk-modal-footer {
  border-top: 1px solid $light-accent-200;
}
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