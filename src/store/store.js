// store.js

// store.js

import { createStore } from 'vuex';

const store = createStore({
  state: {
    address: null,
    phone: null,
    // 其他状态...
  },
  mutations: {
    setAddress(state, address) {
      state.address = address;
    },
    setPhone(state, phone) {
      state.phone = phone;
    },
    // 其他 mutations...
  },
  getters: {
    getAddress: state => state.address,
    getPhone: state => state.phone,
    // 其他 getters...
  },
  // 其他模块和配置...
});

export default store;

