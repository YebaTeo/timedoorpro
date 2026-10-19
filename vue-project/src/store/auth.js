import axios from "axios";
import Cookies from "js-cookie";
const db = "https://recipe-vue-batch2-default-rtdb.firebaseio.com",
  key = "AIzaSyAZw4XY-USmeiN9j1cLmxJ8W8mu_l2a19U";
export default {
  namespaced: true,
  state: () => ({
    token: null,
    tokenExpirationDate: null,
    userLogin: {},
    isLogin: false,
  }),
  mutations: {
    setToken(s, { idToken, expiresIn }) {
      s.token = idToken;
      s.tokenExpirationDate = expiresIn;
      Cookies.set("tokenExpirationDate", expiresIn);
      Cookies.set("jwt", idToken);
    },
    setUserLogin(s, { userData, loginStatus }) {
      s.userLogin = userData;
      s.isLogin = loginStatus;
    },
    setUserLogout(s) {
      s.token = null;
      s.userLogin = {};
      s.isLogin = false;
      s.tokenExpirationDate = null;
      Cookies.remove("jwt");
      Cookies.remove("tokenExpirationDate");
      Cookies.remove("UID");
    },
  },
  actions: {
    async getRegisterData({ commit, dispatch }, p) {
      try {
        const { data } = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
          { email: p.email, password: p.password, returnSecureToken: true },
        );
        commit("setToken", {
          idToken: data.idToken,
          expiresIn: Date.now() + Number.parseInt(data.expiresIn) * 1000,
        });
        const u = {
          userId: data.localId,
          firstname: p.firstname,
          lastname: p.lastname,
          username: p.username,
          email: p.email,
          imageLink: p.imageLink,
        };
        Cookies.set("UID", u.userId);
        await dispatch("addNewUser", u);
      } catch (e) {
        console.log(e);
      }
    },
    async addNewUser({ commit, state }, p) {
      try {
        await axios.post(`${db}/user.json?auth=${state.token}`, p);
        commit("setUserLogin", { userData: p, loginStatus: true });
      } catch (e) {
        console.log(e);
      }
    },
    async getLoginData({ commit, dispatch }, p) {
      try {
        const { data } = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
          { email: p.email, password: p.password, returnSecureToken: true },
        );
        commit("setToken", {
          idToken: data.idToken,
          expiresIn: Date.now() + Number.parseInt(data.expiresIn) * 1000,
        });
        await dispatch("getUser", data.localId);
      } catch (e) {
        console.log(e);
      }
    },
    async getUser({ commit }, id) {
      try {
        const { data } = await axios.get(`${db}/user.json`);
        for (const k in data)
          if (data[k].userId === id) {
            Cookies.set("UID", data[k].userId);
            commit("setUserLogin", { userData: data[k], loginStatus: true });
          }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
