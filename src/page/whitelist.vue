<template>
<div>
  <head-top></head-top>
  <section class="data_section">
    <h3 class="section_title">添加白名单</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账户" prop="id">
        <el-input style="width:600px;margin-bottom:30px;" v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="IP" prop="type">
        <el-input style="width:600px;margin-bottom:30px;" v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="deturl">
        <el-input style="width:600px;margin-bottom:30px;" v-model="form.deturl"></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 start -->
    <h3 class="section_title">白名单列表</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="账户" width="100"></el-table-column>
      <el-table-column prop="type" label="IP" width="100"></el-table-column>
      <el-table-column prop="imgurl" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</div>
</template>

<script>
import headTop from "../components/headTop";
import Api from "../api/api.js";

export default {
  data() {
    return {
      form: {
        id: "",
        type: "",
        deturl: "",
        imgurl: ""
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
      Api.getBannerRequest().then(function(res) {
        if (res.status == 200 && res.data.code == 0) {
          _this.tableData = res.data.data.list;
        }
      }).catch(function(err) {
        console.log(err);
      });
    },
    onSubmit() {
      let _this = this;
      Api.savebannerRequest(this.form).then(function(res) {
        if (res.status == 200 && res.data.code == 0) {
          _this.$message({
            type: "success",
            message: "保存成功!"
          });
          _this.form = {
            id: "",
            type: "",
            deturl: "",
            imgurl: ""
          };
          _this.getList();
        }
      }).catch(function(err) {
        console.log(err);
      });
    },
    handleClick(val) {
      Object.assign(this.form, val);
    },
    delClick(val) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let _this = this;
        Api.delbannerRequest(val).then(function(res) {
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
