<template>
    <div class="main-page">
        <a-row class="header-search">
            <a-col :xs="page_width.xs - 1" :sm="page_width.sm - 2" :md="page_width.md - 2" :lg="page_width.lg"
                :xl="page_width.xl - 1" :xxl="page_width.xxl" class="">
            </a-col>
            <a-col :xs="page_width.xs + 4" :sm="page_width.sm + 4" :md="page_width.md + 4" :lg="page_width.lg"
                :xl="page_width.xl + 2" :xxl="page_width.xxl">
                <a-input-search :placeholder="recommend_search_content" size="large" search-button>
                    <template #button-icon>
                        <icon-search />
                    </template>
                    <template #button-default>
                        搜索
                    </template>
                </a-input-search>
            </a-col>
            <a-col :xs="page_width.xs - 1" :sm="page_width.sm - 2" :md="page_width.md - 2" :lg="page_width.lg"
                :xl="page_width.xl - 1" :xxl="page_width.xxl" class="">
            </a-col>
        </a-row>

        <a-row justify="center" class="main-content">
            <a-col flex="auto"></a-col>
            <a-col flex="700px" class="left-main">
                <div class="page-tag">
                    <!-- 标签页，帖子/文章/关注 -->
                    <a-tabs default-active-key="2" :hide-content="true" @change="onChangeTab">
                        <a-tab-pane key="1" title="关注"></a-tab-pane>
                        <a-tab-pane key="2" title="问答"></a-tab-pane>
                        <a-tab-pane key="3" title="文章"></a-tab-pane>
                    </a-tabs>
                </div>
                <div class="topic-list" v-if="a.value">
                    <div>nfshguergriugfergfskjergfkjew</div>
                    <Topic v-for=" item in postList" :key="item.topic.id" :qaitem="item">
                    </Topic>
                </div>
                <div v-else>requiring...</div>
            </a-col>
            <a-col flex="20px">
                <div>
                </div>
            </a-col>
            <a-col flex="250px" class="right-side">
                <div class="self-post">
                    <!-- 个人中心，发帖/写文章 -->
                    <a-avatar :style="{ backgroundColor: '#3370ff' }">
                        <IconUser />
                    </a-avatar>
                    <a-button @click="a.value = !a.value">改变a{{ a.value }}</a-button>
                </div>
                <div class="recommand">
                    <!-- 推荐关注 -->
                </div>
            </a-col>
            <a-col flex="auto"></a-col>
        </a-row>
    </div>
</template>

<script >
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import axios from 'axios'
import Topic from '../components/Topic.vue'

export default ({
    components: { Topic },
    setup() {

        let page_width = reactive({
            xs: 2, sm: 4, md: 6, lg: 8, xl: 8, xxl: 8
        })

        // 输入框文字切换
        let recommend_search_list = ['搜你想搜', '睡觉戴口罩', '晚说扫码被罚']
        let recommend_search_content = ref('搜你想搜')
        let recommend_index = 0
        function update_recommend_search_content() {
            recommend_index = (recommend_index + 1) % recommend_search_list.length
            recommend_search_content.value = recommend_search_list[recommend_index]
        }


        let postList = reactive([])
        let a = reactive({ value: false })
        function getData() {
            axios.get("/api/bobo").then((res) => {
                postList = reactive(res.data)
                a.value = true
                console.log(a.value);
                console.log(postList)
            }).catch((err) => {
                console.log(err, '请求失败');
            })
            console.log('getData() end');
        }

        onMounted(() => {
            getData()
            setInterval(update_recommend_search_content, 1000)
            console.log('onMounted end...');
        })

        // 切换标签页，关注/帖子/文章之间的切换
        function onChangeTab(key) {
            console.log("切换标签页，当前点击", key)
        }

        onBeforeUnmount(() => {
            clearInterval(update_recommend_search_content)
        })

        return {
            page_width,
            recommend_search_content,
            postList,
            a,
            onChangeTab
        }

    }
})




// 输入框文字切换
// let recommend_search_list = ['搜你想搜', '睡觉戴口罩', '晚说扫码被罚']
// let recommend_search_content = ref('搜你想搜')
// let recommend_index = 0
// function update_recommend_search_content() {
//     recommend_index = (recommend_index + 1) % recommend_search_list.length
//     recommend_search_content.value = recommend_search_list[recommend_index]
// }

// let postList = reactive([])
// let a = reactive({ value: false })
// function getData() {
//     axios.get("/api/bobo").then((res) => {
//         postList = reactive(res.data)
//         a.value = true
//         console.log(a.value);
//         console.log(postList)
//     }).catch((err) => {
//         console.log(err, '请求失败');
//     })
//     console.log('getData() end');
// }


// onMounted(() => {
//     getData()
//     setInterval(update_recommend_search_content, 1000)
//     console.log('onMounted end...');
// })

// // 切换标签页，关注/帖子/文章之间的切换
// function onChangeTab(key) {
//     console.log("切换标签页，当前点击", key)
// }


// onBeforeUnmount(() => {
//     clearInterval(update_recommend_search_content)
// })


</script>

<style scoped>
.main-page {
    background-color: var(--color-neutral-3);
    /* height: ; */
}

.header-search {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
}


.side-blank {
    background-color: var(--color-neutral-2);
}

.left-main {
    /* width: 700px; */
    background-color: #FFF;
}

.right-side {
    background-color: rgb(var(--arcoblue-2));
}
</style>