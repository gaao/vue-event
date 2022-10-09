import request from '@/utils/request'
// import store from '@/store'

export const registerAPI = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}

export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
// 用户相关 - 获取 - 用户基本资料
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo'
    // method: 'GET',  //可以不写默认 get 方式
    // headers: { //放在请求拦截器里统一添加了
    //   Authorization: store.state.token
    // }
  })
}
// 用户相关 - 更新 - 用户基本资料
export const putUserInfoAPI = ({ id, username, nickname, email, user_pic }) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      username,
      nickname,
      email,
      user_pic
    }
  })
}
// 用户相关 - 更新 - 用户头像
export const updateUserAvatarAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}
// 用户相关 - 更新 - 用户密码
export const updateUserPwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}
// 侧边栏
export const getMenusAPI = () => {
  return request({
    url: '/my/menus'
  })
}
// 文章分类 - 获取 - 文章分类
export const getCateListAPI = () => {
  return request({
    url: '/my/cate/list'
  })
}
// 文章分类 - 增加 - 文章分类
export const addCateAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'POST',
    data: {
      cate_name,
      cate_alias
    }
  })
}
// 文章分类 - 获取 - 文章分类详情
export const getCateInfoAPI = (id) => {
  return request({
    url: '/my/cate/info',
    params: {
      id
    }
  })
}
// 文章分类 - 更新 - 文章分类
export const updateCateInfoAPI = ({ id, cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/info',
    method: 'PUT',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}
// 文章分类 - 删除 - 文章分类
export const delCateAPI = (id) => {
  return request({
    url: '/my/cate/del',
    method: 'DELETE',
    params: {
      id
    }
  })
}
// 文章管理 - 获取 - 文章列表
export const getArticleListAPI = ({ pagenum, pagesize, cate_id, state }) => {
  return request({
    url: '/my/article/list',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}
// 文章管理 - 获取 - 文章详情
export const getArticleDetailsAPI = (id) => {
  return request({
    url: '/my/article/info',
    params: {
      id
    }
  })
}
// 文章管理 - 删除 - 文章详情
export const delArticleAPI = (id) => {
  return request({
    url: '/my/article/info',
    method: 'DELETE',
    params: {
      id
    }
  })
}
// 文章管理 - 发布 - 文章
export const addArticleAPI = (fd) => {
  return request({
    url: '/my/article/add',
    method: 'POST',
    data: fd
    // 入参如果是{}就是一个普通对象，axios 会把它转换成 json 字符串请求里交给后台
    // 这个接口要求请求体 Body 里是一个 form-data 类型（表单数据对象），所以不能用{}
    // data: {
    //   title,
    //   cate_id,
    //   content,
    //   cover_img,
    //   state
    // }
  })
}
