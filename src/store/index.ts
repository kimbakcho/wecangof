import Vue from 'vue'
import Vuex from 'vuex'
import {state} from "@/store/state";
import {mutations} from "@/store/mutations";

Vue.use(Vuex)

const store = {
  state: state,
  mutations: mutations
};

export default new Vuex.Store(store);
