<template>
    <el-tabs type="border-card">
        <el-tab-pane label="遮罩">
            <h3>是否全局使用
                <el-switch class="fr" v-model="globalUse" @change="toggleGlobalCover"></el-switch>
            </h3>
            <div class="box-card">
                <h3>增加半透明遮罩
                    <el-button class="fr" size="mini" @click="confirm">确认</el-button>
                </h3>
                <div>
                    <el-slider v-model="slider"></el-slider>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
    </el-tabs>
</template>

<script>
    import {sendMessageByWindow as sendMes} from '../../utils/brige.js'

    export default {
        name: 'app',
        data() {
            return {
                slider: 30,
                globalUse: false
            }
        },
        mounted(){
            window.chrome.storage.sync.get('lzlGlobalUseCoverOpacity',(data)=>{
                this.slider = Number(data.lzlGlobalUseCoverOpacity || 0);
            });
            window.chrome.storage.sync.get('lzlGlobalUseCover',(data)=>{
                this.globalUse = data.lzlGlobalUseCover || false;
            });
        },
        methods: {
            confirm() {
                sendMes({cmd: 'setCover', value: (this.slider / 100)})
            },
            toggleGlobalCover(){
                window.chrome.storage.sync.set({lzlGlobalUseCover: this.globalUse});
                window.chrome.storage.sync.set({lzlGlobalUseCoverOpacity: this.slider});
            }
        }
    }
</script>

<style>
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
</style>
