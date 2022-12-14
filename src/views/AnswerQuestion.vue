<template>
    <div>
        <div class="center">
            <QuestionVue :qid="this.$route.params.qId"></QuestionVue>
        </div>
        <div class="center">
            <TinyeditorVue :value="'请输入你的回答'" class="editor" @submit="submitAnswer"></TinyeditorVue>
        </div>
    </div>
</template>

<script>
import QuestionVue from '../components/Question.vue';
import TinyeditorVue from '../components/Tinyeditor.vue';

export default {
    components: { QuestionVue, TinyeditorVue },
    data() {
        return {

        }
    },
    methods: {
        submitAnswer(content) {
            console.log(content);
        }
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

