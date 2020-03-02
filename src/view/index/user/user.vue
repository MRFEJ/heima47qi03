<template>
  <div>
    <!-- 上一个卡片 -->
    <el-card class="box-card1">
      <el-form ref="form" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称" prop="username">
          <el-input class="long" v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="用户邮箱" prop="email">
          <el-input class="short" v-model="formInline.email"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="role_id">
          <el-select class="long" v-model="formInline.role_id" placeholder="请选择状态">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="del">清除</el-button>
          <el-button @click="add" class="el-icon-plus" type="primary">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下一个卡片 -->
    <el-card class="box-card">
      <el-table :data="tableData">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status">启用</span>
            <span style="color:red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" @click="chang(scope.row.id)">{{scope.row.status? '禁用':'启用'}}</el-button>
            <el-button type="text" @click="remov(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="fy"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="Page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <userCom ref="userCom"></userCom>
  </div>
</template>

<script>
import userCom from "./components/userCom";
import { userList, userRemove, userStatus } from "@/api/user.js";
export default {
  components: {
    userCom
  },
  data() {
    return {
      formInline: {},
      tableData: [],
      Page: 1,
      size: 5,
      total: 0,
      oldItem: ""
    };
  },
  created() {
    this.List();
  },
  methods: {
    List() {
      userList({
        page: this.Page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        // window.console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.Page = 1;
      this.List();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.Page = val;
      this.List();
    },

    // 点击搜索
    search() {
      this.Page = 1;
      this.List();
    },
    // 点击清空筛选
    del() {
      this.$refs.form.resetFields();
      this.Page = 1;
      this.List();
    },
    // 点击删除
    remov(id) {
      userRemove({ id }).then(() => {
        if (this.tableData.length == 1) {
          this.page--;
        }
        if (this.page == 0) {
          this.page = 1;
        }
        this.List();
      });
    },
    // 点击改变状态
    chang(id) {
      userStatus({ id }).then(() => {
        this.List();
      });
    },
    // 点击新增
    add() {
      this.$refs.userCom.dialogFormVisible = true;
      this.$refs.userCom.isCom = true;
      this.$refs.userCom.form = {};
    },
    // 点击编辑
    edit(item) {
      this.$refs.userCom.dialogFormVisible = true;
      this.$refs.userCom.isCom = false;
      if (this.oldItem != item) {
        if (item.status) {
          this.$refs.userCom.ztai = "启用";
        } else {
          this.$refs.userCom.ztai = "禁用";
        }
        this.$refs.userCom.form = { ...item };
        this.oldItem = item;
      }
    }
  }
};
</script>

<style lang="less">
.box-card1 {
  .short {
    width: 100px;
  }
  .long {
    width: 149px;
  }
}
.box-card {
  margin-top: 19px;
}
.fy {
  width: 543px;
  margin: 0 auto;
  margin-top: 3px;
}
</style>