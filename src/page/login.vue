<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer">
		  		<div class="manage_tip">
		  			<p>W100管理系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"></el-input>
					</el-form-item>
          <div style="display:flex;">
            <span style="flex:1;color:#666;cursor:pointer;" @click="getPwd">获取密码</span>
            <span style="flex:1;color:red;">{{pwdtext}}</span>
          </div>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm(loginForm)" class="submit_btn">登陆</el-button>
				  	</el-form-item>
				</el-form>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
import otplib from 'otplib';
import localstore from "../utils/localstore.js";

export default {
  data() {
    return {
      pwdtext: '',
      secret: '',
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getPwd() {
      const secret = otplib.authenticator.generateSecret();
      const token = otplib.authenticator.generate(secret);
      this.pwdtext = token;
      this.secret = secret;
    },
    submitForm(val) {
      const isValid = otplib.authenticator.check(val.password, this.secret);
      if(isValid) {
        this.$message({
          message: '登陆成功',
          type: 'success'
        });
        localstore.setValue("name", val.username);
        this.$router.push('index');
      } else {
        this.$message.error('登陆失败');
      }
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
  .wh(320px, 240px);
  .ctp(320px, 240px);
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
