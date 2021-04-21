<template>
  <div class="home">
    <div class="uk-container uk-container-small uk-padding-large">
      <div
        class="uk-grid-collapse uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s uk-text-center uk-padding"
        uk-grid
      >
        <div class="uk-flex uk-flex-middle uk-text-center">
          <div>
            <div class="hero-headline">
              Stock trading <span>Simulator </span>
            </div>
            <div class="hero-text">
              Test your <strong>market</strong> understanding and hunches by practising your trading based on real time market prices. Or maybe you want to support your fellow apes on their trip to the moon. Just sign in to get started.
              <BaseButton
                style="margin: 0 auto; margin-top: 20px"
                @btnClick="getStarted()"
                icon="google"
                text="google sign in"
                type="filled"
                size="small"
                color="light"
              />
            </div>
          </div>
        </div>

        <!-- hero image -->
        <div class="uk-visible@s">
          <img src="../assets/taken.svg" alt="" />
        </div>
      </div>
    </div>

    <BaseNews />

  </div>
</template>

<script>
// @ is an alias to /src
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import store from "../store";
import BaseButton from "@/components/BaseButton.vue";
import BaseNews from "@/components/BaseNews.vue";
import BaseFooter from "@/components/BaseFooter.vue";

import FontAwesomeIcon from "@/components/FontAwesomeIcon";

export default {
  name: "Home",
  components: {
    BaseButton,
    BaseNews,
    FontAwesomeIcon,
    BaseFooter,
  },
  setup() {
    const router = useRouter();
    const searchResults = ref([]);
    const searchNews = ref([]);
    const username = ref("");
    const chosenTheme = ref("");

    const getStarted = () => {
      console.log("getting started", username.value);
      // router.push({ name: 'Dashboard', params: { username: username.value } });
      store.dispatch("signIn");
    };

    const signOut = () => {
      store.dispatch("signOut");
    };

    const btnHandler = (e) => {
      console.log(e);
      chosenTheme.value = e;
    };

    return {
      btnHandler,
      searchResults,
      searchNews,
      getStarted,
      signOut,
      username,
      chosenTheme,
    };
  },
};
</script>

<style scoped lang="scss">
@import "../styles/global.scss";

img {
  max-height: 300px;
}

.hero-headline {
  font-size: 3em;
  font-weight: 500;
  padding: 0 20px;
  text-transform: uppercase;
  line-height: 0.8;
  color: $theme-background-dark;

  span {
    color: $theme1-primary-800;
    font-weight: 900;
  }
}

.hero-text {
  padding: 20px;
  font-size: 1em;
  font-weight: 500;
  padding-bottom: 0.4rem;
  // color: $cloud-palest-blue;
}
</style>
