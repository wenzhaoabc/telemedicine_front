<template>
    <div>
        <div class="topic">
            <div>
                <p v-if="withTitle" @click="goTopicPage(qaitem.question.qId)" class="mouse-hover topic-title">
                    {{ qaitem.question.title }}
                </p>
                <a-space v-if="textExpanded.value"></a-space>
                <div :class="textExpanded.value ? '' : 'mouse-hover'" title="">
                    <div v-show="textExpanded.value || withAvatar">
                        <!-- 展示发帖人信息 -->
                        <a-space>
                            <a-avatar :size="30">
                                <img alt="USER" :src="qaitem.actor.avatar" />
                            </a-avatar>
                            <span>{{ qaitem.actor.name }}</span>
                        </a-space>
                    </div>
                    <!-- 帖子内容 -->
                    <div>
                        <div :class="contentStyle" class="topic-content" v-html="qaitem.answer.content"
                            @click="readAllText">
                        </div>
                    </div>
                    <div>
                        <a-button v-show="!textExpanded.value" @click="readAllText" type="text">
                            <template #icon>
                                <icon-double-down />
                            </template>
                            <template #default>阅读全文</template>
                        </a-button>
                    </div>
                    <div v-show="textExpanded.value">
                        <p class="edit-time">编辑于{{ new Date(qaitem.answer.createTime).toLocaleDateString() }}</p>
                    </div>
                </div>
                <div :class="reviewExpanded ? 'post-button' : ''">
                    <a-space>
                        <a-button :type="UpDown.isHelpful ? 'primary' : 'text'" @click="clickUporDown('up')">
                            <template #icon>
                                <icon-thumb-up-fill />
                            </template>
                            <template #default>{{ qaitem.answer.upNum + (UpDown.isHelpful ? 1 : 0) }}</template>
                        </a-button>
                        <a-button :type="!UpDown.isUnhelpful ? 'text' : 'primary'" @click="clickUporDown('down')">
                            <template #icon>
                                <icon-thumb-down-fill />
                            </template>
                            <template #default>{{ qaitem.answer.downNum + (UpDown.isUnhelpful ? 1 : 0) }}</template>
                        </a-button>
                        <a-button type="text" @click="clickUporDown('review')">
                            <template #icon>
                                <icon-message />
                            </template>
                            <template #default>{{ qaitem.answer.reviewNum + (UpDown.isReview ? 1 : 0) }}</template>
                        </a-button>
                        <a-button @click="readLessText" v-if="textExpanded.value" type="text"
                            style="margin-left:325px ;">
                            <template #icon>
                                <icon-double-up />
                            </template>
                            <template #default>收起</template>
                        </a-button>
                    </a-space>
                </div>
            </div>
            <div v-if="reviewExpanded">
                <ReviewListVue :father="qaitem.answer.aId" :fathertype="'answer'" :total="qaitem.answer.reviewNum">
                </ReviewListVue>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ReviewListVue from './ReviewList.vue'
// import userStore from '../stores/user'
import { userInfo } from '@/stores/counter.js';

const actor = userInfo()

export default {
    components: { ReviewListVue },
    props: {
        qaitem: Object,
        withTitle: { type: Boolean, default: true },
        withAvatar: { type: Boolean, default: false }
    },
    data() {
        return {
            // 是否展开全文
            textExpanded: { value: false },
            // 对该post点赞/点踩/评论
            UpDown: {
                isHelpful: null,
                isUnhelpful: null,
                isReview: null,
            },
            reviewList: [],
            reviewAction: new Array(),
            // 是否展开了评论
            reviewExpanded: false,
            // qaitem的结构
            qaitem_e: {
                question: { q_id: '1234567890', title: '这是问题的标题' },
                answer: {
                    a_id: '1234567890', q_id: '1234567890', actor_id: '回答用户id', content: '回答的内容', create_time: '回答时间',
                    up_num: 100, down_num: 23, review_num: 6
                },
                actor: { actor_id: 46819889, name: '用户名', avatar: '用户头像url' }
            }
        }
    },
    methods: {
        goTopicPage() {
            console.log('。。。打开话题主页')
            this.$router.push({ path: `/question/${this.$props.qaitem.question.qId}` })
        },
        readAllText() {
            if (this.textExpanded.value === false)
                this.textExpanded.value = true
        },
        readLessText() {
            this.textExpanded.value = false
        },
        // 获取用户对回答的点踩情况
        getUpDown() {
            axios.get(`/forum/vote/answer/${this.$props.qaitem.answer.a_id}`)
                .then((res) => {
                    this.UpDown.isHelpful = res.data.up
                    this.UpDown.isUnhelpful = res.data.down
                    this.UpDown.isReview = res.data.review
                }).catch((err) => {
                    console.log('请求失败')
                })
        },
        // 对post点赞/点踩
        clickUporDown(status) {
            if (status === 'up') {
                this.UpDown.isHelpful = !this.UpDown.isHelpful
                this.UpDown.isUnhelpful = this.UpDown.isHelpful ? false : null
            } else if (status === 'down') {
                this.UpDown.isUnhelpful = !this.UpDown.isUnhelpful
                this.UpDown.isHelpful = this.UpDown.isUnhelpful ? false : null
            } else if (status === 'review') {
                this.reviewExpanded = !this.reviewExpanded
                return
            }
            let data = {
                actorId: actor.actorId, answerId: this.qaitem.answer.aId, type: 'answer',
                up: this.UpDown.helpful, down: this.UpDown.unHelpful
            }
            axios.post('/action/answer/', data)
                .then((res) => {
                    console.log(status + '成功')
                }).catch((err) => {
                    console.log(status + '失败')
                })
        },
        processItem() {
            this.UpDown.isHelpful = this.$props.qaitem.action.up ? true : false
            this.UpDown.isUnhelpful = this.$props.qaitem.action.down ? true : false
        }
    },
    computed: {
        contentStyle: function () {
            return this.textExpanded.value ? 'topic-content-height2' : 'topic-content-height1'
        },
    },
    mounted() {
        // this.getUpDown()

    }
}
</script>

<style scoped>
.topic {
    padding: 0 20px;
    border-bottom: 1px solid var(--color-neutral-3);
}

.mouse-hover {
    cursor: pointer;
}

.mouse-hover:hover {
    color: var(--color-text-2);
}

.topic-title {
    font-size: 20px;
    margin-bottom: 0;
}

.edit-time {
    color: var(--color-neutral-4);
}


* {
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
</style>

<style>
.topic-content-height1 {
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.topic-content-height2 {
    height: max-content;
}

.topic-content {
    /* width: 100%; */
    font-size: medium;
    line-height: 1.5em;
}
</style>