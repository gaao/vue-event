"use strict";(self["webpackChunkvue_event"]=self["webpackChunkvue_event"]||[]).push([[208],{9208:function(e,s,t){t.r(s),t.d(s,{default:function(){return c}});var i=function(){var e=this,s=e._self._c;return s("div",{staticClass:"container"},[s("el-card",[s("div",{attrs:{slot:"header"},slot:"header"},[s("span",[e._v("基本资料")]),e.isEdit?s("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text",icon:"el-icon-edit"},on:{click:e.editInfo}},[e._v(" 编辑")]):s("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text",icon:"el-icon-refresh-left"},on:{click:e.cancelEditInfo}},[e._v(" 取消")])],1),s("div",[s("el-form",{ref:"userInfoRef",attrs:{model:e.userInfo,rules:e.userInforules,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"登录名称",prop:"username"}},[s("el-input",{attrs:{disabled:""},model:{value:e.userInfo.username,callback:function(s){e.$set(e.userInfo,"username",s)},expression:"userInfo.username"}})],1),s("el-form-item",{attrs:{label:"用户昵称",prop:"nickname"}},[s("el-input",{attrs:{disabled:e.isEdit,clearable:""},model:{value:e.userInfo.nickname,callback:function(s){e.$set(e.userInfo,"nickname",s)},expression:"userInfo.nickname"}})],1),s("el-form-item",{attrs:{label:"用户邮箱",prop:"email"}},[s("el-input",{attrs:{disabled:e.isEdit,clearable:""},model:{value:e.userInfo.email,callback:function(s){e.$set(e.userInfo,"email",s)},expression:"userInfo.email"}})],1),s("el-form-item",{directives:[{name:"show",rawName:"v-show",value:!e.isEdit,expression:"!isEdit"}]},[s("el-button",{attrs:{type:"primary"},on:{click:e.changeSubFn}},[e._v("提交修改")])],1)],1)],1)])],1)},r=[],n=t(7877),a={data(){return{userInfo:{id:this.$store.state.userInfo.id,username:this.$store.state.userInfo.username,nickname:this.$store.state.userInfo.nickname,email:this.$store.state.userInfo.email},userInforules:{nickname:[{required:!0,message:"请输入昵称",trigger:"blur"},{pattern:/^\S{1,10}$/,message:"1-10 位非空格字符",trigger:"blur"}],email:[{required:!0,message:"请输入用户邮箱",trigger:"blur"},{type:"email",message:"必须符合邮箱格式",trigger:"blur"}]},isEdit:!0}},methods:{changeSubFn(){this.$refs.userInfoRef.validate((async e=>{if(console.log("val",e),console.log("userInfo",this.userInfo),e){const{data:e}=await(0,n.$b)(this.userInfo);if(console.log("res",e),0!==e.code)return this.$message.error(e.message);this.$message.success(e.message),this.$store.dispatch("getUserInfoAction")}})),console.log(1212)},editInfo(){this.isEdit=!this.isEdit},cancelEditInfo(){this.userInfo=this.$store.state.userInfo,this.isEdit=!this.isEdit}}},o=a,l=t(1001),u=(0,l.Z)(o,i,r,!1,null,"8c12a614",null),c=u.exports}}]);
//# sourceMappingURL=208.5cd30307.js.map