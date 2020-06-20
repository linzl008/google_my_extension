<template>
    <el-carousel indicator-position="none" :interval="8000" :autoplay="true" class="wallpaper" height="100%" >
        <el-carousel-item >
            <video src="../../assets/video/4k60fps_Arknights.mp4" width="100%" height="100%" loop="loop" autoplay ></video>
        </el-carousel-item>
        <el-carousel-item >
            <video src="../../assets/video/penguin.webm" width="100%" height="100%" loop="loop" autoplay ></video>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    export default {
        name: "wallpaper",
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

        }
    }
</script>

<style scoped>
    .wallpaper{
        position: fixed;
        width: 100%;
        height: 100%;
    }
    .wallpaper video{
        object-fit: cover;
    }
</style>
