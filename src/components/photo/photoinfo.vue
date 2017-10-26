<template>
   <div class='tmpl'>
       <!-- 1.0 标题部分 -->
       <div class="titleStyle">
           <h4>{{photoInfo.title}}</h4>
           <p>{{photoInfo.add_time | fmtDate('YYYY-MM-DD')}}&nbsp;&nbsp;{{photoInfo.click}}次浏览</p>
       </div>

       <!-- 2.0 todo 缩略图部分 -->
       <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li v-for="(item,index) in thumbImages" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <img @click="$preview.open(index, thumbImages)" class="preview-img" height="100" :src="item.src">
                </li>
            </ul> 
		</div>

       <!-- 3.0 内容 -->
       <div class="contentStyle">
           <span v-html="photoInfo.content"></span>
       </div>

       <!-- 4.0 评论 -->
       <subcomment :commentId="$route.params.photoId"></subcomment>
   </div>
</template>
   
<style scoped>
   .titleStyle,.contentStyle{
       padding: 6px;
   }

   h4{
       font-size: 16px;
       color:#0094ff;
       padding-bottom: 5px;
   }

   .contentStyle{
       font-size: 14px;
       color: gray;
   }
</style>
   
<script>
   import common from '../../common/common.js'

   //导入评论子组件
   import subcomment from '../subcomponents/subcomment.vue'
   
   export default {
       data() {
           return {
               photoInfo : {},
               thumbImages:[]
           }
       },
       created() {
           this.getPhotoInfoData(),
           this.getThumbImagesData()
       },
       methods: {
           //获取图片详情的数据
           getPhotoInfoData(){
               const url = common.apihost+"api/getimageInfo/"+this.$route.params.photoId

               this.$http.get(url).then(response=>{
                   this.photoInfo = response.body.message[0]
               })
           },
           //获取缩略图数组数据
           getThumbImagesData(){
               const url = common.apihost+"api/getthumimages/"+this.$route.params.photoId

               this.$http.get(url).then(response=>{
                   response.body.message.forEach(item=>{
                       item.w=600
                       item.h=400
                   })
                   console.log(response.body.message)
                   this.thumbImages = response.body.message
               })
           }
       },
       components:{
           subcomment
       }
   }
</script>