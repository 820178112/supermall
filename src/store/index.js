import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * 创建vuex store对象
 * */
const store = new Vuex.Store({
  state:{
    /**
     * 数组常用的函数 push pop unshift shift sort reverse map filter reduce join find
     * */
    /*对vuex中的cartList进行展示*/
    cartList:[

    ]
  },
  mutations:{
    addToCart(state,payload){
      let OldProduct = null
      for(let item of state.cartList )
        if(item.iid === payload.iid){
          OldProduct = item
        }
        if(OldProduct){
          OldProduct.count+=1
        }else{
          payload.count = 1
          state.cartList.push(payload)
        }
    }
  },
})

export default store
