<template>
  <el-container>
    <el-header class="my_header">
      <div class="left">
        <i
          @click="isCollapse=!isCollapse"
          class="icon"
          :class="isCollapse? 'el-icon-s-unfold':'el-icon-s-fold'"
        ></i>
        <img class="index_logo" src="./img/index_logo.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="avatar" :src="$store.state.userAvatar" alt />
        <span class="name">{{$store.state.username}},您好</span>
        <el-button type="primary" size="mini" @click="goOut">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="my_aside" width="auto">
        <el-menu router default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
          <template v-for="(item, index) in rout">
            <el-menu-item :index="'/index/'+item.path" :key="index" v-if="item.meta.role.includes($store.state.Role)">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main class="my_main">
        <!-- 子路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import rout from "@/router/route.js";
// 导入index请求的文件
import { logout } from "@/api/index.js";
// 导入token工具
import { removeToken } from "@/utils/token.js";
export default {
  //   beforeCreate() {
  //     if (!getToken()) {
  //       this.$message.error("请先登录!!!");
  //       this.$router.push("/login");
  //     }
  //   },
  data() {
    return {
      rout,
      // 是否收取侧边导航栏
      isCollapse: false,
    };
  },
  methods: {
    goOut() {
      this.$confirm("此操作将退出本系统, 是否继续退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(res => {
            window.console.log(res);

            if (res.data.code == 200) {
              this.$message.success("退出成功!!");
              removeToken();
              this.$router.push("/login");
            } else {
              this.$message.error("退出失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "谢谢您还留下来!!"
          });
        });
    }
  }
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
    overflow: hidden;
  }
}
// 侧边导航栏样式
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>