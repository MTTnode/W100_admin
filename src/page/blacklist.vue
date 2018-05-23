<template>
<div>
  <head-top></head-top>
  <section class="data_section">
    <h3 class="section_title">添加黑名单</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="IP" prop="ip">
        <el-input style="width:600px;margin-bottom:30px;" v-model="form.ip"></el-input>
      </el-form-item>
      <el-form-item label="账户" prop="uid">
        <el-input style="width:600px;margin-bottom:30px;" v-model="form.uid"></el-input>
      </el-form-item>
      <el-form-item label="屏蔽类型" prop="type">
        <el-select style="width:600px;margin-bottom:30px;" v-model="form.type" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="屏蔽原因" prop="content">
        <el-input style="width:600px;margin-bottom:30px;" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 start -->
    <h3 class="section_title">黑名单列表</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ip" width="100">
        <template slot-scope="scope">
            <div>
              {{scope.row.ip | formatStr}}
            </div>
        </template>
      </el-table-column>
      <el-table-column prop="uid" label="账户" width="50"></el-table-column>
      <el-table-column label="屏蔽时间" width="300">
        <template slot-scope="scope">
            <div>
              {{scope.row.start_time | formatTime}}
            </div>
        </template>
      </el-table-column>
      <el-table-column label="屏蔽结束时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.end_time | formatTime}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="屏蔽原因"></el-table-column>
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
import moment from "moment";
import headTop from "../components/headTop";
import Api from "../api/api.js";

export default {
  data() {
    return {
      options: [{
        value: '0',
        label: ' 短暂屏蔽'
      }, {
        value: '1',
        label: '永久屏蔽'
      }],
      form: {
        ip: "",
        uid: "",
        type: '0',
        content: ""
      },
      curPage: 0,
      total: 0,
      tableData: []
    };
  },
  components: {
    headTop
  },
  filters: {
    formatStr: function(val) {
      if (!val) {
        return "-";
      } else {
        return val;
      }
    },
    formatTime: function(str) {
      return moment(new Date(str)).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getList();
    });
  },
  methods: {
    getList() {
      let _this = this;
      Api.getBlacklistRequest({
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
      Api.saveBlackRequest(this.form).then(function(res) {
        if (res.status == 200 && res.data.code == 0) {
          _this.$message({
            type: "success",
            message: "保存成功!"
          });
          _this.form = {
            ip: "",
            uid: "",
            type: '0',
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
        Api.delblackRequest(val).then(function(res) {
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
