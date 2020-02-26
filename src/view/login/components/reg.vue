<template>
  <el-dialog title="用户注册" width="600px" center :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <el-upload
          name="image"
          class="avatar-uploader"
          :action="upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          v-model="form.avatar"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图形码" :label-width="formLabelWidth" prop="code">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <img @click="img_code" class="img_code" :src="go_code" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-button @click="btn_time" :disabled="time!=0">{{time==0? "获取用户验证码":"还有"+time+"秒"}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      upload: process.env.VUE_APP_URL + "/uploads",
      // 图片路径
      imageUrl: "",
      dialogFormVisible: false,
      formLabelWidth: "65px",
      //   图片验证码
      go_code: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      //   短信倒计时
      time: 0,
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        rcode: "",
        // 头像的值
        avatar: ""
      },
      rules: {
        avatar: [
          { required: true, message: "头像不能留空", trigger: "change" }
        ],
        name: [{ required: true, message: "昵称不能留空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱不能留空", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "手机号不能留空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18)[0-9]{9}/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能留空", trigger: "blur" },
          { max: 12, min: 6, message: "密码格式不正确", trigger: "change" }
        ],
        code: [
          { required: true, message: "图像码不能留空", trigger: "blur" },
          { len: 4, message: "图像码只能是4位", trigger: "blur" }
        ],
        rcode: [
          { required: true, message: "验证码不能留空", trigger: "blur" },
          { len: 4, message: "验证码只能是4位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 头像上传成功后执行的函数
    handleAvatarSuccess(res, file) {
      window.console.log(res, file);

      this.imageUrl = URL.createObjectURL(file.raw);

      // 把服务器上的图片路径赋值给头像的值
      this.form.avatar = res.data.file_path;
      this.$refs.form.validateField("avatar");
    },
    // 上传头像执行的函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //   点击确定
    sure() {
      this.$refs.form.validate(v => {
        if (v) {
          alert("注册成功");
        }
      });
    },
    // 点击图片码
    img_code() {
      this.go_code =
        process.env.VUE_APP_URL + "/captcha?type=sendsms" + "&l=" + new Date();
    },
    // 点击获取短信验证码
    btn_time() {
      this.time = 60;
      let set = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          clearInterval(set);
        }
      }, 1000);

      this.$axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "post",
        data: {
          code: this.form.code,
          phone: this.form.phone
        },
        withCredentials: true
      }).then(res => {
        //成功回调
        console.log(res);
        if (res.data.code == 200) {
          alert("验证码为:" + res.data.data.captcha);
        } else {
          alert(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #01c5fb, #1394fc);
  span {
    color: #fff;
  }
}
.img_code {
  width: 100%;
}
// 头像样式
.avatar-uploader {
  text-align: center;
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>