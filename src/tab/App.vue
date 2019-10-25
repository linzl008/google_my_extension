<template>
  <div id="app">
    <router-view></router-view>

  </div>
</template>

<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>


<script>
export default {
  created() {
    // this.getSelfMenu();
    // this.getBelongList();
    // this.getEquipTypeList();
    // this.$store.state.subChannelId = localStorage.getItem("firePower-subChannelId");
  },
  mounted() {

  },
  methods: {
    reload (){
       this.isRouterAlive = false
       this.$nextTick(function(){
          this.isRouterAlive = true
       })
    }
    // getSelfMenu(){// ��ȡ��ǰ�˺ſɼ��Ĳ˵�
    //   this.$axios.post("/userOperate/getMenu",{ type: 'self'}).then(response => {
    //       if(!response.data.ret){
    //           for (var item in response.data.data){
    //               this.$set(this.$store.state.menuList,response.data.data[item].operate,true)
    //           }
    //     }else{
    //       this.$message.error(response.data.des);
    //     }
    //   })
    // },

    // getBelongList(){//��ȡ������״ͼ
    //   var subChannelId = localStorage.getItem("firePower-subChannelId");
    //   this.$axios.post("/userCompany/getTree",{ subChannelId: subChannelId}).then(response => {
    //       if(!response.data.ret){
    //         this.$store.state.belongList = response.data.data;
    //     }else{
    //       this.$message.error(response.data.des);
    //     }
    //   })
    // },

    // getEquipTypeList(){// ��ȡ�豸�����б�
    //   this.$axios.post("/deviceCategory/getList").then(response => {
    //       if(!response.data.ret){
    //         this.$store.state.equipTypeList = response.data.data.list;
    //       }else{
    //           this.$message.error(response.data.des);
    //       }
    //   })
    // },


  }
};
</script>
