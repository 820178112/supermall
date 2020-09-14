<template>
  <!--控制栏-->
  <div id="tab-control">
    <!--value为真 active样式激活-->
    <div class="tabControlItem" v-for="(item,index) in title"
         :class="{active:index===currentClickIndex}"
    @click="tabClick(index)">
      <span >{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
name: "TabControl",
  props:{
    title:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentClickIndex:0
    }
  },
  methods:{
  /*点击哪个  就传递哪个tabControl的Index*/
    tabClick(index){
      /*父组件想子组件传递用props*/
      /*子组件想父组件传递事件用$emit*/
      /*子组件向父组件传递自定义事件*/
        this.currentClickIndex=index
      /*向父组件传递自定义事件*/
        this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
#tab-control{
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}

.tabControlItem{
  flex: 1;
}
.active span{
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
}
.tabControlItem span{
  padding: 2px;
}
</style>
