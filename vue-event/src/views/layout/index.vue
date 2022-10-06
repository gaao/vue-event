<template>
  <el-container>
    <el-header>
      <img class="logo" src="https://raw.githubusercontent.com/gaao/image/main/common/logo_white.png" />
      <el-menu class="top-right" default-active="" background-color="#24292f" text-color="#fff">
        <el-menu-item index="1" class="avatorimg">
          <img :src="user_pic" alt="" v-if="user_pic" />
          <img src="https://raw.githubusercontent.com/gaao/image/main/common/Avatars_gxg.png" alt="" v-else />
          <span>欢迎 {{nickname || username}}</span>
        </el-menu-item>
        <el-submenu index="2" class="top-right-userinfo">
          <template slot="title">个人中心</template>
          <el-menu-item index="2-1">zhessha</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" class="top-right-logout" @click="logout">
          退出
          <i class="el-icon-switch-button"></i>
        </el-menu-item>
      </el-menu>
    </el-header>
    <!-- 下部区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#24292f" text-color="#fff" router unique-opened>
          <template v-for="item in menuList">
            <el-menu-item v-if="!item.children" :index="item.indexPath" :key="item.indexPath">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
            </el-menu-item>
            <el-submenu v-else :index="item.indexPath" :key="item.title">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item v-for="(subitem,index) in item.children" :key="index" :index="subitem.indexPath">
                <!-- <i :class="subitem.icon"></i> -->
                <span>{{subitem.title}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <!-- 内容区 -->
      <el-container>
        <el-main>
          <!-- 二级挂载组件 -->
          <router-view></router-view>
        </el-main>
        <el-footer>-- GxG --</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { getMenusAPI } from '@/api'
export default {
  name: 'my-layout',
  data() {
    return {
      // userInfo: {
      //   id: 0,
      //   nickname: '',
      //   username: '',
      //   email: '',
      //   user_pic: ''
      // },
      menuList: [],
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
  },
  computed: {
    ...mapGetters(['username', 'nickname', 'user_pic'])
  },
  methods: {
    logout() {
      // this.$confirm('确认退出？')
      this.$confirm('此操作将退出登录，是否继续？', '确认退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(_ => {
          // done()
          this.$store.commit('updateToken', '')
          this.$store.commit('updateUserInfo', {})
          this.$router.push('/login')
          this.$message({ type: 'success', message: '退出成功' })
        })
        .catch(_ => {
          this.$message({ type: 'info', message: '已取消' })
        })
    },
    async getMenuList() {
      const res = await getMenusAPI()
      // console.log('res', res)
      if (res.data.code !== 0) return this.$message.error(res.message)
      this.menuList = res.data.data
      console.log('this.menuList ', this.menuList)
    },
    // menuActive(path) {
    //   window.sessionStorage.setItem('activePath', path)
    //   this.activePath = path
    // },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less" scoped>
.el-container {
  // background-color: #999;
  height: 100%;

  .el-header {
    background-color: #24292f;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;

    .logo {
      width: 51px;
      height: 36px;
      margin-top: 12px;
    }

    .top-right {
      display: block;
      float: right;

      .top-right-userinfo {
        display: block;
        float: left;
      }

      .top-right-logout {
        display: block;
        float: left;
      }

      .avatorimg {
        display: block;
        float: left;

        img {
          width: 32px;
          height: 32px;
        }

        span {
          margin-left: 4px;
        }
      }
    }
  }

  /deep/.el-aside {
    height: calc(100vh - 60px);
    background-color: #24292f
  }

  .el-menu {
    border-right: none;
  }

  // /deep/.el-main {
  //   min-height: calc(100vh -120px);
  // }

  .el-footer {
    opacity: 0.15;
    // background-color: red;
    line-height: 24px !important;
    height: 28px !important;
    text-align: center;
    font-size: 14px;
    letter-spacing: 0.1;
  }
}
</style>
