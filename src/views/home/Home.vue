<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center" >购物街</div></nav-bar>
    <!--tabControl必须在scroll的外面展示 否则就随着scroll一起滚动到上面了-->
    <tab-control :title="title"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"
                 class="tabControl"

    />
    <!--滚动区域 默认滚动区域为整个页面-->
      <scroll class="content" ref="scroll"
              :probe-type="3"
        :pull-up-load="true"
        @scroll="contentScroll"
        @pullingUp="loadMore"
        >
        <!--父组件传数据给子组件-->
        <home-swiper :banners="banners"
                     @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view
        />
        <!--tabControl子组件已经通过$emit 向父组件传递了自定义事件----tabControl----->
        <tab-control :title="title"
                     @tabClick="tabClick"
                     ref="tabControl2"
        />
        <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!--监听组件根元素的原生事件- 比如监听click、mouseover事件->
    <!-监听组件原生事件时 必须使用native属性- 比如监听click、mouseover事件-->


    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import RecommendView from '@/views/home/childcomps/RecommendView'
import HomeSwiper from '@/views/home/childcomps/HomeSwiper'
import FeatureView from '@/views/home/childcomps/FeatureView'

import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/TabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'

import {getHomeMultidata,getHomeGoods} from '@/network/home'
import {debounce} from '@/common/utils'
import { itemImgListener,backTopMixin }  from 'common/mixin'


export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      NavBar,
      GoodsList,
      Scroll,
    },
  data(){
    return{
      banners:[],
      recommends:[],
      title:['流行','新款','精选'],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      /*offsetTop 吸顶间距*/
      tabOffsetTop:0,
      isTabFixed:false,
      currentClickIndex:0,
      saveY:0,
      itemImgListener:{},
    }
  },
  mixins:[itemImgListener,backTopMixin],
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    },
  },
  activated () {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY()
    /**
     * 取消全局事件的监听
     * */
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },


  //组件创建之后回调
  /*created函数执行顺序为第二位*/
  created () {
    //请求多个数据
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  /*组件模板加载完成后执行*/
  mounted () {
    this.tabClick(0)
  },
  methods:{
    /**
     * 计算元素吸顶距离
     * */
    swiperImageLoad(){
      /*吸顶间距为吸顶组件到父组件顶端之间的高度 */
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * debounce(func,time){}
     * 给我传一个函数告诉我这个函数在单位时间内等多久
     * **/
    /*debounce(func,delay) {
      let timer = null
      /!*加载时间>delay 调用refresh函数 执行请求函数
      * 加载时间<delay 调用refresh函数 清除请求函数*!/
      return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this,args)
        }, delay)
      }
    }*/
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
      /**
       * 事件监听相关方法**/
    tabClick(index){
        switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentClickIndex = index
      this.$refs.tabControl2.currentClickIndex = index
      /*if(this.$refs.tabControl1 !== undefined){
        this.$refs.tabControl1.currentClickIndex = index
        this.$refs.tabControl2.currentClickIndex = index
      }*/
      },
    contentScroll(position){
      this.isDisplayBackTop(position)
      this.isTabFixed = ( - position.y)>this.tabOffsetTop
    },

      /**
       * 网络请求相关方法
      **/
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        //函数调用完成变量回收
        //需求：保存请求来的数据 ----利用组件变量保存数据
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        //请求商品数据
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page = this.goods[type].page+1
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>
<!--scoped-所有样式只针对当前组件-->
<style scoped>
.tabControl{
  position: relative;
  z-index: 10;
}
#home{
  /*padding-top: 44px;*/
  /**
  vh可视窗口 100个视口 ---可视窗口的100%
  */
  height: 100vh;
  /* 如果结合定位坐标 相对于[自己] 自身作为定位的原点（参考点为自己）*/
  position: relative;
}
.home-nav{
  background-color: var(--color-tint); /*color-tint 背景颜色*/
  color: #ffffff;
  /*使用浏览器原生滚动时使用 目的 固定导航栏到某个位置不受滚动影响*/
}

.content{
  overflow: hidden;
/*!*绝对定位 如果结合定位坐标 以祖先元素（'相对定位',（absolute）绝对定位 父相子绝）作为坐标参考点*!*/
  position: absolute;
  top:44px;
  left: 0;
  bottom: 49px;
  right: 0;
}
/*.content{
  height:calc(100% - 93px);
  margin-top: 44px;
  overflow: hidden;
}*/
</style>
