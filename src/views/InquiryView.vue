<template>
    <div class="chat">
        <div class="chatbox">
            <SideBar :id=doctorId></SideBar>
            <MainForm :id=doctorId></MainForm>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SideBar from '@/components/chat/Sidebar.vue';
import MainForm from '@/components/chat/MainForm.vue';
import { onMounted,ref,onUnmounted  } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const doctorId=ref(null);
const recordId=ref(null);


onMounted(()=>{
    doctorId.value={doctorId:router.currentRoute.value.query.doctorId, recordId:router.currentRoute.value.query.recordId}
    console.log(doctorId.value);
    console.log(router.currentRoute.value.name)
    window.onbeforeunload = function (e) {
      console.log(router)
      if (router.currentRoute.value.name == "inquiry") {
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = '关闭提示1111';
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '关闭提示222';
      } else {
        window.onbeforeunload = null
      }
    };
})

</script>

<style scoped>
.chat {
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    background-image: url(https://tj-java-ee.oss-cn-shanghai.aliyuncs.com/pexels-moose-photos-1037992.jpg);
    background-size:cover
}

.chatbox {
    margin: auto;
    z-index: 223;
    position: absolute;
    left: 0;
    top: 10px;
    right: 0;
    bottom: 10px;
    border-radius: 5px;
    -webkit-transition: height .2s linear;
    transition: height .2s linear;
    background-color: #fff;
    -webkit-transition: padding .3s linear;
    width: 1150px;
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
    -webkit-box-direction: normal;
}
</style>