<template>
  <div>
    <!-- 1.0 标题 -->
    <mt-header fixed title="买买买"></mt-header>

    <div v-show="isShowBack" @click="goBack" class="backStyle">&lt;返回</div>

    <!-- 2.0 中间动态变化的部分-路由 -->
    <router-view></router-view>

    <!-- 3.0 底部的TabBar -->
    <mt-tabbar fixed :class="isHiddenTabbar ? 'hiddenTabbarStyle' : ''">
      <mt-tab-item id="首页">
        <router-link to="/home">
          <img src="http://img08.jiuxian.com/bill/2016/0224/cccd8df26a754c139de800406af82178.png">
        </router-link>
      </mt-tab-item>

      <mt-tab-item id="分类">
        <router-link to="/category">
          <img src="http://img07.jiuxian.com/bill/2016/0224/36a49b28ec5e4cdf9dbe37988199487d.png">

        </router-link>
      </mt-tab-item>

      <mt-tab-item id="购物车">
        <router-link to="/shopcart">
          <img src="http://img08.jiuxian.com/bill/2016/0224/42baf46987b6460bb43b3396e9941653.png">
          <span v-show="myCount!=0" class="badgeStyle">{{myCount}}</span>
        </router-link>
      </mt-tab-item>

      <mt-tab-item id="我的">
        <router-link to="/mine">
          <img src="http://img09.jiuxian.com/bill/2016/0224/cba9029a8f4444a989a2ab5aa84c6538.png">

        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<style scoped>
  img {
    width: 42px;
    height: 35px;
  }

  /* 返回按钮的样式 */
  .backStyle{
    position: fixed;
    left: 8px;
    top:8px;
    z-index: 2;
    font-size: 14px;
    color: #ffffff;
    font-weight: 900;
  }

  /* 底部Tabbar隐藏的样式 */
  .hiddenTabbarStyle{
    display: none;
  }

  /** 徽标的样式 **/
  .badgeStyle{
      font-size: 11px;
      line-height: 1.3;  
      position: absolute;
      top: 7px;
      left: 63%;
      text-align: center;
      padding: 1px 5px; 
      color: #fff;
      border-radius: 11px; 
      background: red;
    }
</style>

<script>
  export default{
    data(){
      return {
        isShowBack:false, //是否显示返回
        isHiddenTabbar:false, //是否隐藏我们的Tabbar
        myCount:0
      }
    },
    created(){
      this.isShowOrHidden(this.$route.path)
    },
    updated(){
      //不要加括号，vuex内部肯定会调用getGoodsTotalCount该函数
      this.myCount = this.$store.getters.getGoodsTotalCount
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      //根据路径显示还是隐藏Tabbar及返回按钮
      isShowOrHidden(path){
        if(path == '/home'){
          this.isShowBack = false
          this.isHiddenTabbar = false
        }else{
          this.isShowBack = true
          this.isHiddenTabbar = true
        }
      }
    },
    watch:{
      $route:function (newVal, oldVal) {
        this.isShowOrHidden(newVal.path)
      }
    }
  }
</script>

