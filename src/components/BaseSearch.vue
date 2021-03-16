<template>
  <div class="uk-container">
    <form @submit.prevent="formSubmit" class="uk-search uk-search-large uk-width-expand">
      <!-- <span uk-search-icon></span> -->
      <input
        v-model="query"
        @input="debounceListener"
        class="uk-search-input search-bar"
        type="search"
        :placeholder="placeholder"
      />
    </form>
    <!-- <p v-if="query">{{ displayQuery }}</p> -->
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
    const debouncedValue = ref("");

    const emitSearch = () => {
      emit("search-query", query.value);
    }

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

    return { query, debounceListener };
  },
};
</script>

<style scoped>
.search-bar {
  border: 1px solid #4b5a6c;
  border-radius: 50px;
  transition: border 0.2s;
  text-align: center;
  max-width: 70%;
  margin-bottom: 20px;
}
.search-bar:focus {
  border: 1px solid #a3b2c3;
}
</style>