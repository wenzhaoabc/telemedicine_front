<template>
    <div>
        <div class="topic">
            <a-typography>
                <a-typography-title @click="goTopicPage(qaitem.topic.id)" class="mouse-hover" :heading="5">
                    {{ qaitem.topic.title }}
                </a-typography-title>
                <a-typography-paragraph class="mouse-hover" title="" :ellipsis="{
                    rows: 2,
                    expandable: true,
                    showTooltip: false
                }" @expand="readAllText">
                    <div v-show="textExpanded">
                        <!-- 展示发帖人信息 -->
                        <a-space>
                            <a-avatar>
                                <img alt="USER" :src="qaitem.post.author.avatar" />
                            </a-avatar>
                            <span>{{ qaitem.post.author.name }}</span>
                        </a-space>
                    </div>
                    <div id="topic-content" v-html="qaitem.post.content"></div>
                    <template #expand-node="{ expanded }">
                        {{ expanded ? 'Less' : 'More' }}
                    </template>
                </a-typography-paragraph>
                <a-typography-paragraph>
                    <a-space>
                        <a-button :type="UpDown.isHelpful ? 'primary' : 'text'" @click="clickUporDown('up')">
                            <template #icon>
                                <icon-thumb-up-fill />
                            </template>
                            <template #default>{{ UpDown.helpful + (UpDown.isHelpful ? 1 : 0) }}</template>
                        </a-button>
                        <a-button :type="!UpDown.isUnhelpful ? 'text' : 'primary'" @click="clickUporDown('down')">
                            <template #icon>
                                <icon-thumb-down-fill />
                            </template>
                            <template #default>{{ UpDown.unHelpful + (UpDown.isUnhelpful ? 1 : 0) }}</template>
                        </a-button>
                        <a-button type="text" @click="clickUporDown('review')">
                            <template #icon>
                                <icon-message />
                            </template>
                            <template #default>{{ UpDown.reviewNum + (UpDown.isReview ? 1 : 0) }}</template>
                        </a-button>
                        <a-button @click="readLessText" v-if="textExpanded" type="text" style="margin-left:325px ;">
                            <template #icon>
                                <icon-double-up />
                            </template>
                            <template #default>收起</template>
                        </a-button>
                    </a-space>
                    <!-- </a-affix> -->
                </a-typography-paragraph>
            </a-typography>
            <!-- <div>评论信息</div> -->
        </div>
        <div>
            <!-- <h2>此处为消息： {{ message }}</h2> -->
            <button @click="mes += '!'">改变{{ mes }}</button>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue';

const props = defineProps(['qaitem'])


let topic, post
onBeforeMount(() => {
    topic = reactive(props.t)
    post = reactive(props.p)
    console.log('onBeforeMount end...', topic, post, props)
})

// Test
// 监视message字段，测试父子组件传值


// 是否展开阅读全文
let textExpanded = ref(false)
function readAllText(ed) {
    textExpanded.value = ed
    console.log('readAll text', ed);
    console.log("props = ", props)
}

function readLessText() {
    let temp = document.getElementById('topic-content')
    console.log(temp);
}



// 跳转到话题页面
function goTopicPage(title) {
    console.log('前往话题页面---', title);
}

// 点赞/踩
let UpDown = reactive({
    helpful: 123,
    unHelpful: 12,
    reviewNum: 547,
    isHelpful: null,
    isUnhelpful: null,
    isReview: null,
})
function clickUporDown(status) {
    if (status === 'up') {
        UpDown.isHelpful = !UpDown.isHelpful
        UpDown.isUnhelpful = UpDown.isHelpful ? false : null
    } else if (status === 'down') {
        UpDown.isUnhelpful = !UpDown.isUnhelpful
        UpDown.isHelpful = UpDown.isUnhelpful ? false : null
    } else if (status === 'review') {
        console.log('review')
    }
}


</script>

<!-- <script>
import { onMounted, reactive, ref, toRef, toRefs, watch } from 'vue'
export default ({
    props: {
        T: Object,
        P: Object
    },
    setup(props, ctx) {
        // console.log(ctx.attrs)
        let post = reactive({})
        let topic = reactive({})
        console.log('子组件接收，props =  ', props);
        watch(props, (n, o) => {
            console.log('post new value', o)

            console.log('props is changed = ', props)
            console.log('props is changed = ', props);
            post = reactive(n)
        }, { deep: true })
        watch(props.T, (n, o) => {
            console.log('topic new value', o);
            topic = reactive(n)
        }, { deep: true })

        let UpDown = reactive({
            helpful: 123,
            unHelpful: 12,
            reviewNum: 547,
            isHelpful: null,
            isUnhelpful: null,
            isReview: null,
        })
        function clickUporDown(status) {
            if (status === 'up') {
                UpDown.isHelpful = !UpDown.isHelpful
                UpDown.isUnhelpful = UpDown.isHelpful ? false : null
            } else if (status === 'down') {
                UpDown.isUnhelpful = !UpDown.isUnhelpful
                UpDown.isHelpful = UpDown.isUnhelpful ? false : null
            } else if (status === 'review') {
                console.log('review')
            }
        }

        return {
            post,
            topic,
            UpDown
        }

    }
})
</script> -->

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
</style>