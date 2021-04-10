<template>
  <div>
    <router-view />
    <BaseFooter />
  </div>
</template>

<script>
import BaseFooter from "@/components/BaseFooter.vue";
export default {
  components: {
    BaseFooter
  }
  
}
</script>

<style lang="scss">
@import "./styles/global.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: $theme1-primary-300;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  margin-top: 0px;

  background: $theme1-primary-800;
  color: $theme1-primary-100;
}

</style>
