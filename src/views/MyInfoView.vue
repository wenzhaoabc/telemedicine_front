<template>
    <a-layout class="layout-demo">
        <a-layout-sider collapsible breakpoint="xl">
            <div class="avatar">
                <a-avatar :style="{ backgroundColor: '#3370ff' }" :size="50">
                    <img alt="avatar" :src="userAvatar" />
                </a-avatar>
            </div>
            <div class="name">
                {{ userName }}
            </div>
            <a-menu :default-selected-keys="['myInfo']" :style="{ width: '100%' }" @menu-item-click="onClickMenuItem">
                <a-menu-item key="myInfo">
                    <IconHome></IconHome>
                    我的信息
                </a-menu-item>
                <a-menu-item key="myRecord">
                    <icon-message />
                    我的订单
                </a-menu-item>
                <!-- <a-menu-item key="myPost">
                    <IconCalendar></IconCalendar>
                    我的帖子
                </a-menu-item> -->
                <a-menu-item key="beDoctor">
                    <icon-user />
                    医生认证
                </a-menu-item>
            </a-menu>
            <!-- trigger -->
            <template #trigger="{ collapsed }">
                <IconCaretRight v-if="collapsed"></IconCaretRight>
                <IconCaretLeft v-else></IconCaretLeft>
            </template>
        </a-layout-sider>



        <a-layout style="padding: 24px;" v-if="choose == 'myInfo'">
            <a-layout-header style="height: 200px;">
                <div class="header">
                    <a-upload action="/" :show-file-list="false" accept="image/png, image/jpeg" @before-upload="submit">
                        <template #upload-button>
                            <a-avatar :size="100" trigger-type="mask">
                                <img alt="avatar" :src="userAvatar" />
                                <template #trigger-icon>
                                    <IconEdit />
                                </template>
                            </a-avatar>
                        </template>
                    </a-upload>
                    <span>
                        <span>&nbsp;{{ userName }}</span><br />
                        <span class="header_name">{{ introduction }}</span>
                    </span>
                </div>``

                <div class="button_pos">
                    <a-button type="outline" size="large">修改密码</a-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a-button type="outline" size="large">退出登录</a-button>
                </div>
            </a-layout-header>

            <a-divider />

            <a-layout-content style="text-align: left;" v-if="infoShow">
                <div class="button2_pos">
                    <a-button type="outline" size="large" @click="changeInfo">编辑信息</a-button>
                </div>
                <a-descriptions style="margin-left: 50px;width: 500px;" :data="info" title="用户信息" :column="1" />
            </a-layout-content>
            <a-layout-content style="text-align: left;" v-else>

                <div class="arco-descriptions arco-descriptions-layout-horizontal arco-descriptions-size-medium"
                    data-v-47521027="" style="margin-left: 50px; width: 600px;">
                    <div class="arco-descriptions-title">用户信息</div>
                    <div class="arco-descriptions-body">
                        <table class="arco-descriptions-table">
                            <tbody>
                                <tr class="arco-descriptions-row" style="height:50px">
                                    <td class="arco-descriptions-item-label arco-descriptions-item-label-block"
                                        style="text-align: left;">昵称</td>
                                    <!-- <td class="arco-descriptions-item-value arco-descriptions-item-value-block"
                                        colspan="1" style="text-align: left;" contenteditable="true">同小济</td> -->
                                    <a-input style="width:200px" v-model="userName"
                                        :max-length="{ length: 10, errorOnly: true }" show-word-limit></a-input>
                                    <td class="arco-descriptions-item-label arco-descriptions-item-label-block"
                                        style="text-align: left;">性别</td>

                                    <a-select v-model="genderStr" style="width:200px">
                                        <a-option value="男">男</a-option>
                                        <a-option value="女">女</a-option>
                                    </a-select>
                                </tr>
                                <tr class="arco-descriptions-row" style="height:50px">
                                    <td class="arco-descriptions-item-label arco-descriptions-item-label-block"
                                        style="text-align: left;">手机号</td>
                                    <td class="arco-descriptions-item-value arco-descriptions-item-value-block"
                                        colspan="1" style="text-align: left;">{{ phone }}</td>
                                    <td class="arco-descriptions-item-label arco-descriptions-item-label-block"
                                        style="text-align: left;">年龄</td>
                                    <a-input-number v-model="age" style="width:200px"></a-input-number>
                                </tr>

                                <tr class="arco-descriptions-row">
                                    <td class="arco-descriptions-item-label arco-descriptions-item-label-block"
                                        style="text-align: left;">个人简介</td>
                                    <a-textarea v-model="introduction"
                                        style="height:100px;width:200px;word-wrap:break-word;word-break:break-normal" />
                                </tr>
                            </tbody>
                        </table>
                        <div class="button3_pos">
                            <a-button type="primary" size="large" @click="submitInfo">确认</a-button>
                            &nbsp;&nbsp;
                            <a-button type="outline" size="large" @click="cancel">取消</a-button>
                        </div>

                    </div>
                </div>
            </a-layout-content>
        </a-layout>



        <a-layout style="padding: 24px;" v-if="choose == 'beDoctor'">
            <a-layout-content>
                <div v-if="role == 1" style="color: black;">
                    <div><icon-face-smile-fill :size="100" /></div>
                    <font size="100px">您已经认证成功！</font>
                </div>
                <div v-else>
                    <div class="arco-descriptions arco-descriptions-layout-horizontal arco-descriptions-size-medium"
                        data-v-47521027="" style="margin-left: 50px; width: 600px;">
                        <div class="arco-descriptions-body">
                            <table class="arco-descriptions-table">
                                <tbody>
                                    <tr class="arco-descriptions-row" style="height:50px">
                                        <td class="arco-descriptions-item-label arco-descriptions-item-label-block"
                                            style="text-align: left;">就职医院</td>
                                        <td class="arco-descriptions-item-value arco-descriptions-item-value-block"
                                            colspan="1" style="text-align: left;">
                                            <a-input style="width:400px;" v-model="hospital"
                                                :max-length="{ length: 20, errorOnly: true }" show-word-limit></a-input>
                                        </td>
                                    </tr>

                                    <tr class="arco-descriptions-row" style="height:50px">
                                        <td class="arco-descriptions-item-label arco-descriptions-item-label-block"
                                            style="text-align: left;">科室</td>
                                        <td class="arco-descriptions-item-value arco-descriptions-item-value-block"
                                            colspan="1" style="text-align: left;">
                                            <a-select v-model="department" style="width:200px">
                                                <a-option value="外科">外科</a-option>
                                                <a-option value="内科">内科</a-option>
                                                <a-option value="耳鼻喉科">耳鼻喉科</a-option>
                                            </a-select>
                                        </td>
                                    </tr>

                                    <tr class="arco-descriptions-row" style="height:50px">
                                        <td class="arco-descriptions-item-label arco-descriptions-item-label-block"
                                            style="text-align: left; ">医龄</td>
                                        <td class="arco-descriptions-item-value arco-descriptions-item-value-block"
                                            colspan="1" style="text-align: left;">
                                            <a-input-number v-model="serviceYear" style="width:80px"
                                                :max="100"></a-input-number>年
                                        </td>
                                    </tr>

                                    <tr class="arco-descriptions-row">
                                        <td class="arco-descriptions-item-label arco-descriptions-item-label-block"
                                            style="text-align: left;">个人简介</td>
                                        <td class="arco-descriptions-item-value arco-descriptions-item-value-block"
                                            colspan="1" style="text-align: left;">
                                            <a-textarea v-model="introduction"
                                                style="height:120px;width:400px;word-wrap:break-word;word-break:break-normal" />
                                        </td>
                                    </tr>

                                    <tr class="arco-descriptions-row">
                                        <td class="arco-descriptions-item-label arco-descriptions-item-label-block"
                                            style="text-align: left;">擅长领域</td>
                                        <td class="arco-descriptions-item-value arco-descriptions-item-value-block"
                                            colspan="1" style="text-align: left;">
                                            <a-textarea v-model="field"
                                                style="height:120px;width:400px;word-wrap:break-word;word-break:break-normal" />
                                        </td>
                                    </tr>

                                    <tr class="arco-descriptions-row">
                                        <td class="arco-descriptions-item-label arco-descriptions-item-label-block"
                                            style="text-align: left;">请上传您的医师执业证书</td>
                                        <td class="arco-descriptions-item-value arco-descriptions-item-value-block"
                                            colspan="1" style="text-align: left;">
                                            <a-upload action="/" :fileList="file ? [file] : []" :show-file-list="false"
                                                @change="onChange" @progress="onProgress">
                                                <template #upload-button>
                                                    <div :class="`arco-upload-list-item${file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
                                                    }`">
                                                        <div class="arco-upload-list-picture custom-upload-avatar"
                                                            v-if="file && file.url">
                                                            <img :src="file.url" />
                                                            <div class="arco-upload-list-picture-mask">
                                                                <IconEdit />
                                                            </div>
                                                            <a-progress
                                                                v-if="file.status === 'uploading' && file.percent < 100"
                                                                :percent="file.percent" type="circle" size="mini"
                                                                :style="{
                                                                    position: 'absolute',
                                                                    left: '50%',
                                                                    top: '50%',
                                                                    transform: 'translateX(-50%) translateY(-50%)',
                                                                }" />
                                                        </div>
                                                        <div class="arco-upload-picture-card" v-else>
                                                            <div class="arco-upload-picture-card-text">
                                                                <IconPlus />
                                                                <div style="margin-top: 10px; font-weight: 600">Upload
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </a-upload>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="button4_pos">
                                <a-button type="primary" size="large" @click="submitInfo">立即认证</a-button>
                            </div>

                        </div>
                    </div>
                </div>
            </a-layout-content>
        </a-layout>

        <!-- 我的帖子-->
        <!-- <a-layout style="padding: 24px;" v-if="choose == 'myPost'">
            <a-layout-content>
                <a-list class="list-demo-action-layout" :bordered="false" :data="dataSource"
                    :pagination-props="paginationProps" style="width: 80%;text-align: left;margin-left: 10%;">
                    <template #item="{ item }">
                        <a-list-item class="list-demo-item" action-layout="vertical">
                            <template #actions>
                                <span><icon-heart />83</span>
                                <span><icon-star />{{ item.index }}</span>
                            </template>
                            <template #extra>
                                <div className="image-area">
                                    <img alt="arco-design" :src="item.imageSrc" />
                                </div>
                            </template>
                            <a-list-item-meta :title="item.title" :description="item.description">
                                <template #avatar>
                                    <a-avatar shape="square">
                                        <img alt="avatar" :src="userAvatar" />
                                    </a-avatar>
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </template>
                </a-list>
            </a-layout-content>
        </a-layout> -->


        <!-- 我的订单-->
        <a-layout style="padding: 24px;" v-if="choose == 'myRecord'">
            <a-layout-content>
                <a-list style="width: 80%;margin-left: 10%;text-align: left;" :pagination-props="paginationProps">
                    <a-list-item v-for="record in recordList">
                        <a-list-item-meta :title="record.doctorName" :description="record.doctorInfo">
                            <template #avatar>
                                <a-avatar shape="square">
                                    <img alt="avatar" :src="record.doctorAvatar" />
                                </a-avatar>
                            </template>
                        </a-list-item-meta>
                        <template #actions>
                            <a-tooltip content="查看药单">
                                <icon-bookmark @click="openList(record)" />
                                <a-modal v-model:visible="visible" :footer="false">
                                    <template #title>
                                        药单
                                    </template>
                                    <a-table :columns="columns" :data="list" :pagination="false" />
                                </a-modal>
                            </a-tooltip>
                            {{ record.startTime }}
                        </template>
                    </a-list-item>
                </a-list>

            </a-layout-content>
        </a-layout>


    </a-layout>
</template>
<script>
import { ref } from 'vue';
import { reactive, onMounted } from 'vue';
import { userInfo } from '@/stores/counter.js';
import { doctorStore } from "../stores/doctor";
import { storeToRefs } from 'pinia';
import axios from "axios"
const names = ['Socrates', 'Balzac', 'Plato'];


export default {
    setup() {
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
        const list = ref();
        const visible = ref(false);
        var infoShow = ref(true);
        const store = userInfo();
        const choose = ref("myInfo");
        const { actorId, userName, gender, age, phone, introduction, userAvatar, hospital, serviceYear, department, field, score, role } = storeToRefs(store);
        const nameBackup = userName
        const genderStr = ref(gender == 1 ? "男" : "女")
        const genderBackup = genderStr
        const ageBackup = age
        const introductionBackup = introduction
        const file = ref();
        const recordList = ref()
        const onChange = (_, currentFile) => {
            file.value = {
                ...currentFile,
                // url: URL.createObjectURL(currentFile.file),
            };
        };
        onMounted(() => {

            axios({
                method: 'get',
                url: '/user/record',
                params: {
                    patientId: actorId.value
                }
            }).then((res) => {
                if (res.data) {
                    recordList.value = res.data
                }
            })

        })
        const info = [{
            label: '昵称',
            value: store.userName,
        }, {
            label: '手机号',
            value: store.phone,
        }, {
            label: '性别',
            value: genderStr.value
        }, {
            label: '年龄',
            value: store.age,
        }, {
            label: '个人简介',
            value: store.introduction
        }];

        return {
            columns,
            list,
            visible,
            recordList,
            role,
            field,
            serviceYear,
            hospital,
            score,
            department,
            choose,
            infoShow,
            actorId,
            userName,
            genderStr,
            age,
            phone,
            introduction,
            userAvatar,
            info,
            nameBackup,
            genderBackup,
            ageBackup,
            introductionBackup,
            file,
            onChange,

        }
    },
    methods: {
        openList(record) {
            this.visible = true;
            this.list = JSON.parse(record.value)
        },
        onClickMenuItem(key) {
            this.choose = key
        },
        changeInfo() {
            console.log(123)
            this.infoShow = false;
        },
        submit(file) {
            let formData = new FormData();
            formData.append("photo", file);//拿到存在fileList的文件存放到formData中
            formData.append("actorId",this.actorId);
            axios({
                headers:
                    { "Content-Type": "multipart/form-data;charset=utf-8" },
                method: 'post',
                data: formData,
                url: '/user/avatar',
            }).then((res) => {
                if (res.data) {
                    this.userAvatar = res.data
                }
                else {
                    console.log("404")
                }
            }, error => {
                console.log("上传失败")
            })
        },
        submitInfo() {
            this.infoShow = true;
            this.info = [{
                label: '昵称',
                value: this.userName,
            }, {
                label: '手机号',
                value: this.phone,
            }, {
                label: '性别',
                value: this.genderStr
            }, {
                label: '年龄',
                value: this.age,
            }, {
                label: '个人简介',
                value: this.introduction
            }]
            this.gender = (this.genderStr == "男" ? 1 : 0)
            axios({
                headers:
                    { "Content-Type": "multipart/form-data;charset=utf-8" },
                method: 'post',
                data: {
                    actorId: this.actorId,
                    name: this.userName,
                    gender: this.gender,
                    introduction: this.introduction,
                    age: this.age,
                    phone: this.phone,
                    imgSrc: this.userAvatar
                },
                url: '/user/info',
            }).then((res) => {
                if (res.data) {
                    console.log("修改成功！")
                }
                else {
                    console.log("404")
                }
            }, error => {
                console.log("上传失败")
            })
        },
        cancel() {
            console.log(this.role)
            this.infoShow = true;
            this.name = this.nameBackup
            this.genderStr = this.genderBackup
            this.age = this.ageBackup
            this.introduction = this.introductionBackup
            this.info = [{
                label: '昵称',
                value: this.name,
            }, {
                label: '手机号',
                value: this.phone,
            }, {
                label: '性别',
                value: this.genderStr
            }, {
                label: '年龄',
                value: this.age,
            }, {
                label: '个人简介',
                value: this.introduction
            }]
        }
    }
}
</script>


<style scoped>
.avatar {
    height: 50px;
    width: 50px;
    padding-left: 77px;
    padding-top: 30px;
}

.name {
    height: 30px;
    text-align: center;
    padding-top: 10px;
}

.list {
    text-align: left;
    width: 400px;
}

.header {
    padding-left: 70px;
    padding-top: 50px;
    width: 300px;
    height: 100px;
    font-size: 20px;
}

.header_name {
    position: absolute;
    top: 165px;
    left: 403px;
    font-size: 10px;
    color: darkgrey;
}

.button_pos {
    position: absolute;
    top: 150px;
    right: 100px;
}

.button2_pos {
    position: absolute;
    top: 450px;
    right: 100px;
}

.button3_pos {
    position: absolute;
    top: 580px;
    right: 700px;
}

.button4_pos {
    position: absolute;
    top: 600px;
    right: 650px;
}

.layout-demo {
    height: 668px;
    background: var(--color-fill-2);
    border: 1px solid var(--color-border);
}

.layout-demo :deep(.arco-layout-sider) .logo {
    height: 32px;
    margin: 12px 8px;
    background: rgba(255, 255, 255, 0.2);
}

.layout-demo :deep(.arco-layout-sider-light) .logo {
    background: var(--color-fill-2);
}

.layout-demo :deep(.arco-layout-header) {
    height: 64px;
    line-height: 64px;
    background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer) {
    height: 48px;
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    line-height: 48px;
}

.layout-demo :deep(.arco-layout-content) {
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color-white);
    font-size: 16px;
    font-stretch: condensed;
    text-align: center;
}

.list-demo-action-layout .image-area {
    width: 183px;
    height: 119px;
    border-radius: 2px;
    overflow: hidden;
}

.list-demo-action-layout .list-demo-item {
    padding: 20px 0;
    border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
    width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
    margin: 0 4px;
}
</style>