<template>
    <el-container class="setting">
        <div class="main-box">
            <div class="t-left mainTitle">菜单管理</div>
<!--            {{menu}}-->
            <menuTable :menu="menu" @toggleMenuState="toggleMenuState"></menuTable>
            <!--<div class="t-left mainTitle">背景图片设置</div>
                <div class="w-box">
                    <el-upload
                            class="upload-demo"
                            drag
                            action="https://api.yunfengdie.com/api/upload"
                            :multiple="false"
                            accept="image/*"
                            on-success="handleUploadSuccess"
                            on-error="handleUploadError">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
            </div>-->

        </div>
    </el-container>
</template>

<script>
    import { mapGetters } from 'vuex';
    import menuTable from '../../components/setting/menuTable'
    export default {
        name: "index",
        data(){
            return{
            }
        },
        computed: {
            ...mapGetters(
                { menu:'menu/GET_ALL_MENU' },
            )
        },
        components:{
          menuTable
        },
        mounted(){
          console.log('-->',this.menu);
        },
        methods:{
            toggleMenuState(index){
                this.$store.dispatch('menu/TOOGLE_MENU',index)
            },
        }
    }
</script>

<style lang="scss" >
    @import "../../assets/css/setting/setting.scss";
</style>