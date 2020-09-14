<template>
  <!---->
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style scoped>
  .nav-bar{
    display: flex;
    /*导航栏高一般为44*/
    /*加上状态栏为64*/
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }
  .left,.right{
    width: 60px;
  }
  .center{
    /*剩余宽度全部占据*/
    flex:1
  }
</style>
