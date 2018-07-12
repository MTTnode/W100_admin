<template>
<div class="manage_page fillcontain">
  <el-row style="height: 100%;">
    <el-col :span="4" style="min-height: 100%; background-color: #324057;">
      <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
        <el-menu-item index="/index"><i class="el-icon-news"></i>数据统计</el-menu-item>
        <el-menu-item index="/banner" v-if="role == 0"><i class="el-icon-menu"></i>banner配置</el-menu-item>
        <el-menu-item index="/transaction" v-if="role == 0"><i class="el-icon-tickets"></i>交易对配置</el-menu-item>
        <el-menu-item index="/blacklist"><i class="el-icon-error"></i>黑名单配置</el-menu-item>
        <el-menu-item index="/whitelist" v-if="role == 0"><i class="el-icon-success"></i>白名单配置</el-menu-item>
        <el-menu-item index="/user" v-if="role == 0"><i class="el-icon-setting"></i>用户管理</el-menu-item>
        <el-menu-item index="/usdt"><i class="el-icon-goods"></i>USDT订单管理</el-menu-item>
        <el-menu-item index="/payment"><i class="el-icon-goods"></i>Payment订单管理</el-menu-item>
        <el-menu-item index="/check" v-if="role == 0"><i class="el-icon-mobile-phone"></i>APP版本管理</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20" style="height: 100%;overflow: auto;">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-col>
  </el-row>
</div>
</template>

<script>
import localstore from "../utils/localstore.js";

export default {
  data() {
    return {
      role: null
    }
  },
  computed: {
    defaultActive: function() {
      return this.$route.path.replace('/', '');
    }
  },
  mounted(){
    this.$nextTick(()=>{
      let res = localstore.getValue("usr");
      // let obj = this.$store.state.user;
      // res = JSON.parse(res);
      // console.log(res.role);
      if(res){
        this.role = res;
        // console.log('登陆用户！');
      }else{
        this.$router.push('/');
      }
    });
  }
}
</script>

<style lang="less" scoped>
@import '../style/mixin';
.el-menu {
    background-color: #324157;
    .el-menu-item {
        color: #bfcbd9;
    }
}
.el-submenu .el-menu-item {
    min-width: 0;
}
</style>
