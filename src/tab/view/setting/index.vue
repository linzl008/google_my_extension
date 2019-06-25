<template>
    <el-container class="home">
        <div class="main-box">
            <el-input placeholder="请输入内容" v-model="keyWord"  class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="百度" value="baidu"></el-option>
                    <el-option label="谷歌" value="google"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
            </el-input>
        </div>
    </el-container>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                keyWord:"",
                select:"baidu"
            }
        },
        methods:{
            search(){
                switch (this.select) {
                    case "baidu" :
                        window.location.href = 'https://www.baidu.com/s?ie=UTF-8&wd='+this.keyWord;
                        break;
                    case "google" :
                        window.location.href = `https://www.google.com.hk/search?safe=strict&q=${this.keyWord}&oq=${this.keyWord}`;
                        break;
                    default:
                        window.location.href = 'https://www.baidu.com/s?ie=UTF-8&wd='+this.keyWord;
                        break;
                }
            }
        }
    }
</script>

<style lang="scss" >
    @import "../../assets/css/home/home.scss";
</style>