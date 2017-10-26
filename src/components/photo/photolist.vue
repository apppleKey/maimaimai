<template>
   <div class='tmpl'>
       <!-- 1.0 图片分类 -->
        <div class="photoCategoryStyle">
            <ul>
                <li @click="getPhotoListById(0)">全部</li>
                <li @click="getPhotoListById(item.id)" v-for="item in photoCategoryList" :key="item.id">
                    {{item.title}}
                </li>
            </ul>
        </div>

       <!-- 2.0 图片列表 -->
       <div class="photoListStyle">
           <ul>
               <li v-for="item in photoList" :key="item.id">
                   <router-link :to="'/photo/photoinfo/'+item.id">
                        <img :src="item.img_url" alt="">
                        <p>
                            <span>{{item.title}}</span><br/>
                            {{item.zhaiyao}}
                        </p>
                   </router-link>
               </li>
           </ul>
       </div>
   </div>
</template>
   
<style scoped>
    /* 分类的样式 */
    .photoCategoryStyle{
        overflow-x: auto;
    }

    .photoCategoryStyle ul{
        white-space: nowrap;
        padding:0px 0px 15px 0px;
        margin: 3px 0px;
    }

   .photoCategoryStyle li{
       list-style: none;
       display: inline;
       color: #0094ff;
       margin: 3px;
   }

   /* 列表的样式 */
    .photoListStyle ul{
        margin: 0px;
        padding: 3px;
    }

   .photoListStyle li{
       list-style: none;
       position: relative;
   }

   img{
       width:99%;
       height: 400px;
   }

   .photoListStyle p{
       position: absolute;
       left: 5px;
       right: 5px;
       bottom:0px;
       background-color: rgba(0,0,0,0.4);
       color: #ffffff;
       font-size: 12px;
   }

   .photoListStyle span{
       font-size: 14px;
       font-weight: 900;
   }
</style>
   
<script>
   import common from '../../common/common.js'
   
   import { Indicator } from 'mint-ui'

   export default {
       data() {
           return {
               photoCategoryList:[],//分类的数组
               photoList:[]//图片的数组
           }
       },
       created() {
           this.getPhotoCategoryData()//加载图片分类
           this.getPhotoListById(0)//加载列表
       },
       methods: {
           //获取图片分类数据
           getPhotoCategoryData(){
               const url = common.apihost+"api/getimgcategory"

               this.$http.get(url).then(response=>{
                   this.photoCategoryList = response.body.message
               })
           },
           //根据分类id获取图片列表
           getPhotoListById(categoryId){
               const url = common.apihost+"api/getimages/"+categoryId

               Indicator.open({
                 text: '哥正在拼命加载中...',
                 spinnerType: 'triple-bounce'
               });

               this.$http.get(url).then(response=>{
                   Indicator.close();
                   this.photoList = response.body.message
               },err=>{
                   Indicator.close();
               })
           }
       }
   }
</script>