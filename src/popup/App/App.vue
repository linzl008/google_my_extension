<template>
    <el-tabs type="border-card" v-model="tab">
        <el-tab-pane label="遮罩" name="0">
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
        <el-tab-pane label="翻译" name="1">
            <div class="box-card translate" >
                <div>
                    <el-input row="1" type="textarea" size="mini" v-model="word" @change="langdetectBefore"></el-input>
                    <el-select v-model="from" style="width: 100px" size="mini" placeholder="请选择">
                        <el-option
                                v-for="item in list"
                                :key="item.val"
                                :label="item.name"
                                :value="item.val">
                        </el-option>
                    </el-select>
                    <i class="el-icon-sort"></i>
                    <el-select v-model="to" style="width: 100px" size="mini" placeholder="请选择">
                        <el-option
                                v-for="item in list"
                                :key="item.val"
                                :label="item.name"
                                :value="item.val">
                        </el-option>
                    </el-select>
                    <el-button class="fr" type="primary" size="mini" @click="translate">确认</el-button>
                </div>
                <div>
                    <h3> 翻译结果：</h3>
                    {{dst}}
                </div>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import {sendMessageToContentScript as sendMes} from '../../utils/brige.js';
    import {LANGUAGE } from '../../utils/list'
    import axios from 'axios';
    import md5 from 'md5'
    export default {
        name: 'app',
        data() {
            return {
                tab:"1",
                slider: 30,
                globalUse: false,
                word:"",
                list:LANGUAGE,
                dst:"",
                from:"auto",
                to:"auto",
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
                sendMes({cmd: 'setCover', value: (this.slider / 100)},function (e) {
                    console.log(e+'end');
                })
            },
             debounce(fn, wait) {
                var timeout = null;
                return function() {
                    if(timeout !== null)   clearTimeout(timeout);
                    timeout = setTimeout(fn, wait);
                }
            },
            langdetectBefore(){
                console.log(this.word);
              this.debounce(this.langdetect(),500)
            },
            //检测语言
            langdetect(){
                if(!this.word.length) return
                var formData = new FormData();
                let random = parseInt(Math.random()*100)
                formData.append('q',this.word);
                formData.append('appid',"20190620000309098");
                formData.append('salt',random);
                formData.append('sign',md5('20190620000309098'+this.word+random+'6Q3Ti6OJX7uXlsnwliPS'));
                axios.post('https://fanyi-api.baidu.com/api/trans/vip/language',formData).then(res=>{
                    if(res.data.error_code === 0){
                        this.from = res.data.data.src
                    }else{
                        this.from = 'auto'
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            //翻译
            translate(){
                var formData = new FormData();
                let random = parseInt(Math.random()*100)
                formData.append('q',this.word);
                formData.append('from',this.from);
                formData.append('to',this.to);
                formData.append('appid',"20190620000309098");
                formData.append('salt',random);
                formData.append('sign',md5('20190620000309098'+this.word+random+'6Q3Ti6OJX7uXlsnwliPS'));
                axios.post('http://api.fanyi.baidu.com/api/trans/vip/translate',formData).then(res=>{
                    console.log(res);
                    this.dst = res.data.trans_result[0].dst
                }).catch(err=>{
                    console.log(err);
                    this.dst = '翻译错误'
                })
            },
            toggleGlobalCover(){
                window.chrome.storage.sync.set({lzlGlobalUseCover: this.globalUse});
                window.chrome.storage.sync.set({lzlGlobalUseCoverOpacity: this.slider});
            }
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
    .translate{
        min-height: 350px;

    }
    .translate .el-icon-sort{
        transform: rotate(90deg);
        margin: 0 5px;
    }
</style>
