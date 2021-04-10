<template>
  <div @click="btnHandler" class="btn" :class="[btnSize, btnColor, btnType]">
    <FontAwesomeIcon v-if="icon" :icon="icon" class="uk-margin-small-right" />
    <span class="btn-txt">{{ text }}</span>
  </div>
</template>

<script>
import FontAwesomeIcon from "@/components/FontAwesomeIcon";
import { computed } from "@vue/runtime-core";
export default {
  name: "BaseButton",
  emits: ["btn-click"],
  props: {
    icon: { type: String },
    text: { type: String, default: "button" },
    type: { type: String, default: "filled" },
    size: { type: String, default: "small|medium|large" },
    color: { type: String, default: "light|dark" },
  },
  components: {
    FontAwesomeIcon,
  },
  setup(props, { emit }) {
    const btnHandler = (e) => {
      emit("btn-click", e);
    };

    const btnType = computed(() => "btn-" + props.type);

    const btnSize = computed(() => "btn-" + props.size);

    const btnColor = computed(() => "btn-" + props.color);

    return { btnHandler, btnSize, btnColor, btnType };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/global.scss";
.btn {
  cursor: pointer;
  text-transform: uppercase;
  line-height: 1.5;
  font-weight: 900;
  padding: 4px 18px;
  border-radius: 20px;
  width: fit-content;
  // box-shadow: 0px 3px 8px #00000024;
  transition: all 0.2s ease-out;
}

.btn-small {
  font-size: 12px;
}

.btn-large {
  font-size: 18px;
}

.btn-light.btn-filled {
  background: $theme1-primary-800;
  color: $theme1-primary-200;
  border: 2px solid $theme1-primary-800;

  &:hover {
    background: transparent;
    border: 2px solid $theme1-primary-800;
    color: $theme1-primary-800;
  }
}

.btn-light.btn-outline {
  background: transparent;
  color: $theme1-primary-600;
  border: 2px solid;

  &:hover {
    background: $theme1-primary-600;
    border: 2px solid $theme1-primary-600;
    color: $theme1-primary-900;
  }
}

.btn-dark.btn-outline {
  background: transparent;
  color: $light-primary-300;
  border: 2px solid;

  &:hover {
    background: $light-primary-300;
    color: $light-primary-100;
  }
}

.btn-dark.btn-filled {
  background: $light-contrast-300;
  color: $light-primary-100;
  border: 2px solid;

  &:hover {
    background: transparent;
    color: $light-primary-300;
  }
}
</style>