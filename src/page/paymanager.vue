<template>
<div>
  <head-top></head-top>
  <section class="data_section">
    <el-button type="danger" icon="el-icon-delete" @click="resetClick">重置数据</el-button>
    <!-- 列表 start -->
    <h3 class="section_title">支付管理</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="平台" width="200"></el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <div>{{ scope.row.value | formatStr }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button @click="OnClick(scope.row, 'recharge', '1')" type="text" size="small">开启</el-button>
            <el-button @click="OnClick(scope.row, 'recharge', '0')" type="text" size="small">关闭</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 列表 start -->
    <h3 class="section_title">提现管理</h3>
    <el-table :data="tableData_withdraw" style="width: 100%">
      <el-table-column prop="name" label="平台" width="200"></el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <div>{{ scope.row.value | formatStr }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button @click="OnClick(scope.row, 'withdraw', '1')" type="text" size="small">开启</el-button>
            <el-button @click="OnClick(scope.row, 'withdraw', '0')" type="text" size="small">关闭</el-button>
          </div>
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
      tableData: [
        {
          name: "dora",
          value: "0"
        },
        {
          name: "usdt",
          value: "0"
        },
        {
          name: "daddy",
          value: "0"
        }
      ],
      tableData_withdraw: [
        {
          name: "dora",
          value: "0"
        },
        {
          name: "usdt",
          value: "0"
        },
        {
          name: "daddy",
          value: "0"
        }
      ]
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
    formatStr: function(val) {
      if (val == 0) {
        return "关闭";
      } else if (val == 1) {
        return "开启";
      }
    }
  },
  methods: {
    getList() {
      let _this = this;
      Api.getPaymentSwitchlistRequest()
        .then(function(res) {
          if (res.status == 200 && res.data.code == 1000) {
            _this.tableData = res.data.data.recharge;
            _this.tableData_withdraw = res.data.data.withdraw;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    OnClick(val, type, value) {
      let _this = this;
      Api.setPaymentSwitchRequest({
        key: val.name,
        type: type,
        value: value
      })
        .then(function(res) {
          if (res.status == 200 && res.data.code == 1000) {
            _this.$message({
              type: "success",
              message: "修改成功!"
            });
            _this.getList();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    resetClick(val, type, value) {
      let _this = this;

      let arrBase = [
        {
          name: "dora",
          value: "0"
        },
        {
          name: "usdt",
          value: "0"
        },
        {
          name: "daddy",
          value: "0"
        }
      ];
      
      for(let i=0; i<arrBase.length; i++){
        _this.OnClick(arrBase[i], "withdraw", "0");
        _this.OnClick(arrBase[i], "recharge", "0");
      } 
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
