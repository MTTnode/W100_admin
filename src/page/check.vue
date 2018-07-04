<template>
    <div>
      <head-top></head-top>
      <section class="data_section">
        <h3 class="section_title">APP版本管理</h3>
        <el-form ref="form" :model="form" label-width="150px">
          <el-form-item label="客户端" prop="client">
						<!-- <el-input style="width:600px;margin-bottom:30px;" v-model="form.client"></el-input> -->
            <el-select style="width:600px;margin-bottom:30px;" v-model="form.client" placeholder="请选择">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
					</el-form-item>
          <el-form-item label="版本号" prop="version">
						<el-input style="width:600px;margin-bottom:30px;" v-model="form.version"></el-input>
					</el-form-item>
          <el-form-item label="是否强制更新" prop="update_status">
            <el-select style="width:600px;margin-bottom:30px;" v-model="form.update_status" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
					</el-form-item>
          <el-form-item label="强制更新版本" v-if="form.update_status == '1'" prop="update_version">
						<el-input style="width:600px;margin-bottom:30px;" v-model="form.update_version"></el-input>
					</el-form-item>
          <el-form-item label="更新说明" prop="remark">
						<el-input style="width:600px;margin-bottom:30px;" v-model="form.remark"></el-input>
					</el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-form-item>
        </el-form>
        <!-- 列表 start -->
        <h3 class="section_title">APP版本列表</h3>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="client" label="客户端" width="150"></el-table-column>
          <el-table-column prop="version" label="版本号" width="150"></el-table-column>
          <el-table-column prop="update_status" label="是否强制更新" width="150">
            <template slot-scope="scope">
              <div>{{ scope.row.update_status | formatStr }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="update_version" label="强制更新版本" width="150">
            <template slot-scope="scope">
              <div>{{ scope.row.update_version | formatVer }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="更新说明"></el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="delClick(scope.row)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column> -->
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
      options: [{
        value: '0',
        label: '不更新'
      }, {
        value: '1',
        label: '选择更新'
      }, {
        value: '2',
        label: '强制更新'
      }],
      options1: [{
        value: 'ios',
        label: 'ios'
      }, {
        value: 'android',
        label: 'android'
      }],
      form: {
        version: "",
        update_status: "",
        client: "",
        remark: ""
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
    formatStr(val) {
      if(val == '0'){
        return "不更新";
      }else if(val == '1'){
        return "选择更新";
      }else{
        return "强制更新";
      }
    },
    formatVer(val) {
      if(val){
        return val;
      }else{
        return '-';
      }
    }
  },
  methods: {
    getList() {
      let _this = this;
      Api.getCheckListRequest().then(function(res) {
        if (res.status == 200 && res.data.code == 0) {
          // console.log(res.data);
          _this.tableData = res.data.data;
        }
      }).catch(function(err) {
        console.log(err);
      });
    },
    onSubmit() {
      let _this = this;
      Api.saveVersionRequest(this.form).then(function(res) {
        if (res.status == 200 && res.data.code == 0) {
          _this.$message({
            type: "success",
            message: "保存成功!"
          });
          _this.form = {
            version: "",
            update_status: "",
            client: "",
            remark: ""
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
