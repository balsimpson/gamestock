import { createStore } from "vuex";
import { fb, auth, provider, apes, trades } from "@/composables/useFirebase";
import router from "@/router/index";

let userObserver;
let portfolioObserver;

const store = createStore({
  state: {
    userProfile: {},
    portfolio: [],
    trades: [],
    investment: 0,
    wallet: 0
  },
  getters: {
    getUser: state => state.userProfile
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPortfolio(state, val) {
      state.portfolio = val;
    },
    setInvestment(state, val) {
      state.investment = val;
    },
    setWallet(state, val) {
      state.wallet = val;
    }
  },
  actions: {
    async signIn({ dispatch }) {
      const { user } = await auth.signInWithPopup(provider);
    },

    async signOut({ commit }) {
      console.log("signed out");
      commit("setUserProfile", {});
      userObserver();
      await auth.signOut();
      router.push("/");
    },

    async userObserverHandler({ commit }, user) {
      const doc = apes.doc(user.email);
      userObserver = doc.onSnapshot(
        doc => {
          // console.log(`Received doc snapshot: ${doc}`, doc.data());
          let details = doc.data();

          if (details) {
            // console.log(details);
            commit("setInvestment", details.investment);
            commit("setWallet", details.wallet);
          } else {
            console.log("no portfolio");
          }
        },
        err => {
          console.log(`Encountered error: ${err}`);
        }
      );
    },

    async portfolioObserverHandler({ commit }, user) {
      const docs = apes.doc(user.email).collection("portfolio");

      let portfolio = [];
      portfolioObserver = docs.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            portfolio.push(change.doc.data());
          }
          if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
          }
        });

        console.log(portfolio);
        commit("setPortfolio", portfolio);
      });
    },

    async userLoggedIn({ commit, dispatch }, user) {
      commit("setUserProfile", user);
      // if user exists
      // let userDetails = await apes.doc(user.email).get();
      dispatch("userObserverHandler", user);
      dispatch("portfolioObserverHandler", user);
      // router.push("/dashboard");
    },

    // get market price and other details
    // update relevant stock data
    async buyStonk({ getters }, data) {
      console.log("stonk", data.stonk);
      let res = await fb.addItem(data.stonk, getters.getUser.email);
      await fb.updateWallet(data.wallet, getters.getUser.email);
    }
  },

  modules: {}
});

export default store;
