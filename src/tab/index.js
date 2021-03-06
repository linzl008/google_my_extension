import Vue from "vue";
import AppComponent from "./App.vue";
import './plugins/axios'
import store from "./store";

import router from "./router";
// Vue.component("app-component", AppComponent);

import './plugins/element.js'
import './assets/css/comment.scss'
import './assets/css/font_ali/iconfont.css'
new Vue({
    el: "#app",
    store,
    router,
    render: createElement => {
        return createElement(AppComponent);
    }
});
