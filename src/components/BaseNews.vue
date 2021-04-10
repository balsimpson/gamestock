<template>
  <div class="uk-container uk-margin-large-top uk-margin-large-bottom">
    <div class="news-header">Latest news</div>

    <div class="uk-child-width-1-2@m" uk-grid>
      <div></div>
    </div>

    <div
      class="uk-grid-small uk-grid-match uk-child-width-1-1 uk-child-width-1-2 uk-margin-small-top"
      uk-grid
    >
      <div v-for="item in news" :key="item.uuid">
        <div class="uk-card uk-card-default news-card">
          <div class="uk-card-media-top">
            <img :src="item.urlToImage" alt="" />
          </div>
          <div class="uk-card-body">
            <div class="news-card-title">
              {{ item.title }}
            </div>

            <div class="news-card-description">
              {{ item.description }}
            </div>

            <BaseButton text="read more" size="small" color="light" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { formatDate } from "@/composables/useUtils";
import BaseButton from "@/components/BaseButton.vue";
import stocks from "@/composables/fetchStocks";

export default {
  components: {
    BaseButton,
  },
  setup() {
    const news = ref([]);

    const getNews = async (query = "gamestop") => {
      let result = await stocks.searchNews(query);
      console.log(result);
      news.value = result.articles;
    };

    onMounted(() => {
      getNews();
    });

    return { news, formatDate };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/global.scss";

.news-header {
  color: $theme1-primary-800;
  margin: auto 0;
  margin-bottom: 10px;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.6em;
  font-weight: 900;
}

.news-card {
  position: relative;
  background: $theme1-primary-200;
  color: $theme1-primary-800;
  // padding: 14px 18px 14px 24px;
  font-weight: 600;
  line-height: 1;
  text-align: left;
  transition: all 0.2s ease-out;

  img {
    height: 240px;
    width: 100%;
    object-fit: cover;
  }

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 6px;
    background: $theme1-primary-800;
    bottom: 0;
    left: 0;
  }

  &-title {
    font-size: 1.4em;
    line-height: 1;
    font-weight: 600;
  }

  &-description {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    margin: 10px 0;
    color: $theme1-text-light-500;
  }

  &-publisher {
    text-transform: uppercase;
    font-size: 10px;
    color: $theme1-primary-700;
    opacity: 0.5;
    margin-top: 6px;
  }

  &-date {
    text-transform: uppercase;
    font-size: 10px;
    opacity: 0.3;
    margin-top: 6px;
  }
}
</style>