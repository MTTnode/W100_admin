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
      <el-dialog title="初始化密码" :visible.sync="dialogFormVisible"
      width="30%" style="margin-top:13vh;">
        <el-form :model="form" style="padding:10px 0;">
          <el-form-item label="密码" label-width="120px">
            <el-input v-model="form.pwd1" type="password" placeholder="输入密码" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" label-width="120px">
            <el-input v-model="form.pwd2" type="password" placeholder="确认密码" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="resetPwd">确 定</el-button>
        </div>
      </el-dialog>
  	</div>
</template>

<script>
import localstore from "../utils/localstore.js";
import util from "../utils/utils.js";
import Api from "../api/api.js";

export default {
  data() {
    return {
      dialogFormVisible: false,
      loginForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      form: {
          pwd1: '',
          pwd2: '',
        },
    };
  },
  mounted(){
    this.$nextTick(()=>{
      localstore.removeStore("usr");
      localstore.removeStore("name");
      // console.log(this.emailformat('customer_service@bada-soft.com'));
    })
  },
  methods: {
    // emailformat(val) {
    //   let regEmail = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@(bada-soft.com|mingtaotek.com)+$/;
    //   return regEmail.test(val);
    // },
    submitForm() {
      let _this = this;
      if(!_this.loginForm.name || !_this.loginForm.password){
        _this.$message.error("请输入用户信息！");
        return;
      }
      if(!util.regEmail.test(_this.loginForm.name)){
        _this.$message.error("用户信息不合法！");
        return;
      }
      let param = Object.assign({}, _this.loginForm);
      Api.usrLoginRequest(param).then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 0) {
              localstore.setValue("usr", res.data.data.role);
              localstore.setValue("name", res.data.data.name);
              _this.$message({
                type: "success",
                message: "登陆成功!"
              });
              _this.loginForm = {
                name: "",
                role: null
              };
              _this.$router.push("index");
            }
            if (res.data.code == -2) {
              _this.dialogFormVisible = true;
            }
          } else {
            _this.$message.error("登陆失败");
          }
        }).catch(function(err) {
          console.log(err);
          _this.$message.error("登陆失败");
        });
    },
    resetPwd() {
      let _this = this;
      if(!_this.form.pwd1 || !_this.form.pwd2){
        _this.$message.error("请输入密码信息！");
        return;
      }
      if(_this.form.pwd1 != _this.form.pwd2){
        _this.$message.error("两次密码信息不一致！");
        return;
      }
      if(_this.form.pwd1.length < 6 || _this.form.pwd1.length > 16){
        _this.$message.error("密码长度6-16位！");
        return;
      }
      Api.resetUserRequest({
        name: _this.loginForm.name,
        password: _this.form.pwd1,
        type: "setpwd"
      }).then(function(res) {
        if (res.status == 200 && res.data.code == 0) {
          _this.dialogFormVisible = false;
          _this.$message({
            type: "success",
            message: "重置成功!"
          });
          _this.loginForm.password = '';
        }
      }).catch(function(err) {
        console.log(err);
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
