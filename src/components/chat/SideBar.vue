<template>
    <div class="msglist">
        <div class="avatar" v-if="usertype">
            <div >
                <a-avatar  :size="100">医生头像</a-avatar>
            </div>
        </div>
        <div style="width:90%;margin-left:5%">
            <div class="hcqStyle2">
                <div style="line-height: 30px;">
                    医生姓名 年龄 性别
                </div>
                <div style="line-height: 30px; margin-top:10px ;">
                    医生所属医院/部门
                </div>
            </div>
            <div class="fontstyle" style="margin-top:20px">
                <div style="font-weight:bold; display: inline">
                    个人简介:
                </div>
                <span>副主任医师，毕业于山西医科大学儿科专业，从事儿科临床工作30多年，曾先后多次前往北京等地进修学习。 副主任医师，毕业于山西医科大学儿科专业，从事儿科临床工作30多年，曾先后多次前往北京等地进修学习。  副主任医师，毕业于山西医科大学儿科专业，从事儿科临床工作30多年，曾先后多次前往北京等地进修学习。</span>
            </div>
            <div class="fontstyle" style="margin-top:20px">
                <div style="font-weight:bold; display: inline">
                    擅长邻域:
                </div>
                <span>新生儿黄疸,扁桃体炎,小儿感冒,腹泻,肺炎,咽炎,感冒,小儿腹股沟斜疝,手足口病 副主任医师，毕业于山西医科大学儿科专业，从事儿科临床工作30多年，曾先后多次前往北京等地进修学习。 副主任医师，毕业于山西医科大学儿科专业，从事儿科临床工作30多年，曾先后多次前往北京等地进修学习。</span>
            </div>
            <div class="fontstyle" style="margin-top:20px">
                <div style="font-weight:bold; display: inline">
                    联系电话:
                </div>
                <span>11111111111</span>
            </div>
            <div class="bottom">
                <a-button type="primary" status="danger">结束咨询</a-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
const usertype=ref(true);
</script>

<style scoped>
.bottom{
    position: absolute;
    bottom: 1%;
    margin:0 auto;
    width:50px;
    left:135px;
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
}

.fontstyle{
    color:#e6e6e6;
    font-family:"微软雅黑","黑体","宋体";
    font-size:15px;
    line-height: 20px;
    text-align: center;
    max-height:100px;
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