<template>
    <!-- <div> -->
    <div class="center gray">
        <QuestionVue :qid="this.$route.params.qId"></QuestionVue>
    </div>
    <!-- </div> -->
    <!-- <a-divider class="divider" margin="0"></a-divider> -->
    <a-space>
        <p></p>
    </a-space>
    <div class="center">
        <div class="topic-list" v-if="postList.length > 0">
            <Topic v-for=" item in postList" :key="item.answer.aId" :qaitem="item" :with-title="false"
                :with-avatar="true">
            </Topic>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import QuestionVue from '../components/Question.vue';
import Topic from '../components/Topic.vue';

export default {
    components: { QuestionVue, Topic },
    data() {
        return {
            postList: [],
            aId: this.$route.params.qId
        }
    },
    methods: {
        getAnswers() {
            axios.get(`/api/answer/list?qId=${this.$route.params.qId}`).then((res) => {
                this.postList = res.data
                console.log(res.data)
            }).catch(() => {
                this.$message.error("请求失败")
            })
        }
    },
    beforeMount() {
        console.log(this.aId)
    },
    mounted() {
        this.getAnswers()
    }
}
</script>

<style scoped>
.center {
    display: flex;
    justify-content: center;
    align-content: space-between;
}

.gray {
    /* background-color: var(--color-neutral-2); */
    padding-bottom: 10px;
}

.divider {
    padding-top: 0;
}

.topic-list {
    width: 850px;
}
</style>