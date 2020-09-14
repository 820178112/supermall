<template>
  <div class="goods">
    <good-list-item :goods-item="item" v-for="item in goods"></good-list-item>
  </div>
</template>

<script>
import GoodListItem from '@/components/content/goods/GoodListItem'
export default {
name: "GoodsList",
  components:{
    GoodListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods {
  /*父元素开启flex布局*/
  display: flex;
  /*不包裹在一行*/
  flex-wrap: wrap;
  /*均等分间距 但左右两边是中间的1/2*/
  justify-content: space-around;
  /*给goodItem内间距做微调*/
  padding: 2px;
}
</style>
