import Vue from 'vue';
import Vuex from 'vuex';
// import passport from "./modules/passport"
import cacheView from './modules/cacheView';
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    cacheView,
    // passport
  },
  plugins: [],
});
