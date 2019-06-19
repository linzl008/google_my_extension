import Vue from "vue";
import AppComponent from "./App/App.vue";

Vue.component("app-component", AppComponent);

import {
    Card,
    Button,
    Slider,
    Tabs,
    TabPane,
    Switch
} from 'element-ui';

Vue.use(Card);
Vue.use(Button);
Vue.use(Slider);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Switch);

new Vue({
    el: "#app",
    render: createElement => {
        return createElement(AppComponent);
    }
});