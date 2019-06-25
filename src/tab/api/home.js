
import _axios from '../plugins/axios'

class homeApi {
    //和风天气：https://dev.heweather.com/docs/api/weather
    constructor(){
        this.baseUrl='https://free-api.heweather.net/s6/weather/';
        this.type={
            now:"now", //	实况天气	商业/免费
            forecast:"forecast", //3-10天预报	商业/免费
            hourly:"hourly", //逐小时预报	商业/免费
            lifestyle:"lifestyle"	//生活指数
        };
        this.key = "135cb94b55094a65974c518d0ed71bf6"
    }
    getWeatherNow(params){
        params = Object.assign(params,{key:this.key});
        return _axios.get(this.baseUrl+this.type.now,{params});
    }
}

export default new homeApi()