<!--特殊视图-->
<template>
  <div class="feature">
    <a href="http://act.mogujie.com//zzlx67"></a>
    <img src="~assets/img/home/recommend_bg.jpg" alt="" @load="imageLoad">
  </div>
</template>

<script>
export default {
  name: 'FeatureView',
  methods:{
    imageLoad(){
      this.$emit('featureImageLoad')
    }
  }
}
</script>

<style scoped>
.feature img{
  width: 100%;
}
</style>
