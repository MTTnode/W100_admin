<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
          <el-menu-item index="/index"><i class="el-icon-news"></i>数据统计</el-menu-item>
					<el-menu-item index="/banner"><i class="el-icon-menu"></i>banner配置</el-menu-item>
          <el-menu-item index="/transaction"><i class="el-icon-tickets"></i>交易对配置</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>

<style lang="less" scoped>
  @import '../style/mixin';
  .el-menu{
    background-color: #324157;
    .el-menu-item{
      color: #bfcbd9;
    }
  }
	.el-submenu .el-menu-item{
		min-width: 0;
	}
</style>
