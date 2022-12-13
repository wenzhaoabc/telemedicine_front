<template>
    <div>
        <div class="article">
            <div>
                <p @click="gotoArticPage(artinfo.articleId)" class="mouse-hover article-title">
                    {{ artinfo.title }}
                </p>
                <a-space></a-space>
                <div class="mouse-hover">
                    <div>
                        <a-space>
                            <a-avatar :size="30">
                                <img alt="USER" :src="author.avatar" />
                            </a-avatar>
                            <span>{{ author.name }}</span>
                        </a-space>
                    </div>
                    <div>
                        <div class="forum-article-content" v-html="artinfo.content">
                        </div>
                    </div>
                    <div>
                        <p class="edit-time">编辑于{{ new Date(artinfo.createTime).toLocaleDateString() }}</p>
                    </div>
                </div>
                <div>
                    <a-space>
                        <a-button :type="userReview.up ? 'primary' : 'text'">
                            <template #icon>
                                <icon-thumb-up-fill />
                            </template>
                            <template #default>{{ artinfo.upNum }}</template>
                        </a-button>
                        <a-button :type="!userReview.down ? 'text' : 'primary'">
                            <template #icon>
                                <icon-thumb-down-fill />
                            </template>
                            <template #default>{{ artinfo.downNum }}</template>
                        </a-button>
                        <a-button type="text">
                            <template #icon>
                                <icon-message />
                            </template>
                            <template #default>{{ artinfo.reviewNum }}</template>
                        </a-button>
                    </a-space>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            artinfo: {},
            author: {},
            userReview: {},
            data: [
                {
                    article: {
                        articleId: '10位ID', actorId: 123, title: '标题', createTime: '',
                        content: '50个字符',
                        upNum: 12, downNum: 23, reviewNum: 12
                    },
                    author: {
                        actorId: 1232, name: '', avatar: '头像', selfDesc: '自我描述'
                    },
                    action: { up: false, down: false }
                }
            ]
        }
    },
    methods: {
        gotoArticPage(articleId) {
            this.$router.push({ path: `/article/${articleId}` })
        }
    },
    mounted() {
        this.artinfo = this.$props.article.article;
        this.author = this.$props.article.author
        this.userReview = this.$props.article.action
    }
}
</script>

<style  scoped>
.article-content {
    /* width: 100%; */
    font-size: medium;
    line-height: 1.5em;
}

.article {
    padding: 20px;
}

.edit-time {
    color: var(--color-neutral-4);
}

.mouse-hover {
    cursor: pointer;
}

.article-title {
    font-size: 20px;
    margin-bottom: 0;
    margin-top: 0;
}
</style>

<style>
.forum-article-content {
    /* width: 100%; */
    font-size: medium;
    line-height: 1.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 多出部分用...代替*/
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>