<template>
    <div class="header_container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, key) in $route.meta" :key="key">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="height:36px;">
        <img src="../assets/img/default.jpg" class="avator">
        <span class="user">{{user}}</span>
      </div>
    </div>
</template>

<script>
import localstore from "../utils/localstore.js";

export default {
  data() {
    return {
      user: ''
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.user = localstore.getValue('name');
    })
  },
  methods: {
    async handleCommand(command) {
      if (command == "home") {
        this.$router.push("/index");
      } else if (command == "userInfo") {
        this.$message("程序员正在努力开发");
      }
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  float: left;
  .wh(36px, 36px);
  border-radius: 50%;
}
.user {
  margin: 0 20px;
  float: left;
  font-size: 18px;
  height: 36px;
  line-height: 36px;
}
</style>
