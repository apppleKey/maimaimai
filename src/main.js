//1.导包
import Vue from 'vue' //相当于 var Vue = require('vue')
import Mint from 'mint-ui'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import moment from 'moment'
import VuePreview from 'vue-preview'
import Vuex from 'vuex'

//使用基于Vue的第三方库
Vue.use(Mint)
Vue.use(VueRouter)//Vue.property.$route 获取参数 Vue.property.$router 路有人(编程式导航)
Vue.use(VueResource) //相当于 Vue.property.$http = VueResource  this.$http
Vue.use(VuePreview)
Vue.use(Vuex) //Vue.property.$store

//导入样式
//todo 上线的时候，换成style.min.css
import 'mint-ui/lib/style.min.css'
import './statics/mui/css/mui.min.css'
import './statics/css/site.css'

//过滤器
Vue.filter('fmtDate',(input,formatString)=>{
    const lastFormatString = formatString || 'YYYY-MM-DD HH:mm:ss'
    /**
     * moment 接的参数就是服务器返回的时间
     * format 接的参数是你要格式化成什么样子
     */
    return moment(input).format(lastFormatString)
})

//2.导入组件
import App from './App.vue'
import home from './components/home/home.vue'
import category from './components/category/category.vue'
import shopcart from './components/shopcart/shopcart.vue'
import mine from './components/mine/mine.vue'
import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newsinfo.vue'
import photolist from './components/photo/photolist.vue'
import photoinfo from './components/photo/photoinfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfo.vue'
import pictureAndText from './components/goods/pictureAndText.vue'
import goodscomment from './components/goods/goodscomment.vue'

//创建路由对象，设置路由规则
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/category',component:category},
        {path:'/shopcart',component:shopcart},
        {path:'/mine',component:mine},
        {path:'/news/list',component:newslist},
        {path:'/news/newsdetail/:newsId',component:newsinfo},
        {path:'/photo/photolist',component:photolist},
        {path:'/photo/photoinfo/:photoId',component:photoinfo},
        {path:'/goods/goodslist',component:goodslist},
        {path:'/goods/goodsinfo/:goodsId',component:goodsinfo},
        // 命令路由：https://router.vuejs.org/zh-cn/essentials/named-routes.html
        {name:'pictureAndTextIntroduction',path:'/goods/pictureAndText',component:pictureAndText},
        {path:'/goods/goodscomment',component:goodscomment}
    ]
})

//创建Vuex的仓库
const store = new Vuex.Store({
    state:{ //数据的存取都在这个里面
        goodsList:[]
    },
    mutations:{//存数据
        //加入购物车
        addToShopCart(state,goods){
            //最终存储到goodsList中的数据格式是：{goodsId:88,count:3}
            //goods ===> {goodsId:88,count:3}
            state.goodsList.push(goods)
        },
        //根据id删除购物车中的数据
        deleteGoodsById(state,goodsId){
            /**
             * [
                  {goodsId:"87",count:2},
                  {goodsId:"88",count:3},
                  {goodsId:"87",count:3}
               ]
             */
            for(var i=state.goodsList.length-1 ;i>=0;i--){
                var goods = state.goodsList[i]
                if(goods.goodsId==goodsId){
                    state.goodsList.splice(i,1)
                }
            }
            /** 
            state.goodsList = state.goodsList.filter(item=>{
                if(item.goodsId != goodsId){
                    return item
                }
            })
            */
        }
    },
    getters:{
        //获取我们商品的总数量
        /**
         * 最终存储起来的样子
         * [{goodsId:88,count:3},{goodsId:87,count:2},{goodsId:88,count:2}]
         */
        getGoodsTotalCount(state){
            let totalCount = 0
            state.goodsList.forEach(goods=>{
                totalCount+=goods.count
            })
            return totalCount
        },
        //获取goodsList
        getGoodsList(state){
            return state.goodsList
        }
    },
    actions:{
        //context是一个$store的实例
        asyncAddToShopCart(context,goods){
            context.commit('addToShopCart',goods)
        }
    }
})

//3.创建我们的根实例(一个项目只有一个)
new Vue({
    el:'#app',
    router,
    store,
    /**
    render:function(createElement){//createElement是一个函数
        return createElement(App)
    }
    **/
    render:h=>h(App)
})
