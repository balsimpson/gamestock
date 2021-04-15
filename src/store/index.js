import { createStore } from "vuex";
import { fb, auth, provider, apes, trades } from "@/composables/useFirebase";
import router from "@/router/index";
import { notify, sortArrayOfObjects } from "@/composables/useUtils";

let userObserver;
let portfolioObserver;
let tradeObserver;

const store = createStore({
  state: {
    userProfile: {},
    portfolio: [],
    trades: [],
    investment: 0,
    wallet: 0,
    isGrouped: false
  },
  getters: {
    getUser: state => state.userProfile,
    getIsGrouped: state => state.isGrouped,
    getStonkById: (state, id) => {
      const index = state.portfolio.findIndex(item => item.symbol === id);
      return state.portfolio[index];
    }
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
    },
    setTrades(state, val) {
      state.trades = val;
    },
    setIsGrouped(state, val) {
      state.isGrouped = val;
    },
    setMarketPrice(state, val) {
      if (state.portfolio && state.portfolio.length) {
        for (const stonk of state.portfolio) {
          if (stonk.symbol === val.symbol) {
            stonk.market_price = val.market_price;
            stonk.chart = val.chart;
          }
        }
      }
    },
    setPortfolioUpdate(state, val) {
      const index = state.portfolio.findIndex(item => item.id === val.id);
      state.portfolio[index] = val;
    },
    setPortfolioDelete(state, val) {
      const index = state.portfolio.findIndex(item => item.id === val.id);
      state.portfolio.splice(index, 1);
    }
  },
  actions: {
    async signIn({ dispatch }) {
      const { user } = await auth.signInWithPopup(provider);
    },

    async signOut({ commit }) {
      console.log("signed out");
      commit("setUserProfile", {});
      commit("setPortfolio", []);
      commit("setWallet", 0);
      userObserver();
      portfolioObserver();
      tradeObserver();
      await auth.signOut();
      router.push("/");
    },

    async userObserverHandler({ commit }, user) {
      const doc = apes.doc(user.email);

      try {
        userObserver = doc.onSnapshot(
          async doc => {
            let details = doc.data();

            if (details) {
              // console.log(details);
              commit("setWallet", details.wallet);
              commit("setIsGrouped", details.isGrouped);
            } else {
              console.log("no details", doc.data());
            }
          },
          err => {
            console.log(`Encountered error: ${err}`);
          }
        );
      } catch (error) {
        console.log("error:", error);
      }
    },

    async portfolioObserverHandler({ commit }, user) {
      const docs = apes
        .doc(user.email)
        .collection("portfolio")
        .orderBy("date", "desc");

      let portfolio = [];

      try {
        portfolioObserver = docs.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            // console.log(`Received doc snapshot: ${change.doc}`, change.doc.data());
            if (change.type === "added") {
              let doc = change.doc.data();
              doc.id = change.doc.id;
              portfolio.push(doc);
            }
            if (change.type === "modified") {
              let doc = change.doc.data();
              doc.id = change.doc.id;
              console.log("Modified: ", doc);
              commit("setPortfolioUpdate", doc);
            }
            if (change.type === "removed") {
              let doc = change.doc.data();
              doc.id = change.doc.id;
              console.log("Removed: ", doc);
              commit("setPortfolioDelete", doc);
            }
          });

          // console.log(portfolio);
          portfolio = sortArrayOfObjects(portfolio, "date", false);
          commit("setPortfolio", portfolio);
        });
      } catch (error) {
        console.log(error.message);
      }
    },

    async tradeObserverHandler({ commit, getters }, user) {
      const docs = trades
        .where("userUid", "==", getters.getUser.uid)
        .orderBy("date", "desc")
        .limit(10);

      let alltrades = [];

      try {
        tradeObserver = docs.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            // console.log(
            //   `Received doc snapshot: ${change.doc}`,
            //   change.doc.data()
            // );
            if (change.type === "added") {
              let doc = change.doc.data();
              doc.id = change.doc.id;
              alltrades.push(doc);
            }
          }),
          commit("setTrades", alltrades);
          // console.log('trade add', store.state.trades);
        });
      } catch (error) {
        console.log(error.message);
      }
    },

    async userLoggedIn({ commit, dispatch }, user) {
      if (user.newUser) {
        console.log("store new user");
        // add new user
        let newuser = {
          uid: user.uid,
          email: user.email,
          name: user.name,
          photoURL: user.photoURL,
          wallet: 10000,
          joined: Date.now()
        };
        let res = await fb.addUser(newuser);

        // notify
        let msg = `Hi ${user.name.split(" ")[0]}! Welcome to Paperhand.`;
        notify(msg, "success");

        commit("setUserProfile", user);
      } else {
        // console.log("store NOT new user");

        // notify
        let msg = `Hi ${user.name.split(" ")[0]}! Welcome back.`;
        notify(msg, "success");

        commit("setUserProfile", user);
      }

      dispatch("userObserverHandler", user);
      dispatch("portfolioObserverHandler", user);
      dispatch("tradeObserverHandler", user);
      router.push("/dashboard");
    },

    // get market price and other details
    // update relevant stock data
    async buyStonk({ getters }, data) {
      // console.log("buyStonk", data.stonk);
      let res = await fb.addItem(data.stonk, getters.getUser.email);
      await fb.updateWallet(data.wallet, getters.getUser.email);

      await fb.logTrade(
        data.stonk,
        "buy",
        getters.getUser.uid,
        getters.getUser.name
      );
    },

    async sellStonk({ getters }, data) {
      // console.log("sellStonk", data.stonk);
      let res = await fb.updateItem(data.stonk, getters.getUser.email);
      await fb.updateWallet(data.wallet, getters.getUser.email);

      // update stock shares
      data.stonk.shares = data.count;
      await fb.logTrade(
        data.stonk,
        "sell",
        getters.getUser.uid,
        getters.getUser.name
      );
    },

    // data: {isGrouped:true}
    async isGroupedHandler({ getters, commit }, data) {
      commit("setIsGrouped", data.isGrouped);
      await fb.updateUser(data, getters.getUser.email);
    }
    // get stock details by ID
  },

  modules: {}
});

export default store;
