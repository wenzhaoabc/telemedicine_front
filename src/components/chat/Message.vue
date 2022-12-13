<template>
    <div style="margin:0" @click="test">
        <p class="time">{{singleMsg.createTime}}</p>
        <div class="message-item flex" :class="{'me':singleMsg.senderId==info.actorId,'other':singleMsg.senderId!=info.actorId}">
            <div class="avator-box hvhd">
                <a-avatar :size="30">
                    <img v-if="info.actorId!=singleMsg.senderId" :src="props.avatar.avatar" alt="">
                    <img v-if="info.actorId==singleMsg.senderId" :src="info.userAvatar" alt="">
                </a-avatar>
            </div>
            
            <div class="message-box flex_column">
                <div class="cardcontain" style="text-align: right;">
                    <div>
                        <div class="bubble_arrow absolute" :class="{'right':singleMsg.senderId==info.actorId,'left':singleMsg.senderId!=info.actorId}">
                        </div>
                        <div class="bubble_cont" :class="{'bcright':singleMsg.senderId==info.actorId,'bcleft':singleMsg.senderId!=info.actorId}">
                            <div class="card1">
                                <p class="wordbreak puretext" v-if="(singleMsg.kind==0)">{{singleMsg.value}}</p>
                                <img :src="singleMsg.value" v-if="(singleMsg.kind==1)" style="width:100px" >
                                <audio :src="singleMsg.value" id="aud" ref="audio" controls="controls" v-if="(singleMsg.kind==2)"></audio>
                                <a href="#" v-if="singleMsg.kind==3" @click="showMedicine" > <img :src="medision" alt="" style="width:100px" > </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <a-modal v-model:visible="visible" :footer="false">
            <template #title>          
            药单
            </template>
            <a-table :columns="columns" :data="list" :pagination="false" /> 
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import {ref,onMounted,toRefs,reactive} from 'vue'
import { userInfo } from '@/stores/counter.js';
import medision from "@/assets/medision.png"

const info=userInfo();
const visible=ref(false);
// const me=ref(true);
var list=ref([]);
const props = defineProps({
  singleMsg: {
    senderId:Number,
    kind:Number,
    value:String,
    createTime:Date,
  },
  avatar:{
    avatar:String
  }
})

const columns = [
      {
        title: '药品名称',
        dataIndex: 'name',
      },
      {
        title: '用法用量',
        dataIndex: 'advice',
      },
    ];


const {singleMsg} = toRefs(props)
function test(){
    console.log(props.singleMsg.senderId);
}

function showMedicine(){
    visible.value=true;
    list.value=JSON.parse(singleMsg.value.value)
}
</script>

<style>
.bcright {
    margin-right: 11px;
    background: #e5f3fd;
}

.bcleft {
    margin-left: 11px;
    background: #fff;
}

.other {
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
}

.wordbreak{
    word-break: break-word;
}

.puretext {
    text-align: left;
    line-height: 20px;
    color: #333;
    font-size: 14px;
    margin-block-start: 0;
    margin-block-end: 0;
}

.card1 {
    position: relative;
    padding: 11px 16px;
    text-align: right;
}

.bubble_cont {
    
    text-align: left;
    border: 1px solid #e5e5e5;
    position: relative;
    max-width: 390px;
    margin-top: 1px;
    border-radius: 5px;
    box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
}

.right {
    border-top-color: #e5f3fd;
    border-left-color: #e5f3fd;
    top: 15px;
    right: 3px;
}

.absolute {
    position: absolute;
}

.bubble_arrow {
    width: 0;
    height: 0;
    z-index: 99;
    border: 5px solid rgba(0,0,0,0);
    border-top-color: #fff;
}

.right {
    border-top-color: #e5f3fd;
    border-left-color: #e5f3fd;
    top: 15px;
    right: 3px;
}

.left {
    border-top-color: #fff;
    border-right-color: #fff;
    top: 15px;
    left: 3px;
    
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
.right {
    border-top-color: #e5f3fd;
    border-left-color: #e5f3fd;
    top: 15px;
    right: 3px;
}

.hvhd {
    cursor: pointer;
}

.cardcontain {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: relative;
}

.flex_column {
    flex-flow: row nowrap;
    display: flex;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    -webkit-box-orient: vertical;
    flex-direction: column;
}

.message-box {
    -webkit-box-align: end;
    -webkit-align-items: flex-end;
    -ms-flex-align: end;
    align-items: flex-end;
}

.time {
    width: 100%;
    font-size: 12px;
    margin: 7px auto;
    color: #a3a7ae;
    text-align: center;
}

.avator-box {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 30px;
}

.message-item {
    padding: 8px 18px;
    position: relative;
}

.me {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
    -webkit-flex-direction: row-reverse;
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse;
}
</style>