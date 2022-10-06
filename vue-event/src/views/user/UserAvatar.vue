<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <span>更换头像</span>
        <!-- <el-button v-if="isEdit" style="float: right; padding: 3px 0" type="text" icon="el-icon-edit" @click="editInfo">
          编辑</el-button>
        <el-button v-else style="float: right; padding: 3px 0" type="text" icon="el-icon-refresh-left"
          @click="cancelEditInfo">
          取消</el-button> -->
      </div>
      <div>
        <!-- <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传 jpg/png 文件，且不超过 500kb</div>
        </el-upload> -->
        <img v-if="avatar" :src="avatar" alt="这里是个图" />
        <!-- <img v-else :src="avatar" alt="这里是个图" /> -->
        <div class="btn-box">
          <input type="file" accept="image/*" style="display: none;" ref="iptRef" @change="onFideChange" />
          <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择照片</el-button>
          <el-button type="success" icon="el-icon-upload" v-if="updateAvatarIsShow" @click="updateAvatarFn">上传头像
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { updateUserAvatarAPI } from '@/api'
export default {
  name: 'UserAvatar',
  data() {
    return {
      avatar: this.$store.state.userInfo.user_pic,
      updateAvatarIsShow: false
    }
  },
  methods: {
    chooseImg() {
      this.$refs.iptRef.click()
      // console.log('移花接木', this.$refs.iptRef.click())
      console.log(1111)
    },
    onFideChange(e) {
      console.log(2222)
      const files = e.target.files
      if (files.length === 0) {
        console.log('kong')
      } else {
        console.log('files', files[0])
        // 把图片文件给到 img 标签的 src 上
        // 方法一、链接地址 (本地连接不能作为传给后台)
        // this.avatar = URL.createObjectURL(files[0])
        // 方法二、base64 字符串
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.onload = e => {
          this.avatar = e.target.result
          this.updateAvatarIsShow = true
          return this.avatar
        }
      }
    },
    async updateAvatarFn() {
      console.log('头像 base64', this.avatar)
      // console.log('updateUserAvatarAPI', updateUserAvatarAPI())
      if (this.avatar) {
        const { data: res } = await updateUserAvatarAPI(this.avatar)
        console.log('res', res)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.updateAvatarIsShow = false
        // vuex 重新获取下用户信息
        this.$store.dispatch('getUserInfoAction')
      }
    }

  }
}
</script>
<style>

</style>
