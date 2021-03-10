<template>
  <div class="btn">
    <span class="uk-margin-small-right" :uk-icon="icon"> </span>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    icon: { type: String, default: "plus" },
    text: { type: String, default: "button" },
  },
};
</script>

<style scoped>
.btn {
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 400;
  padding: 4px 18px;
  background: #3e5974;
  color: white;
  border-radius: 20px;
  transition: 0.2s ease-out;
}
.btn:hover {
  background: white;
  color: #3e5974;
}
</style>