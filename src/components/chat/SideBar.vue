<template>
    <div class="msglist">
        <div class="avatar" v-if="usertype">
            <div >
                <a-avatar  :size="100"><img :src="doctorInfo.photo" alt=""></a-avatar>
            </div>
        </div>
        <div style="width:90%;margin-left:5%">
            <div class="hcqStyle2" style="margin-top:10px">
                <div style="line-height: 30px;">
                    {{doctorInfo.name}} {{doctorInfo.age}} {{doctorInfo.gender==1?'男':'女'}}
                </div>
                <div style="line-height: 30px; margin-top:10px ;">
                    {{doctorInfo.hospital}}
                </div>
            </div>
            <div v-if="info.role==0">
                <div class="hcqStyle2" style="margin-top:10px">
                    <div style="font-weight:bold; display: inline">平均评分:</div>
                    <span>{{doctorInfo.score}}</span>
                </div>
                <div class="fontstyle" style="margin-top:20px">
                    <div style="font-weight:bold; display: inline">
                        个人简介:
                    </div>
                    <span>{{doctorInfo.introduction}}</span>
                </div>
                <div class="fontstyle" style="margin-top:20px">
                    <div style="font-weight:bold; display: inline">
                        擅长邻域:
                    </div>
                    <span>{{doctorInfo.field}}</span>
                </div>
                <div class="fontstyle" style="margin-top:20px">
                    <div style="font-weight:bold; display: inline">
                        联系电话:
                    </div>
                    <span>{{doctorInfo.telephone}}</span>
                </div>
                <div class="countdown" style="margin-top:20px;text-align:center">
                    {{minute}}:{{second}}
                </div>
                <div class="bottom">
                    <a-button type="primary" status="danger" style="width:100%" @click="visible=true">结束咨询</a-button>
                </div>
            </div>
            <div v-if="info.role==1">
                <div class="fontstyle" style="margin-top:20px">
                    <div style="font-weight:bold; display: inline">病症描述:</div>
                    <span>{{problem}}</span>
                </div>
                <div class="countdown" style="margin-top:20px;text-align:center">
                    {{minute}}:{{second}}
                </div>
                <div class="bottom">
                    <a-button type="primary" status="danger" style="width:100%" @click="visible=true">结束咨询</a-button>
                </div>
            </div>
        </div>
        <a-modal v-model:visible="visible" :footer="false">
            <template #title>
                <span style="color:coral">
                    Warning
                </span>
            </template>
            <div style="text-align:center">此操作将结束咨询，请确定是否继续</div>
            <div style="display: flex;justify-content: center;align-items: center;margin-top:10px"> 
                <a-button @click="visible=false">取消</a-button>
                <a-button type="primary" style="margin-left:20px" @click="finish">确定</a-button>
            </div>
        </a-modal>
        <a-modal v-model:visible="anotherVisible" :footer="false" width="800px">
            <template #title>
                    请对本次咨询医生进行评价
            </template>
            <a-form :model="form" style="width:640px" @submit="handleSubmit">
                <a-form-item field="review" label="Review">
                    <a-input v-model="form.review" placeholder="please enter your review..." />
                </a-form-item>
                <a-form-item field="score" label="Score">
                    <a-rate v-model="form.score" allow-clear :count="10" />
                </a-form-item>
                <a-form-item>
                    <a-button html-type="submit">提交</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import {ref,onMounted,toRefs,reactive} from 'vue'
import { getDoctor } from '@/api/personalInfo.js'
import { userInfo } from '@/stores/counter.js';
import { getProblem,updateDiagnosis } from '@/api/diagnosis.js'
import bus from '@/utils/eventBus.js'
const props = defineProps({
    id:{
        doctorId:Number,
        recordId:Number,
    }
})
const {id} = toRefs(props)
const info=userInfo();
const doctorInfo=ref({})
//倒计时
const countDown=ref(null)
//控制第一个对话框
const visible=ref(false)
//控制第二个对话框
const anotherVisible=ref(false)
//提交表单部分
const form = reactive({
    review: '',
    score: ''
})
const handleSubmit = (data) => {
    console.log(data.values)
    updateDiagnosis(id.value.recordId,data.values.review,data.values.score).then(response=>{
        if(response.status==200){
            console.log("更新诊疗记录成功")
            window.opener = null;
            window.open("about:blank", "_top").close()
        }
        else{
            console.log("更新诊疗记录失败")
        }
    }).catch(e=>{
        console.log(e)
        console.log("更行诊疗记录失败")
    })
}
onMounted(()=>{
    setTimeout(()=>{
        updateInfo()
    },200)
    bus.on('idChange',newId=>{
        id.value.doctorId=newId.doctorId
        id.value.recordId=newId.recordId
        countDown.value=1800
        stop.value=false;
        startCountDown()
        updateInfo()
        gainProblem()
    })
    bus.on('clearSide',value=>{
        clear()
    })
    countDown.value=1800
    startCountDown()
    if(info.role==1){
        clear()
    }
})
const minute=ref(0)
const second=ref(0)
const stop=ref(false)

function clear(){
    stop.value=true;
    minute.value=0;
    second.value=0;
    countDown.value=0;
    doctorInfo.value.name="暂未有人"
    doctorInfo.value.age=""
}

function startCountDown(){
    countDown.value--;
    setTimeout(()=>{
        if(countDown.value>0&&!stop.value){
            startCountDown()
            minute.value=parseInt(countDown.value/60)
            second.value=countDown.value%60
        }
        else if(countDown.value<=0&&info.role==0){
            finish();
        }
    },1000)
}

function finish(){
    bus.emit('close','r');
    visible.value=false;
    console.log(info.role)
    if(info.role==0)
        anotherVisible.value=true;
    else{
        window.opener = null;
        window.open("about:blank", "_top").close()
    }
}

const usertype=ref(true);

function updateInfo(){
    getDoctor(id.value.doctorId).then(response=>{
        if(response.status==200){
            console.log("获得信息成功")
            doctorInfo.value=response.data
            console.log(doctorInfo.value)
            bus.emit('doctorAvatar',doctorInfo.value.photo)
        }
        else{
            console.log("获得信息失败")
        }
    }).catch(e=>{
        console.log(e)
        console.log("获得信息失败")
    })
}

const problem=ref("")

function gainProblem(){
    getProblem(id.value.recordId).then(response=>{
        if(response.status==200){
            console.log("获得病症成功")
            problem.value=response.data
        }
        else{
            console.log("获得病症失败")
        }
    }).catch(e=>{
        console.log(e)
        console.log("获得病症失败")
    })
}

</script>

<style scoped>
.countdown{
    font-family: 楷体;
    color: aqua;
    font-size: 30px;
}

.bottom{
    position: fixed;
    bottom:2%;
    /* margin:0 auto; */
    width:290px;
    /* left:10px */
}
.hcqStyle2{
    display:inline-block;
    font-weight:bold;
    color:#e6e6e6;
    text-shadow:0 0 1px currentColor,-1px -1px 1px #000,0 -1px 1px #000,1px -1px 1px #000,1px 0 1px #000,1px 1px 1px #000,0 1px 1px #000,-1px 1px 1px #000,-1px 0 1px #000;
    -webkit-filter:url(#diff1);
    filter:url(#diff1);/*background:#def;padding:0 .2em*/
    font-size:20px;
    text-align: center;
    width:100%;
    font-family: "宋体";
}

.fontstyle{
    color:#e6e6e6;
    font-family:"楷体","黑体","宋体";
    font-size:16px;
    line-height: 20px;
    text-align: center;
    max-height:120px;
    overflow-y:auto;
    overflow-x:hidden ;
}
.avatar{
    display: flex;
    justify-content: center;
    margin-top:20px;
}
.msglist{
    position: absolute;
    width: 320px;
    right: auto;
    border-radius: 5px 0 0 5px;
    background: #e6e6e6;
    background: #33353a;
    height: 100%;
}
</style>