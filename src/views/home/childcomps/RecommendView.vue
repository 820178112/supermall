<template>
  <!--recommends 推荐-->
<div class="recommends">
  <div v-for="item in recommends" class="recommendItem">
    <a :href="item.link"></a>
    <img :src="item.image" alt="">
    <div>{{item.title}}</div>
  </div>
</div>
</template>

<script>
export default {
name: "RecommendView",
  props:{
    recommends:{
      type:Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommends{
  display: flex;
  font-size: 12px;
  text-align: center;
  padding:10px 0 20px;
  border-bottom: 10px solid #eee
}
.recommendItem{
  flex: 1;
}
.recommendItem img{
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>
