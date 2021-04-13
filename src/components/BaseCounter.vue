<template>
  <div class="counter-header">
    {{ header }}
  </div>
  <div class="number-input">
    <button @click="stepDown"></button>
    <input @change="countChange" name="count" type="number" v-model="count" />
    <button @click="stepUp" class="plus"></button>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "BaseCounter",
  props: {
    header: String,
    maxCount: Number,
  },
  emits: ["count-change"],
  setup(props, { emit }) {
    const count = ref(0);
    // console.log(props.maxCount)
    const countChange = () => {
      emit("count-change", count);
    };

    const stepUp = () => {
      if (count.value < props.maxCount) {
        count.value++;
        emit("count-change", count);
      }
    };
    const stepDown = () => {
      if (count.value > 0) {
        count.value--;
        emit("count-change", count);
      }
    };

    onMounted(() => {
      UIkit.util.on("#modal", "beforeshow", function () {
        // do something
        count.value = 0;
        emit("count-change", count);
      });
    })

    return { count, stepUp, stepDown, countChange };
  },
};
</script>

<style scoped lang="scss">
@import "../styles/global.scss";

.counter-header {
  text-transform: uppercase;
  padding-bottom: 20px;
  color: $theme1-primary-600;
}

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
  /* border: none; */
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  margin: 0;
  position: relative;
  /* box-shadow: 0px 0px 1px #ffffff; */
  border: 1px solid $theme1-primary-700;
  /* box-shadow: 0px 0px 1px #3e5974; */
  border-radius: 50%;
}

.number-input button:active {
  border: 2px solid $theme1-primary-400;
}

.number-input button:before,
.number-input button:after {
  display: inline-block;
  position: absolute;
  content: "";
  width: 1rem;
  height: 2px;
  background-color: $theme1-primary-600;
  transform: translate(-50%, -50%);
}
.number-input button.plus:after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.number-input input[type="number"] {
  font-family: sans-serif;
  max-width: 5rem;
  padding: 0.2rem;
  margin: 0 0.2em;
  border: none;
  border-radius: 10px;
  /* border-width: 0 2px; */
  font-size: 2rem;
  height: 3rem;
  font-weight: bold;
  text-align: center;
  color: $theme1-primary-400;
  background: transparent;
}

.number-input input[type="number"]:focus {
  outline: none;
  color: $theme1-primary-500;
}
</style>