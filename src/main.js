import { createApp } from "vue";
import moment from "moment";
import VueMoment from "vue-moment";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "@/composables/useFirebase";

let app;

auth.onAuthStateChanged(user => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .mount("#app");
  }

  if (user) {
    // console.log('user', user, user.additionalUserInfo);
    user.providerData.forEach(function(profile) {
      // console.log(profile);
      // console.log("Sign-in provider: " + profile.providerId);
      // console.log("  Provider-specific UID: " + profile.uid);
      // console.log("  Name: " + profile.displayName);
      // console.log("  Email: " + profile.email);
      // console.log("  Photo URL: " + profile.photoURL);
    });

    let userProfile = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid
    };

    let creationTime = auth.currentUser.metadata.creationTime;
    let lastSignInTime = auth.currentUser.metadata.lastSignInTime;

    if (creationTime === lastSignInTime) {
      userProfile.newUser = true;
      console.log("new user", userProfile);
    }

    store.dispatch("userLoggedIn", userProfile);
  }
});
