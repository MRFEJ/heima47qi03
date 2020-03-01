<template>
  <div>
    <!-- 上一个卡片 -->
    <el-card class="box-card1">
      <el-form ref="form" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="short" v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="long" v-model="formInline.name"></el-input>
        </el-form-item>

        <el-form-item label="创建者" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select class="long" v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="del">清除</el-button>
          <el-button @click="add" class="el-icon-plus" type="primary">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下一个卡片 -->
    <el-card class="box-card">
      <el-table :data="tableData">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="remark" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">{{scope.row.create_time |filterData}}</template>
        </el-table-column>
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
    <SubjectCom ref="SubjectCom"></SubjectCom>
  </div>
</template>

<script>
import SubjectCom from "./components/SubjectCom";
import { SubjectList, SubjectRemove, SubjectStatus } from "@/api/Subject.js";
export default {
  components: {
    SubjectCom
  },
  data() {
    return {
      formInline: {
        rid: "",
        name: "",
        username: "",
        status: ""
      },
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
      SubjectList({
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
      SubjectRemove({ id }).then(() => {
        this.List();
      });
    },
    // 点击改变状态
    chang(id) {
      SubjectStatus({ id }).then(() => {
        this.List();
      });
    },
    // 点击新增
    add() {
      this.$refs.SubjectCom.dialogFormVisible = true;
      this.$refs.SubjectCom.isCom = true;
      this.$refs.SubjectCom.form = {};
    },
    // 点击编辑
    edit(item) {
      this.$refs.SubjectCom.dialogFormVisible = true;
      this.$refs.SubjectCom.isCom = false;
      if (this.oldItem != item) this.$refs.SubjectCom.form = { ...item };
      this.oldItem = item;
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