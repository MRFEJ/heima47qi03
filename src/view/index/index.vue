<template>
  <el-container>
    <el-header class="my_header">
      <div class="left">
        <i @click="isCollapse=!isCollapse" class="icon" :class="isCollapse? 'el-icon-s-unfold':'el-icon-s-fold'"></i>
        <img class="index_logo" src="./img/index_logo.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="avatar" :src="avatar" alt />
        <span class="name">{{username}},您好</span>
        <el-button type="primary" size="mini">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="my_aside" width="auto">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <el-menu-item index="1">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>

          <el-menu-item index="1">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>

          <el-menu-item index="1">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>

          <el-menu-item index="1">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>

          <el-menu-item index="1">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my_main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入index请求的文件
import {info} from "@/api/index.js"
export default {
    data() {
        return {
            // 是否收取侧边导航栏
            isCollapse:false,
            // 头像
            avatar:'',
            // 用户名
            username:''
        }
    },
    created() {
        info().then(res=>{
            // window.console.log(res);
            // 注意这里服务器返回的是没有基地址的路径 所以添加上基地址 和/
            this.avatar=process.env.VUE_APP_URL+"/"+res.data.data.avatar;
            this.username=res.data.data.username;
        })
    },
};
</script>

<style lang="less">
html,
body {
  height: 100%;
}
.el-container {
  height: 100%;
  .my_header {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .icon {
        margin-right: 22px;
        font-size: 24px;
        color: #000;
      }
      .index_logo {
        margin-right: 11px;
        width: 33px;
        height: 28px;
      }
      .title {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
        margin-right: 9px;
      }
      .name {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(99, 99, 99, 1);
        margin-right: 38px;
        color: #000;
      }
    }
  }
  .my_aside {
    background-color: #fff;
  }
  .my_main {
    background-color: yellowgreen;
  }
}
// 侧边导航栏样式
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>