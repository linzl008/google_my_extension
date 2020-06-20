<template>
    <el-container class="home">
        <div class="main-box">
            <div class="weather-box"></div>
            <div class="middle-box">
                <clock />
                <el-input
                        placeholder="请输入内容" :autofocus="true"
                        v-model="keyWord" @keyup.enter.native.stop.prevent="search"
                        class="input-with-select search-input">
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="百度" value="baidu"></el-option>
                        <el-option label="谷歌" value="google"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
                </el-input>
                <mymenu></mymenu>
            </div>
            <div class="weather-box">
                <weather @addCity="citySearchVisible=true" @deleteCity="deleteCity" :myCities="myCities"></weather>
            </div>
        </div>
        <!--城市搜索弹框-->
        <citySearch :visible="citySearchVisible" @select="selectCity" @close="citySearchVisible=false"></citySearch>
    </el-container>
</template>

<script>
    import weather from '../../components/home/weather'
    import mymenu from '../../components/home/menu'
    import clock from '../../components/home/clock'
    import citySearch from '../../components/home/city-search'
    export default {
        name: "index",
        data(){
            return{
                keyWord:"",
                select:"baidu",
                citySearchVisible:false,
                myCities:[]
            }
        },
        components:{
            weather, citySearch ,clock,mymenu
        },
        created(){
        },
        mounted(){
          this.initData()
            // document.addEventListener()
        },
        methods:{
            initData(){
                this.myCities = JSON.parse(localStorage.getItem('lzl_weather_cities')||"[]");
            },
            selectCity(data){
                let cities = JSON.parse(localStorage.getItem('lzl_weather_cities')||"[]");
                cities  = (new Set(cities.filter(i=>i)))
                cities.add(data.cid);
                cities = new Array(...cities);
                localStorage.setItem('lzl_weather_cities',JSON.stringify(cities));
                this.myCities = cities;
                this.$message.success('已添加城市');
            },
            deleteCity(index){
                this.myCities.splice(index,1);
                localStorage.setItem('lzl_weather_cities',JSON.stringify(this.myCities));
            },
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
