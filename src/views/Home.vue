<template>
  <div class="home">
    <BaseSearch v-on:search-query="doSearch($event)" placeholder="Search..." />
    <!-- search results -->
    <div class="uk-container uk-margin-large-top">
      <div
        class="uk-grid-small uk-grid-match uk-child-width-1-3@s uk-text-center"
        uk-grid
      >
        <div v-for="result in searchResults" :key="result.symbol">
          <router-link to="{name: 'Details'}">
            <div
              class="uk-card uk-card-default uk-card-small uk-card-body stock-card"
            >
              <div class="stock-card-symbol">{{ result.symbol }}</div>
              <div class="stock-card-name">{{ result.shortname }}</div>
              <div class="stock-card-region">{{ result["4. region"] }}</div>
              <div
                class="uk-grid-collapse uk-margin-small-top uk-width-1-1 uk-flex"
                uk-grid
              >
                <div class="uk-width-1-4 stock-card-currency">
                  {{ result.exchange }}
                </div>

                <div class="uk-width-3-4 uk-text-right stock-card-type">
                  {{ result.quoteType }}
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="uk-grid-small uk-grid-match uk-child-width-1-2 uk-text-center" uk-grid>
        <div v-for="item in searchNews" :key="item.uuid">
          <div class="uk-card uk-card-default uk-card-body">
            <a :href="item.link">{{ item.title }}</a><br>
            {{ item.publisher }}<br>
            {{new Date(item.providerPublishTime*1000).toLocaleString()}}
          </div>
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
import AV from "@/composables/alphaVantage";
export default {
  name: "Home",
  components: {
    HelloWorld,
    BaseSearch,
  },
  setup() {
    const searchResults = ref([]);
    const searchNews = ref([]);
    const doSearch = async (query) => {
      let res = await fetch(
        `https://wrapapi.com/use/balsimpson/feeds/stockSearch/latest?query=${query}&wrapAPIKey=rnobhyu0QNyehnOCXtY1y7yatP4CkjKF`
      );
      let result = await res.json();
      searchResults.value = result.quotes;
      searchNews.value = result.news;
      console.log(result);
    };

    return { doSearch, searchResults, searchNews };
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
