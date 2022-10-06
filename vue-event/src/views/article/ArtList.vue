<template>
  <div>
    <el-card>
      <div slot="header">
        <span>文章列表</span>
      </div>
      <div>
        <!-- 查询 -->
        <div class="container-top">
          <el-form :inline="true" :model="queryInfo">
            <el-form-item label="文章分类">
              <el-select v-model="queryInfo.cate_id" placeholder="请选择分类">
                <!-- <el-option v-for="item in cateIds" :key="item" :label="item" :value="item"> -->
                <el-option v-for="item in cateOption" :key="item.id" :label="item.cate_name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布状态">
              <el-select v-model="queryInfo.state" placeholder="请选择状态">
                <el-option label="已发布" value="已发布"></el-option>
                <el-option label="草稿" value="草稿"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchFn">查询</el-button>
            </el-form-item>
          </el-form>
          <el-button icon="el-icon-plus" @click="oprnDialogArticle('发表')" class="btn-add">发布文章</el-button>
        </div>
        <!-- 表格 -->
        <!-- {{articleList}} -->
        <el-table :data="articleList" style="width: 100%" @row-click="rowClick" border>
          <el-table-column type="index" label="序号" width="60px">
          </el-table-column>
          <el-table-column prop="title" label="标题">
            <template slot-scope="scope">
              <el-link @click="oprnDialogArticle('查看',scope.row.cate_id)">{{ scope.row.title}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="cate_name" label="分类">
          </el-table-column>
          <el-table-column prop="pub_date" label="发布时间">
            <template slot-scope="scope">
              <span>{{ $formatDate(scope.row.pub_date)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="oprnDialogArticle('查看',scope.row.id)">查看</el-button>
              <el-button type="text" size="small" @click="delArticle(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum" :page-sizes="[2, 5, 10, 50]" :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
    <!-- 对话框 添加/查看文章 -->
    <el-dialog :title="dialogTitle+'文章'" :visible="addArticeVisible" fullscreen @close="dialogCloseFn">
      <el-form v-if="dialogTitle==='发表'" :model="articleInfo" label-width="100px" ref="addArticleRef"
        :rules="addArticleRules">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="articleInfo.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select v-model="articleInfo.cate_id" placeholder="请输入文章分类">
            <el-option v-for="item in cateOption" :key="item.id" :label="item.cate_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <!-- <el-input v-model="articleInfo.content" placeholder="请输入文章内容" type="textarea" maxlength="20000"
            show-word-limit></el-input> -->
          <!-- quill-editor 组件非 elementUI 的组件所以校验的时候需要使用自身的@blur 或者 change 事件  -->
          <quill-editor v-model="articleInfo.content" class="hanhua" @blur="contentChangeFn"></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
          <div>
            <img v-if="articleInfo.cover_img" :src="coverImgSrc" alt="这里是个图" />
            <div class="img-box">
              <input type="file" accept="image/*" style="display: none;" ref="coverRef" @change="onFideChange" />
              <el-button type="text" icon="el-icon-plus" @click="chooseImg">选择封面</el-button>
            </div>
          </div>
        </el-form-item>

      </el-form>
      <div v-else class="details">
        <h1 class="details-title">{{articleInfoDetails.title}}</h1>
        <div class="details-info">
          <div>
            <span>作者：</span>
            <p>{{articleInfoDetails.nickname || articleInfoDetails.username}}</p>
          </div>
          <div>
            <span>发表时间：</span>
            <p>{{$formatDate(articleInfoDetails.pub_date)}}</p>
          </div>
          <div>
            <span>所属分类：</span>
            <p>{{articleInfoDetails.cate_name}}</p>
          </div>
        </div>
        <div class="details-container">
          <span>封面图：</span>
          <div> <img v-if="articleInfoDetails.cover_img" :src="baseURL+articleInfoDetails.cover_img" /></div>
        </div>
        <div class="details-container">
          <span>内容：</span>
          <div v-html="articleInfoDetails.content"></div>
        </div>
      </div>
      <div v-if="dialogTitle==='发表'" slot="footer">
        <el-button @click="addArticeFn('草稿')">存草稿</el-button>
        <el-button type="primary" @click="addArticeFn('已发布')">点击发布</el-button>
      </div>
      <div v-else slot="footer">
        <el-button @click="addArticeVisible=false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCateListAPI, getArticleListAPI, addArticleAPI, getArticleDetailsAPI, delArticleAPI } from '@/api'
import { baseURL } from '@/utils/request'

export default {
  data() {
    return {
      // cateIds: [],
      // 分类选项
      cateOption: [],
      queryInfo: {
        pagenum: 1,
        // currentPage: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      articleList: [],
      total: 0,
      addArticeVisible: false,
      dialogTitle: '',
      articleInfo: {
        title: '',
        cate_id: '',
        content: '',
        cover_img: '',
        state: ''
      },
      articleInfoDetails: {},
      coverImgSrc: '',
      addArticleRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '1-30 个任意字符', trigger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请选择文章分类', trigger: 'change' }
        ],
        // 只是按 elementUI 的校验规则写是不行的，注意引用下这个校验规则
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        cover_img: [
          { required: true, message: '请输入文章封面', trigger: 'change' }
        ],
        state: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      baseURL

    }
  },
  created() {
    // 请求分类数据
    this.getCateList()
    this.getArticleList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await getCateListAPI()
      this.cateOption = res.data
      console.log('this.cateIds', this.cateOption)
      // this.cateIds = res.data.map(item => item.cate_name)
      // console.log('this.cateIds', this.cateIds)
    },
    rowClick() {
      console.log(222)
      // console.log(222, row)
    },
    // 查询
    async searchFn() {
      const res = await getArticleListAPI(this.queryInfo)
      console.log('res', res)
      if (res.data.code !== 0) return this.$message.error(res.data.message)
      this.$message.success(res.data.message)
      console.log('res.data.data', res.data.data)
      this.articleList = res.data.data
      this.total = res.data.total
    },
    async getArticleList() {
      const res = await getArticleListAPI(this.queryInfo)
      if (res.data.code !== 0) return this.$message.error(res.data.message)
      console.log('res.data', res.data)
      this.articleList = res.data.data
      this.total = res.data.total
    },
    // 对话框
    async oprnDialogArticle(dialogTitle, id) {
      // this.$router.push('/')
      this.addArticeVisible = true
      this.dialogTitle = dialogTitle
      if (dialogTitle === '发表') {
        console.log('fabiao')
      } else if (dialogTitle === '查看') {
        const res = await getArticleDetailsAPI(id)
        console.log('res', res)
        if (res.data.code !== 0) return this.$message.error(res.data.message)
        this.articleInfoDetails = res.data.data
      }
    },
    // async addArticleFn() {
    //   const res = await addArticleFn()
    //   console.log('res', res)
    // },
    chooseImg() {
      console.log(232323)
      this.$refs.coverRef.click()
    },
    onFideChange(e) {
      const files = e.target.files
      if (files.length === 0) {
        // 没有选择
        this.articleInfo.cover_img = null
      } else {
        this.articleInfo.cover_img = files[0]
        const url = URL.createObjectURL(files[0])
        this.coverImgSrc = url
      }
      this.$refs.addArticleRef.validateField('cover_img')
      console.log('5555', files[0])
      console.log('5555', e.target.value)
      // file://C:\Users\lenovo\Pictures\Saved Pictures\Snipaste_2022-05-26_10-04-36.png
      // C:\\fakepath\\图层 3.jpg"
    },
    // 调用 element 的单个 form 验证规则
    contentChangeFn() {
      this.$refs.addArticleRef.validateField('content')
    },
    dialogCloseFn() {
      this.$refs.addArticleRef.resetFields()
      this.addArticeVisible = false
    },
    addArticeFn(state) {
      this.articleInfo.state = state
      console.log('this.articleInfo', this.articleInfo)
      this.$refs.addArticleRef.validate(async val => {
        if (val) {
          // FormData 是 html5 新出的专门为了装文件内容和其他参数的一个容器
          const fd = new FormData()
          fd.append('title', this.articleInfo.title)
          fd.append('cate_id', this.articleInfo.cate_id)
          fd.append('content', this.articleInfo.content)
          fd.append('cover_img', this.articleInfo.cover_img)
          fd.append('state', this.articleInfo.state)
          const { data: res } = await addArticleAPI(fd)
          console.log('res', res)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.addArticeVisible = false
          // 刷新文章列表
          this.getArticleList()
        } else {
          return false
        }
      })
    },
    async delArticle(id) {
      const { data: res } = await delArticleAPI(id)
      console.log('res', res)
      if (res.code !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      // 最后一页删除最后一条时不能更新 data
      if (this.articleList.length === 1) {
        if (this.queryInfo.pagenum > 1) {
          this.queryInfo.pagenum--
        }
      }
      this.getArticleList() // 刷新下列表
    },
    // 翻页器
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.queryInfo.pagesize = val
      this.getArticleList() // 刷新下列表
    },
    handleCurrentChange(val) {
      console.log(`当前页：${val}`)
      this.queryInfo.pagenum = val
      this.getArticleList()// 刷新下列表
    }
  }
}
</script>
<style lang="less" scoped>
.container-top {
  // .el-form {}
  display: flex;
  justify-content: space-between;
  align-items: start;

  // .btn-add {
  //   margin-top: 7px;
  // }
}

.details {
  background-color: #f6f6f7;
  border-radius: 4px;
  padding: 0 16px;
  margin-top: -56px;

  .details-title {
    padding-top: 16px;
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 0.2;
    text-align: center;
  }

  .details-info {
    color: #999;
    background-color: #e8e8ea;
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    margin: 8px 0;

    div {
      display: flex;
      align-items: center;
    }
  }

  .details-container {
    padding-bottom: 32px;

    div {
      margin-left: 64px;
    }
  }

}

/deep/.ql-editor {
  min-height: 200px;
}

/deep/.hanhua {
  // 汉化编辑器
  .ql-snow .ql-tooltip[data-mode=link]::before {
    content: "请输入链接地址:" !important;
  }

  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px !important;
    content: '保存' !important;
    padding-right: 0px !important;
  }

  .ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:" !important;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px' !important;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
    content: '10px' !important;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
    content: '18px' !important;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
    content: '32px' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: '标题1' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: '标题2' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: '标题3' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: '标题4' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: '标题5' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: '标题6' !important;
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体' !important;
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
    content: '衬线字体' !important;
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
    content: '等宽字体' !important;
  }
}
</style>
