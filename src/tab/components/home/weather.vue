<template>
    <div class="weather">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <div class="tmp"><strong>{{local.now?local.now.tmp:'--'}}</strong>℃
                    <div class="cond_txt">{{local.now?local.now.cond_txt:'--'}}</div>
                    <img class="weather-logo fr" :src="picUrl+local.now.cond_code+isNight(local)+'.png'"/>
                </div>
                <div><i class="el-icon-location"></i>{{local.basic| location}}</div>
            </div>
            <div>
                <div class="time">
                    <i class="el-icon-time"></i> {{local.update.loc}}
                    <span class="fr">来源：和风天气</span>
                </div>
            </div>
        </el-card>
        <el-card v-for="(item,index) in myCitesData" :key="index" class="box-card">
            <div slot="header" class="clearfix">
                <div class="tmp"><strong>{{item.now.tmp}}</strong>℃
                    <div class="cond_txt">{{item.now.cond_txt}}</div>
                    <img class="weather-logo fr" :src="picUrl+item.now.cond_code+isNight(item)+'.png'"/>
                </div>
                <div><i class="el-icon-location"></i>{{item.basic | location}}</div>
                <i class="el-icon-close" @click="deleteCity(index)"></i>
            </div>
            <div>
                <div class="time">
                    <i class="el-icon-time"></i> {{item.update.loc}}
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
        props:{
            myCities:Array,
        },
        data(){
            return {
                currentDate: new Date(),
                local:{
                    now:{},
                    basic:{},
                    update:{}
                },
                myCitesData:[],
                picUrl:"https://cdn.heweather.com/cond_icon/"
            }
        },
        watch:{
            myCities(newVal,oldVal){
                this.getMyCitiesWeather()
            }
        },
        filters:{
          location(basic){
              let parent_city  = basic.parent_city === basic.location? '':','+basic.parent_city;
              return `${basic.cnty},${basic.admin_area}${parent_city},${basic.location}`
          }
        },
        mounted() {
            this.getWeatherNow()
        },
        methods:{
            addCity(){
                this.$emit('addCity')
            },
            deleteCity(index){
                this.$emit('deleteCity',index);
            },
            getWeatherNow(){
                homeApi.getWeatherNow({location:"auto_ip"}).then(res=>{
                    this.local = res.HeWeather6[0] || {}
                })
            },
            isNight(item){
                let nPicList = ['100','103','104','300','301','406','407'];
                let code = item.now.cond_code?item.now.cond_code:"";
                let str = item.update?item.update.loc:"";
                let time = new Date(str);
                let hour = time.getHours();
                console.log(code);
                return (!(hour >= 6 && hour <18) && code.indexOf(nPicList)>=0)?'n':''
            },
            async getMyCitiesWeather(){
                console.log('start',this.myCities);
                let myCitesData = [];
                for (let i = 0; i < this.myCities.length; i++) {
                    const cid = this.myCities[i];
                    let res = await homeApi.getWeatherNow({location:cid})
                    myCitesData.push(res.HeWeather6[0]);
                }
                this.myCitesData = myCitesData;
            }
        }
    }
</script>

<style lang="scss" >
    @import "../../assets/css/home/weather.scss";
</style>
