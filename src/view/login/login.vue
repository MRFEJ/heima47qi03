<template>
  <div class="box">
    <div class="login_left">
      <div class="logo_title">
        <img class="logo" src="./img/login_logo.png" alt />
        <span class="login_tx">黑马面面</span>
        <span class="login_s"></span>
        <span class="login_tx">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form :model="form" :rules="rules" ref="form" class="demo-form">
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user" clearable v-model="form.phone" placehodel="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            show-password
            clearable
            v-model="form.password"
            placehodel="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input prefix-icon="el-icon-key" clearable v-model="form.code" placehodel="请输入验证码"></el-input>
            </el-col>
            <el-col :span="7">
              <img @click="img_code" class="img_code" :src="code_img" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="checked">
          <el-checkbox v-model="form.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-row>
            <el-col>
              <el-button type="primary" @click="submitForm">立即登录</el-button>
              <el-button @click="reg">注册</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <!-- 注册组件 -->
    <reg ref="reg"></reg>

    <img src="./img/login_banner_ele.png" alt />
  </div>
</template>

<script>
// 导入抽离的api文件
import { login } from "@/api/login.js";
import reg from "./components/reg";
// 导入抽离的token工具
import { setToken } from "@/utils/token.js";
export default {
  components: {
    reg
  },
  data() {
    return {
      // 图形码
      code_img: process.env.VUE_APP_URL + "/captcha?type=login",
      form: {
        phone: "18511111111",
        password: "12345678",
        code: "",
        checked: true
      },
      rules: {
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^0?(13|14|15|18)[0-9]{9}$/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { max: 12, min: 6, message: "请输入密码6-12位", trigger: "change" }
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { len: 4, message: "验证码只能是4位", trigger: "blur" }
        ],
        checked: [
          {
            pattern: /true/,
            message: "请勾选我已阅读并同意用户协议和隐私条款",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 点击图形码
    img_code() {
      this.code_img =
        process.env.VUE_APP_URL + "/captcha?type=login&d=" + Date.now();
    },
    // 点击登录
    submitForm() {
      this.$refs.form.validate(v => {
        if (v) {
          login({
            phone: this.form.phone,
            password: this.form.password,
            code: this.form.code
          }).then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              setToken(res.data.data.token)
              this.$router.push("/index");
            }else{
              this.$message.error(res.data.message);
              this.img_code();
            }
          });
        }
      });
    },
    // 点击注册
    reg() {
      this.$refs.reg.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="less">
.box {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  align-items: center;
  .login_left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 43px;
    .logo_title {
      display: flex;
      align-items: center;
      margin-bottom: 29px;
      .logo {
        margin-right: 16px;
        width: 22px;
        height: 17px;
      }
      .login_tx {
        font-size: 24px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
      .login_s {
        margin-right: 12px;
        margin-left: 14px;
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
      }
    }
    .img_code {
      height: 44px;
      width: 100%;
    }
    .el-button {
      width: 100%;
      &:nth-child(2) {
        margin-left: 0;
        margin-top: 26px;
      }
    }
    .el-checkbox {
      display: flex;
      .el-checkbox__label {
        display: flex;
        align-items: center;
        margin-top: -3px;
      }
    }
  }
}
html,
body {
  height: 100%;
}
</style>