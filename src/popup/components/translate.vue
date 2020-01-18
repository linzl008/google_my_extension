<template>
    <div>
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
    </div>
</template>

<script>
    import {LANGUAGE } from '../../utils/list'
    import md5 from 'md5'
    import axios from 'axios';
    export default {
        name: "translate",
        data() {
            return {
                word:"",
                list:LANGUAGE,
                dst:"",
                from:"auto",
                to:"auto",
            }
        },
        methods: {

            debounce(fn, wait) {
                var timeout = null;
                return function() {
                    if(timeout !== null)   clearTimeout(timeout);
                    timeout = setTimeout(fn, wait);
                }
            },
            langdetectBefore(){setActiveTag
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
        },
    }
</script>

<style scoped>

</style>
