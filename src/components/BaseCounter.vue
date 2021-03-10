<template>
  <div class="uk-margin-small-bottom uk-text-small uk-text-uppercase">
    {{ header }}
  </div>
  <div class="number-input">
    <button @click="stepDown"></button>
    <input @change="countChange" name="count" type="number" v-model="count" />
    <button @click="stepUp" class="plus"></button>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "BaseCounter",
  props: {
    header: String,
  },
  setup(props, { emit }) {
    const count = ref(0);

    const countChange = () => {
      emit("count-change", count);
    };
    const stepUp = () => {
      count.value++;
      emit("count-change", count);
    };
    const stepDown = () => {
      if (count.value > 0) {
        count.value--;
      }
      emit("count-change", count);
    };

    return { count, stepUp, stepDown, countChange };
  },
};
</script>

<style scoped>
input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.number-input {
  border: 0;
  display: inline-flex;
}

.number-input,
.number-input * {
  box-sizing: border-box;
}

.number-input button {
  outline: none;
  -webkit-appearance: none;
  background-color: transparent;
  border: none;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  margin: 0;
  position: relative;
  box-shadow: 0px 0px 1px #272727;
  border-radius: 50%;
}

.number-input button:before,
.number-input button:after {
  display: inline-block;
  position: absolute;
  content: "";
  width: 1rem;
  height: 2px;
  background-color: #212121;
  transform: translate(-50%, -50%);
}
.number-input button.plus:after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.number-input input[type="number"] {
  font-family: sans-serif;
  max-width: 5rem;
  padding: 0.5rem;
  border: none;
  border-width: 0 2px;
  font-size: 2rem;
  height: 3rem;
  font-weight: bold;
  text-align: center;
  color: #3b3d3d;
}
</style>