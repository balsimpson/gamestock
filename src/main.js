import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from '@/composables/useFirebase'

let app;

auth.onAuthStateChanged((user) => {
	if (!app) {
		app = createApp(App).use(store).use(router).mount('#app');
	}
	
	if (user) {
		let userProfile = {
			name: user.displayName,
			email: user.email,
			photoURL: user.photoURL,
			uid: user.uid
		}
		// console.log(userProfile);
		store.dispatch('userLoggedIn', userProfile);
	}
})