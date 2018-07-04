<template>
<div>
  <head-top></head-top>
  <section class="data_section">
    <h3 class="section_title">添加用户</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input style="width:600px;margin-bottom:30px;" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select style="width:600px;margin-bottom:30px;" v-model="form.role" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin:0 auto;" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 start -->
    <h3 class="section_title">用户列表</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="用户名" width="200"></el-table-column>
      <el-table-column label="角色" width="100">
        <template slot-scope="scope">
          <div>{{ scope.row.role | formatStr }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="password" label="密码" width="200"></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="resetClick(scope.row)" type="text" size="small">重置</el-button>
          <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</div>
</template>

<script>
import headTop from "../components/headTop";
import util from "../utils/utils.js";
import Api from "../api/api.js";

export default {
  data() {
    return {
      options: [{
        value: 0,
        label: '管理员'
      }, {
        value: 1,
        label: '普通用户'
      }],
      form: {
        name: "",
        role: null
      },
      tableData: []
    };
  },
  components: {
    headTop
  },
  mounted() {
    this.$nextTick(() => {
      this.getList();
    });
  },
  filters: {
    formatStr: function(val){
      if(val == 0){
        return "管理员";
      }else if(val == 1){
        return "普通用户";
      }
    }
  },
  methods: {
    getList() {
      let _this = this;
      Api.getUserListRequest().then(function(res) {
        if (res.status == 200 && res.data.code == 0) {
          _this.tableData = res.data.data;
        }
      }).catch(function(err) {
        console.log(err);
      });
    },
    onSubmit() {
      let _this = this;
      if(!util.regEmail.test(_this.form.name)){
        _this.$message.error("用户信息不合法！");
        return;
      }
      Api.addUserRequest(_this.form).then(function(res) {
        if (res.status == 200 && res.data.code == 0) {
          _this.$message({
            type: "success",
            message: "保存成功!"
          });
          _this.form = {
            name: "",
            role: null
          };
          _this.getList();
        }
      }).catch(function(err) {
        console.log(err);
      });
    },
    delClick(val) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let _this = this;
        Api.delUserRequest(val).then(function(res) {
          if (res.status == 200 && res.data.code == 0) {
            _this.getList();
            _this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        }).catch(function(err) {
          console.log(err);
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    resetClick(val) {
      let _this = this;
      Api.resetUserRequest({
        name: val.name,
        type: "reset"
      }).then(function(res) {
        if (res.status == 200 && res.data.code == 0) {
          _this.$message({
            type: "success",
            message: "重置成功!"
          });
          _this.getList();
        }
      }).catch(function(err) {
        console.log(err);
      });
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.data_section {
    padding: 20px;
    margin-bottom: 40px;
    .section_title {
        text-align: center;
        font-size: 30px;
        margin-bottom: 10px;
    }
}
</style>
