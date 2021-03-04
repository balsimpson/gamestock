<template>
  <div class="home">
    <BaseSearch v-on:search-query="doSearch($event)" placeholder="Search..." />
    <!-- search results -->
    <div class="uk-container uk-margin-large-top">
      <div
        class="uk-grid-small uk-grid-match uk-child-width-1-3@s uk-text-center"
        uk-grid
      >
        <div v-for="result in searchResults" :key="result['1. symbol']">
          <router-link to="/details">
            <div
              class="uk-card uk-card-default uk-card-small uk-card-body stock-card"
            >
              <div class="stock-card-symbol">{{ result["1. symbol"] }}</div>
              <div class="stock-card-name">{{ result["2. name"] }}</div>
              <div class="stock-card-region">{{ result["4. region"] }}</div>
              <div
                class="uk-grid-collapse uk-margin-small-top uk-width-1-1 uk-flex"
                uk-grid
              >
                <div class="uk-width-1-4 stock-card-currency">
                  {{ result["8. currency"] }}
                </div>

                <div class="uk-width-3-4 uk-text-right stock-card-type">
                  {{ result["3. type"] }}
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from "vue";
import BaseSearch from "@/components/BaseSearch.vue";
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "Home",
  components: {
    HelloWorld,
    BaseSearch,
  },
  setup() {
    const searchResults = ref([]);
    const doSearch = async (query) => {
      let res = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=YS05GMVH1ELVKYEO`
      );
      let result = await res.json();
      searchResults.value = result.bestMatches;
      console.log(searchResults.value);
    };

    return { doSearch, searchResults };
  },
};
</script>

<style scoped lang="scss">
.stock-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 20px;
  background: #202a35;
  color: #a3b2c3;

  &-symbol {
    font-size: 2em;
    font-weight: 600;
    overflow-wrap: break-word;
    line-height: 1;
    margin-bottom: 6px;
  }

  &-type {
    font-size: 0.8em;
    text-transform: uppercase;
    color: #ffebdb;
    text-align: center;
    padding: 2px 4px 0px 4px;
  }
  &-name {
    font-size: 1em;
    font-weight: 600;
    line-height: 1.2;
  }
  &-region {
    font-size: 1em;
    font-weight: 400;
    margin-top: 10px;
  }
  &-currency {
    font-size: 0.8em;
    border: 1px solid;
    text-align: center;
    padding: 2px 4px 0px 4px;
  }
}
</style>
