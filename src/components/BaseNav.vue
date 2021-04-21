<template>
  <nav class="uk-flex uk-flex-between uk-flex-middle uk-margin-medium-top">
    <router-link to="/dashboard" style="width: 300px">
      <img
        src="../assets/paperhand_logo.png"
        alt=""
        style="width: 100%; height: auto; object-fit: contain"
      />
    </router-link>

    <div class="uk-animation-fade" style="z-index: 2">
      <div class="user-profile">
        <img :src="user.photoURL" alt="" style="" />
      </div>

      <div
        class="nav-dropdown"
        uk-dropdown="pos: bottom-right; offset: 10;mode: click"
      >
        <ul class="uk-nav uk-dropdown-nav uk-text-left">
          <div class="arrow-up"></div>
          <li>
            <div class="profile-name-header">Signed in as</div>
            <div class="profile-name">{{ user.name }}</div>
          </li>

          <li class="nav-dropdown-item">
            <router-link to="/profile">
              <FontAwesomeIcon icon="user" />
              <span
                class="uk-text-medium uk-text-bold uk-text-uppercase uk-margin-small-left"
              >
                Profile
              </span>
            </router-link>
          </li>
          <!-- <li @click="btnHandler" class="nav-dropdown-item">
            <FontAwesomeIcon icon="bell" />
            <span
              class="uk-text-medium uk-text-bold uk-text-uppercase uk-margin-small-left"
            >
              All Trades
            </span>
          </li> -->

          <li class="nav-dropdown-item">
            <a href="#modal-feedback" uk-toggle>
              <FontAwesomeIcon icon="comment-dots" />
              <span
                class="uk-text-medium uk-text-bold uk-text-uppercase uk-margin-small-left"
              >
                Feedback
              </span>
            </a>
          </li>

          <li @click="btnHandler" class="nav-dropdown-item">
            <FontAwesomeIcon icon="sign-out-alt" />
            <span
              class="uk-text-medium uk-text-bold uk-text-uppercase uk-margin-small-left"
            >
              SIGN OUT
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div id="modal-feedback" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical feedback">
      <button class="uk-modal-close-default" type="button" uk-close></button>
      <h2 class="uk-text-muted">Feedback</h2>
      <p>
        Do you have any suggestions or found a bug? Please let me know.
      </p>
      
      <div class="uk-margin">
        <textarea
          v-model="feedbackText"
          class="uk-textarea"
          rows="5"
          placeholder="Your feedback..."
          style="border-radius:10px"
        ></textarea>
      </div>
      <div class="uk-text-center">
        <a
          @click="submitFeedback"
          href="#"
          class="uk-button uk-button-small uk-button-secondary uk-border-pill"
          >submit</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import FontAwesomeIcon from "@/components/FontAwesomeIcon";
import { ref, watchEffect } from "vue";
export default {
  name: "BaseNav",
  props: ["user"],
  emits: ["itemClick", "submitFeedback"],
  components: {
    FontAwesomeIcon,
  },
  setup(props, { emit }) {
    const store = useStore();
    const user1 = ref({});
    const feedbackText = ref("");

    const btnHandler = (e) => {
      let val = e.target.innerText.trim();
      emit("itemClick", val);
    };

    const submitFeedback = () => {
      if (feedbackText.value) {
        emit("submitFeedback", feedbackText.value);
        UIkit.modal("#modal-feedback").hide();
      }
    };

    watchEffect(() => {
      user1.value = store.state.userProfile;
      // console.log(user1.value, store.state.userProfile);
    });

    return { btnHandler, feedbackText, submitFeedback };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/global.scss";
.uk-dropdown {
  // box-shadow: none;
  min-width: 160px;
}
.uk-dropdown-nav > li > a {
  color: $theme1-primary-100;

  &:hover {
    color: $theme1-primary-800;
  }
}
.nav-dropdown {
  border-radius: 10px 10px 10px 10px;
  background: $theme1-primary-800;
  color: $theme1-primary-100;
  padding: 0;
  /* color: #ffffff; */
  // box-shadow: none;
}

.nav-dropdown-item {
  // border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.nav-dropdown-item:hover {
  background: $theme1-primary-500;
  color: $theme1-primary-800;

  a {
    color: $theme1-primary-800;
  }
}

.nav-dropdown-item:is(:last-child):hover {
  border-radius: 0px 0px 10px 10px;
}

li:not(:first-child) {
  padding: 6px 14px;
}
.arrow-up {
  position: absolute;
  top: -6px;
  right: 16px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;

  border-bottom: 8px solid $theme1-primary-800;
}

.user-profile {
  cursor: pointer;

  img {
    width: 36px;
    margin-right: 6px;
    border: 2px solid #787878;
    border-radius: 50%;
    transition: border 0.2s ease-out;

    &:hover {
      border: 2px solid $theme1-danger-800;
      background: rgba(255, 0, 0, 0.2);
    }
  }
}

.profile-name-header {
  margin-top: 10px;
  font-weight: 400;
  font-size: 8px;
  text-transform: uppercase;
  line-height: 1;
}

.profile-name {
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
}

#modal-feedback {
  color: $theme1-danger-300;
}
</style>