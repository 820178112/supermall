<template>
  <!--滚动区域-->
  <div class="wrapper">
    <!--滚动区域-->
    <!--better-scroll 包裹的子元素 只有第一个子元素滚动效果生效-->
    <div class="content">
      <ul >
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
      <li>分类</li>
    </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data(){
      return{
        BScroll:null
      }
    },
    /**
     * 不能在此函数中 拿出模板中的元素 null|undefine
     * */
    //组件挂载完 回调此生命周期函数
    mounted () {
      this.BScroll = new BScroll(document.querySelector('.wrapper'),{
        /**
         * 滚动监听类型**/
        probeType:3,
        /**
         * 开启上拉加载事件
         * */
        pullUpLoad:true,
        click:true
      })
      this.BScroll.on('scroll',position=>{
        console.log(position)
      })
      this.BScroll.on('pullingUp',()=>{
        console.log('触发上拉加载')

      })
    }

  }
</script>

<style scoped>
/*.content{
  height: 150px;
  overflow: hidden;
}*/
.wrapper{
  height: 150px;
  background-color: red;
  overflow: hidden;
}
</style>
