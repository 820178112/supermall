<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center" >购物街</div></nav-bar>
    <!--父组件传数据给子组件-->
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import HomeSwiper from '@/views/home/childcomps/HomeSwiper'
import {getHomeMultidata} from '@/network/home'
import RecommendView from '@/views/home/childcomps/RecommendView'
export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView
    },
  data(){
    return{
      banners:[],
      recommends:[]
    }
  },
  created () {
      getHomeMultidata().then(res=>{
        //函数调用完成变量回收
        //需求：保存请求来的数据 ----利用组件变量保存数据
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
  }
}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint); /*color-tint 背景颜色*/
  color: #ffffff;
}
</style>
