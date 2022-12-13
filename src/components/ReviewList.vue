<template>
    <!-- 用户发表评论 -->
    <!-- <a-space direction="vertical"> -->
    <a-comment align="right" style="margin: 10px 0;">
        <template #avatar>
            <a-avatar :size="30">
                <img alt="avatar"
                    src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
            </a-avatar>
        </template>
        <template #content>
            <a-input-search placeholder="你的评论" button-text="发布评论" search-button @search="publishReview" />
        </template>
    </a-comment>

    <!-- 评论信息 -->
    <div v-if="reviewList.length">
        <a-comment v-for="{ actor, review } in reviewList" :key="review.reviewId" :author="actor.name"
            :datetime="timeBeforeNow(review.createTime)" :align="'right'">
            <template #actions>
                <span class="action" key="heart" @click="onLikeChange(review.reviewId)">
                    <span v-if="reviewAction[review.reviewId] && reviewAction[review.reviewId]['like']">
                        <IconHeartFill :style="{ color: '#f53f3f' }" />
                    </span>
                    <span v-else>
                        <IconHeart />
                    </span>
                    {{ review.likeNum }}
                </span>
                <span class="action" key="star" @click="onStarChange(review.reviewId)">
                    <span v-if="reviewAction[review.reviewId] && reviewAction[review.reviewId]['star']">
                        <IconStarFill :style="{ color: '#ffb400' }" />
                    </span>
                    <span v-else>
                        <IconStar />
                    </span>
                    {{ review.starNum }}
                </span>
                <span class="action" key="reply">
                    <IconMessage /> Reply
                </span>
            </template>
            <template #avatar>
                <a-avatar :size="24">
                    <img alt="avatar" :src="actor.avatar" />
                </a-avatar>
            </template>
            <template #content>
                <div>
                    {{ review.content }}
                </div>
            </template>
        </a-comment>
        <div class="pagination">
            <a-pagination :total="total" :page-size="pagesize" @change="getReviewList" />
        </div>
    </div>
    <!-- 没有评论 -->
    <div v-else>
        <a-empty>
            <template #image>
                <icon-exclamation-circle-fill />
            </template>
            暂无评论
        </a-empty>
    </div>
    <!-- </a-space> -->
</template>

<script>
import axios from 'axios';
import userStore from '../stores/user';

const actor = userStore()

export default {
    props: {
        // 所评论的文章/回答的id
        father: {
            type: String,
            required: true,
        },
        // 说评论的内容的类型
        fathertype: {
            validator(value) {
                return ['answer', 'article'].includes(value)
            },
            required: true,
        },
        // 评论总数
        total: {
            type: Number,
            required: true
        },
        // 分页每页大小
        pagesize: {
            type: Number,
            default: 3
        },

    },
    data() {
        return {
            reviewList: [],
            reviewAction: new Array(),
            reviewListtemp: [
                {
                    actor: { actor_id: "用户ID", name: "用户昵称", avatar: "用户头像URL" },
                    review: {
                        review_id: "评论id", actor_id: "用户id", father: "回答或者文章id", father_type: '是回答还是文章',
                        content: '评论内容', create_time: '创建时间', like_num: '点赞数', star_num: '收藏数'
                    }
                }
            ],
            reviewActiontemp: [
                'review_id', { like: Boolean, star: Boolean, review: Boolean }
            ]
        }
    },
    methods: {
        timeBeforeNow: function (datetimestr) {
            if (datetimestr == '') return ''
            const datetime = new Date(datetimestr)
            const today = new Date()
            const timeDiff = today.getTime() - datetime.getTime()
            const minuteDiff = timeDiff / 1000 / 60
            if (minuteDiff < 60) return minuteDiff < 1 ? '刚刚' : `${Math.floor(minuteDiff)}分钟前`
            const hourDiff = minuteDiff / 60
            if (hourDiff < 24) return `${Math.floor(hourDiff)}小时前`
            const dayDiff = hourDiff / 24
            if (dayDiff < 30) return `${Math.floor(dayDiff)}天前`
            const monthDiff = dayDiff / 30
            if (monthDiff < 12) return `${Math.floor(monthDiff)}月前`
            const yearDiff = monthDiff / 12
            return `${Math.floor(yearDiff)}年前`
        },
        getReviewList(page) {
            axios.get(`/api/review/detailList?type=${this.$props.fathertype}&id=${this.$props.father}`)
                .then((res) => {
                    this.reviewList = res.data
                    console.log(res.data);
                }).catch(() => {
                    this.$message.error('请求评论信息失败')
                })
        },
        // 获取用户对该回答评论的点赞/收藏信息
        getreviewAction() {
            // URL = review/<article_id,answer_id>/<user_id>
            axios.get(`/api/forum/review/vote/answer/${this.$props.father}`).then((res) => {
                this.reviewAction = res.data
            }).then((err) => {
                this.$message.error('获取个人信息失败')
            })
        },
        // 点赞评论
        onLikeChange(id) {
            id = String(id)
            if (this.reviewAction[id] == null) {
                this.reviewAction[id] = []
            }
            if (this.reviewAction[id]['like'] == null) {
                this.reviewAction[id]['like'] = true
                this.reviewList.find(r => r.review.review_id == id).review.like += 1
            } else if (this.reviewAction[id]['like'] == true) {
                this.reviewAction[id]['like'] = false
                this.reviewList.find(r => r.review.review_id == id).review.like -= 1
            } else {
                this.reviewAction[id]['like'] = true
                this.reviewList.find(r => r.review.review_id == id).review.like += 1
            }
            this.postLikeStar(review_id)
        },
        // 收藏评论
        onStarChange(review_id) {
            if (this.reviewAction[review_id] == null) {
                this.reviewAction[review_id] = []
            }
            if (this.reviewAction[review_id]['star'] == null) {
                this.reviewAction[review_id]['star'] = true
                this.reviewList.find(r => r.review_id == review_id).star += 1
            } else if (this.reviewAction[review_id]['star'] == true) {
                this.reviewAction[review_id]['star'] = false
                this.reviewList.find(r => r.review_id == review_id).star -= 1
            } else {
                this.reviewAction[review_id]['star'] = true
                this.reviewList.find(r => r.review_id == review_id).star += 1
            }
            this.postLikeStar(review_id)
        },
        postLikeStar(review_id) {
            let data = {
                review_id: review_id,
                like: !!this.reviewAction[review_id]['like'],
                star: !!this.reviewAction[review_id]['star'],
            }
            console.log('评论data = ', data)
            axios.post('/api/forum/review/vote', data)
                .then((res) => {
                    console.log('对评论点赞/收藏成功')
                }).catch((err) => {
                    console.log('对评论点赞/收藏失败')
                })
        },
        publishReview(reviewcontent) {
            console.log('评论信息为：', reviewcontent)
            let review = {
                reviewId: null,
                actorId: actor.actor_id,
                father: this.$props.father,
                fatherType: this.$props.fathertype,
                content: reviewcontent,
                createTime: new Date().toLocaleString(),
                likeNum: 0,
                starNnum: 0
            }
            reviewCreate = {}
            this.reviewList.unshift({ actor, review })
            axios.post('/api/review/write', review).then((res) => {
                console.log('评论发表成功', res.data)
            }).catch(() => {
                console.log('评论发表失败')
            })
        },
    },
    mounted() {
        this.getReviewList(1)
        // this.getreviewAction()
    },

}
</script>

<style scoped>
/* 分页 */
.pagination {
    display: flex;
    justify-content: center;
    align-content: space-between;
    margin-bottom: 5px;
}

* {
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
</style>