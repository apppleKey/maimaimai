<template>
  <div class="tmpl">
      <!-- 1.0 购物车展示列表 -->
      <div class="shopCartListStyle">
         <div class="shopCartItemStyle" v-for="(item,index) in goodsList" :key="item.id">
           <!-- 1.0 开关 -->
           <mt-switch @change="statisticsTotalCountAndTotal" class="switchStyle" v-model="item.selected"></mt-switch>

           <!-- 2.0 图片 -->
           <div class="goodsImageStyle">
              <img :src="item.thumb_path" alt="">
           </div>

           <!-- 3.0 商品信息 -->
           <div class="goodsInfoStyle">
             <h5>{{item.title}}</h5>
             <p class="priceAndCountStyle">
               <span class="priceStyle">{{item.sell_price}}</span>&nbsp;&nbsp;
               <span class="countStyle">商品数量:{{item.count}}</span>
             </p>
           </div>

           <!-- 4.0 删除按钮 -->
           <mt-button @click="deleteGoods(index)" :disabled="!item.selected" class="deleteButtonStyle" type="danger" size="small">删 除</mt-button>
         </div>
      </div>

      <!-- 2.0 结算的说明 -->
      <div class="statisticsTotalCountAndTotalPriceStyle">
          <!-- 1.0 统计信息 -->
          <div class="totalCountAndTotalPriceStyle">
            <h6>总计(不包含运费)</h6>
            <p>已经勾选商品&nbsp;<span>{{totalCount}}</span>&nbsp;件,总价&nbsp;<span>{{totalPrice}}</span>&nbsp;元</p>
          </div>

          <!-- 2.0 去结算按钮 -->
          <mt-button class="goToCheckOutStyle" type="danger" size="small">去结算</mt-button>
      </div>
  </div>
</template>

<style scoped>
  /* 1.0 购物车商品列表的样式 */
  .shopCartItemStyle{
    display: flex;
    border-bottom: 1px solid rgba(92,92,92,.3);
    height: 100px;
    align-items: center;
  }

  img{
    width:60px;
    height: 60px;
  }
  .goodsImageStyle{
    border: 1px solid rgba(92,92,92,.3);
    padding: 3px;
    border-radius: 5px;
    margin-left: 8px;
  }
  .switchStyle{
    margin-left: 5px;
  }

  .deleteButtonStyle{
    margin-right: 5px;
  }
  .goodsInfoStyle{
    margin-left: 8px;
    flex: 1;
  }
  h5{
    font-size: 14px;
    color: #0094ff;
  }
  .priceAndCountStyle{
    margin-top: 10px;
  }
  .priceStyle{
    font-size: 16px;
    color: red;
  }

  .countSytle{
    font-size: 12px;
    color: gray;
  }

  /* 2.0 统计信息的样式 */
  .statisticsTotalCountAndTotalPriceStyle{
    height: 100px;
    background-color: rgba(92,92,92,.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .goToCheckOutStyle{
    width:80px;
    height: 40px;
    margin-right: 8px;
  }
  
  h6{
    font-size: 16px;
    color:black;
    font-weight: 900;
  }

  .totalCountAndTotalPriceStyle{
    padding-left: 10px;
  }

  .totalCountAndTotalPriceStyle span{
    color: red;
    font-size: 16px;
  }
</style>


<script>
  import common from '../../common/common.js'

  import { MessageBox } from 'mint-ui'

  export default{
    data(){
      return {
        goodsList:[],
        totalCount:0, //总数量
        totalPrice:0 //总价格
      }
    },
    created(){
      this.getGoodsListData()
    },
    methods:{
      //1.0 获取我们需要展示的购物车数据
      getGoodsListData(){
        //1.从vuex中获取原先点击加入购物车中的数据
        const originalGoodsList = this.$store.getters.getGoodsList
        
        if(originalGoodsList.length<=0){
          return
        }


        /**2 把
         * [
            {goodsId:"87",count:2},
            {goodsId:"88",count:3},
            {goodsId:"87",count:3}
          ]
          转成
          {"87":5,"88":3}
         */
        const tempObj = {}
        for(let i=0;i<originalGoodsList.length;i++){
          const goods = originalGoodsList[i]
          if(tempObj[goods.goodsId]){//不是第一次
            tempObj[goods.goodsId] += goods.count
          }else{
            tempObj[goods.goodsId] = goods.count
          }
        }

        //3.遍历上一步的tempObj对象，把它的key放在一个数组中
        //ids = [87,88]
        let ids = []
        for(const key in tempObj){
          ids.push(key)
        }

        //4.把上一步的ids编程 const paramsString = 87,88
        const paramString = ids.join(',')

        //5.拼接请求
        const url = common.apihost + "api/goods/getshopcarlist/"+paramString
        this.$http.get(url).then(response=>{
           response.body.message.forEach(item=>{
             item.count = tempObj[item.id] //动态添加了count属性
             item.selected = true //动态添加了selected属性，控制开关的状态
           })

           this.goodsList = response.body.message

           this.statisticsTotalCountAndTotal()
        })
      },
      //2.统计我们商品的总数量和总价格
      /**
       * 这个方法，
       *  1、在请求后台购物车的商品完毕之后，调用
       *  2、更改开关状态
       *  3、删除了我们商品项之后使用
       */
      statisticsTotalCountAndTotal(){
        let tempCount = 0
        let tempPrice = 0

        this.goodsList.forEach(item=>{
          if(item.selected){//开关打开
              tempCount+=item.count
              tempPrice+=item.count * item.sell_price
          }
        })

        this.totalCount = tempCount
        this.totalPrice = tempPrice
      },
      //3 删除购物车中的商品
      deleteGoods(index){
        MessageBox.confirm('确定执行此操作?').then(action => {
           //1.根据索引，获取到id，去vuex中把对应id的数据干掉
           const goodsId = this.goodsList[index].id
           this.$store.commit('deleteGoodsById',goodsId)

           //2.根据索引，干掉this.goodsList中的数据
           this.goodsList.splice(index,1)

           //3.重新计算
           this.statisticsTotalCountAndTotal()
        },cancel=>{
          
        })
      }
    }
  }
</script>