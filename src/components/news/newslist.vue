<template>
   <div class='tmpl'>
       <div class="mui-content">
            <ul class="mui-table-view">
                <li v-for="item in newsList" :key="item.id" class="mui-table-view-cell mui-media">
                    <router-link :to="'/news/newsdetail/'+item.id">
                        <img class="mui-media-object mui-pull-left" :src="item.img_url">
                        <div class="mui-media-body">
                            <p class="titleStyle">
                                {{item.title}}
                            </p>
                            <p class='mui-ellipsis'>
                                <span>{{item.add_time | fmtDate('YYYY-MM-DD HH:mm')}}</span>
                                <span class="rightStyle">点击数{{item.click}}次</span>
                            </p>
                        </div>
                    </router-link>
                </li>
			</ul>
        </div>
   </div>
</template>
   
<style scoped>
    .mui-table-view-cell{
        margin: none;
        padding:none;
    }

   .mui-table-view-cell{
       height: 80px;    
   }

   .mui-table-view-cell .mui-media a{
        padding: none;
   }

   .mui-table-view .mui-media-object.mui-pull-left{
       height: 64px;
       min-width: 64px;
   }

   .titleStyle{
       color:gray;
       font-size: 14px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
   }

   .mui-ellipsis{
       margin-top: 20px;
       font-size: 12px;
       color:#0094ff;
   }

   .rightStyle{
       float: right;
   }
</style>
   
<script>
   //导入公共的js
   import common from '../../common/common.js'

   export default{
       data(){
          return {
              newsList:[]
          } 
       },
       created(){
           this.getNewsListData()
           console.log("---newslist created")
       },
       mounted(){
        console.log("---newslist mounted")
        },
        updated(){
        console.log("---newslist updated")
        },
        destroyed(){
        console.log("---newslist destroyed")
        },
       methods:{
           getNewsListData(){
               const url = common.apihost+"api/getnewslist"

               this.$http.get(url).then(response=>{
                   this.newsList = response.body.message
               })
           }
       }
   }
</script>