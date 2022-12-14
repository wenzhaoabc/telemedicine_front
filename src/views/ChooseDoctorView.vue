<template>
    <div>
        <div class="g-container">
            <div class="title-bar">
                <h2>快速问诊</h2>
                <span class="slogan">专家在线快速接诊</span>
            </div>
            <div class="consult-bar">
                <div class="consult-fm">
                    <a-input-search :style="{width:'500px'}" placeholder="输入您的问题，我们将为您选择合适的医生" search-button>
                        <template #button-icon>
                            <icon-search/>
                        </template>
                        <template #button-default>
                            搜索
                        </template>
                    </a-input-search>
                    <!-- <a-input-search style="width:500px;padding: 0px;" placeholder=""/> -->
                </div>
            </div>
            <a-tabs type="card" trigger="hover" style="margin-top:20px">
                    <a-tab-pane v-for="(item, index) of department" :key="index" :title="item">
                        <div  v-for="(doctor,index) of doctors" >
                            <ChooseDoctor :key="index" :doctorInfo="doctor" v-if="(doctor.department==item)" ></ChooseDoctor>    
                        </div>
                        
                    </a-tab-pane>
            </a-tabs>
            
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import ChooseDoctor from '@/components/DoctorDisPlayBlock.vue'
import { getDoctors } from '@/api/personalInfo.js'
const department=ref(['内科','外科','妇产科','儿科','皮肤科','耳鼻咽喉科','眼科','口腔科','精神科','中医科'])

const doctors=ref([])
onMounted(()=>{
    getDoctors().then(response=>{
        if(response.status==200){
            doctors.value=response.data;
            console.log(doctors.value)
            console.log("获取医生信息成功")
        }
        else{
            console.log("获取医生信息失败")
        }
    }).catch(e=>{
        console.log(e)
        console.log("获取医生信息失败")
    })
})

</script>

<style>
.consult-fm {
    overflow: hidden;
    position: relative;
    border-radius: 3px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
}

.title-bar h2 {
    display: inline-block;
    font-size: 24px;
}

.consult-bar {
    padding: 20px;
    background-color: #F9FAFC;
    border-bottom: 2px solid #3491b3;
    -webkit-box-shadow: 0 3px 3px rgb(0 0 0 / 10%);
    box-shadow: 0 3px 3pxrgba(0,0,0,.1);
}

.slogan {
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
    color: #bcbcbc;
}
.g-container {
    width: 1200px;
    margin: 0 auto 40px;
    margin-top: 27px;
    min-height: 780px;
}

.title-bar {
    position: relative;
    margin-bottom: 15px;
}
</style>