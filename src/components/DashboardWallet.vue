<template>
  <div>
    <div
      class="uk-text-small uk-text-uppercase"
      :class="[align == 'left' ? 'uk-text-left' : 'uk-text-right']"
    >
      <i
        v-if="icon"
        class="fas uk-margin-small-right"
        :class="'fa-' + icon"
      ></i>
      <span class="uk-text-bold">{{ title }}</span>
    </div>

    <div
      class="uk-text-large uk-text-bold uk-animation-fade"
      :class="[align == 'left' ? 'uk-text-left' : 'uk-text-right']"
    >
      <span>{{
        value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      }}</span>
    </div>

    <div class="uk-text-right">
      <a href="#modal-full" uk-toggle>
        <span class="uk-text-bold uk-text-uppercase">{{ tradesCount }}</span>
      </a>
    </div>

    <div id="modal-full" class="uk-modal-full" uk-modal>
      <div class="uk-modal-dialog">
        <button
          class="uk-modal-close-full uk-close-large"
          type="button"
          uk-close
        ></button>
        <div class="uk-flex uk-flex-middle uk-flex-center" uk-height-viewport>
          <BaseTable />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import BaseTable from "@/components/BaseTable";
import { computed } from "vue";
export default {
  name: "DashboardWallet",
  props: {
    title: String,
    value: [String, Number],
    subtitle: String,
    icon: String,
    align: String,
  },
  components: {
    BaseTable,
  },
  setup() {
    const store = useStore();
    const tradesCount = computed(() => {
      return store.state.trades.length + " trades"
    });

    return { tradesCount };
  },
};
</script>

<style scoped lang="scss">
@import "../styles/global.scss";
a {
  color: $theme1-primary-600;
  transition: color 0.2s ease-out;

  &:hover {
    text-decoration: none;
    color: $theme1-primary-800;
  }
}
</style>