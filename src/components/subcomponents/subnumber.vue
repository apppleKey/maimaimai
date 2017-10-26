<template>
   <div class="numberStyle">
       <div @click="substrict" class="left">-</div>
       <div class="middle">{{count}}</div>
       <div @click="add" class="right">+</div>
   </div>
</template>
   
<style scoped>
   .left,.middle,.right{
       display: inline-block;
       border:1px solid rgba(92,92,92,.3);
       width: 35px;
       height: 30px;
       line-height: 30px;
       text-align: center;
   }

   .middle{
       width: 40px;
   }

    .numberStyle{
        margin-bottom: 10px;
    }
</style>
   
<script>
   import common from '../../common/common.js'
   
   export default {
       data() {
           return {
               count:1
           }
       },
       created() {
           
       },
       methods: {
           substrict(){
               if(this.count<=1){
                   return
               }

               this.count--
               this.notify()
           },
           add(){
               this.count++
               this.notify()
           },
           notify(){
               /**
                * 参数1：自定义事件的名称，注意:父子组件中要保持一致
                * 参数2：传递的值
                */
               this.$emit('goodsCountEvent',this.count)
           }
       }
   }
</script>