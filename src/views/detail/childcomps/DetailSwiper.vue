<template>
  <div>
    <!--轮播图容器-->
    <swiper class="detail-swiper">
      <!--轮播图-->
      <swiper-item v-for="item in topImages">
        <img :src="item" alt="" @load="topImageLoad">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/'
export default {
  name: 'DetailSwiper',
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    },
  },
  data() {
    return {
      topImagesLength: 0,
      count:0
    }
  },
 components:{
    Swiper,
    SwiperItem
  },
  methods:{
    topImageLoad(){
      this.$emit('topImageLoad')
      /*if(++this.count === this.topImagesLength){
        this.$emit('topImageLoad')
      }*/
    }
  },
  watch:{
    topImages(){
      this.topImagesLength = this.topImages.length
    }
  }
}
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>
