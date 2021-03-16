<template>
  <div class="home">
    <div class="uk-container uk-container-small uk-padding-large">
      <div
        class="uk-grid-collapse uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s uk-text-center uk-padding"
        uk-grid
      >
        <div class="uk-flex uk-flex-middle">
          <div>
            <div class="hero-headline">
              Wish you had <span>$10,000</span> to buy <em>GME</em> stock?
            </div>
            <div class="hero-text">
              Now you can. Sign in with Google and play the stonk game 10,000
              fake dollars. Search for your favourite stock or GME and buy. You
              are not a paperhand, are you?
            </div>
            <button
              @click="getStarted()"
              class="uk-button uk-button-default uk-button-small hero-btn"
            >
              <span
                uk-icon="icon: google; ratio: 0.8"
                class="uk-margin-small-right"
              ></span>
              <span>GOOGLE SIGN IN</span>
            </button>
          </div>
          <!-- <a
            @click="getStarted()"
            class="uk-button uk-button-text uk-light hero-btn"
            href="#"
          >
            <span
              uk-icon="icon: google; ratio: 0.8"
              class="uk-margin-small-right"
            ></span>
            <span>GOOGLE SIGN IN</span>
          </a> -->
        </div>

        <!-- hero image -->
        <div class="uk-hide@s">
          <img src="../assets/countingstars.svg" alt="" />
        </div>
      </div>
    </div>
    <!-- <BaseSearch v-on:search-query="doSearch($event)" placeholder="e.g. GME" /> -->
    <!-- search results -->

    <div class="uk-container uk-margin-large-top">
      
      <div class="news-header">Latest news</div>
      <div
        class="uk-grid-small uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s uk-text-center uk-margin-small-top"
        uk-grid
      >
        <div v-for="item in searchNews" :key="item.uuid">
          <div class="news-card">
            <a :href="item.link" target="_blank">{{ item.title }}</a
            ><br />
            <div class="news-card-publisher">
              {{ item.publisher }} |
              <span>
                <!-- {{ new Date(item.providerPublishTime * 1000).toDateString() }} -->
                {{
                  new Date(item.providerPublishTime * 1000).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )
                }}
                <!-- {{
                  new Date(item.providerPublishTime * 1000).toLocaleTimeString()
                }} -->
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="uk-card-footer">copyright (c) tinkr</footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { auth, provider } from "@/composables/useFirebase";
import store from "../store";
import BaseSearch from "@/components/BaseSearch.vue";
import stocks from "@/composables/fetchStocks";

export default {
  name: "Home",
  setup() {
    const router = useRouter();
    const searchResults = ref([]);
    const searchNews = ref([]);
    const username = ref("");

    const getStarted = () => {
      console.log("getting started", username.value);
      // router.push({ name: 'Dashboard', params: { username: username.value } });
      store.dispatch("signIn");
    };

    const signOut = () => {
      store.dispatch("signOut");
    };

    const doSearch = async (query = "gamestop") => {
      let result = await stocks.searchSome(query);
      searchResults.value = result.quotes;
      searchNews.value = result.news;
      console.log(result);
    };

    onMounted(() => {
      doSearch();
    });

    return { searchResults, searchNews, getStarted, signOut, username };
  },
};
</script>

<style scoped lang="scss">
img {
  max-height: 300px;
}

.hero-headline {
  font-size: 1.6em;
  font-weight: 500;
  padding: 0 20px;
  color: #b3d0ec;
  text-transform: uppercase;
  line-height: 1.1;
  // opacity: 0.6;
  // margin-bottom: 0.4em;

  span {
    font-weight: 900;
    color: #f9a826;
  }
}

.hero-text {
  padding: 20px;
  font-size: 0.7em;
  // margin-bottom: 0.4rem;
  color: #b3d0ec;
}

.user-name-text {
  font-size: 10px;
  text-transform: uppercase;
  color: #7292b1;
}
.user-name-text.error {
  color: #cf422f;
}

.hero-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border: 1px solid #f9a826;
  background: transparent;
  width: 180px;
  // border: 1px solid #7292b1;
  color: #f9a826;
  padding: 6px 10px;
  border-radius: 20px;
  text-transform: uppercase;
  // text-align: center;
  font-size: 0.9em;
  font-weight: 600;
  line-height: 1;
  transition: background 0.2s ease-out;

  &:hover {
    background: #f9a826;
    color: black;
    text-decoration: none;
  }
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

.news-header {
  // border-bottom: 1px solid;
  margin: auto 0;
  // width: 200px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  color: #32465a;
}

.news-card {
  position: relative;
  border: 1px solid;
  // border-radius: 20px;
  background: #1f3348;
  padding: 14px 18px 14px 24px;
  line-height: 1;
  text-align: left;
  transition: background 0.2s ease-out;

  &::before {
    content: "";
    position: absolute;
    width: 4px;
    height: 100%;
    background: #7292b1;
    top: 0;
    left: 0;
  }

  &:hover {
    background: #32465a;
  }

  a {
    color: #7292b1;
  }

  &-publisher {
    text-transform: uppercase;
    font-size: 10px;
    color: #7292b1;
    opacity: 0.5;
    margin-top: 6px;
  }

  &-date {
    text-transform: uppercase;
    font-size: 10px;
    color: #7292b1;
    opacity: 0.3;
    margin-top: 6px;
  }
}
</style>
