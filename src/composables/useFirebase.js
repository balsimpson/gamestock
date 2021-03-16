// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
// import "firebase/storage";

import store from "../store";

const config = {
  apiKey: "AIzaSyCpA7LEwcvW8hg1eNBxxWm1RoCmUbnLUYQ",
  authDomain: "paperhand.firebaseapp.com",
  projectId: "paperhand",
  storageBucket: "paperhand.appspot.com",
  messagingSenderId: "882595245751",
  appId: "1:882595245751:web:388adcb2bc071955d52732",
  measurementId: "G-4LZVYTY36X"
};

const firebaseService = firebase.initializeApp(config);

const db = firebaseService.firestore();
const auth = firebaseService.auth();

const provider = new firebase.auth.GoogleAuthProvider();

// collection references
const apes = db.collection("apes");
const trades = db.collection("trades");

const fb = {
  currentUser: "",
  async getAllUsers() {
    let itemRef = db.collection("artisans");
    // let getOptions = {
    // 	source: 'cache'
    // };
    let users = [];
    const snapshot = await itemRef.get();
    snapshot.forEach(doc => {
      users.push(doc.data());
    });
    console.log("artisans", users);
    return users;
  },
  async getAllProducts() {
    let itemRef = db.collection("items");
    // let getOptions = {
    // 	source: 'cache'
    // };
    let products = [];
    const snapshot = await itemRef.get();
    snapshot.forEach(doc => {
      products.push(doc.data());
    });
    return products;
  },
  // Users
  async checkUserExists(user) {},
  async addUser(user) {
    let itemRef = db.collection("users").doc(user.email);
    return await itemRef.set(user);
  },
  async updateUser(user) {
    let itemRef = db.collection("users").doc(user.email);
    return await itemRef.update(user);
  },
  async deleteUser(user_id) {
    let itemRef = db.collection("users").doc(user_id);
    return await itemRef.delete();
  },

  // Update Walet
  async updateWallet(data, userEmail) {
    console.log(data, userEmail);
    let itemRef = apes.doc(userEmail);
    itemRef.update(data);
  },

  // Items
  async addItem(item, user_id) {
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
    console.log("itemref", data);
    let itemRef = apes
      .doc(user_id)
      .collection("portfolio")
      .doc(item.symbol);
    return await itemRef.set(data);
  },
  async updateItem(data, itemId, user_id) {
    let itemRef = apes
      .doc(user_id)
      .collection("portfolio")
      .doc(itemId);
    return await itemRef.update(data);
  },
  async deleteItem(data, itemId, user_id) {
    let itemRef = apes
      .doc(user_id)
      .collection("portfolio")
      .doc(itemId);
    return await itemRef.delete(data);
  },
  // auth
  async signIn(inputEmail, inputPassword) {
    let user = await auth.signInWithEmailAndPassword(inputEmail, inputPassword);
    console.log(user);
    return user;
  },
  async signOut() {
    let res = await auth.signOut();
    return res;
  },
  async checkLogin() {
    // let user = firebaseService.auth().currentUser;
    // console.log('user login check', user);
    // return user;
    // const store = useStore();
    // auth.onAuthStateChanged((user) => {
    // 	if (user) {
    // 		console.log('user is logged in', user);
    // 		store.commit('addUser', user.email);
    // 		console.log('store', store.getters.getUser);
    // 		this.currentUser = user.email;
    // 		return user.email;
    // 	} else {
    // 		console.log('user not logged in');
    // 		return null;
    // 	}
    // })
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
