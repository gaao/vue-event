<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <span>文章分类</span>
        <el-button style="float: right;" size="mini" type="primary" icon="el-icon-plus"
          @click="handleClick({handleType:'添加',row:''})">
          添加分类</el-button>
      </div>
      <div>
        <!-- {{cateList}} -->
        <el-table :data="cateList" style="width: 100%">
          <el-table-column type="index" label="序号">
          </el-table-column>
          <el-table-column prop="cate_name" label="分类名称">
          </el-table-column>
          <el-table-column prop="cate_alias" label="分类别名">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick({handleType:'查看',row:scope.row})">查看</el-button>
              <el-button type="text" size="small" @click="handleClick({handleType:'编辑',row:scope.row})">编辑</el-button>
              <el-button type="text" size="small" @click="delCate(scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </el-card>
    <!-- 对话框 - 添加/查看/编辑分类 -->
    <el-dialog :title="handleType+'文章分类'" :visible="dialogVisible" :before-close="cancelFormFn">
      <el-form :model="form" ref="fromRef" :rules="fromRules" label-width="100px">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="form.cate_name" :disabled="isDisabled" clearable></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="form.cate_alias" :disabled="isDisabled" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancelFormFn">取 消</el-button>
        <el-button type="primary" @click="subForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCateListAPI, addCateAPI, updateCateInfoAPI, delCateAPI } from '@/api'
export default {
  data() {
    return {
      cateList: [],
      dialogVisible: false,
      form: {
        cate_name: '',
        cate_alias: ''
      },
      fromRules: {
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '1-10 个非空格字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_-]{1,15}$/, message: '1-15 个大小写字母和数字组成的字符串', trigger: 'blur' }
        ]
      },
      handleType: '',
      isDisabled: false
    }
  },
  created() {
    this.getCateList()
  },
  methods: {

    async getCateList() {
      const { data: res } = await getCateListAPI()
      console.log('res', res)
      this.cateList = res.data
    },
    openAddCateDialogFn() {
      console.log(111)
      this.dialogVisible = true
    },
    subForm() {
      if (this.handleType === '添加') {
        this.$refs.fromRef.validate(async val => {
          if (val) {
            const { data: res } = await addCateAPI(this.form)
            console.log('res', res)
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
            // 关闭对话框
            this.dialogVisible = false
            // 获取列表新数据
            this.getCateList()
          }
        })
      } else if (this.handleType === '编辑') {
        console.log('this.form1', this.form)
        this.$refs.fromRef.validate(async val => {
          if (val) {
            console.log('this.form2', this.form)
            const { data: res } = await updateCateInfoAPI(this.form)
            console.log('res', res)
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
            // 关闭对话框
            this.dialogVisible = false
            // 获取列表新数据
            this.getCateList()
          }
        })
      } else if (this.handleType === '查看') {
        // 关闭对话框
        this.dialogVisible = false
      }
    },
    handleClick({ handleType, row }) {
      this.dialogVisible = true
      if (handleType === '添加') {
        console.log('handleType', handleType)
        this.handleType = handleType
        this.isDisabled = false
        if (this.form.cate_name) {
          this.$refs.fromRef.resetFields()
        }
      } else if (handleType === '编辑') {
        console.log('handleType', handleType)
        this.handleType = handleType
        this.form = row
        console.log('this.form', this.form)
        this.isDisabled = false
      } else if (handleType === '查看') {
        console.log('handleType', handleType)
        this.handleType = handleType
        this.form = row
        console.log('this.form', this.form)
        this.isDisabled = true
      }
    },
    cancelFormFn() {
      this.$refs.fromRef.resetFields()
      this.dialogVisible = false
      // 获取列表新数据
      this.getCateList()
    },
    async delCate(row) {
      console.log('cancel')
      console.log(row.id)
      const { data: res } = await delCateAPI(row.id)
      console.log('res', res)
      if (res.code !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      // 获取列表新数据
      this.getCateList()
    }
    // async handleClick({handleType,row}) {
    // }
  }
}
</script>
<style>

</style>
