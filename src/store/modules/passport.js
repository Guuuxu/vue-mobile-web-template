import storage from '@/utils/storage';
import sessionStorage from '@/utils/sessionstorage';
import { loginBySmsCode } from '@/api/passport';
import { getCurrentUserDetail } from '@/api/customer/base';

const namespaced = true;
const state = {
  token: '',
  customerBaseInfo: null,
};
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    storage.$instance.setItem('passport.csxc_token', token);
  },
  SET_CUSTOMER_BASE_INFO(state, customerBaseInfo) {
    state.customerBaseInfo = customerBaseInfo;
    // storage.$instance.setItem('csxc_customer_base_info', customerBaseInfo);
  },
};
const actions = {
  LoginBySmsCode({ commit }, loginInfo) {
    return new Promise((resolve, reject) => {
      loginBySmsCode(loginInfo)
        .then((res) => {
          commit('SET_TOKEN', res.data);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  GetCustomerBaseInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getCurrentUserDetail()
        .then((res) => {
          commit('SET_CUSTOMER_BASE_INFO', res.data);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  LogOut({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '');
      storage.$instance.removeItem('passport.csxc_token');
      sessionStorage.$instance.removeItem('currentSelectTabBar');
      resolve();
    });
  },
};
const getters = {};
export default {
  namespaced,
  state,
  mutations,
  actions,
  getters,
};
