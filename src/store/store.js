// import Vuex, { createStore } from "vuex";

// const store = createStore({
//   state() {
//     return {
//       movieName: "",
//     };
//   },
//   getters: {},
//   actions: {},
//   mutations: {},
// });

// export default store;

// import Vue from 'vue';
// import Vuex from 'vuex';
// import MovieIndex from './modules/movies/index';
// Vue.use(Vuex);
// export default new Vuex.Store({
//     modules: {
//         MovieIndex,
//     },
//     strict: true
// });

import { createStore, createLogger } from "vuex";
import MovieStore from "./modules/movies/index";

export default createStore({
  modules: {
    MovieStore,
  },
  strict: true
});
