<template>
<div>
  <head-top></head-top>
  <section class="data_section">
    <h3 class="section_title">添加白名单</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账户" prop="uid">
        <el-input style="width:600px;margin-bottom:30px;" v-model="form.uid"></el-input>
      </el-form-item>
      <el-form-item label="IP" prop="ip">
        <el-input style="width:600px;margin-bottom:30px;" v-model="form.ip"></el-input>
      </el-form-item>
      <el-form-item label="url" prop="url">
        <el-input style="width:600px;margin-bottom:30px;" v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="content">
        <el-input style="width:600px;margin-bottom:30px;" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 start -->
    <h3 class="section_title">白名单列表</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="uid" label="账户" width="100"></el-table-column>
      <el-table-column prop="ip" label="IP" width="100"></el-table-column>
      <el-table-column prop="url" label="url" width="150"></el-table-column>
      <el-table-column prop="content" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top:20px;" v-if="parseInt(total/10) > 0">
      <el-pagination @current-change="handleCurrentChange" :page-size="10" layout="prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </section>
</div>
</template>

<script>
import headTop from "../components/headTop";
import Api from "../api/api.js";

export default {
  data() {
    return {
      curPage: 0,
      total: 0,
      form: {
        uid: "",
        ip: "",
        url: "",
        content: ""
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
  methods: {
    getList() {
      let _this = this;
      Api.getWhitelistRequest({
        curPage: _this.curPage
      }).then(function(res) {
        if (res.status == 200 && res.data.code == 0) {
          _this.total = res.data.data.total;
          _this.tableData = res.data.data.list;
        }
      }).catch(function(err) {
        console.log(err);
      });
    },
    onSubmit() {
      let _this = this;
      Api.saveWhiteRequest(this.form).then(function(res) {
        if (res.status == 200 && res.data.code == 0) {
          _this.$message({
            type: "success",
            message: "保存成功!"
          });
          _this.form = {
            uid: "",
            ip: "",
            url: "",
            content: ""
          };
          _this.getList();
        }
      }).catch(function(err) {
        console.log(err);
      });
    },
    handleCurrentChange(val) {
      this.curPage = val - 1;
      this.getList();
    },
    delClick(val) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let _this = this;
        Api.delwhiteRequest(val).then(function(res) {
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
