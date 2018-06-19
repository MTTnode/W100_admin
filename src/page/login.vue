<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer">
		  		<div class="manage_tip">
		  			<p>W100管理系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="name">
						<el-input v-model="loginForm.name" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password" @keyup="login($event)"></el-input>
					</el-form-item>
					<el-form-item>
            <el-button type="primary" @click="submitForm()" class="submit_btn">登陆</el-button>
          </el-form-item>
				</el-form>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
import localstore from "../utils/localstore.js";
import Api from "../api/api.js";

export default {
  data() {
    return {
      loginForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login(e) {
      console.log(e);
      console.log("login");
    },
    submitForm() {
      let _this = this;
      Api.usrLoginRequest(_this.loginForm).then(function(res) {
        if (res.status == 200 && res.data.code == 0) {
          _this.$store.commit("CHANGEUSER", res.data.data);
          localstore.setValue("usr", res.data.data);
          _this.$message({
            type: "success",
            message: "登陆成功!"
          });
          _this.loginForm = {
            name: "",
            role: null
          };
          _this.$router.push("index");
        } else {
          _this.$message.error("登陆失败");
        }
      }).catch(function(err) {
        console.log(err);
        _this.$message.error("登陆失败");
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
.login_page {
  background-color: #324057;
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  p {
    font-size: 34px;
    color: #fff;
  }
}
.form_contianer {
  .wh(320px, 180px);
  .ctp(320px, 180px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}
.tip {
  font-size: 12px;
  color: red;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
