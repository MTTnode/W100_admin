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
				<el-col :span="10" style="background:#ffc107!important;border-radius:5px;">
					<div style="height:100px;line-height:100px;text-align:center;font-size:30px;">Timeout总数</div>
					<div style="height:30px;line-height:30px;"><span style="margin-right:5px;">{{data.LHT}}</span>LHT</div>
				</el-col>
			</el-row>
		</section>
    </div>
</template>

<script>
import headTop from "../components/headTop";
import Api from "../api/api.js";

export default {
  data() {
    return {
      data: {
        androidDAU: 0,
        iosDAU: 0,
        LHT: 0
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
        if(res.status == 200 && res.data.code == 0){
          Object.assign(_this.data, res.data.data);
        }
      }).catch(function(err) {
        console.log(err);
      });
    });
  },
  methods: {}
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
