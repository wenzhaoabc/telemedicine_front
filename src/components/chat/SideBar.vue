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
                <div class="bottom">
                    <a-button type="primary" status="danger" style="width:100%">结束咨询</a-button>
                </div>
            </div>
            <div v-if="info.role==1">
                <div class="fontstyle" style="margin-top:20px">
                    <div style="font-weight:bold; display: inline">病症描述:</div>
                    <span>{{problem}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref,onMounted,toRefs} from 'vue'
import { getDoctor } from '@/api/personalInfo.js'
import { userInfo } from '@/stores/counter.js';
import { getProblem } from '@/api/diagnosis.js'
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
onMounted(()=>{
    setTimeout(()=>{
        updateInfo()
    },200)
    bus.on('idChange',newId=>{
        id.value.doctorId=newId.doctorId
        id.value.recordId=newId.recordId
        updateInfo()
        gainProblem()
    })
})
const usertype=ref(true);

function updateInfo(){
    getDoctor(id.value.doctorId).then(response=>{
        if(response.status==200){
            console.log("获得信息成功")
            doctorInfo.value=response.data
            console.log(doctorInfo.value)
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