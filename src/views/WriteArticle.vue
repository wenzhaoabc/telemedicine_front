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
            <TinyeditorVue :value="'Share your insights'" class="editor" @getInput="saveDraft"></TinyeditorVue>
        </div>
        <a-affix :offsetBottom="120" style="right: 100px;position: fixed;">
            <a-button type="primary" @click="upArticle">
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
            tags: ['article'],
            showInput: false,
            inputVal: '',// ???????????????
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
            ],
            content: ''
        }
    },
    methods: {
        upArticle() {
            if (this.title == '') {
                this.$message.error('??????????????????')
                return
            }
            let ArticleBody = {
                articleId: null,
                actorId: user.actor_id,
                title: this.title,
                content: this.content,
                createTime: new Date().toLocaleString(),
                upNum: 0,
                downNum: 0,
                reviewNum: 0,
            }
            axios.post('/api/article', ArticleBody)
                .then((res) => {
                    console.log(res.data)
                    this.$router.push({ path: `/article/${res.data.articleId}` })
                })
                .catch(() => {
                    this.$message.error("????????????")
                })
            console.log(this.tags)
            console.log({ 'title': this.title, 'content': this.content })
        },
        saveDraft(content) {
            this.content = content
            // baocun??????
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