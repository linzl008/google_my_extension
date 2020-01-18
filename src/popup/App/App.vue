<template>
    <el-tabs type="border-card" v-model="tab">
        <el-tab-pane label="遮罩" name="0">
            <Modal></Modal>
        </el-tab-pane>
        <el-tab-pane label="翻译" name="1">
            <Translate></Translate>
        </el-tab-pane>
        <el-tab-pane label="广告" name="2">
            <Advert></Advert>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import Modal from '../components/modal'
    import Translate from '../components/translate'
    import Advert from '../components/advert'
    export default {
        name: 'app',
        data() {
            return {
                tab:"1",
            }
        },
        components:{
            Modal,Translate,Advert
        },
        mounted(){

        },
        methods: {
        }
    }
</script>

<style >
    h3 {
        margin: 0;
        padding-bottom: 10px;
    }

    .fr {
        float: right;
    }
    .box-card {
        width: 300px;
    }
    .slider-block{
        width: 50px;
        height: 19px;
        display: inline-block;
        float: right;
        text-align: center;
        position: relative;
    }
    .slider-block .display-dialog{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .translate{
        min-height: 350px;
    }
    .translate .el-icon-sort{
        transform: rotate(90deg);
        margin: 0 5px;
    }
</style>
