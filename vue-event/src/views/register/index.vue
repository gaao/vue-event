<template>
  <div class="my-register">
    <el-card class="reg-card">
      <div class="title">后台管理系统</div>
      <el-form :model="regFrom" ref="regRef" :rules="regRules">
        <el-form-item prop="username" :inline-message="true">
          <el-input type="" placeholder="请输入用户名" v-model="regFrom.username" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password" :inline-message="true">
          <el-input type="password" placeholder="请输入密码" v-model="regFrom.password" show-password clearable
            :change="regFrom.password?(repasswordIsshow = true):repasswordIsshow"></el-input>
        </el-form-item>
        <el-form-item prop="repassword" :inline-message="true" v-show="repasswordIsshow">
          <el-input type="password" placeholder="请再次输入密码" v-model="regFrom.repassword" show-password clearable
            @keyup.enter.native="subReg">
          </el-input>
        </el-form-item>
        <el-form-item class="sub">
          <el-button type="primary" @click="subReg">注册</el-button>
          <el-button type="text" @click="gotoLogin">去登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { registerAPI } from '@/api'
export default {
  name: 'my-register',
  data() {
    const repeatPassword = (relue, value, callback) => {
      if (value !== this.regFrom.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      regFrom: {
        username: '',
        password: '',
        repassword: ''
      },
      repasswordIsshow: false,
      regRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]{1,10}$/, message: '1-10 位大小写字母和数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '6-15 位非空格字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '6-15 位非空格字符', trigger: 'blur' },
          { validator: repeatPassword, trigger: 'blur' }
        ]
      }
    }
  },
  // created()[

  //   subReg()

  // ],
  methods: {
    // 提交
    subReg() {
      this.$refs.regRef.validate(async valid => {
        if (valid) {
          console.log('sub', this.regFrom)
          // registerAPI(this.regFrom)
          const { data: res } = await registerAPI(this.regFrom)
          console.log('res', res)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.$router.push('/login')
        } else {
          return false
        }
      })
    },
    gotoLogin() {
      this.$refs.regRef.resetFields()
      this.$router.push('/login')
      console.log(222)
    }
  }
}
</script>
<style lang="less" scoped>
.my-register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #eeeff1;

  .reg-card {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // height: 350px;
    width: 320px;
    border-radius: 8px;
  }

  .title {
    font-size: 22px;
    font-weight: bolder;
    text-align: center;
    margin-bottom: 24px;
    letter-spacing: 0.1em;
  }
}

.el-form-item {
  margin-bottom: 12px;
}

.el-form-item:last-child {
  margin-bottom: 0;
}

.sub /deep/.el-form-item__content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/deep/.el-form-item__content {
  line-height: 0;
}

.el-button+.el-button,
.el-checkbox.is-bordered+.el-checkbox.is-bordered {
  margin-left: 0;
}
</style>
