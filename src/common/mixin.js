import { debounce } from './utils'
import BackTop from '@/components/content/backTop/BackTop'
export const itemImgListener = {
  data(){
    return {
      itemImgListener:null,
      newRefresh:null,

    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 50)
    /*调用多次此函数 经过防抖之后 达到节流的目的*/
    this.itemImgListener = () => {
      /*调用防抖函数*/
      this.newRefresh()
    },
      this.$bus.$on('itemImageLoad',this.itemImgListener)
  },
}

export const backTopMixin = {
  data(){
    return{
      isShowBackTop:false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    isDisplayBackTop(position){
      this.isShowBackTop = ( - position.y)>1000
    },
  }
}
