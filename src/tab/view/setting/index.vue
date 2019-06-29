<template>
    <el-container class="setting">
        <div class="main-box">
            <div class="t-left mainTitle">菜单管理</div>
            <menuTable :menu="menu" @toggleMenuState="toggleMenuState"></menuTable>
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
                { menu:'menu/getAllMenu' },
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
                this.$store.dispatch('menu/toggleMenuState',index)
            }
        }
    }
</script>

<style lang="scss" >
    @import "../../assets/css/setting/setting.scss";
</style>