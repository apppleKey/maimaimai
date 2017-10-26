<template>
   <div class='tmpl'>
       <div class="titleStyle">
           <h4>{{pictureAndTextInfo.title}}</h4>
       </div>

       <div class="contentStyle">
           <p v-html="pictureAndTextInfo.content"></p>
       </div>
   </div>
</template>
   
<style scoped>
   .titleStyle,.contentStyle{
       padding: 6px;
   }

   h4{
       color:#0094ff;
       padding-bottom: 10px;
       border-bottom: 1px solid rgba(92,92,92,0.3)
   }
</style>
   
<script>
   import common from '../../common/common.js'
   
   export default {
       data() {
           return {
               pictureAndTextInfo:{}
           }
       },
       created() {
           this.getPictureAndTextData()
       },
       methods: {
           getPictureAndTextData(){
               const url = common.apihost + "api/goods/getdesc/"+this.$route.params.goodsId

                this.$http.get(url).then(response=>{
                    this.pictureAndTextInfo = response.body.message[0]
                })
           }
       }
   }
</script>