<template>
  <footer>
    <div>
      <div class="uk-text-uppercase uk-text-small uk-text-bold">Made with</div>
      <div class="uk-flex uk-flex-middle uk-flex-center">
        <FontAwesomeIcon
          style="padding: 10px"
          icon="mug-hot"
          uk-tooltip="Lots of coffee"
        />
        <a href="https://vuejs.org/" target="_blank">
          <FontAwesomeIcon 
          icon="vuejs"
          uk-tooltip="VueJS"
        /></a>
        <a
          href="https://getuikit.com/"
          uk-icon="icon: uikit; ratio: .8"
          target="_blank"
          uk-tooltip="UIKit"
        ></a>
      </div>
    </div>
  </footer>
</template>

<script>
import FontAwesomeIcon from "@/components/FontAwesomeIcon";
export default {
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/global.scss";
footer {
  margin-top: 40px;
}

a {
  padding: 10px;
  color: $theme1-primary-200;
}
</style>