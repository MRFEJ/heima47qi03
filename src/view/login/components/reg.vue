<template>
  <el-dialog title="用户注册" center :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules">
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

      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <img src="../img/login_logo.png" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-button>获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "65px",
      form: {
        name: "",
        email: "",
        phone: "",
        password: ""
      },
      rules: {}
    };
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
</style>