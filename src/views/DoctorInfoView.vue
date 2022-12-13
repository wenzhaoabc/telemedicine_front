<template>
    <div class="part1">
        <div class="block">
            <div class="img">
                <img :src="photo" height="250">
            </div>
            <div class="text-box">
                <div class="dorname">
                    <span class="title1" style="padding-right: 20px;">{{ name }}</span> <a-rate :count="10"
                        v-model="score" readonly allow-half="true" />
                    <div class="title2">{{ hospital }}&nbsp;|&nbsp;{{ department }}&nbsp;|&nbsp;医龄{{ serviceYear }}年</div>
                    <div class="title2">擅长领域：{{ field }}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="part3">
        <div class="block">
            <a-divider />
            <div class="title1">详细介绍</div>
            <div class="desc">
                <p style="text-indent:2em;">
                    <span style="line-height:2;">
                        {{ introduction }}
                    </span>
                </p>
            </div>
        </div>
    </div>

    <div class="part4">
        <div class="block">
            <a-divider />
            <div class="title1">患者评价</div>
            <div class="review">
                <a-list :bordered="false" :split="false">
                    <a-list-item v-for="item in reviews" :key="idx">
                        <a-list-item-meta :title="item.patientName"
                            :description="item.review">
                            <template #avatar>
                                <a-avatar shape="square">
                                    <img alt="avatar"
                                        :src="item.patientPhoto" />
                                </a-avatar>
                            </template>
                        </a-list-item-meta>
                        <template #actions>
                            <a-rate v-model="item.score" readonly allow-half="true" :count="10"/>
                        </template>
                    </a-list-item>
                </a-list>
            </div>
        </div>
    </div>
</template>
<script>
import { getDoctor } from '@/api/personalInfo.js'
import axios from "axios"
export default {
    data() {
        return {
            name: "",
            hospital: "",
            department: "",
            serviceYear: "",
            field: "",
            introduction: "",
            score: "",
            photo: "",
            reviews: []
        }
    },
    created() {
        var id = this.$route.params.id;
        this.getDoctorInfo(id)
        axios({
            method: 'get',
            url: '/api/personalInfo/getDoctorReviews',
            params: { doctorId: id }
        }).then(response => {
            if (response.status == 200) {
                this.reviews = response.data;
                console.log(this.reviews)
            }
            else {
                console.log("获得消息失败")
            }
        }).catch(e => {
            console.log(e)
            console.log("获得消息失败")
        })
    },
    methods: {
        getDoctorInfo(id) {
            getDoctor(id).then(response => {
                if (response.status == 200) {
                    this.name = response.data.name;
                    this.hospital = response.data.hospital;
                    this.department = response.data.department;
                    this.serviceYear = response.data.seviceYear;
                    this.field = response.data.field;
                    this.score = response.data.score;
                    this.introduction = response.data.introduction;
                    this.photo = response.data.photo;
                }
                else {
                    console.log("获得消息失败")
                }
            }).catch(e => {
                console.log(e)
                console.log("获得消息失败")
            })
        }
    }
}

</script>
<style>
.part1 {
    padding-top: 60px;
}

.part3 {
    padding-top: 68px;
}

.part4 {
    padding-top: 68px;
    padding-bottom: 68px;
}

.block {
    width: 1230px;
    margin: 0 auto;
    position: relative;
}

.part1 .img {
    width: 237px;
    height: 347px;
    overflow: hidden;
    float: left;
}

.part1 .text-box {
    margin-left: 306px;
}

.part1 .dorname {
    background: url(../../bg.png) repeat-x left bottom;
    padding-bottom: 60px;
    margin-bottom: 45px;
    padding-top: 38px;
}

.part3 .desc {
    font-size: 14px;
    color: #333333;
    line-height: 22px;
    padding-top: 26px;
}

.title1 {
    font-size: 24px;
    color: #333333;
}

.part1 .title2 {
    font-size: 14px;
    color: #474747;
    margin-top: 20px;
    line-height: 1.4;
}

.part3 .desc p {
    margin-bottom: 20px;
    margin-top: 0px
}

.review {

    padding-top: 30px;
}
</style>