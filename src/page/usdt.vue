<template>
<div>
  <head-top></head-top>
  <section class="data_section">
    <h3 class="section_title">USDT订单管理</h3>
    <el-form label-width="100px">
      <el-row style="margin:30px 0;">
        <el-col :span="6">
          <el-form-item label="订单号:">
            <el-input v-model="order"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单时间">
            <el-col :span="11">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="date" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="1" style="text-align:center;">至</el-col>
            <el-col :span="11">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="date1" style="width: 100%;" @change="dateClick2"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单状态">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin:30px 0;">
        <el-col :span="6">
          <el-form-item label="用户ID:">
            <el-input v-model="user"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="margin-left:30px;">
          <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="resetClick">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 统计数据  start -->
    <el-row style="margin:30px 0;">
      <el-col :span="6">
        <div>订单数量:  {{ obj.total }}</div>
      </el-col>
      <el-col :span="6">
        <div>订单金额:  {{ obj.price }}</div>
      </el-col>
      <el-col :span="6">
        <div>支付完成:  {{ obj.account_paid }}</div>
      </el-col>
      <el-col :span="6">
        <div>足额待确认:  {{ obj.confirmedpaid }}</div>
      </el-col>
    </el-row>
    <el-row style="margin:30px 0;">
      <el-col :span="6">
        <div>部分支付:  {{ obj.partpaid }}</div>
      </el-col>
      <el-col :span="6">
        <div>等待支付:  {{ obj.unpaid }}</div>
      </el-col>
      <el-col :span="6">
        <div>主动取消:  {{ obj.revoke }}</div>
      </el-col>
      <el-col :span="6">
        <div>被动取消:  {{ obj.revoke1 }}</div>
      </el-col>
    </el-row>
    <!-- 列表 start -->
    <el-table :data="obj.list" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="订单时间" width="180">
        <template slot-scope="scope">
            <div>{{ scope.row.create_time | formatTime }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="uid" label="用户" width="80"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="350"></el-table-column>
      <el-table-column label="订单状态" width="100">
        <template slot-scope="scope">
            <div>{{ scope.row.order_status | formatStr }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="订单金额" width="150"></el-table-column>
      <el-table-column prop="coin_amount" label="应付金额" width="150"></el-table-column>
      <el-table-column label="实付金额">
        <template slot-scope="scope">
            <div>待确认：{{ scope.row.coin_paid }}</div>
            <div>已确认：{{ scope.row.coin_cfmed }}</div>
        </template>
      </el-table-column>
    </el-table>
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
      order: "",
      date: "",
      date1: "",
      user: "",
      options: [
        {
          value: "1",
          label: "等待支付"
        },
        {
          value: "2",
          label: "部分支付"
        },
        {
          value: "3",
          label: "足额待确认"
        },
        {
          value: "10",
          label: "支付完成"
        },
        {
          value: "20",
          label: "主动取消"
        },
        {
          value: "21",
          label: "被动取消"
        }
      ],
      value: "",
      obj: {}
    };
  },
  components: {
    headTop
  },
  mounted() {
    this.$nextTick(() => {
      this.getList({});
    });
  },
  filters: {
    formatStr: function(val) {
      if(val == '1'){
        return "等待支付";
      }else if(val == '2'){
        return "部分支付";
      }else if(val == '3'){
        return "足额待确认";
      }else if(val == '10'){
        return "支付完成";
      }else if(val == '20'){
        return "主动取消";
      }else if(val == '21'){
        return "被动取消";
      }else{
        return "-";
      }
    },
    formatTime: function(str) {
      return moment(new Date(str)).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    getList(param) {
      let _this = this;
      Api.getOrderListRequest(param).then(function(res) {
          if (res.status == 200 && res.data.code == 0) {
            _this.obj = res.data.data;
            console.log(_this.obj);
          }
      }).catch(function(err) {
        console.log(err);
      });
    },
    searchClick() {
      let params = {};
      if(this.order){
        params.order_number = this.order;
      }
      if(this.user){
        params.user = this.user;
      }
      if(this.value){
        params.order_status = this.value;
      }
      if(this.date && !this.date1){
        this.$message.error('请选择结束时间');
        return;
      }
      if(this.date > this.date1){
        this.$message.error('结束时间应大于等于起始时间');
        this.date = '';
        this.date1 = '';
        return;
      }
      params.time1 = this.date;
      params.time2 = this.date1;
      this.getList(params);
    },
    resetClick() {
      this.order = '';
      this.user = '';
      this.value = '';
      this.date = '';
      this.date1 = '';
    },
    dateClick2() {
      if(!this.date){
        this.$message.error('请选择起始时间');
        this.date1 = '';
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
