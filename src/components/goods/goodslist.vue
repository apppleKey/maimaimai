<template>
    <div class='tmpl'>
        <div class="mui-content" style="background-color:#fff">
            <ul class="mui-table-view mui-grid-view">
                <li v-for="item in goodsList" :key="item.id" class="mui-table-view-cell mui-media mui-col-xs-6">
                    <div class="goodsContentStyle">
                        <router-link :to="'/goods/goodsinfo/'+item.id">
                            <!-- 图片 -->
                            <img class="mui-media-object" :src="item.img_url">
                            <div class="mui-media-body">
                                <!-- 标题 -->
                                <p class="titleStyle">
                                    {{item.title}}
                                </p>
                                <!-- 价格信息 -->
                                <p class="priceStyle">
                                    <span>{{item.sell_price}}</span>&nbsp;&nbsp;
                                    <del>{{item.market_price}}</del>
                                </p>
                                <!-- 提示信息 -->
                                <p class="tipsStyle">
                                    <span>热卖中</span>
                                    <span>剩余{{item.stock_quantity}}件</span>
                                </p>
                            </div>
                        </router-link>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
   
<style scoped>
    .goodsContentStyle{
        padding: 10px;
        border: 1px solid rgba(92,92,92,.3);
        border-radius: 5px;
        box-shadow: 0px 0px 5px rgba(92,92,92,.3);
    }

    .mui-grid-view .goodsContentStyle .mui-media-body{
        height: 100px;
    }

    .titleStyle{
       font-size: 12px;
       color: black;
       text-align: left;
       overflow:hidden; 
       text-overflow:ellipsis;
       display:-webkit-box;
       -webkit-box-orient:vertical;
       -webkit-line-clamp:2;
       /* 两行显示不下... */
       /* http://blog.csdn.net/bing0728004/article/details/51509435 */
    }

    .priceStyle{
        text-align: left;
        background-color: #f0f0f0;
        height: 35px;
        padding-top: 15px;
    }

    .priceStyle span{
        font-size: 16px;
        color: red;
    }

    .tipsStyle{
        background-color: #f0f0f0;
        height: 40px;
        padding-top: 15px;
        color:black;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
    }
</style>
   
<script>
import common from '../../common/common.js'

export default {
    data() {
        return {
            goodsList: []
        }
    },
    created() {
        this.getGoodsListData()
    },
    methods: {
        getGoodsListData() {
            const url = common.apihost + "api/getgoods"

            this.$http.get(url).then(response => {
                this.goodsList = response.body.message
            })
        }
    }
}
</script>