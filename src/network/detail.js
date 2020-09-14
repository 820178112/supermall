import { request } from './request'
//按照iid获取detail请求数据
export function getDetail(iid){
  /*调用请求函数
  //返回值为Promise(resolve,reject)*/
  return request({
    url:'detail',
    params:{
      iid
    }
  })
}
export function getRecommendInfo(){
  /*调用请求函数
  //返回值为Promise(resolve,reject)*/
  return request({
    url:'recommend',
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
    //result.itemInfo.discountBgColor
    this.discountbgc = itemInfo.discountBgColor
  }
}

export class Shop {
  constructor (shopInfo) {
    this.logo  = shopInfo.shopLogo
    this.name  = shopInfo.name
    this.fans  = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParamInfo {
  /*
  * *info 商品参数信息
  * rule 商品规格
  * */
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    //商品图片信息
    this.image = info.images ? info.images[0] : '';
    /*infos 商品参数信息*/
    this.infos = info.set;
    /*sizes 从商品规格中取出商品尺码数据*/
    this.sizes = rule.tables;
  }
}

