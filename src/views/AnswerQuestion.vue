<template>
    <div>
        <div class="center">
            <QuestionVue :qid="this.$route.params.qId"></QuestionVue>
        </div>
        <div class="center">
            <TinyeditorVue :value="'请输入你的回答'" class="editor" @submit="submitAnswer" @getInput="getInput">
            </TinyeditorVue>
        </div>
    </div>
</template>

<script>
import QuestionVue from '../components/Question.vue';
import TinyeditorVue from '../components/Tinyeditor.vue';
import { userInfo } from '@/stores/counter.js';
import axios from 'axios';
const user = userInfo()

export default {
    components: { QuestionVue, TinyeditorVue },
    data() {
        return {
            input: '',
            qId: '',
        }
    },
    methods: {
        submitAnswer(content) {
            let answer = {
                aId: '',
                qId: this.qId,
                actorId: user.actorId,
                content: content,
                createTime: new Date().toLocaleString(),
                upNum: 0,
                downNum: 0,
                reviewNum: 0,
            }
            console.log("answer = ", answer)
            axios.post('/answer/', answer)
                .then((res) => {
                    console.log("axios answer = ", answer)
                    this.$message.success('回答成功')
                    let qId = res.data.qId
                    console.log(res.data);
                    this.$router.push({ path: '/question/' + qId })
                })
                .catch(() => {
                    this.$message.error('回答失败')
                })
            console.log(content);
        },
        getInput(input) {
            this.input = input
        }
    },
    mounted() {
        this.qId = this.$route.params.qId
    }
}
</script>



<style scoped>
.center {
    display: flex;
    justify-content: center;
    align-content: space-between;
}

.editor {
    width: 900px;
    /* margin: 0 100px; */
    /* height: 1000px; */
}
</style>

