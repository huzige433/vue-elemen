<template>
    <div v-loading="loading" element-loading-text="注册中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)" class="regist-container">
   
      <el-form ref="registForm" :model="registForm" :rules="registRules" class="regist-form" auto-complete="on" label-position="left">
        <!-- 头像区域 -->
        <div v-if="TxStatus" class="avatar-box">
          <img src="../assets/logo.png" alt="">
        </div>
   
        <div class="title-container">
          <h3 class="title">账号注册</h3>
        </div>
   
        <el-form-item prop="username">
          <span class="svg-container">
            <i class="el-icon-user"></i>
          </span>
          <el-input ref="username" v-model="registForm.username" placeholder="输入账号" name="username" type="text" tabindex="1" auto-complete="on" />
        </el-form-item>
   
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="el-icon-user-solid"></i>
          </span>
          <el-input :key="passwordType" ref="password" v-model="registForm.password" :type="passwordType" placeholder="输入密码" name="password" tabindex="2" auto-complete="on" />
          <span class="show-pwd" @click="showPwd">
            <i :class="passwordType === 'password' ? 'el-icon-circle-check' : 'el-icon-circle-close'" ></i>
          </span>
        </el-form-item>
        
        <el-form-item prop="checkpassword">
          <span class="svg-container">
            <i class="el-icon-user-solid"></i>
          </span>
          <el-input :key="passwordType" ref="checkpassword" v-model="registForm.checkpassword" :type="passwordType" placeholder="再次输入密码" name="checkpassword" tabindex="3" auto-complete="on" @keyup.enter.native="handleregist" />
          <span class="show-pwd" @click="showPwd">
            <i :class="passwordType === 'password' ? 'el-icon-circle-check' : 'el-icon-circle-close'" ></i>
          </span>
        </el-form-item>

        <div>
          <el-button type="primary" style="width:100%;margin-bottom:20px;" @click.native.prevent="handleregist">注册</el-button>
        </div>
        <div class="tips">
          <span style="margin-right:20px;">已经有账号请去 <span style="color:#409EFF;cursor:pointer" @click="login">登录</span></span>
        </div>
   
      </el-form>
    </div>
  </template>
   
  <script>
  export default {
    name: 'Register',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!value.trim()) {
          callback(new Error('用户名不能为空！'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码最少为6位字符！'))
        } else {
          callback()
        }
      }
      const validatePassword2 = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码最少为6位字符！'))
        }else if(value!=this.registForm.password){
          callback(new Error("两次密码不一致"))
        }
        else {
          callback()
        }
      }

      return {
        // 头像状态
        TxStatus: true,
        registForm: {
          username: '',
          password: '',
          checkpassword:''
        },
        // 登录规则
        registRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }],
          checkpassword: [{ required: true, trigger: 'blur', validator: validatePassword2 }]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      // 注册业务
      handleregist() {
      var that=this
      this.$refs.registForm.validate((valid) => {
        if (valid) {
          this.loading = true
          setTimeout(()=> {
          //async  await  是解决异步的一种方案，必须要加，但是原生封装就不用
          var options = {
            method: 'POST',
            url: 'http://127.0.0.1:8080/v1/register',
            data: this.registForm
          };
          this.$http(options).then((response) => {
            that.loading = false
            if (response.data.flag) {
              alert("注册成功，马上跳转")
              that.$router.push({ name: "Login" })
            } else {
              console.log("注册失败")
              alert("注册失败")
            }
          }).catch(error => {
            alert("注册失败")
          })
        }, 1000);

        }

      })
    },
      // 注册跳转登录
      login() {
        this.$router.push({ name: 'Login' })
      }
    },
    mounted () {
      console.log(this.$store.state.user.name)
    }
  }
  </script>
   
  <style lang="scss">
  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;
  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .regist-container .el-input input {
      color: $cursor;
    }
  }
  .regist-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
   
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
   
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
   
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
  body{
    margin: 0;
  }
  </style>
   
  <style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
   
  .regist-container {
    min-height: 100%;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: url(~@/assets/bg0.jpeg);
    background-size: 100% 100%;
     // 头像
    .avatar-box {
      margin: 0 auto;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 1px solid #409eff;
      box-shadow: 0 0 10px #409eff;
      position: relative;
      bottom: 20px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
   
    .regist-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
   
    }
   
    .tips {
      font-size: 18px;
      text-align: center;
      color: #000;
      margin-bottom: 10px;
    }
   
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
   
    .title-container {
      position: relative;
   
      .title {
        font-size: 30px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: 500;
      }
    }
   
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
  </style>