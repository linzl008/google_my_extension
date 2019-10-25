<template>
    <div class="note">
        <el-card v-for="(item,index) in myNote" :key="index" class="box-card">
            <div slot="header" class="clearfix">
                <div v-show="!item.editable">标题：{{item.title}}</div>
                <div v-show="item.editable"><el-input v-model="item.title" type="textarea" ></el-input></div>
                <i class="el-icon-close" @click="deleteNote(index)"></i>
                <i class="el-icon-edit" @click="editNote(index)"></i>
            </div>
            <div>
                <div class="time">
                    <div></div>
                    <div v-show="!item.editable">{{item.content}}</div>
                    <div v-show="item.editable"><el-input type="textarea" ></el-input></div>
                </div>
            </div>
        </el-card>
        <el-card class="box-card add t-center" >
            <div @click="addNote">
                <i class="el-icon-plus" ></i>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "note",
        data(){
            return {
                myNote:[],
            }
        },
        watch:{

        },

        mounted() {
            this.myNote = JSON.parse(localStorage.getItem('lzl_my_note')||"[]")
        },
        methods:{
            addNote(){
                this.myNote.push({
                    title:"",
                    content:"",
                    editable:true
                })
            },
            deleteNote(index){

            },
            editNote(index){
                this.myNote[index].editable = true;
            },
        }
    }
</script>

<style lang="scss" >
    @import "../../assets/css/home/note.scss";
</style>