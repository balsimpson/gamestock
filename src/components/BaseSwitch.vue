<template>
  <!-- <small>group by symbol</small> -->
  <div class="uk-flex uk-flex-middle">
    <div class="uk-width-auto uk-flex uk-flex-middle">
      <label class="uk-switch" for="default-3">
        <input
          @change="switched"
          type="checkbox"
          id="default-3"
          :checked="state"
        />
        <div class="uk-switch-slider uk-switch-big"></div>
      </label>
    </div>
    <div class="uk-text-left">
      <div class="switch-title-small">Group by</div>
      <div class="switch-title">symbol</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseSwitch",
  props: ["title", "state"],
  emits: ["valueChange"],
  setup(props, { emit }) {
    // console.log(props);
    const switched = (e) => {
      emit("valueChange", e.target.checked);
    };

    return { switched };
  },
};
</script>

<style>
.switch-title {
  text-transform: uppercase;
  line-height: 1;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  margin-left: 4px;
}
.switch-title-small {
  text-transform: uppercase;
  font-size: 8px;
  margin-left: 4px;
}
.uk-switch {
  position: relative;
  display: inline-block;
  height: 25px;
  width: 50px;
}
.uk-switch input {
  display: none;
}
/* Slider */
.uk-switch-slider {
  background-color: rgba(0, 0, 0, 0.22);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 500px;
  bottom: 0;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.2s;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.07);
}
/* Switch pointer */
.uk-switch-slider:before {
  content: "";
  background-color: #fff;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 2px;
  bottom: 2px;
  border-radius: 50%;
  transition-property: transform, box-shadow;
  transition-duration: 0.2s;
}
/* Slider active color */
input:checked + .uk-switch-slider {
  background-color: #39f !important;
}
/* Pointer active animation */
input:checked + .uk-switch-slider:before {
  transform: translateX(26px);
}
</style>