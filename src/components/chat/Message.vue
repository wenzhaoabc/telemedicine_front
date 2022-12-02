<template>
    <div style="margin:0">
        <p class="time">{{singleMsg.time}}</p>
        <div class="message-item flex" :class="{'me':singleMsg.me,'other':!singleMsg.me}">
            <div class="avator-box hvhd">
                <a-avatar :size="30">A</a-avatar>
            </div>
            
            <div class="message-box flex_column">
                <div class="cardcontain" style="text-align: right;">
                    <div>
                        <div class="bubble_arrow absolute" :class="{'right':singleMsg.me,'left':!singleMsg.me}">
                        </div>
                        <div class="bubble_cont" :class="{'bcright':singleMsg.me,'bcleft':!singleMsg.me}">
                            <div class="card1">
                                <p class="wordbreak puretext" v-if="singleMsg.type==1">{{singleMsg.msg}}</p>
                                <audio :src="singleMsg.msg" id="aud" ref="audio" controls="controls" v-if="singleMsg.type==2"></audio>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
// const me=ref(true);
defineProps({
  singleMsg: {
    me:Boolean,
    type:Number,
    msg:String,
    time:Date
  }
})
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