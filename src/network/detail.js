
import { request } from './request';
import { getGoodsDetail } from './detail';


export function getGoodsDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        },
    })
 }

 //   封装成类的思想，当你想封装一个组件，但是是三个对象的数据，你得想办法把三个对象，itemInfo，columns里面的值整合到一个对象其中！这个思想真的牛
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
    }
  }
  




//  class Person {
//      constructor(name,age) {
//          this.name = name
//          this.age = age
//      }
//  }
//  const p = new Person('s',18);
// p.name
// p.age