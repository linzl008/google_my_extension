<template>
    <div class="note">
        <router-link :to="{path: item.index}" v-for="(item,index) in menu" :key="item.index" class="tab-box" :class="{active:activeIndex === index}">
            <div>
                <i :class="item.icon"></i>
                <div class="word">{{ item.label }}</div>
            </div>
        </router-link>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "mymenu",
        data(){
            return {
                activeIndex: 0,
                lineNum: 4,
            }
        },
        computed: {
            ...mapGetters(
                { menu:'menu/GET_MENU' },
            ),
            maxIndex(){
                return this.menu.length
            }
        },
        watch:{

        },
        mounted(){
            let _this = this
            document.onkeyup = function(e) {
                let key = window.event.keyCode;
                _this.setActiveTag(key)
            };
        },
        methods:{
            setActiveTag(code){
                // 上：38
                // 下：40
                // 左：37
                // 右：39
              console.log(code);
              switch (code) {
                  case 38:
                      this.activeIndex = (this.activeIndex - this.lineNum * ( this.activeIndex > this.lineNum ) );
                      break;
                  case 40:
                      this.activeIndex = (this.activeIndex + this.lineNum * ( this.maxIndex - this.activeIndex > this.lineNum ) );
                      break;
                  case 37:
                      this.activeIndex = (this.activeIndex - 1) + !this.activeIndex * this.maxIndex;
                      break;
                  case 39:
                      this.activeIndex = (this.activeIndex + 1) % this.maxIndex;
                      break;
              }
              console.log(this.activeIndex);
            }
        }
    }
</script>

<style lang="scss" >
    @import "../../assets/css/home/note.scss";
</style>
