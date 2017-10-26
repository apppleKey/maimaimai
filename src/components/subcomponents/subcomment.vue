<template>
   <div>
        <!-- 1.0 提交评论 -->
        <div class="postCommentStyle">
            <h4>提交评论</h4>
            <textarea ref="textAreaRef" cols="30" rows="5" placeholder="请输入评论内容"></textarea>
            <mt-button @click="postComment" size="large" type="primary">提交评论</mt-button>
        </div>
       <!-- 2.0 评论列表 -->
       <div class="commentListStyle">
           <h4>评论列表</h4>
           <div v-for="(item,index) in commentList" :key="index" class="commentItemStyle">
               <p class="commentContentStyle">{{item.content}}</p>
               <p class="commentUserAndTimeStyle">
                   <span>匿名用户</span>
                   <span class="right">{{item.add_time | fmtDate}}</span>
               </p>
           </div>
           <mt-button class="loadMoreStyle" @click="loadMore" plain size="large" type="danger">加载更多</mt-button>
       </div>
   </div>
</template>
   
<style scoped>
   .postCommentStyle,.commentListStyle{
       padding: 6px;
   }

   h4{
       border-bottom: 1px solid rgba(92,92,92,0.3);
       padding-bottom: 10px;
   }

   .commentItemStyle{
       padding-top: 6px;
       border-bottom: 1px solid rgba(92,92,92,0.3);
       height: 70px;
       overflow-y: auto;
   }

   .commentContentStyle{
       color: black;
   }

   .commentUserAndTimeStyle{
       color: #0094ff;
   }

   .right{
       float: right;
   }

   .loadMoreStyle{
       margin-top: 15px;
       margin-bottom: 10px;
   }
</style>
   
<script>
   import common from '../../common/common.js'

   //导入jquery
   //import $ from 'jquery'
   import { Toast } from 'mint-ui'
   
   export default {
       data() {
           return {
               pageIndex:1, //用来记录当前要加载的页数
               commentList:[]
           }
       },
       created() {
           this.getCommentListData()
           console.log("---subcomment created")
       },
       updated(){
            console.log("---subcomment updated")
       },
       destroyed(){
           console.log("---subcomment destroyed")
       },
       methods: {
           //加载评论数据
           getCommentListData(){
               const url = common.apihost+"api/getcomments/"+this.commentId+"?pageindex="+this.pageIndex

               this.$http.get(url).then(response=>{
                   if(this.pageIndex == 1){ //刚开始进来，及提交评论之后
                       this.commentList = response.body.message
                   }else{
                       this.commentList = this.commentList.concat(response.body.message)
                   }
               })
           },
           //加载更多
           loadMore(){
               this.pageIndex++
               this.getCommentListData()
           },
           //提交评论
           postComment(){
               const content = this.$refs.textAreaRef.value

               if(content==null || content.length<=0){
                   Toast({
                        message: '请输入正确的内容!',
                        position: 'middle',
                        duration: 3000
                   });
                   return
               }

               //提交内容
               const url = common.apihost+"api/postcomment/"+this.commentId
               this.$http.post(url,{content:content},{emulateJSON:true}).then(response=>{
                   //1.0 提示成功信息
                   Toast({
                        message: response.body.message,
                        position: 'middle',
                        duration: 3000
                   });

                   //2.0 清空文本域的内容
                   this.$refs.textAreaRef.value = ''

                   //3.0 重新加载第一页的数据
                   this.pageIndex = 1
                   this.getCommentListData()
               })
           }
       },
       props:['commentId']
   }
</script>