<template>
    <div class="layout">
        <div class="main-container">
            <el-container>
                <el-aside width="auto">
                    <el-menu :default-active="$route.path" class="menu-wrapper scrollbarStyle2"
                             router
                             background-color="#545c64"
                             text-color="#fff"
                             active-text-color="#ffd04b"
                             :collapse="isCollapse">
                        <el-menu-item index="/home" class="submenu-title" >
                            <i class="el-icon-s-home"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                        <!--<el-menu-item index="/setting" class="submenu-title" >
                            <i class="el-icon-s-tools"></i>
                            <span slot="title">设置</span>
                        </el-menu-item>-->
                    </el-menu>
                    <div class="collapse-icon-box">
                        <i class="collapse-icon el-icon-s-fold" v-if="!isCollapse" @click="isCollapse=!isCollapse"></i>
                        <i class="collapse-icon el-icon-s-unfold" v-if="isCollapse" @click="isCollapse=!isCollapse"></i>
                    </div>
                </el-aside>
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive && isRouterAlive"></router-view>
            </el-container>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'app',
        data() {
            return {
                isCollapse: false,
                isRouterAlive: true, //刷新当前页面
                showMenuHeader:true
            }
        },
        mounted(){

        },
        methods: {
            //折叠侧边栏
            collapse() {
                this.isCollapse = !this.isCollapse;
                this.showMenuHeader = !this.showMenuHeader;
            },
            //刷新当前页面
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(function () {
                    this.isRouterAlive = true;
                });
            },
        }
    }
</script>

<style lang="scss">
    @import "../../assets/css/layout";
</style>
