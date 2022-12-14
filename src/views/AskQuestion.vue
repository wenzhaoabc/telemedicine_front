<template>
    <div>
        <div class="center ">
            <a-input v-model="title" class="input">
                <template #prefix>
                    Please Enter Subject
                </template>
            </a-input>
        </div>
        <div class="center">
            <a-space wrap style="width: 850px;">
                <a-tag v-for="(tag, index) of tags" :key="tag" :color="colors[index]" :closable="index !== 0"
                    @close="handleRemove(tag)">
                    {{ tag }}
                </a-tag>

                <a-input v-if="showInput" ref="inputRef" :style="{ width: '90px' }" size="mini" v-model.trim="inputVal"
                    @keyup.enter="handleAdd" @blur="handleAdd" />
                <a-tag v-else :style="{
                    width: '90px',
                    backgroundColor: 'var(--color-fill-2)',
                    border: '1px dashed var(--color-fill-3)',
                    cursor: 'pointer',
                }" @click="handleEdit">
                    <template #icon>
                        <icon-plus />
                    </template>
                    Add Tag
                </a-tag>
            </a-space>
        </div>
        <div class="center">
            <TinyeditorVue :value="'Input your question!'" class="editor" @submit="upQuestion" @getInput="getInput">
            </TinyeditorVue>
        </div>
        <a-affix :offsetBottom="120" style="right: 100px;position: fixed;">
            <a-button type="primary" @click="upQuestion">
                <template #icon>
                    <icon-upload />
                </template>
            </a-button>
        </a-affix>
    </div>
</template>

<script>
import axios from 'axios';
import TinyeditorVue from '../components/Tinyeditor.vue';
// import userStore from '../stores/user';
import { userInfo } from '@/stores/counter.js';
const user = userInfo()

export default {
    components: { TinyeditorVue },
    data() {
        return {
            title: '',
            content: '',
            tags: ['question'],
            showInput: false,
            inputVal: '',// 标签输入框
            inputRef: null,
            colors: [
                'orangered',
                'orange',
                'gold',
                'lime',
                'green',
                'cyan',
                'blue',
                'arcoblue',
                'purple',
                'pinkpurple',
                'magenta',
                'gray'
            ]
        }
    },
    methods: {
        upQuestion() {
            let question = {
                qId: null,
                title: this.title,
                actorId: user.actor_id,
                content: this.content,
                createTime: new Date().toLocaleString(),
                ansCount: 0
            }
            if (this.title == '') {
                this.$message.error('标题不可为空')
                return
            }
            axios.post('/api/question', question)
                .then((res) => {
                    this.$message.success("提问成功")
                    let qId = res.data
                    console.log(res.data)
                    this.$router.push({ path: '/question/' + qId })
                })
                .catch((err) => {
                    this.$message.error("未知错误")
                })
        },
        getInput(val) {
            this.content = val
        },
        handleRemove(key) {
            this.tags = this.tags.filter((tag) => tag !== key);
        },
        handleAdd() {
            if (this.inputVal) {
                this.tags.push(this.inputVal);
                this.inputVal = '';
            }
            this.showInput = false;
        },
        handleEdit() {
            this.showInput = true;
        }
    },
}
</script>

<style  scoped>
.center {
    display: flex;
    justify-content: center;
    align-content: space-between;
}

.editor {
    width: 900px;
}


.input {
    width: 900px;
    margin: 10px 20px;
    box-sizing: border-box;
    border: #000;
}
</style>