<template>
  <div id="app">
    <Canvas />
    <router-view></router-view>
  </div>
</template>
<style lang="scss">
    html, body{
        /*cursor: none;*/
        /**{*/
        /*    cursor: none;*/
        /*}*/
    }
</style>
<style lang="scss" scoped>
    #app {
        height: 100%;
    }
</style>


<script>
  import Canvas from './components/common/rain'
export default {
  created() {
  },
  components:{
    Canvas
  },
  mounted() {

  },
  methods: {
  }
};
</script>
