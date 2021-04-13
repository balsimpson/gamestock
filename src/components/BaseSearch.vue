<template>
  <!-- <div class="uk-container"> -->

    <div class="uk-margin">
      <form @submit.prevent="emitSearch" class="uk-search uk-search-large">
        <a
          @click.prevent="emitSearch"
          href="#"
          class="uk-search-icon-flip"
          uk-search-icon
        ></a>
        <input
          class="uk-search-input search-bar"
          type="search"
          v-model="query"
          :placeholder="placeholder"
        />
      </form>
    </div>

    <p v-if="query">{{ displayQuery }}</p>
  <!-- </div> -->
</template>

<script>
import { ref } from "vue";
export default {
  name: "BaseSearch",
  props: {
    placeholder: String,
  },
  emits: ["search-query"],
  setup(props, { emit }) {
    const query = ref("");
    let timeoutRef = null;
    const debouncedValue = ref("");
    const displayQuery = ref("");

    const emitSearch = () => {
      console.log('search', query.value);
      emit("search-query", query.value);
    };

    const debounceListener = async (e) => {
      if (timeoutRef !== null) {
        clearTimeout(timeoutRef);
      }
      timeoutRef = setTimeout(async () => {
        // displayQuery.value = "searching for " + query.value;
        debouncedValue.value = query.value;
        emitSearch();
      }, 800);
    };

    return { query, emitSearch, debounceListener, displayQuery };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/global.scss";
.search-bar {
  // position: relative;
  border: 2px solid $theme1-primary-400;
  border-radius: 50px;
  transition: border 0.2s;
  // text-align: left;
  padding: 30px;
  // width: 400px;
  // height: 60px;
  // font-size: 20px;
  // margin-bottom: 1.4em;
}

// .search-bar-icon {
//   position: absolute;
//   top: 0;
//   right: 0px;
//   z-index: 2;
// }

.search-bar:focus {
  border: 2px solid $theme1-primary-600;
}
</style>