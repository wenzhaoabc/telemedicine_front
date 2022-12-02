<template>
    <main>
        <div class="register_bg">
        <div class="content">
            <div style="font-size: 30px;">欢迎注册</div>
            <div style="font-size: 15px;color: grey">已有账号？<span style="font-size: 15px;color: blue">登录</span></div>
            <a-form :model="form" :style="{ width: '400px', marginTop: '20px' }" :size="size">
                <a-form-item field="phone" label="手机号" :validate-status="this.status.phoneStatus"
                    :help="this.status.phoneHelp" feedback>
                    <a-input v-model="form.phone" placeholder="请输入手机号" @blur="checkPhone">
                        <template #prepend>
                            +86
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item field="pin" label="验证码" :validate-status="this.status.pinStatus"
                    :help="this.status.pinHelp" feedback>
                    <a-input v-model="info.pin" placeholder="请输入验证码" @blur="checkPin" />
                    <a-button type="primary" @click="sendMsg" :disabled=this.btn.disabled>{{
                            this.btn.btnTitle
                    }}</a-button>
                </a-form-item>
                <a-form-item field="name" label="昵称" :validate-status="status" feedback>
                    <a-input v-model="form.name" placeholder="请输入您的昵称" :max-length="{ length: 10, errorOnly: true }"
                        allow-clear show-word-limit />
                </a-form-item>
                <a-form-item field="pwd" label="密码" help="字母开头，由字母、数字组成，长度8~12位" :validate-status="status.pwdStatus"
                    feedback>
                    <a-input-password v-model="form.pwd" placeholder="请输入您的密码" @blur="checkPwd" />
                </a-form-item>
                <a-form-item field="againpwd" label="确认密码" :validate-status="status.againpwdStatus"
                    :help="this.status.againpwdHelp" feedback>
                    <a-input-password v-model="info.againpwd" placeholder="请确认您的密码" @blur="checkAgainpwd" />
                </a-form-item>
                <a-form-item field="age" label="年龄" :validate-status="status" feedback>
                    <a-input-number v-model="form.age" :style="{ width: '320px' }" placeholder="请输入您的年龄"
                        class="input-demo" :min="10" :max="100" />
                </a-form-item>
                <a-form-item field="gender" label="性别" :validate-status="status" feedback>
                    <a-select v-model="form.gender" placeholder="请选择您的性别">
                        <a-option value="男">男</a-option>
                        <a-option value="女">女</a-option>
                    </a-select>
                </a-form-item>

                <a-form-item field="isRead">
                    <a-checkbox v-model="info.isread">
                        阅读并接受《用户协议》及《隐私保护协议》
                    </a-checkbox>
                </a-form-item>
                <div class="center">
                    <a-form-item>
                        <a-button @click="handleClick">注册</a-button>
                    </a-form-item>
                </div>
            </a-form>
        </div>
    </div>
    </main>
</template>
    
<script>
import { reactive } from 'vue';
import axios from "axios"
export default {
    setup() {
        const status = reactive({
            phoneHelp: null,
            againpwdHelp: null,
            pinHelp: null,
            phoneStatus: null,
            pwdStatus: null,
            againpwdStatus: null,
            pinStatus: null
        });
        const info = reactive({
            pin: '',
            againpwd: '',
            isread: true
        })
        const size = 'medium';
        const form = reactive({
            phone: '',
            name: '',
            pwd: '',
            age: '',
            gender: '',
        })
        const btn = reactive({
            btnTitle: '获取验证码',
            disabled: false
        })
        return {
            status,
            size,
            form,
            info,
            btn
        }
    },
    methods: {
        checkPwd() {
            //判断密码是否合法
            if (this.form.pwd.length < 8 || this.form.pwd.length > 12) {
                this.status.pwdStatus = "error"
                return false
            } else {
                var first = this.form.pwd.charAt(0)
                if (first < 'A' || first > 'z' || (first > 'Z' && first < 'a')) {
                    this.status.pwdStatus = "error"
                    console.log(1)
                    return false
                }
                for (var i = 1; i < this.form.pwd.length; i++) {
                    var code = this.form.pwd.charAt(i)
                    if (code < '0' || code > '9' && code < 'A' || code > 'Z' && code < 'a' || code > 'z') {
                        this.status.pwdStatus = "error"
                        console.log(code)
                        return false
                    }
                }
                this.status.pwdStatus = "success"
            }
        },
        checkAgainpwd() {
            //判断密码是否合法
            if (this.info.againpwd != this.form.pwd) {
                this.status.againpwdStatus = "error"
                this.status.againpwdHelp = "密码不一致！"
            }
            else {
                this.status.againpwdStatus = "success"
                this.status.againpwdHelp = null
            }
        },
        checkPhone() {
            //判断输入的手机号是否合法
            if (this.form.phone == '') {
                this.errmsg = "手机号码不能为空！"
                this.status.phoneStatus = "error"
                this.status.phoneHelp = this.errmsg
                return false
            } else if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
                this.errmsg = "请输入正确的手机号码！"
                this.status.phoneStatus = "error"
                this.status.phoneHelp = this.errmsg
                return false
            } else {
                this.status.phoneStatus = "success"
                this.status.phoneHelp = null
                return true
            }
        },
        checkPin() {
            console.log(123)
            /* 如果没有写手机号或者没有发短信就写验证码，直接错误提示*/
            if (this.status.phoneStatus != "success") {
                this.status.pinStatus = "error"
                this.status.pinHelp = "请先填写手机号！"
                return
            }
            if (this.btn.disabled == false) {
                this.status.pinStatus = "error"
                this.status.pinHelp = "请先发送验证码！"
                return
            }
            axios({
                method: 'post',
                params: {
                    phone: this.form.phone,
                    pin: this.info.pin
                },
                url: '/user/pin',
            }).then((res) => {
                if (res.data) {
                    this.status.pinStatus = "success"
                    this.status.pinHelp = "验证成功！"
                }
                else {
                    this.status.pinStatus = "error"
                    this.status.pinHelp = "验证码不正确！"
                }
            })
        },
        disableBtn() {
            console.log(123);
            //倒计时
            let time = 60;
            let timer = setInterval(() => {
                if (time == 0) {
                    clearInterval(timer);
                    this.btn.disabled = false;
                    this.btn.btnTitle = "获取验证码";
                } else {
                    this.btn.btnTitle = time + '秒后重试';
                    this.btn.disabled = true
                    //  console.log( document.getElementById("sendMsg").disabled)

                    time--
                }
            }, 1000)
        },
        /* 获取验证码 */
        sendMsg() {
            if (this.status.phoneStatus != "success") {
                this.$message.error("请输入正确的手机号码！")
                return;
            }
            this.status.pinStatus = null
            this.status.pinHelp = null
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
        },
        /* 进行注册 */
        handleClick() {
            if (this.status.againpwdStatus == "success" && this.status.pwdStatus == "success" && this.status.phoneStatus == "success"
                 && this.form.age != '' && this.form.gender != '' && this.form.name != '' && this.info.isread == true) {
                axios({
                    method: 'post',
                    params: {
                        name:this.form.name,
                        phone:this.form.phone,
                        gender:this.form.gender,
                        age:this.form.age,
                        pwd:this.form.pwd
                    },
                    url: '/user',
                }).then((res) => {
                    if (res.data) {
                        this.$message.success("注册成功！")
                        this.$router.push('/login')
                    }
                    else {
                        this.$message.error("注册失败！")
                        return
                    }
                }, error => {
                    console.log('注册失败！')
                    console.log('错误', error.message)
                })
            }
            else {
                this.$message.error("信息不全！")
                return
            }

        },

    }
}
</script>
  
<style scoped>
.register_bg{
    background: url("../hospital2.jpg") no-repeat;
    background-size: 100% 100%;
    top:0;
    left: 0;
    overflow-y: auto;
 }
.content {
    width: 430px;
    height: 520px;
    padding: 25px 50px;
    margin-top: 100px;
    margin-bottom: 50px;
    margin-left: auto;
    margin-right: auto;
    background: #ffffff;
    border-bottom: 1px solid #a0b1c4;
    border-radius: 10px;
    opacity: 0.9;
}

.center {
    margin: 0 200px
}
</style>
  
  