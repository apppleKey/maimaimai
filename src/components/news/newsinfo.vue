<template>
   <div class='tmpl'>
       <!-- 1.0 标题部分 -->
       <div class="titleStyle">
           <h4>{{newsInfo.title}}</h4>
           <p>{{newsInfo.add_time | fmtDate}}&nbsp;&nbsp;{{newsInfo.click}}次浏览&nbsp;&nbsp;分类:民生经济</p>
       </div>

       <!-- 2.0 内容部分 -->
       <div class="contentStyle">
           <span v-html="newsInfo.content"></span>
       </div>

       <!-- 3.0 评论子组件 -->
       <subcomment :commentId="$route.params.newsId"></subcomment>
   </div>
</template>
   
<style scoped>
    .titleStyle{
        border-bottom: 1px solid rgba(92,92,92,0.4);
    }

   .titleStyle,.contentStyle{
       padding: 6px;
   }

   h4{
       color:#0094ff;
   }

   .titleStyle p{
       color: black;
   }
</style>
   
<script>
   import common from '../../common/common.js'
   
   //1.0 导入评论子组件
   import subcomment from '../subcomponents/subcomment.vue'

   export default {
       data() {
           return {
               newsInfo : {}
           }
       },
       created() {
           this.getNewsInfoData()
       },
       methods: {
           getNewsInfoData(){
               const url = common.apihost+"api/getnew/"+this.$route.params.newsId

               this.$http.get(url).then(response=>{
                   this.newsInfo = response.body.message[0]
               })
           }
       },
       components:{//2.0 注册子组件
           subcomment:subcomment
       }
   }
</script>