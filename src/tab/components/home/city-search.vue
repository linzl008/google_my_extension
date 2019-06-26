<template>
    <el-dialog class="search" title="城市搜索" width="600px" :visible.sync="visible" :before-close="close" :close-on-click-modal="false">
        <el-autocomplete
                style="width: 550px"
                v-model="location"
                :fetch-suggestions="handleSearch"
                placeholder="请输入地理信息"
                prefix-icon="el-icon-search"
                @select="handleSelect">
            <el-button slot="append" icon="el-icon-plus" @click="addCity">添加</el-button>
        </el-autocomplete>
    </el-dialog>
</template>

<script>
    import homeApi from '../../api/home'
    export default {
        name: "city-search",
        props:{
            visible:Boolean
        },
        data(){
            return {
                location:"",
                searchResult:[],
                timer:false,
                selectedCity:{}
            }
        },
        methods:{
            close(){
              this.$emit('close')
            },
            addCity(){
                this.$emit('select',this.selectedCity)
            },
            handleSelect(data){
                this.selectedCity = data;
            },
            handleSearch(queryString,cb){
                if(this.timer || !queryString.length){
                    cb(this.searchResult);
                } else{
                    this.timer = true;
                    setTimeout(async ()=>{
                        let res =  await this.searchCity();
                        if(res.HeWeather6[0].status === 'ok'){
                            this.searchResult = res.HeWeather6[0].basic.map(item=>{
                                let parent_city = item.parent_city === item.location? '':'/'+item.parent_city
                                return {
                                    cid:item.cid,
                                    value:`${item.cnty}/${item.admin_area}${parent_city}/${item.location}`
                                }
                            });
                        }
                        this.timer = false;
                        cb(this.searchResult);
                    },500)
                }
            },
            searchCity(){
                return homeApi.searchCity({
                    location: this.location
                })
            }
        }
    }
</script>

<style scoped>

</style>