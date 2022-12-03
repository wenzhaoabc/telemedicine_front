<template>
    <div class="right">
        <div class="textbox"> 
            <div class="message">
                <header class="header">
                    <div class="chatterName">
                        聊天对象名
                    </div>
                </header>
                <a-divider size="5px" style="margin:0;"/>
                <div class="message-wrapper">
                    <div class="mbjsk" id="scrollDiv">
                        <div class="panel">
                            <div v-for="item in message">
                                <MyMessage :singleMsg="item"></MyMessage>
                            </div>
                        </div>
                    </div>
                </div>
                
                <RecordingAnim v-show="recordData.showAnima" style="position:absolute; bottom:30px;left:0;right:0"></RecordingAnim>
            </div>
            <div class="text ">
                <div class="flex sendbox_bar">        
                    <a-button-group type="text">
                        <Emoji ref="getEmoji" @changeText="changeText" ></Emoji>
                        <a-upload
                            list-type="picture-card"
                            action="/"
                            :auto-upload="false"
                            ref="uploadRef"
                            @change="onChange"
                            :show-file-list="false"
                            image-preview
                        >
                        <template #upload-button>
                            <a-space>
                                <a-button class="icon_color"> <template #icon> <icon-file-image size="20px"/></template> </a-button>
                            </a-space>
                        </template>
                        
                        </a-upload>
                        <a-button class="icon_color" @click="recordData.clickRecord"> <template #icon><icon-voice size="20px"/></template> </a-button>
                    </a-button-group> 
                </div>
                <div class="flex-1 flex ">
                    <div class="atwho-wrap">
                        <textarea class="editor" id="textarea" v-model="text"></textarea>
                    </div>
                </div>
                <p class="sendbox_prompt">按下Enter发送内容/  Ctrl+Enter换行</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import MyMessage from '@/components/chat/Message.vue'
import RecordingAnim from './RecordingAnim.vue'
import Recorder from 'js-audio-recorder'
import Emoji from "./Emoji.vue"
import {ref,reactive,toRefs,onMounted} from 'vue'
import { sendTextMessage,getMessage,sendPictureMessage,sendAudioMessage } from '@/api/inquiry.js';
import { userInfo } from '@/stores/counter.js';
import { Message } from '@arco-design/web-vue'

const info=userInfo();

const text=ref("")
const message=ref([])

onMounted(()=>{
    document.onkeydown = () => {
        var key = window.event.keyCode
        if (key === 13) {
            sendMsg();
        }
    }

    getMessage(1).then(response=>{
        if(response.status==200){
            message.value=response.data
            scrollToBottom()
            console.log("获得消息成功")
        }
        else{
            console.log("获得消息失败")
        }
    }).catch(e=>{
        console.log(e)
        console.log("获得消息失败")
    })
})

//滚动条滚动到低端
function scrollToBottom() {
    var ele = document.getElementById("scrollDiv");
    setTimeout(function () {
    ele.scrollTop = ele.scrollHeight;
    }, 200);
}

//表情包
const getEmoji=ref(null)
function changeText() {
    var textArea = document.getElementById('textarea');
    function changeSelectedText(obj, str) {
        if (window.getSelection()) {
            // 非IE浏览器
            textArea.setRangeText(str);
            // 在未选中文本的情况下，重新设置光标位置
            textArea.selectionStart += str.length;
            textArea.focus()
        } else if (document.getSelection()) {
            // IE浏览器
            obj.focus();
            var sel = document.selection.createRange();
            sel.text = str;
        }
    }
    changeSelectedText(textArea, getEmoji.value.faceList[getEmoji.value.emojiItem]);
    text.value = textArea.value;// 要同步data中的数据
    // console.log(this.$refs.getEmoji.faceList[this.$refs.getEmoji.emojiItem]);
}


//发送文本消息
function sendMsg(){
    let receiverId=1
    sendTextMessage(receiverId,text.value).then(response=>{
        if(response.status==200){
            text.value="";
            message.value.push(response.data)
            scrollToBottom()
        }
        else{
            console.log("发送消息失败")
        }
    }).catch(e=>{
        console.log(e);
    })

}

//图片上传
const uploadRef = ref();

function onChange(fileList){
    let receiverId=1;
    let fd=new FormData()
    console.log(fileList[0].file)
    fd.append('file',fileList[0].file);
    sendPictureMessage(receiverId,fd).then(response=>{
        if(response.status==200){
            console.log("发送图片成功")
            message.value.push(response.data);
        }
        else{
            console.log("发送图片失败");
        }
    }).catch(e=>{
        console.log(e);
        console.log("发送图片失败")
    })
    // uploadRef.value.submit();
};

//语音输入
const recordData = reactive({
//用于存储创建的语音对象
  recorder: null,
  formData: null,
  // 控制录音动画的显示隐藏
  showAnima: false,
  mation: true,
  isHistory: true,
  // 录音时长
  duration: 0,
//   getAdo(){
//     getAudio().then(response=>{
//       if(response.status==200){
//         console.log(response.data[0].msg)
//         var audio = document.getElementById('aud')
//         audio.src = response.data[0].msg
//         audio.load()
//         }
        
//       })
//   },
  submit () { // 发送语音的方法
    recordData.recorder.pause() // 暂停录音
    recordData.timer = null
    console.log('上传录音')// 上传录音
    var formData = new FormData()
    var blob = recordData.recorder.getWAVBlob()//获取wav格式音频数据
    let file = new window.File([blob], new Date().getTime()+'.wav', {type: 'wav'}) // 转成file类型
    //此处获取到blob对象后需要设置fileName满足当前项目上传需求，其它项目可直接传把blob作为		  file塞入formData
    //formData是传给后端的对象,
    formData.append('file', file)

    //发送给后端的方法
    let receiverId=1
    sendAudioMessage(receiverId,formData).then(response=>{
        if(response.status==200){
            message.value.push(response.data)
            console.log("发送语音成功")
        }
        else{
            console.log("发送语音失败")
        }
    }).catch(e=>{
        console.log(e)
        console.log("发送语音失败")
    })
  },
  handleStop () {
    console.log('停止录音')
    recordData.recorder.stop() // 停止录音
    recordData.showAnima=false;
    recordData.mation = false;
  },
  handlePlay () {
    console.log('播放录音')
    recordData.recorder.play() // 播放录音
  },
  handleDestroy () {
    console.log('销毁实例')
    if (recordData.recorder) {
        recordData.recorder.destroy() // 毁实例
    }
  },
  clickRecord(){
    if(recordData.showAnima){
        recordData.submit();
        // recordData.handleDestroy()
    }
    else{
        recordData.recorder = new Recorder({
            sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
            sampleRate: 11025, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
            numChannels: 1 // 声道，支持 1 或 2， 默认是1
        })
        Recorder.getPermission().then(() => {
            console.log('开始录音')
            recordData.recorder.start() // 开始录音
        }, (error) => {
            console.log(`${error.name} : ${error.message}`)
        })
    }
    recordData.showAnima=!recordData.showAnima;
  }
})
defineExpose({
    ...toRefs(recordData)
})

</script>

<style scoped> 
.panel{
    position: relative;
    box-sizing: border-box;
    height: 100%;
    margin-right: -18px;

}

.mbjsk{
    height: 100%;
    width: 100%;
    padding: 0px;
    position: relative;
    overflow-y: auto;
    overflow-x:hidden;
    
}

.message .message-wrapper{
    position: absolute;
    left: 0;
    top: 55px;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    flex: 1;
}
.icon_color{
    color:#333 !important;
}
.sendbox_prompt {
    font-size: 12px;
    height: 36px;
    margin-right: 18px;
    line-height: 36px;
    text-align: right;
    color: #a3a7ae;
}

textarea {
    font-family: Arial,PingFangSC-Regular,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    resize: none;
    -webkit-appearance: none;
    outline: none;
    border: none;
}

textarea:focus{
    border: none;
}
.atwho-wrap{
    z-index: 22;
    font-family: Microsoft YaHei;
    width: 100%;
    font-size: 12px;
    color: #333;
    position: relative;
}

.editor {
    color: #333;
    width: 100%;
    height: 88px;
    display: block;
    box-sizing: border-box;
    padding: 0 8px 0 17px;
    font-size: 14px;
    line-height: 22px;
    background: #eee;
    overflow: auto;
}
.flex-1 {
    -ms-flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
}
.flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-flex-flow: row nowrap;
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
}
.sendbox_bar {
    margin-top: 9px;
    position: relative;
}
.text {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 22;
    border-top: 1px solid #ddd;
    border-radius: 0 0 5px 0;
    background: #eee;
}
.chatterName {
    width:100%;
    white-space: nowrap;
    word-break: break-all;
    display: inline-block;
    font-size: 16px;
    color: grey;
    text-align: center;
}
.header{
    height: 50px;
    box-sizing: border-box;
    line-height: 50px;
    margin-left: 18px;
    margin-right: 20px;
    justify-content: space-between;
    /* border-style:solid;
    border-bottom-color: darkcyan; */
}
.message{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 190px;
} 
.right {
    width: 830px;
    position: absolute;
    left: 320px;
    top: 0;
    bottom: 0;
    background: #eee;
    border-radius: 0 5px 5px 0;
    z-index: 222;
}
.textbox {
    width: 100%;
    height: 100%;
}
</style>