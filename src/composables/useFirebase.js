// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
// import "firebase/storage";

import store from "../store";

const config = {
  apiKey: "AIzaSyCpA7LEwcvW8hg1eNBxxWm1Ro******",
  authDomain: "xxxxx.firebaseapp.com",
  projectId: "xxxxx",
  storageBucket: "xxxxxx.appspot.com",
  messagingSenderId: "88259524XXXX",
  appId: "1:882595245751:web:388adcb2bc071955XXXXXX",
  measurementId: "G-4LZVYXXXX"
};

const firebaseService = firebase.initializeApp(config);

const db = firebaseService.firestore();
const auth = firebaseService.auth();
const analytics = firebaseService.analytics();

const provider = new firebase.auth.GoogleAuthProvider();

// collection references
const apes = db.collection("apes");
const trades = db.collection("trades");

const fb = {
  currentUser: "",
  // async getAllUsers() {
  //   let itemRef = db.collection("artisans");
  //   // let getOptions = {
  //   // 	source: 'cache'
  //   // };
  //   let users = [];
  //   const snapshot = await itemRef.get();
  //   snapshot.forEach(doc => {
  //     users.push(doc.data());
  //   });
  //   console.log("artisans", users);
  //   return users;
  // },
  // async getAllProducts() {
  //   let itemRef = db.collection("items");
  //   // let getOptions = {
  //   // 	source: 'cache'
  //   // };
  //   let products = [];
  //   const snapshot = await itemRef.get();
  //   snapshot.forEach(doc => {
  //     products.push(doc.data());
  //   });
  //   return products;
  // },
  // // Users
  // async checkUserExists(user) {},
  async addUser(user) {
    let itemRef = apes.doc(user.email);
    return await itemRef.set(user);
  },

  /**
   * @param { capital: true } data data to update
   * @param {string} userEmail user email
   * @returns
   */
  async updateUser(data, userEmail) {
    let itemRef = apes.doc(userEmail);
    return await itemRef.update(data);
  },

  async deleteUser(userEmail) {
    let itemRef = apes.doc(userEmail);
    return await itemRef.delete();
  },

  // Update Wallet
  async updateWallet(data, userEmail) {
    // console.log(data, userEmail);
    let itemRef = apes.doc(userEmail);
    itemRef.update(data);
  },

  // Items

  // Adding or updating items should be logged to trades
  async batchWrite(data) {
    // Get a new write batch
    const batch = db.batch();

    // add|update item


    let trade = {
      type: "buy | sell",
      date: Date.now(),
      symbol: "symbol",
      name: "name",
      shares: "share count",
      price: "market price"
    }
    // log in trades
    batch.add(trades, data);

    // Commit the batch
    await batch.commit();
  },

  async addItem(item, userEmail) {
    let data = {
      name: item.name,
      symbol: item.symbol,
      type: item.type,
      bought_price: item.bought_price,
      market_price: item.market_price,
      currency: item.currency,
      shares: item.shares,
      date: Date.now(),
      exchangeName: item.exchangeName,
      regularMarketTime: item.regularMarketTime,
      previousClose: item.previousClose
    };
    // console.log("itemref", data);
    let itemRef = apes.doc(userEmail).collection("portfolio");
    return await itemRef.add(data);
  },

  // Add to All trades
  async logTrade(item, tradeType, userUid, userName) {
    let data = {
      name: item.name,
      symbol: item.symbol,
      type: item.type,
      bought_price: item.bought_price,
      market_price: item.market_price,
      currency: item.currency,
      shares: item.shares,
      date: Date.now(),
      exchangeName: item.exchangeName,
      regularMarketTime: item.regularMarketTime,
      previousClose: item.previousClose,
      tradeType: tradeType,
      userUid: userUid,
      userName: userName
    };
    // console.log("logTrade", data);
    return await trades.add(data);
  },

  async updateItem(data, userEmail) {
    if (data.shares > 0) {
      // console.log('data', data);
      let itemRef = apes
        .doc(userEmail)
        .collection("portfolio")
        .doc(data.id);
      return await itemRef.update(data);
    } else {
      // delete the entry
      // console.log('delete', data);
      let itemRef = apes
        .doc(userEmail)
        .collection("portfolio")
        .doc(data.id);
      return await itemRef.delete();
    }
  },

  async deleteItem(data, itemId, userEmail) {
    let itemRef = apes
      .doc(userEmail)
      .collection("portfolio")
      .doc(itemId);
    return await itemRef.delete(data);
  },
  
  // auth
  async signIn(inputEmail, inputPassword) {
    try {
      let user = await auth.signInWithEmailAndPassword(
        inputEmail,
        inputPassword
      );
      // console.log(firebase.auth().currentUser.metadata.creationTime, firebase.auth().currentUser.metadata.lastSignInTime)
      checkUser();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  },
  // get new user status
  async checkUser() {
    let creationTime = await auth.currentUser;
    console.log("creationTime", creationTime);
  },
  async signOut() {
    let res = await auth.signOut();
    return res;
  },

  // storage
  async uploadToStorage(fileToUpload) {
    console.log("file", fileToUpload);
    let storageRef = storage.ref("profile/" + fileToUpload.name);
    let uploadTask = storageRef.put(fileToUpload);

    let url = await uploadTask.snapshot.ref.getDownloadURL();
    console.log("uploaded", url);
    return url;
  }
};

export { fb, db, auth, provider, apes, trades };
