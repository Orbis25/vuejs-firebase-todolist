// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import elementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import firebase from "firebase";
Vue.use(elementUi);
Vue.config.productionTip = false;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDW4C7R_pLn32mqA_rotCLQEVvC-DYSaz0",
  authDomain: "vuejsandfirebase.firebaseapp.com",
  databaseURL: "https://vuejsandfirebase.firebaseio.com",
  projectId: "vuejsandfirebase",
  storageBucket: "vuejsandfirebase.appspot.com",
  messagingSenderId: "171161469435"
};
firebase.initializeApp(config);
//guard to route
router.beforeEach((to, from, next) => {
  //si esta autenticado devolvera un usuario si no, retornara falso
  let user = firebase.auth().currentUser;
  //si la ruta requiere autenticacion y el usuario no esta loggueado entonces 
  //mandalo al login
  if (to.meta.requiredAuth && !user) {
    next({ path: "/login" });
    //si la ruta no requiere autenticacion y tu estas logueado dejalo pasar en cualquier otro caso dejalo pasar
  } else if (!to.meta.requiredAuth && user) {
    next();
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});