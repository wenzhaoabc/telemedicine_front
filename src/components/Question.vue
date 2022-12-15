<template>
    <div class="center">
        <div v-if="question">
            <h2>
                {{ question.title }}
            </h2>

            <a-comment :author="quizzer.name" :content="quizzer.selfDesc" v-if="quizzer">
                <template #avatar>
                    <a-avatar>
                        <img alt="avatar" :src="quizzer.avatar" />
                    </a-avatar>
                </template>
            </a-comment>

            <div class="question-content" :class="iscollapse ? 'question-content-height1' : 'question-content-height2'"
                v-html="question.content">

            </div>
            <div class="info-text">
                <span>编辑于{{ question.createTime }}，{{ question.ansCount }}个回答</span>
                <a-button style="margin-left: 475px;" type="text" @click="toCollapsed">{{ iscollapse ? '展开' : '折叠'
                }}</a-button>
            </div>
            <a-space wrap style="width: 700px;">
                <a-tag v-for="(tag, index) of tags" :key="tag" :color="colors[index]">
                    {{ tag }}
                </a-tag>
            </a-space>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        qid: {
            type: String,
            require: true
        }
    },
    data() {
        return {
            iscollapse: false,
            collapse: 'question-content-height2',
            question: null,
            quizzer: null,
            tags: ['question'],// 请求标签,
            colors: ['orangered', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'arcoblue', 'purple', 'pinkpurple', 'magenta', 'gray']
        }
    },
    methods: {
        async getQuesContent() {
            await axios.get(`/question/?qId=${this.$props.qid}`)
                .then((res) => {
                    this.question = res.data
                    console.log('/question/q_id请求成功');
                    console.log(res.data);
                })
                .catch(() => {
                    this.$message.error("网络请求失败，请刷新重试")
                })
            console.log(this.question)
            await axios.get(`/forum/userInfo?userId=${this.question.actorId}`)
                .then((res) => {
                    this.quizzer = res.data
                    console.log("this.quizzer=", res.data)
                })
        },
        toCollapsed() {
            this.iscollapse = !this.iscollapse
        }
    },
    beforeMount() {
        this.getQuesContent();
    }
}
</script>

<style scoped>
.center {
    width: 800px;
}


.question-content {
    /* width: 100%; */
    font-size: medium;
    line-height: 1.5em;
}

.question-content-height1 {
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.question-content-height2 {
    height: max-content;
}

.info-text {
    color: var(--color-neutral-4);
    margin: 10px 0;
}
</style>