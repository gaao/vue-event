<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <span>基本资料</span>
        <el-button v-if="isEdit" style="float: right; padding: 3px 0" type="text" icon="el-icon-edit" @click="editInfo">
          编辑</el-button>
        <el-button v-else style="float: right; padding: 3px 0" type="text" icon="el-icon-refresh-left"
          @click="cancelEditInfo">
          取消</el-button>
      </div>
      <div>
        <el-form :model="userInfo" :rules="userInforules" ref="userInfoRef" label-width="100px">
          <el-form-item label="登录名称" prop="username">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfo.nickname" :disabled="isEdit" clearable></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email" :disabled="isEdit" clearable></el-input>
          </el-form-item>
          <el-form-item v-show="!isEdit">
            <!-- <el-button @click="resetAsNull">重置</el-button> -->
            <el-button type="primary" @click="changeSubFn">提交修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import { putUserInfoAPI } from '@/api'
export default {
  data() {
    return {
      userInfo: {
        id: this.$store.state.userInfo.id,
        username: this.$store.state.userInfo.username,
        nickname: this.$store.state.userInfo.nickname,
        email: this.$store.state.userInfo.email
      },
      userInforules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '1-10 位非空格字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          // { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '必须符合邮箱格式', trigger: 'blur' }
          { type: 'email', message: '必须符合邮箱格式', trigger: 'blur' }
        ]
      },
      isEdit: true
    }
  },
  // computed: {
  //   ...mapGetters(['id'])
  // },
  methods: {
    changeSubFn() {
      this.$refs.userInfoRef.validate(async (val) => {
        console.log('val', val)
        console.log('userInfo', this.userInfo)
        if (val) {
          // this.userInfo.id = this.$store.state.userInfo.id   //放 data 里去赋值了
          const { data: res } = await putUserInfoAPI(this.userInfo)
          console.log('res', res)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          // 重新让 vuex 获取下最新的用户数据
          this.$store.dispatch('getUserInfoAction')
        }
      })
      console.log(1212)
    },
    editInfo() {
      this.isEdit = !this.isEdit
    },
    cancelEditInfo() {
      this.userInfo = this.$store.state.userInfo
      this.isEdit = !this.isEdit
    }
    // resetAsNull() {
    //   // this.userInfo.nickname = ''
    //   // this.userInfo.email = ''
    //   // 表单重置，恢复到原来的值，和绑定的值赋空值效果不一样
    //   this.$refs.userInfoRef.resetFields()
    // }
  }
}
</script>
<style lang="less" scoped>
.container {
  // min-height: calc(100vh -120px) !important;
  // min-height: 70vh;
}
</style>
