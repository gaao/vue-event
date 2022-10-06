<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <span>重置密码</span>
      </div>
      <div>
        <el-form :model="pwdInfo" ref="pwdInfoRef" :rules="pwdInfoRules" label-width="100px">
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="pwdInfo.old_pwd" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="pwdInfo.new_pwd" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="re_pwd">
            <el-input v-model="pwdInfo.re_pwd" placeholder="请确认新密码" @keyup.enter.native="updatePwdFn"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="updatePwdFn">修改密码</el-button>
            <el-button type="" @click="resetFormFn">重置 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import { updateUserPwdAPI } from '@/api'
export default {
  data() {
    return {
      pwdInfo: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      pwdInfoRules: {
        old_pwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '6-15 位非空格字符', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '6-15 位非空格字符', trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '6-15 位非空格字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async updatePwdFn() {
      console.log('111')
      console.log('this.pwdInfo', this.pwdInfo)
      this.$refs.pwdInfoRef.validate(async val => {
        console.log('val', val)
        if (val) {
          const { data: res } = await updateUserPwdAPI(this.pwdInfo)
          console.log('res', res)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
        }
      })
    },
    resetFormFn() {
      this.$refs.pwdInfoRef.resetFields()
    }
  }
}
</script>
<style>

</style>
