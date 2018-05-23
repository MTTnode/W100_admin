<template>
<div>
  <head-top></head-top>
  <section class="data_section">
    <header class="section_title">数据统计</header>
    <el-row :gutter="24" style="margin-bottom: 15px;color:#fff;">
      <el-col :span="10" style="margin-right:50px;background-color:#007bff!important;border-radius:5px;">
        <div style="height:100px;line-height:100px;text-align:center;font-size:30px;">日活跃人数</div>
        <div style="height:30px;line-height:30px;">
          <span style="margin-right:5px;">{{data.androidDAU}}    androidDAU</span>
          <span style="margin-right:5px;">{{data.iosDAU}}    iosDAU</span>
        </div>
      </el-col>
      <el-col :span="10" style="background-color:#ffc107!important;border-radius:5px;">
        <div style="height:100px;line-height:100px;text-align:center;font-size:30px;">Timeout总数</div>
        <div style="height:30px;line-height:30px;">
          <el-row>
            <el-col :span="5">
              <span>{{data.LHT_100}} LHT100</span>
            </el-col>
            <el-col :span="5">
              <span>{{data.LHT_500}} LHT500</span>
            </el-col>
            <el-col :span="5">
              <span>{{data.LHT_1000}} LHT1000</span>
            </el-col>
            <el-col :span="5">
              <span>{{data.LHT_1001}} LHT1000+</span>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-bottom: 15px;color:#fff;">
      <el-col :span="10" style="margin-right:50px;background-color:#28a745!important;border-radius:5px;">
        <div style="height:100px;line-height:100px;text-align:center;font-size:30px;">新增人数</div>
        <div style="height:30px;line-height:30px;">
          <span style="margin-right:5px;">{{data.androidNewUser}}    androidNewUser</span>
          <span style="margin-right:5px;">{{data.iosNewUser}}    iosNewUser</span>
        </div>
      </el-col>
      <el-col :span="10" style="background-color:#dc3545!important;border-radius:5px;">
        <div style="height:100px;line-height:100px;text-align:center;font-size:30px;">日活跃IP</div>
        <div style="height:30px;line-height:30px;">
          <span style="margin-right:5px;">{{data.androidDAIP}}    androidDAIP</span>
          <span style="margin-right:5px;">{{data.iosDAIP}}    iosDAIP</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-bottom: 15px;color:#fff;">
      <el-col :span="10" style="margin-right:50px;border-radius:5px;">
        <div id="echarts1" style="width:100%;height:300px;margin-top:50px;">

        </div>
      </el-col>
      <el-col :span="10" style="border-radius:5px;">
        <div id="echarts2" style="width:100%;height:300px;margin-top:50px;">

        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-bottom: 15px;color:#fff;">
      <el-col :span="10" style="margin-right:50px;border-radius:5px;">
        <div id="echarts3" style="width:100%;height:300px;margin-top:50px;">

        </div>
      </el-col>
      <el-col :span="10" style="border-radius:5px;">
        <div id="echarts4" style="width:100%;height:300px;margin-top:50px;">

        </div>
      </el-col>
    </el-row>
  </section>
</div>
</template>

<script>
import echarts from "echarts";
import headTop from "../components/headTop";
import Api from "../api/api.js";

export default {
  data() {
    return {
      data: {
        androidDAU: 0,
        iosDAU: 0,
        androidNewUser: 0,
        iosNewUser: 0,
        androidDAIP: 0,
        iosDAIP: 0,
        LHT_100: 0,
        LHT_500: 0,
        LHT_1000: 0,
        LHT_1001: 0
      }
    };
  },
  components: {
    headTop
  },
  mounted() {
    this.$nextTick(() => {
      let _this = this;
      Api.getStatRequest().then(function(res) {
        if (res.status == 200 && res.data.code == 0) {
          Object.assign(_this.data, res.data.data);
        }
      }).catch(function(err) {
        console.log(err);
      });
      Api.getDAURequest().then(function(res) {
        if (res.status == 200 && res.data.code == 0) {
          console.log(res.data.data);
          _this.echartsInit(res.data.data);
        }
      }).catch(function(err) {
        console.log(err);
      });
    });
  },
  methods: {
    echartsInit(data) {
      const myChart1 = echarts.init(document.getElementById('echarts1'));
      const myChart2 = echarts.init(document.getElementById('echarts2'));
      const myChart3 = echarts.init(document.getElementById('echarts3'));
      const myChart4 = echarts.init(document.getElementById('echarts4'));
      let option1 = {
        title: {
          text: '日活人数统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['安卓日活', 'IOS日活']
        },
        grid: {
          left: '3%',
          right: '9%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.dayList,
          // axisLabel: {
          //   interval: 0
          // }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
            name: '安卓日活',
            type: 'line',
            data: data.DAU.androidDAU
          },
          {
            name: 'IOS日活',
            type: 'line',
            data: data.DAU.iosDAU
          }
        ]
      };
      let option2 = {
        title: {
          text: '超时统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['LHT100', 'LHT500', 'LHT1000', 'LHT1000+']
        },
        grid: {
          left: '3%',
          right: '9%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.dayList
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: 'LHT100',
          type: 'line',
          data: data.LHT.LHT_100
        }, {
          name: 'LHT500',
          type: 'line',
          data: data.LHT.LHT_500
        }, {
          name: 'LHT1000',
          type: 'line',
          data: data.LHT.LHT_1000
        }, {
          name: 'LHT1000+',
          type: 'line',
          data: data.LHT.LHT_over1000
        }]
      };
      let option4 = {
        title: {
          text: '日活IP统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['安卓日活IP', 'IOS日活IP']
        },
        grid: {
          left: '3%',
          right: '9%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.dayList
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '安卓日活IP',
          type: 'line',
          data: data.DIP.androidDAIP
        }, {
          name: 'IOS日活IP',
          type: 'line',
          data: data.DIP.iosDAIP
        }]
      };
      let option3 = {
        title: {
          text: '新增用户统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['安卓新增', 'IOS新增']
        },
        grid: {
          left: '3%',
          right: '9%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.dayList
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '安卓新增',
          type: 'line',
          data: data.NewUser.androidNewUser
        }, {
          name: 'IOS新增',
          type: 'line',
          data: data.NewUser.iosNewUser
        }]
      };
      myChart1.setOption(option1);
      myChart2.setOption(option2);
      myChart3.setOption(option3);
      myChart4.setOption(option4);
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
