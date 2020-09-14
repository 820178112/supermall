<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"
                    ref="nav"
                    @itemClick="itemClick"></detail-nav-bar>
    <!--设置scroll的滚动区域-->
    <!--给scroll组件的content设置滚动区域大小-->
    <scroll class="content"  ref="scroll"
            @scroll="contentScroll"
            :probe-type="3">
      <!--直接使用-->
      <detail-swiper :top-images="topImages"
                     @topImageLoad="topImageLoad"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info :detail-goods-info="detailGoodsInfo"
                         @detailImageLoad="detailImageLoad"></detail-goods-info>
      <detail-param-info :param-info="goodsParamInfo"
                          ref="param"></detail-param-info>
      <detail-comment-info :comment="detailCommentInfo"
                            ref="comment"></detail-comment-info>
      <good-list
        :goods="detailRecommendInfo"
        ref="recommend"
      />
    </scroll>
    <detail-bottom-bar @addEvent="addEvent"></detail-bottom-bar>
    <!--监听组件的事件 要加native属性-->
    <back-top
      @click.native="backTopClick"
      v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from '@/views/detail/childcomps/DetailNavBar'
  import {getDetail,Goods,Shop,GoodsParamInfo,getRecommendInfo} from '@/network/detail'
  import DetailSwiper from '@/views/detail/childcomps/DetailSwiper'
  import DetailBaseInfo from '@/views/detail/childcomps/DetailBaseInfo'
  import DetailShopInfo from '@/views/detail/childcomps/DetailShopInfo'
  import DetailGoodsInfo from '@/views/detail/childcomps/DetailGoodsInfo'
  import DetailParamInfo from '@/views/detail/childcomps/DetailParamInfo'
  import DetailCommentInfo from '@/views/detail/childcomps/DetailCommentInfo'
  import DetailBottomBar from '@/views/detail/childcomps/DetailBottomBar'
  import GoodList from '@/components/content/goods/GoodsList'
  import Scroll from '@/components/common/scroll/Scroll'
  import { itemImgListener,backTopMixin }  from 'common/mixin'
  import { debounce } from '@/common/utils'

  export default {
  name: 'Detail',
  data(){
    return{
      iid:0,
      topImages: [],
      goods:{},
      shopInfo:{},
      detailGoodsInfo:{},
      goodsParamInfo:{},
      detailCommentInfo:{},
      detailRecommendInfo:[],
      itemImgListener:{},
      //各个主题距离顶部navbar的距离
      themeTopYs:[],
      getThemeTopYs:{},
      currentIndex:{},
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodList,
    Scroll,
  },
    mixins:[itemImgListener,backTopMixin],
    methods:{
      addEvent(){
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.realPrice = this.goods.realPrice
        product.iid = this.iid
        /*从store中提交mutation事件*/
        this.$store.commit('addToCart',product)
      },
      contentScroll(position){
        const positionY = -(position.y)
        const length = this.themeTopYs.length
        /**---i--- 滚动区域代号 --作为一个循环判断条件*/
        for(let i=0;i<length-1;i++){
          /**2.需求：在同一个主题区域内滚动时 不进行多次赋值操作*/
          if(this.currentIndex!==i && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1]){
            this.currentIndex = i
            this.$refs.nav.currentIndex =this.currentIndex
          }
          this.isDisplayBackTop(position)
        }
       /* for(let i=0;i<=length;i++){
          /!*1.判断positionY 为那个主题区域*!/
          /!*2.需求：在同一个主题区域内滚动时 不进行多次赋值操作*!/
          if((positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]&&i<length-1
            ||i===length-1&&positionY>this.themeTopYs[i])&&this.currentIndex!==i){
            /!**currentIndex 当前所在滚动区域代号*!/
            this.currentIndex = i
            /!*传递当前主题区域代号*!/
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }*/
      },
      detailImageLoad(){
        this.newRefresh()
        this.getThemeTopYs()
      },
      topImageLoad(){
        this.newRefresh()
      },
      itemClick(index){
        this.$refs.scroll.scrollTo(0,-(this.themeTopYs[index]),200)
      },
    },
    /*updated () {
      console.log(this.$refs.comment.$el)
    },*/
    /**
     * 它被调用的时机有 2 个，一个是首次渲染，一个是数据更新的时候
     * */
    /*updated () {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    },*/
    mounted(){
    },
    destroyed () {
      this.$bus.$off('ItemImageLoad',this.itemImgListener)
    },
    /*组件创建之后就接受传递过来的路由参数*/
    created () {
      /**
       * 给getThemeTopYs赋值 对this.getThemeTopYs赋值的操作进行防抖
       * 给debounce(func,timeout) 给debounce中回调的func进行防抖操作
       * */
      this.getThemeTopYs = debounce(()=>{
        this.themeTopYs= []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },100)
    //保存传入的iid
    this.iid = this.$route.params.iid
      //获取商品详细信息
    getDetail(this.iid).then((res)=>{
      const data = res.result
      //获取顶部的轮播图
      this.topImages = data.itemInfo.topImages
      /*使用一个类将复杂数据整合在一块*/
      //获取商品基本信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //获取商家信息
      this.shopInfo = new Shop(data.shopInfo)
      //获取商品的详细信息
      this.detailGoodsInfo = data.detailInfo
      //获取商品参数信息
      this.goodsParamInfo = new GoodsParamInfo(data.itemParams.info,data.itemParams.rule)
      //获取detail页面的评论信息
      if(data.rate.cRate!==0){
        this.detailCommentInfo = data.rate.list[0]
      }
      /**
       * 下一帧
       * 等组件dom渲染出来了回调里面的函数
       * */
     /* this.$nextTick(()=>{
        /!**
         * dom渲染完成后 图片还没加载完成 offsetTop值不对时 都是因为图片问题
         * *!/
        this.themeTopYs= []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs)
      })*/
    })
    //获取详情推荐信息
    getRecommendInfo().then((res)=>{
      this.detailRecommendInfo = res.data.list
    })
  },
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  /*colculate计算属性*/
.content{
  height: calc(100% - 44px - 49px);
  background-color: #fff;
}
.detail-nav-bar{
  position: relative;
  z-index: 10;
  background-color: #fff;
}
</style>
