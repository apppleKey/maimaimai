<template>
   <div class='tmpl'>
        <!-- 1.0 轮播图 -->
        <div class="lunboStyle">
            <subswipe :lunbo_url="'api/getthumimages/'+this.$route.params.goodsId" :lunbo_time="lunbo_time"></subswipe>
        </div>

        <!-- 2.0 商品价格信息 -->
        <div class="priceStyle">
            <h4>
                {{goodsInfo.title}}
            </h4>
            <p>
                市场价:￥<del>{{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价:￥<span>{{goodsInfo.sell_price}}</span>
            </p>
            <subnumber @goodsCountEvent="getGoodsCount"></subnumber>
            <mt-button size="small" type="primary">立即购买</mt-button>
            <mt-button @click="addToShopCart" size="small" type="danger">加入购物车</mt-button>
        </div>

        <!-- 3.0 商品参数 -->
        <div class="paramsStyle">
            <h6>商品参数</h6>
            <ul>
                <li>商品货号:{{goodsInfo.goods_no}}</li>
                <li>库存情况:剩余 {{goodsInfo.stock_quantity}} 件</li>
                <li>上架时间:{{goodsInfo.add_time | fmtDate}}</li>
            </ul>
        </div>

        <!-- 4.0 其它 -->
        <div class="otherStyle">
            <mt-button @click="goToPictureAndTextIntroduction" plain size="large" type="primary">图文介绍</mt-button>
            <mt-button @click="goToGoodsComment" class="goodsCommentStyle" plain size="large" type="danger">商品评论</mt-button>
        </div>
   </div>
</template>
   
<style scoped>
    .lunboStyle,.priceStyle,.paramsStyle,.otherStyle{
        margin:10px;
        padding: 6px;
        border: 1px solid rgba(92,92,92,.3); 
        border-radius: 5px;
    }

    .priceStyle h4{
        font-size: 16px;
        color:#0094ff;
        padding: 6px;
        border-bottom: 1px solid rgba(92,92,92,.3);
    }
    .priceStyle span{
        color: red;
        font-size: 16px;
    }

    .paramsStyle h6{
        color:gray;
        font-size: 14px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92,92,92,.3);
    }

    .paramsStyle ul{
        padding:0px;
    }

    .paramsStyle li{
        list-style: none;
        font-size: 14px;
    }

    .goodsCommentStyle{
        margin-top: 15px;
    }
</style>
   
<script>
   import common from '../../common/common.js'

   import {Toast} from 'mint-ui'

   //导入轮播子组件
   import subswipe from '../subcomponents/subswipe.vue'
   import subnumber from '../subcomponents/subnumber.vue'
   
   export default {
       data() {
           return {
               lunbo_time:1000,
               goodsInfo:{},
               goodsCount:1
           }
       },
       created() {
           this.getGoodsInfoData()
       },
       methods: {
           //获取商品详情
           getGoodsInfoData(){
               const url = common.apihost + "api/goods/getinfo/"+this.$route.params.goodsId

               this.$http.get(url).then(response=>{
                   this.goodsInfo = response.body.message[0]
               })
           },
           //跳转到图文介绍
           goToPictureAndTextIntroduction(){
               //编程式
               /**
                * 参数1：路由的名字，等下在main.js中配置路由规则的时候用到
                * 参数2：跳转到对应组件里面去的时候带给它的参数
                * 不带参数的时候，可以用这种
                */
               this.$router.push({name:'pictureAndTextIntroduction',params: { goodsId: this.$route.params.goodsId }})
           },
           //跳转到商品评论
           goToGoodsComment(){
               this.$router.push({ path: '/goods/goodscomment', query: { goodsId: this.$route.params.goodsId }})
           },
           //获取子组件传递过来值的时候的处理函数
           getGoodsCount(count){
               this.goodsCount = count
           },
           //加入购物车
           addToShopCart(){
               //提示，加入购物车成功
               Toast({
                    message: '加入购物车成功',
                    position: 'middle',
                    duration: 2000
               });

               //使用Vuex
               const goods = {goodsId:this.$route.params.goodsId,count:this.goodsCount}
               //{goodsId:87,count:5}

               this.$store.commit('addToShopCart',goods)
            //    const _this = this
            //    setTimeout(function(){
            //        _this.$store.dispatch('asyncAddToShopCart',goods)
            //    },2000)
           }
       },
       components:{
           subswipe,
           subnumber
       }
   }
</script>