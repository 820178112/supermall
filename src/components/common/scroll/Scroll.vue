<template>
  <div class="wrapper" ref="wrapper">
    <!--scroll的第一个子元素的滚动效果生效-->
    <div class="content" ><slot></slot></div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'


export default {
  name: 'Scroll',
  props:{
    probeType:{
      type:Number,
      default(){
        return 0
      }
    },
    pullUpLoad: {
      type:Boolean,
      default(){
        return false
      }
    },
  },
  data(){
    return{
      scroll:null,
    }
  },
  mounted () {
    /**
     * scroll 滚动对象**/
    this.scroll = new BScroll(this.$refs.wrapper,{
      /*监听设置*/
      probeType:this.probeType,
      click:true,
      /**
       监听是否开启上拉加载事件**/
      pullUpLoad: this.pullUpLoad
    })
    //监听滚动位置
    if(this.probeType===2 || this.probeType===3){
      this.scroll.on('scroll',position=>{
        this.$emit('scroll',position)
      })
    }
    //上拉加载
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    }
    },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll&&this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll&&this.scroll.finishPullUp()
    },
    //重新计算scroll的高度
    refresh(){
      this.scroll&&this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll?this.scroll.y:0
    }
  }
}
</script>

<style scoped>

</style>
