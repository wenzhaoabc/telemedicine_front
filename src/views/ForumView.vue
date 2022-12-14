<template>
    <div class="main-page">
        <a-row class="header-search">
            <a-col :xs="page_width.xs - 1" :sm="page_width.sm - 2" :md="page_width.md - 2" :lg="page_width.lg"
                :xl="page_width.xl - 1" :xxl="page_width.xxl" class="">
            </a-col>
            <a-col :xs="page_width.xs + 4" :sm="page_width.sm + 4" :md="page_width.md + 4" :lg="page_width.lg"
                :xl="page_width.xl + 2" :xxl="page_width.xxl">
                <a-input-search :placeholder="recommend_search_list[recommend_index]" size="large" search-button>
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
                <div class="topic-list" v-if="postList.length > 0 && currentKey === '2'">
                    <Topic v-for=" item in postList" :key="item.question.q_id" :qaitem="item">
                    </Topic>
                </div>
                <div v-else-if="currentKey === '3'">
                    <Article v-for="item in articleList" :key="item.article.articleId" :article="item"></Article>
                    <!-- 文章页面 -->
                </div>
                <div v-else-if="currentKey === '1'">
                    <Topic v-for=" item in lovedAuthorList" :key="item.question.q_id" :qaitem="item"
                        :with-avatar="true">
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
                    <div>
                        <a-space>
                            <icon-pen />
                            <span>创作中心</span>
                        </a-space>
                    </div>
                    <div class="flex-center-father margin-top-bottom">
                        <div class="cursor-point" @click="answerProblem">
                            <div class="flex-center-father">
                                <icon-file size="28" class="self-icon" />
                            </div>
                            <div class="icon-text">我要回答</div>
                        </div>
                        <div class="cursor-point" @click="givePost">
                            <div class="flex-center-father">
                                <icon-edit size="28" class="self-icon" />
                            </div>
                            <div class="icon-text">我要提问</div>
                        </div>
                        <div class="cursor-point" @click="writeArticle">
                            <div class="flex-center-father">
                                <icon-palette size="28" class="self-icon" />
                            </div>
                            <div class="icon-text">写文章</div>
                        </div>
                    </div>
                    <div class="margin-top-bottom">
                        <a-button long>
                            进入个人中心
                            <icon-arrow-right />
                        </a-button>
                    </div>
                </div>
                <div class="recommand">
                    <div>
                        <a-space>
                            <icon-pen />
                            <span>今日热门</span>
                        </a-space>
                    </div>
                    <a-list size="small" :bordered="false">
                        <a-list-item v-for="idx in 4" :key="idx">
                            <a-list-item-meta title="Beijing" description="ByteDance Tech ">
                                <template #avatar>
                                    <a-avatar shape="square">
                                        <img alt="avatar"
                                            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
                                    </a-avatar>
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </a-list>
                </div>
                <div class="recommand">
                    <div>
                        <a-space>
                            <icon-pen />
                            <span>远程医疗</span>
                        </a-space>
                    </div>
                    <div class="site-des">
                        <p>增值电信业务HIUSGYIG</p>
                        <p>京审字JFUYSFU087</p>
                        <p>公安网备GIUGYU67</p>
                    </div>
                </div>
            </a-col>
            <a-col flex="auto"></a-col>
        </a-row>
    </div>
</template>


<script>
import axios from 'axios'
import Topic from '../components/Topic.vue'
import Tinyeditor from '../components/Tinyeditor.vue'
import Article from '../components/Article.vue'
// import userStore from '../stores/user'
import { userInfo } from '@/stores/counter.js';
const User = userInfo()

export default {
    components: { Topic, Tinyeditor, Article },
    data() {
        return {
            // 页面布局
            page_width: { xs: 2, sm: 4, md: 6, lg: 8, xl: 8, xxl: 8 },
            //搜索框
            recommend_search_list: ['搜你想搜', '睡觉戴口罩', '晚说扫码被罚'],
            recommend_index: 0,
            // 页面内容，
            postList: [],
            msg: '',
            disabled: false,
            // 文章列表
            articleList: [], // 文章列表
            lovedAuthorList: [], // 关注
            currentKey: '2',// 默认处于问答页,
        }
    },
    methods: {
        update_recommend_search_content: function () {
            this.recommend_index = (this.recommend_index + 1) % this.recommend_search_list.length
        },
        getPostList: function () {
            let that = this
            axios.get('/api/forum/qalist?offset=1&pagesize=1&userId=123456786').then((res) => {
                that.postList = res.data
                console.log("res.")
                console.log(res.data)
            }).catch(() => {
                that.$message.error("请求失败")
            })
        },
        // 切换标签 关注/问答/文章
        onChangeTab: function (key) {
            console.log(`切换标签页${key}`)
            this.currentKey = key
            if (key === '3') {
                this.getArticleList()
            } else if (key === '1') {

            }
        },
        getArticleList() {
            if (this.articleList.length > 0) {
                return
            } else {
                axios.get(`/api/article/articleList?offset=1&pageSize=10&userId=${User.actor_id}`)
                    .then((res) => {
                        this.articleList = res.data
                        console.log('articlelist = ', res.data)
                    })
                    .catch(() => {
                        this.$message.error("请求失败")
                    })
            }
        },
        getLovedAuthorList() {
            if (this.lovedAuthorList.length > 0) {
                return
            } else {
                axios.get('/forum/lovedlist')
                    .then((res) => {
                        this.lovedAuthorList = res.data
                    })
                    .catch(() => {
                        this.$message.error("请求失败")
                    })
            }
        },
        // 输出PostList
        test: function () {
            console.log(this.postList);
        },
        answerProblem() {
            this.$router.push({ path: '/questions' })
            console.log('回答问题')
        },
        givePost() {
            this.$router.push({ path: '/askquestion' })
            console.log('提问')
        },
        writeArticle() {
            this.$router.push({ path: '/write' })
            console.log('写文章');
        },

    },
    mounted() {
        this.getPostList()
        setInterval(this.update_recommend_search_content, 1000)
    },
    beforeDestroy() {
        clearInterval(this.update_recommend_search_content)
    }
}
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
    background-color: #FFF;
    padding: 10px;
}

.flex-center-father {
    display: flex;
    justify-content: space-around;
    text-align: center;
}

.cursor-point {
    cursor: pointer;
}


.self-icon {
    margin: 10px;
    color: rgb(var(--arcoblue-6));
    cursor: pointer;
}

.self-icon:hover {
    color: rgb(var(--arcoblue-5));
    /* background-color: rgb(var(--green-1)); */
}

.margin-top-bottom {
    margin-top: 10px;
    margin-bottom: 20px;
}

.site-des {
    color: var(--color-neutral-4);
}
</style>