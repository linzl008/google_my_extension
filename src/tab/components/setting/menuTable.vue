<template>
    <el-table :data="menu" style="width: 100%" >
        <el-table-column prop="label" align="center"  label="菜单名"></el-table-column>
        <el-table-column prop="index" align="center" label="路由"></el-table-column>
        <el-table-column prop="icon" align="center" label="图标">
            <template slot-scope="scope">
                <i :class="scope.row.icon"></i>
            </template>
        </el-table-column>
        <el-table-column prop="icon" align="center" label="启用状态">
            <template slot-scope="scope">
                <el-tag :type="scope.row.isShow?'primary':'danger'" size="small">{{scope.row.isShow?'启用':'禁用'}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="icon" align="center" label="操作">
            <template slot-scope="scope">
                <el-button v-if="scope.row.index !== '/setting'" size="small" :type="scope.row.isShow?'danger':'primary'" @click="toggleMenuState(scope.row,scope.$index)">{{scope.row.isShow?'禁用':'启用'}}</el-button>
                <span v-else>设置页不能禁用</span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "menuTable",
        props:{
            menu:Array
        },
        data(){
            return {}
        },
        mounted(){},
        watch:{
        },
        methods:{
            toggleMenuState(row,index){
                this.$emit('toggleMenuState',index);
            }
        }
    }
</script>

<style scoped>

</style>