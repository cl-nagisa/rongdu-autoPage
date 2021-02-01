import Vue from 'vue';

const state = {};

const mutations = {
  login(state, user) {
    window.localStorage.setItem('user', JSON.stringify(user));
    Object.assign(state, user);
  },
  logout(state) {
    window.localStorage.removeItem('user');
    Object.keys(state).forEach(k => Vue.delete(state, k));
  }
};

const actions = {
  login({ commit }, user) {
    commit('login', user);
  },
  logout({ commit }) {
    commit('logout');
  }
};

export default {
  state,
  mutations,
  actions
};
