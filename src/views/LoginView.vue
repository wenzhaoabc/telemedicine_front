<template>
  <main>
<div class="login_bg">
    <div class="content">
      <div class="content_wrapper" >

        <div class="login_pictures" >
         <div class="login_pictures_picture" style="background-image:url('./doctor.jpg'); background-size: 100% 100%;">
          </div> 
        </div>

        <div class="xm_login_container login_container">
          <div class="xm_login_card_tab">欢迎登录</div>
          <!-- 账号密码登录 -->
          <div class="login_form" id="pwlogin">
            <a-form :model="form" style="{ width: '300px' }">
              <div class="inputstyle">
                
                <a-input v-model="form.phone" placeholder="请输入手机号" :size="large">
                  <template #prepend>
                    +86
                  </template>
                </a-input> 
              </div>
              <div class="inputstyle">
                <a-input-password v-model="form.pwd" placeholder="请输入密码" />
              </div>
              <div class="buttonstyle">
                <a-form-item>
                  <a-button html-type="submit" @click="handleLoginPwd">登录</a-button>
                </a-form-item>
              </div>
            </a-form>
            <div class="bottom">
              <a href="/ForgetpwdView" class="link">找回密码</a>
              <span class="dotted">|</span>
              <a href='javascript:void(0)' @click="pwhidden" class="link">验证码快捷登录</a>
              <span class="dotted">|</span>
              <a href="/register" class="link">注册帐号</a>
            </div>
          </div>
          <!-- 验证码登录 -->
          <div class="login_form" id="pinlogin">
            <a-form :model="form" :style="{ width: '300px' }">
              <div class="inputstyle">
                <a-input v-model="form.phone" placeholder="请输入手机号" :size="large">
                  <template #prepend>
                    +86
                  </template>
                </a-input>
              </div>
              <div class="inputstyle">
                <a-input v-model="form.pin" placeholder="请输入验证码" style="width:128px" />
                <a-button type="primary" @click="sendMsg" :disabled=this.form.disabled>{{ this.form.btnTitle }}</a-button>
              </div>
              <div class="buttonstyle">
                <a-form-item>
                  <a-button html-type="submit" @click="handleLoginPin">登录</a-button>
                </a-form-item>
              </div>
            </a-form>
            <div class="bottom2">
              <a href='javascript:void(0)' @click="pinhidden" class="link">账号密码登录</a>

            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="bottom_style">
    @2022-2023 MIXER  京1CP0000000X号-1  京公网安备1000000000000X  关于 | 手机版 | 职位 | 公司 | 人脉 | 行业 | 招商 | 反馈 | 服务与声明
    </div>
  </div>
  </main>
</template>
  
<script>
import { reactive } from 'vue';
import { userInfo } from '@/stores/counter.js';

import axios from "axios"
export default {
  setup() {
    const form = reactive({
      phone: '',
      pwd: '',
      pin: '',
      btnTitle: '获取验证码',
      disabled: false
    })
    const loginStore=userInfo();
    return {
      form,
      loginStore
    }
  },
  methods: {
    pwhidden() {
      document.getElementById("pwlogin").style.display = "none";
      document.getElementById("pinlogin").style.display = "block";
    },
    pinhidden() {
      document.getElementById("pwlogin").style.display = "block";
      document.getElementById("pinlogin").style.display = "none";
    },
    validatePhone() {
      console.log(this.form.phone)
      //判断输入的手机号是否合法
      if (this.form.phone == '') {
        this.errmsg = "手机号码不能为空！"
        return false
      } else if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
        this.errmsg = "请输入正确的手机号码！"
        return false
      } else {
        return true
      }
    },
    disableBtn() {
      console.log(123);
      //倒计时
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.form.disabled = false;
          this.form.btnTitle = "获取验证码";
        } else {
          this.form.btnTitle = time + '秒后重试';
          this.form.disabled = true
          //  console.log( document.getElementById("sendMsg").disabled)

          time--
        }
      }, 1000)
    },
    /* 获取验证码 */
    sendMsg() {
      if (!this.validatePhone()) {
        this.$message.error(this.errmsg)
        return;
      }
      /* 先检查是否有该手机号 */
      axios({
        method: 'get',
        params: {
          phone: this.form.phone,
        },
        url: '/phone',
      }).then((res) => {
        if (res.data) {
          this.disableBtn() //按钮失效
          /* 手机号注册过，才发短信 */
          axios({
            method: 'get',
            params: {
              mob: this.form.phone,
            },
            url: '/pin',
          }).then((res) => {
            if (res.data) {
              console.log(res.data)
              
            }
            else {
              this.errmsg = "手机号不存在！"
              this.$message.error(this.errmsg)
              console.log(res.data)
              console.log('登录失败！')
            }
          }, error => {
            console.log('登录失败！')
            console.log('错误', error.message)
          })
        }
        /* 否则先注册 */
        else {
          this.errmsg = "手机号未注册！"
          this.$message.error(this.errmsg)
          console.log(res.data)
          console.log('登录失败！')
        }
      }, error => {
        console.log('！')
        console.log('错误', error.message)
      })

    },
    isClick() {
      if (this.form.phone != "" && this.form.pwd != "") {
        return true
      } else {
        //   console.log(1)
        this.errmsg = "账号密码不能为空！"
        return false
      }
    },
    /* 检验验证码登录 */
    handleLoginPin() {
      if (!this.validatePhone() || !this.isClick()) {
        this.$message.error(this.errmsg)
        return
      }
      axios({
        method: 'post',
        params: {
          phone: this.form.phone,
          pin: this.form.pin
        },
        url: '/user/pin',
      }).then((res) => {
        if (res.data) {
          this.$message.success("登录成功！")
          console.log(res.data)
          this.$router.push('/')
        }
        else {
          this.errmsg = "验证码不正确！"
          this.$message.error(this.errmsg)
          console.log(res.data)
          console.log('登录失败！')
        }
      }, error => {

        console.log('登录失败！')
        console.log('错误', error.message)
      })
    },
    /* 检验账号密码登录 */
    handleLoginPwd() {
      if (!this.validatePhone() || !this.isClick()) {
        this.$message.error(this.errmsg)
      }
      axios({
        method: 'post',
        params: {
          phone: this.form.phone,
          pwd: this.form.pwd
        },
        url: '/user/pwd',
      }).then((res) => {
        if (res.data) {
          this.$message.success("登录成功！")
          console.log(res.data)
          console.log(this.loginStore)
          this.loginStore.changeLoginState(res.data)
          this.$router.push('/')
        }
        else {
          this.errmsg = "账号密码不正确！"
          this.$message.error(this.errmsg)
          console.log(res.data)
          console.log('登录失败！')
        }
      }, error => {

        console.log('登录失败！')
        console.log('错误', error.message)
      })

    }
  }
}
</script>

<style  scoped>
.login_bg{
    background: url("../hospital2.jpg") no-repeat;
    background-size: 100% 100%;
    top:0;
    left: 0;
    overflow-y: auto;
 }
.content {
  width: 1060px;
  margin: 32px auto;
  padding: 0 24px;
}

.content_wrapper {
  min-height: 372px;
  padding-top: 40px;
  margin: 50px 20px 60px 25px;
}


.login_pictures {
  position: relative;
  margin-right: 335px;
}
.login_pictures_picture {
  border: 1px solid #a0b1c4;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 400px;
  _width: 100%;
  background-repeat: no-repeat;
  background-position: right center; 
  opacity: 0.8;
 /* border-radius: 5px; */ 
}

.xm_login_container {
  width: 334px !important;
  height: 400px !important;
}

.login_container {
  float: right;
  border: 1px solid #a0b1c4;
  width: 334px;
  height: 387px;
  _height: 371px;
  background:#ffffff; 
  position: relative;
  z-index: 12;
  padding: 0;
  /* border-radius: 5px; */
  overflow: hidden;
}

.xm_login_card_tab {
  height: 50px;
  border-bottom: 1px solid #a0b1c4;
  background-color: #f9fbfe;
 /* border-radius: 6px 6px 0 6px; */
  color: #333;
  width: 100%;
  font-size: 16px;
  line-height: 50px;
  text-align: center;
}

.login_form {
  margin: 51px;
  position: relative;
  width: 100%;
  height: 347px;
}

.inputstyle {
  top: 0px;
  padding: 10px 40px 10px 10px;
  left: 0px;
  border-radius: 2px;
  width: 232px;
}

.buttonstyle {
  top: 0px;
  padding: 20px 40px 30px 40px;
  left: 0px;
  border-radius: 2px;
  width: 232px;
}

.bottom {
  margin-top: 20px;
  width: 284px;
  right: 25px;
  bottom: 12px;
}

.bottom2 {
  margin-top: 20px;
  margin-left: 80px;
  width: 284px;
  right: 25px;
  bottom: 12px;
}

.link {
  color: #225592;
}

.bottom .dotted {
  color: #bfbfbf;
  margin: 0 5px;
}

.bottom_style  {
  text-align: center;
  margin-top: 200px;
  margin-bottom: 42px;
}
a {
  text-decoration: none;
}
</style>

