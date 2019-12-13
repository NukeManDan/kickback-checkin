import Vue from 'vue';

export default ({ /* app, router, Vue, ... */ }) => {
  Vue.prototype.$event_secret = "superSecretKey";
}
