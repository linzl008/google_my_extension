<template>
    <el-container class="home">
        <div class="main-box">
            <input @change="getUploadFile" type="file">
        </div>
    </el-container>
</template>

<script>
    import XLSX from 'xlsx'
    export default {
        name: "index",
        data(){
            return{
            }
        },
        components:{
        },
        created(){
        },
        mounted(){
        },
        methods:{
            getUploadFile (e) {
                //拿到所导入文件的名字
                let fileName = e.target.files[0]
                //定义reader，存放文件读取方法
                let reader = new FileReader()
                //启动函数
                reader.readAsBinaryString(fileName)
                //onload在文件被读取时自动触发
                reader.onload = function(e) {
                    //workbook存放excel的所有基本信息
                    let workbook = XLSX.read(e.target.result, {type: 'binary'})
                    //定义sheetList中存放excel表格的sheet表，就是最下方的tab
                    let sheetList = workbook.SheetNames
                    //存放json数组格式的表格数据
                    let resultJson = []
                    //存放字符串数组格式的表格数据
                    let resultFormulae = []
                    sheetList.forEach(function(y) {
                        let worksheet = workbook.Sheets[y]
                        let json = XLSX.utils.sheet_to_json(workbook.Sheets[y])
                        let formulae = XLSX.utils.sheet_to_formulae(workbook.Sheets[y])
                        if(json.length > 0){
                            //具体如何处理看项目需求，我的项目其实只有一个sheet，在这里写成循环避免大家误会
                            //数据处理与存放
                            resultJson.push(json)
                            resultFormulae.push(formulae)
                        }

                    });
                    console.log({resultJson});
                    console.log({resultFormulae});
                    //因为我的表格只有一列，因此我取出resultJson第一组数据的key作为键去遍历取出手机号码
                    let tableHeader = Object.keys(resultJson[0])[0]
                    let importInfo = resultJson.map((item) => {
                        return item[tableHeader]
                    })

                };
            }
        }
    }
</script>

<style lang="scss" >
    @import "../../assets/css/file/file.scss";
</style>