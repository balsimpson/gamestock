<template>
  <div class="uk-container uk-container-small uk-margin-large-top">
    <!-- Trades List View -->
    <table
      v-if="trades"
      class="uk-table uk-table-hover uk-table-justify uk-table-small uk-table-divider"
    >
      <thead>
        <tr>
          <th @click.prevent="sortTable('symbol', 'string')">Symbol</th>
          <th @click.prevent="sortTable('name', 'string')" class="">Name</th>
          <th @click.prevent="sortTable('shares')" class="uk-text-right">Shares</th>
          <th @click.prevent="sortTable('bought_price')" class="uk-text-right">Paid Price</th>
          <th @click.prevent="sortTable('market_price')" class="uk-text-right">Market Price</th>
          <th @click.prevent="sortTable('exchangeName', 'string')" class="uk-text-right">Exchange</th>
          <th @click.prevent="sortTable('date')" class="uk-text-right uk-width-small">
            Date <a class="uk-icon-link uk-icon" href="#" :uk-icon="sortIcon" ></a>
          </th>
          <th class="uk-text-right"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stonk in trades" :key="stonk.id">
          <td class="uk-text-left">{{ stonk.symbol }}</td>
          <td class="uk-text-left">{{ stonk.name }}</td>
          <td class="uk-text-right">{{ stonk.shares }}</td>
          <td class="uk-text-right">{{ stonk.bought_price }}</td>
          <td class="uk-text-right">{{ stonk.market_price }}</td>
          <td class="uk-text-right">{{ stonk.exchangeName }}</td>
          <td class="uk-text-right">{{ formatDate(stonk.date, "short") }}</td>
          <td>
            <div class="item-tag">
              {{ stonk.tradeType }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { formatDate, sortArrayOfObjects } from "@/composables/useUtils";

export default {
  setup() {
    const store = useStore();
    const trades = ref();
    const sortAscending = ref(false);
    const sortIcon = ref("");

    const sortTable = (key, sortType) => {
      sortAscending.value = !sortAscending.value;
      sortIcon.value = sortAscending.value ? `icon: arrow-up` : `icon: arrow-down`;
      sortArrayOfObjects(trades.value, key, sortAscending.value, sortType);
    }

    onMounted(() => {
      sortIcon.value = `icon: arrow-down`;
      sortArrayOfObjects(trades.value, 'date', sortAscending.value);
    })

    watchEffect(() => {
      trades.value = store.state.trades;
    });

    return { trades, formatDate, sortTable, sortIcon };
  },
};
</script>

<style scoped lang="scss">
@import "../styles/global.scss";

table {
  font-weight: 500;
}
th {
  cursor: pointer;
}

.item-tag {
  font-size: 10px;
  text-transform: uppercase;
  padding: 4px 6px;
  border-radius: 4px;
  border: 1px solid $theme1-primary-800;
  background: transparent;
  color: $theme1-primary-800;
  line-height: 1;
}
</style>