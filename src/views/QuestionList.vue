<template>
    <div class="center">
        <div class="menu-demo">
            <a-menu mode="pop" showCollapseButton :collapsed="true" @menu-item-click="changeMenuItem">
                <a-menu-item key="recommend">
                    <template #icon><icon-apps></icon-apps></template>
                    推荐
                </a-menu-item>
                <a-menu-item key="concern">
                    <template #icon><icon-safe></icon-safe></template>
                    关注
                </a-menu-item>
                <a-menu-item key="hot">
                    <template #icon><icon-fire></icon-fire></template>
                    热门
                </a-menu-item>
                <a-menu-item key="search">
                    <template #icon><icon-search></icon-search></template>
                    搜索
                </a-menu-item>
            </a-menu>
            <a-modal v-model:visible="visible" title="搜你想搜" @cancel="handleCancel" @ok="handleOk">
                <a-form :model="form">
                    <a-form-item field="title" label="标题">
                        <a-input v-model="form.name" placeholder="请输入问题标题" />
                    </a-form-item>
                </a-form>
            </a-modal>
        </div>
        <a-list class="list-demo-action-layout" :bordered="false" :data="dataSource"
            :pagination-props="paginationProps">
            <template #item="{ item }">
                <a-list-item class="list-demo-item" action-layout="vertical">
                    <template #actions>
                        <a-space>
                            <span class="action-text">
                                {{ item.actor.name }}编辑于{{ new Date(item.question.createTime).toLocaleString() }}
                            </span>
                            <span class="action-text">
                                {{ item.question.ansCount }}回答
                            </span>

                            <a-button @click="writeAns(item.question.qId)" type="primary" class="button">
                                <template #default>写回答</template>
                            </a-button>
                        </a-space>
                    </template>
                    <template #extra v-if="item.image_src">
                        <div className="image-area">
                            <img alt="arco-design" :src="item.image_src" />
                            <!-- <div id="web_bg" style="'background-image:url({{item.imageSrc}}) ;'"></div> -->
                        </div>
                    </template>
                    <a-list-item-meta>
                        <template #title>
                            <p class="title" @click="gotoQuestiondetail(item.question.qId)">{{ item.question.title }}
                            </p>
                        </template>
                        <template #description>
                            <span class="topic-content-height1">
                                {{ item.question.content }}
                            </span>
                        </template>
                    </a-list-item-meta>
                </a-list-item>
            </template>
            <template #empty>
                <a-empty>
                    <template #image>
                        <icon-exclamation-circle-fill />
                    </template>
                    No data, please reload!
                </a-empty>
            </template>
        </a-list>
    </div>
    <!-- <div class="center">
        <QuestionVue :question="{ q: 'aaa' }"></QuestionVue>
    </div> -->
</template>
  
<script>
import axios from 'axios';
// import userStore from '../stores/user';
import { userInfo } from '@/stores/counter.js';
import { useRouter } from 'vue-router';
const user = userInfo()

export default {
    // components: { QuestionVue },
    data() {
        return {
            dataSource: [],
            paginationProps: { defaultPageSize: 10, total: 10 },
            form: { title: '' },
            visible: false,
            dataSourceT: [{
                actor_id: 'fewofh',
                q_id: '1234567890',
                title: 'dewu',
                content: '内容',
                create_time: 'time',
                ans_count: 123,
                image_src: '',
            }]
        }
    },
    methods: {
        getQuestionList() {
            axios.get('/question/list')
                .then((res) => {
                    this.dataSource = res.data
                    this.paginationProps.total = this.dataSource.length
                    console.log(res.data)
                })
                .catch(() => {
                    console.log('error')
                })
        },
        gotoQuestiondetail(id) {
            this.$router.push({ path: `/question/${id}` })
        },
        writeAns(id) {
            console.log('写回答')
            this.$router.push({ path: '/answer/' + id })
        },
        changeMenuItem(itemid) {
            let url = ''
            if (itemid == 'recommend') {
                url = '/question/list'
            } else if (itemid == 'concern') {
                url = "/question/list?userId=" + user.actor_id
            } else if (itemid == 'hot') {
                url = `/question/list?userId=${user.actor_id}&hot=true`
            } else {
                this.visible = true
            }
            axios.get(url).then((res) => {
                this.dataSource = res.data
                this.paginationProps.total = this.dataSource.length
            })
        },
        handleOk() {
            // 搜索内容
        },
        handleCancel() {
            this.visible = false
        }
    },
    mounted() {
        this.getQuestionList()
    }
}
</script>
  
<style scoped>
.menu-demo {
    width: 80px;
    height: 600px;
    /* padding: 40px; */
    /* box-sizing: border-box; */
    margin: 20px;
    /* background-color: var(--color-neutral-2); */
}


.menu-demo .arco-menu {
    width: 200px;
    height: 100%;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}

.menu-demo .arco-menu :deep(.arco-menu-collapse-button) {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

.menu-demo .arco-menu:not(.arco-menu-collapsed) :deep(.arco-menu-collapse-button) {
    right: 0;
    bottom: 8px;
    transform: translateX(50%);
}

.menu-demo .arco-menu:not(.arco-menu-collapsed)::before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 48px;
    height: 48px;
    background-color: inherit;
    border-radius: 50%;
    box-shadow: -4px 0 2px var(--color-bg-2), 0 0 1px rgba(0, 0, 0, 0.3);
    transform: translateX(50%);
}

.menu-demo .arco-menu.arco-menu-collapsed {
    width: 48px;
    height: auto;
    padding-top: 24px;
    padding-bottom: 138px;
    border-radius: 22px;
}

.menu-demo .arco-menu.arco-menu-collapsed :deep(.arco-menu-collapse-button) {
    right: 8px;
    bottom: 8px;
}

.center {
    display: flex;
    justify-content: center;
    align-content: space-between;
}

.button {
    margin-left: 400px;
}


.action-text {
    color: var(--color-neutral-4);
}

.list-demo-action-layout {
    width: 1000px;
}

.list-demo-action-layout .image-area {
    width: 183px;
    height: 118px;
    border-radius: 2px;
    overflow: hidden;
}

.list-demo-action-layout .list-demo-item {
    padding: 20px 0;
    border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
    width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
    margin: 0 4px;
}

.title {
    font-size: larger;
    font-weight: bold;
    margin: 0;
    cursor: pointer;
}

.topic-content-height1 {
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
</style>
  