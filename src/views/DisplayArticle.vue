<template>
    <div class="center" v-if="article">
        <div class="">
            <h2>
                {{ article.title }}
            </h2>
            <div>
                <a-comment :author="author.name" :content="author.work" align="right" class="avatar">
                    <template #avatar>
                        <a-avatar>
                            <img alt="avatar" :src="author.avatar" />
                        </a-avatar>
                    </template>
                </a-comment>
                <a-button class="lovebtn" :type="UpDown.love ? 'primary' : 'secondry'"
                    @click="UpDown.love = !UpDown.love">关注</a-button>
            </div>
            <!-- <button>dewiufge</button> -->
            <div class="textarea" v-html="article.content">

            </div>
            <div class="tags">
                <!-- 标签 -->
                <a-space wrap style="width: 850px;">
                    <a-tag v-for="(tag, index) of tags" :key="tag" :color="colors[index]">
                        {{ tag }}
                    </a-tag>
                </a-space>
            </div>
            <div>
                <!-- 评论信息 -->
                <a-space>
                    <a-button :type="UpDown.up ? 'primary' : 'text'" @click="clickUporDown('up')">
                        <template #icon>
                            <icon-thumb-up-fill />
                        </template>
                        <template #default>{{ UpDown.helpful + (UpDown.up ? 1 : 0) }}</template>
                    </a-button>
                    <a-button :type="!UpDown.down ? 'text' : 'primary'" @click="clickUporDown('down')">
                        <template #icon>
                            <icon-thumb-down-fill />
                        </template>
                        <template #default>{{ UpDown.unHelpful + (UpDown.down ? 1 : 0) }}</template>
                    </a-button>
                    <a-button type="text" @click="clickUporDown('review')">
                        <template #icon>
                            <icon-message />
                        </template>
                        <template #default>{{ UpDown.reviewNum + (UpDown.isReview ? 1 : 0) }}</template>
                    </a-button>
                </a-space>
                <ReviewListVue v-if="article" :father="article.articleId" :fathertype="'article'"
                    :total="article.reviewNum">
                </ReviewListVue>
            </div>
        </div>
    </div>
</template>

<script>
import ReviewListVue from '../components/ReviewList.vue';
import { useRoute } from 'vue-router'
import axios from 'axios';
const route = useRoute()
export default {
    components: { ReviewListVue },
    data() {
        return {
            article: null,
            // article: {
            //     articleId: null,
            //     actorId: null,
            //     title: null,
            //     content: null,
            //     createTime: null,
            //     upNum: null,
            //     downNum: null,
            //     reviewNum: null,
            // },
            author: {
                actorId: null,
                name: null,
                avatar: null,
                gender: null,
                selfDesc: null,
            },
            tags: ['artcile'],

            colors: ['orangered', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'arcoblue', 'purple', 'pinkpurple', 'magenta', 'gray'],
            UpDown: {
                up: false, down: false, love: false,
                helpful: 0, unHelpful: 0, reviewNum: 0,
                isReview: false
            } // up/down为true代表用户态度，
        }
    },
    methods: {
        clickUporDown(type) {
            if (type == 'up') {
                if (this.UpDown.up === false) {
                    this.UpDown.up = true
                    this.UpDown.down = false
                } else {
                    this.UpDown.up = false
                }
            } else if (type === 'down') {
                if (this.UpDown.down === false) {
                    this.UpDown.down = true
                    this.UpDown.up = false
                } else {
                    this.UpDown.down = false
                }
            } else {

            }
        },

        async getData() {
            let articleId = this.$route.params.id
            await axios.get(`/api/article?articleId=${articleId}`)
                .then((res) => {
                    this.article = res.data
                    console.log(res.data)
                }).catch(() => {
                    this.$message.error("请求失败")
                })
            // 获取作者信息
            if (this.article.actorId != null) {
                await axios.get(`/api/forum/userInfo?userId=${this.article.actorId}`)
                    .then((res) => {
                        this.author = res.data
                    }).catch(() => {
                        this.$message.error("获取作者信息失败")
                    })
                // await axios.get(`/api/action/article`)
            }
        },
        upUserReview() {

        }
    },
    mounted() {
        this.getData()
    },
    unmounted() {
        this.upUserReview()
    }
}
</script>

<style  scoped>
.center {
    /* flex-direction: column; */
    display: flex;
    justify-content: center;
    align-content: space-between;
    width: 800px;
    margin: 0 auto;
    /* align-items: center; */
}

.tags {
    margin: 10px 0;
}

.avatar {
    display: inline-flex;
}

.lovebtn {
    margin-left: 600px;
}
</style>
<style>
.textarea {
    font-size: medium;
    line-height: 1.2em;
}

.textarea img {
    max-width: 400px;
    /* margin: auto auto; */
}
</style>