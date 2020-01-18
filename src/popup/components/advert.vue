<template>
    <div>
        <div class="box-card translate" >
            屏蔽百度广告：
            <el-switch v-model="hideBaiDuAdvert" @change="toggleAdvert" ></el-switch>
        </div>
    </div>

</template>

<script>
    import {sendMessageToContentScript as sendMes} from '../../utils/brige.js';
    export default {
        name: "modal",
        data() {
            return {
                hideBaiDuAdvert: false,
            }
        },
        mounted(){
            window.chrome.storage.sync.get('hideBaiDuAdvert',(data)=>{
                this.hideBaiDuAdvert = Boolean(data.hideBaiDuAdvert);
            });
        },
        methods: {
            toggleAdvert() {
                console.log(this.hideBaiDuAdvert);
                window.chrome.storage.sync.set({hideBaiDuAdvert: Number(this.hideBaiDuAdvert)});
                sendMes({cmd: 'checkBaiDuAdvert', value: Number(this.hideBaiDuAdvert)},function (e) {
                    console.log(e);
                })
            },

        },
    }
</script>

<style scoped>

</style>
