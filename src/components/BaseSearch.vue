<template>
  <div class="uk-container">
    <form class="uk-search uk-search-large uk-width-expand">
      <span uk-search-icon></span>
      <input
        v-model="query"
        @input="debounceListener"
        class="uk-search-input search-bar"
        type="search"
        :placeholder="placeholder"
      />
    </form>
    <p v-if="query">{{ displayQuery }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "BaseSearch",
  props: {
    placeholder: String,
  },
  setup(props, { emit }) {
    const query = ref("");
    let timeoutRef = null;
    const displayQuery = ref("");
    const debouncedValue = ref("");
    const debounceListener = async (e) => {
      if (timeoutRef !== null) {
        clearTimeout(timeoutRef);
      }
      timeoutRef = setTimeout(async () => {
        displayQuery.value = "searching for " + query.value;
        debouncedValue.value = query.value;
        emit("search-query", query.value);
      }, 800);
    };

    return { query, debounceListener, displayQuery };
  },
};
</script>

<style scoped>
.search-bar {
  border: 1px solid #4b5a6c;
  border-radius: 50px;
  transition: border 0.2s;
}
.search-bar:focus {
  border: 1px solid #a3b2c3;
}
</style>