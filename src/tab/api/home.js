
import _axios from '../plugins/axios'

class homeApi {
    //和风天气：https://dev.heweather.com/docs/api/weather
    constructor(){
        this.baseUrl='https://free-api.heweather.net/s6/weather/';
        this.baseSearchUrl='https://search.heweather.net/find';
        this.searchDefaultParams={
            group:'cn', //group=world 查询全球城市（默认值）  group=cn 仅查询中国城市
            number:10, //搜索查询返回的数量，默认返回10个与查询城市或的确相关性最强的结果，可选1-20个
            mode:"match", //可选值: equal、match，默认：match
        }
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
    searchCity(params){
        params = Object.assign(params,{key:this.key},this.searchDefaultParams);
        return _axios.get(this.baseSearchUrl,{params});
    }
}

export default new homeApi()