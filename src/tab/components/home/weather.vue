<template>
    <div class="weather">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <div class="tmp"><strong>{{local.now.tmp}}</strong>℃
                    <div class="cond_txt">{{local.now.cond_txt}}</div>
                    <img class="weather-logo fr" :src="picUrl+local.now.cond_code+'.png'"/>
                </div>
                <div><i class="el-icon-location"></i>{{local.basic.cnty}},{{local.basic.admin_area}},{{local.basic.location}}</div>
<!--                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            </div>
            <div>
                <div class="time">
                    <i class="el-icon-time"></i> {{local.update.loc}}
                    <span class="fr">来源：和风天气</span>
                </div>
            </div>
        </el-card>
        <el-card class="box-card add t-center" >
            <div @click="addCity">
                <i class="el-icon-plus" ></i>
            </div>
        </el-card>
    </div>
</template>

<script>
    import homeApi from '../../api/home'
    export default {
        name: "weather",
        data(){
            return {
                currentDate: new Date(),
                local:{},
                picUrl:"https://cdn.heweather.com/cond_icon/"
            }
        },
        mounted() {
            this.getWeatherNow()
        },
        methods:{
            addCity(){
                this.$emit('addCity')
            },
            getWeatherNow(){
                homeApi.getWeatherNow({location:"auto_ip"}).then(res=>{
                    console.log(res);
                    this.local = res.HeWeather6[0] || {}
                })
            }
        }
    }
</script>

<style lang="scss" >
    @import "../../assets/css/home/weather.scss";
</style>