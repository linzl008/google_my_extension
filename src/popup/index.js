import Vue from "vue";
import AppComponent from "./App/App.vue";

Vue.component("app-component", AppComponent);

import {
    Card,
    Button,
    ButtonGroup,
    Slider,
    Tabs,
    TabPane,
    Switch,
    Input,
    Select,
    Option
} from 'element-ui';

Vue.use(Card);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Slider);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Switch);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);

new Vue({
    el: "#app",
    render: createElement => {
        return createElement(AppComponent);
    }
});
