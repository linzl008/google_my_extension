import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', redirect: "/home"},//重定向
        {//管理平台
            path: "/",
            name: "layout",
            component: () => import("./view/layout/index.vue"),
            children: [
                {
                    path: "home",
                    name: "home",
                    component: () => import("./view/home/index.vue"),
                },
                {
                    path: "setting",
                    name: "setting",
                    component: () => import("./view/setting/index.vue"),
                }
            ]
        }
    ]
});
