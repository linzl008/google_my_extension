<template>
    <div>
        <div class="box-card">
            <h3>增加半透明遮罩
                <span class="slider-block" >
                        <div class="display-dialog" :style="{background: 'rgba(0,0,0,'+slider/100+')'}"></div>
                        {{slider}}
                    </span>
            </h3>
            <div>
                <el-slider v-model="slider" ></el-slider>
            </div>
        </div>
        <el-button-group class="fr">
            <el-button type="primary"  size="mini" @click="confirm">全局设置</el-button>
            <el-button type="primary"  size="mini" @click="confirmSingle">当前页设置</el-button>
        </el-button-group>
    </div>

</template>

<script>
    import {sendMessageToContentScript as sendMes} from '../../utils/brige.js';
    export default {
        name: "modal",
        data() {
            return {
                slider: 30,
                globalUse: false,
            }
        },
        mounted(){
            window.chrome.storage.sync.get('lzlGlobalUseCoverOpacity',(data)=>{
                this.slider = Number(data.lzlGlobalUseCoverOpacity || 0);
            });
            window.chrome.storage.sync.get('lzlGlobalUseCover',(data)=>{
                console.log({data});
                this.globalUse = data.lzlGlobalUseCover || false;
            });
        },
        methods: {
            confirm() {
                window.chrome.storage.sync.set({lzlGlobalUseCover: true});
                window.chrome.storage.sync.set({lzlGlobalUseCoverOpacity: this.slider});
                sendMes({cmd: 'setCover', value: (this.slider / 100)},function (e) {
                    console.log(e);
                })
            },
            confirmSingle() {
                sendMes({cmd: 'setCover', value: (this.slider / 100)},function (e) {
                    console.log(e);
                })
            },
        },
    }
</script>

<style scoped>

</style>
