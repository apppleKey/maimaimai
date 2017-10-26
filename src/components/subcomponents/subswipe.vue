<template>
   <div>
        <mt-swipe :auto="lunbo_time">
            <mt-swipe-item v-for="(item,index) in lunboArray" :key="index">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
   </div>
</template>
   
<style scoped>
   .mint-swipe{
       height: 250px;
   }

   img{
       height: 100%;
       width: 100%;
   }
</style>
   
<script>
   import common from '../../common/common.js'
   
   export default {
       data() {
           return {
               lunboArray:[]
           }
       },
       created() {
           this.getLunboData()
       },
       methods: {
           //获取轮播图的数据
           getLunboData(){
               const url = common.apihost+this.lunbo_url

               this.$http.get(url).then(response=>{
                   this.lunboArray = response.body.message;
               })
           }
       },
       props:['lunbo_url','lunbo_time']
   }
</script>