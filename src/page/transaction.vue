<template>
<div>
  <head-top></head-top>
  <section class="data_section">
    <h3 class="section_title">添加交易对</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="base" prop="base">
        <el-select v-model="form.base" style="width:600px;margin-bottom:30px;" placeholder="请选择交易类型">
          <el-option label="USD" value="USD"></el-option>
          <el-option label="BTC" value="BTC"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="markets" prop="markets">
        <el-input type="textarea" style="width:600px;margin-bottom:30px;" v-model="form.markets"></el-input>
        <span style="display:block;color:#606266;"><em style="color:red;margin-right: 5px;">*</em>输入markets，多个markets请用英文逗号分隔;</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
    <h3 class="section_title">交易对列表</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="base" label="base" width="180"> </el-table-column>
      <el-table-column prop="markets" label="markets"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
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
        base: "",
        markets: ""
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
    })
  },
  methods: {
    getList() {
      let _this = this;
      Api.getTransactRequest().then(function(res) {
        if (res.status == 200 && res.data.code == 0) {
          _this.tableData = res.data.data.list;
        }
      }).catch(function(err) {
        console.log(err);
      });
    },
    onSubmit() {
      let _this = this;
      Api.saveTransactRequest(this.form).then(function(res) {
        if (res.status == 200 && res.data.code == 0) {
          _this.$message({
            type: "success",
            message: "保存成功!"
          });
          _this.form = {
            base: "",
            markets: ""
          };
          _this.getList();
        }
      }).catch(function(err) {
        console.log(err);
      });
    },
    handleClick(val) {
      Object.assign(this.form, val)
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
