<template>
  <el-dialog :title="isCom? '新增用户': '编辑用户'" center width="600px" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
        <el-select v-model="form.role" @change="form.role_id=form.role" placeholder="请选择角色">
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="ztai" @change="form.status=ztai" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { userAdd, userEdit } from "@/api/user.js";
export default {
  data() {
    return {
      ztai:'',
      isCom: true,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "80px",
      rules: {
        username: [
          { required: true, message: "请输入用户编号", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18)[0-9]{9}/,
            message: "手机号不正确",
            trigger: "blur"
          }
        ],
        role: [{ required: true, message: "请输入角色", trigger: "blur" }]
      }
    };
  },
  methods: {
    sure() {
      this.$refs.form.validate(v => {
        if (v) {
          //   新增
          if (this.isCom) {
            userAdd(this.form).then(res => {
              // window.console.log(res);
              if (res.data.code == 200) {
                this.$message.success("新增成功!!");
                this.$parent.Page = 1;
                this.$parent.List();
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            userEdit(this.form).then(res => {
              // window.console.log(res);
              if (res.data.code == 200) {
                this.$message.success("编辑成功!!");
                this.$parent.List();
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style>
</style>