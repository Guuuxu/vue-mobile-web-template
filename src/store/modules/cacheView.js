const namespaced = true;
const state = {
  cachedViews: [],
};
const mutations = {
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return;
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name);
    }
  },
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name);
    index > -1 && state.cachedViews.splice(index, 1);
  },
  DEL_ALL_CACHED_VIEWS: (state) => {
    state.cachedViews = [];
  },
};
const actions = {
  AddCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view);
  },
  DelCachedView({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('DEL_CACHED_VIEW', view);
      resolve([...state.cachedViews]);
    });
  },
  DelAllCachedViews({ commit, state }) {
    return new Promise((resolve) => {
      commit('DEL_ALL_CACHED_VIEWS');
      resolve([...state.cachedViews]);
    });
  },
};
export default {
  namespaced,
  state,
  mutations,
  actions,
};
