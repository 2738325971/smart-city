<template>
	<view class="box">
		<!-- 新闻标题 -->
		<view class="news-title">
			{{newsDetailsMsg.title}}
		</view>

		<!-- 发布时间 -->
		<view class="publish-time">
			<text>发布时间:{{newsDetailsMsg.publishDate}}</text>
			<text>浏览量:{{newsDetailsMsg.readNum}}</text>
		</view>

		<!-- 新闻封面图片 -->
		<view class="news-img">
			<image :src="baseURL + newsDetailsMsg.cover" mode=""></image>
		</view>

		<!-- 新闻内容 -->
		<view class="news-content" v-html="newsDetailsMsg.content">
			<!-- {{newsDetailsMsg.content}} -->
		</view>

		<!-- 发布评论 -->
		<view class="news-comment">
			<view class="comment-value">
				<input type="text" v-model="commentValue" placeholder="请输入内容" />
			</view>
			<view class="submit" @click="submieComment()">
				提交
			</view>
		</view>

		<!-- 评论列表 -->
		<view class="comment-list">
			<view class="list-hint">
				<view class="border-left">

				</view>
				<text>评论列表</text>
			</view>

			<view class="comment-item" v-for="(item,index) in commentList" :key="index">

				<view class="comment-user">
					<image src="@/static/static-news/user.png" mode=""></image>
					<text>{{item.userName}}</text>
				</view>

				<view class="comment-date" style="color:#8a8a8a;font-size: 24rpx;">
					{{item.commentDate}}
				</view>

				<view class="comment-content">
					{{item.content}}
				</view>

				<view class="like-num">
					<image src="@/static/static-news/like.png" @click="doLike(item.id,index)" mode=""></image>
					<text style="color:#8a8a8a;">点赞数: {{item.likeNum}} </text>
				</view>

			</view>

		</view>
	</view>

	</view>
</template>

<script>
	import {
		doLike,
		getAllComment,
		getNewsDetails,
		submieComment
	} from '@/api/index/index.js'
	export default {
		data() {
			return {
				baseURL: 'http://124.93.196.45:10001',
				newsDetailsMsg: '',
				commentValue: '',
				newsId: '',
				commentList: [],
				likeNum: 0,
				user: uni.getStorageSync('user')
			}
		},
		onLoad(option) {
			this.newsId = option.newsID;
			console.log(this.newsId);
			this.getNewsDetails(option.newsID);

			this.getAllComment();
		},
		methods: {
			// 点赞
			async doLike(id, index) {
				let that = this;
				console.log(id, index);

				let doLikeRes = await doLike(id)
				if (doLikeRes.code == '200') {
					that.commentList[index].likeNum++
				}
			},
			// 获取评论列表
			async getAllComment() {
				let that = this;

				let res = await getAllComment({
					newsId: that.newsId
				})
				console.log(res);
				if (res.code == '200') {
					that.commentList = res.rows.reverse();
				}

			},
			// 获取新闻详细信息
			async getNewsDetails(id) {
				let that = this;

				let res = await getNewsDetails(id)
				if (res.code == '200') {
					that.newsDetailsMsg = res.data
				}

			},
			// 提交评论
			async submieComment() {
				let that = this;
				console.log(that.newsId);
				// 判断有没有内容
				if (that.commentValue !== '') {
					console.log(that.commentValue);
					let res = await submieComment({
						newsId: that.newsId,
						content: that.commentValue
					})
					console.log(res);

					if (res.code == '200') {
						this.getAllComment()

						that.commentValue = ''

					} else {
						uni.showModal({
							title: '请先登录',
							icon: 'error',
							duration: 1500,
							success:res=>{
								console.log(res);
								if(res.confirm){
									console.log('点击了确定');
									uni.navigateTo({
										url:'/pages/login/login'
									})
								}
							}
						})
					}
				} else {
					uni.showToast({
						title: '请输入内容',
						icon: 'error',
						duration: 1500
					})
				}
			}
		}
	}
</script>

<style>
	.box .news-comment {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 100rpx;

	}

	.box .news-comment .comment-value {
		width: 70%;
	}

	.box .news-comment .comment-value input {
		box-sizing: border-box;
		padding: 16rpx;
		border-radius: 10rpx;
		border: 2rpx solid #007AFF;
		height: 80rpx;
	}

	.box .news-comment .submit {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20%;
		height: 70%;
		color: #fff;
		background-color: #007AFF;
		border-radius: 40rpx;
	}

	.box .comment-list .list-hint {
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #999;
	}

	.box .comment-list .list-hint .border-left {
		width: 8rpx;
		height: 40rpx;
		background-color: #00AAFF;
		border-radius: 10rpx;
		margin: 20rpx 10rpx 20rpx 30rpx;
	}

	.box .comment-list .comment-item:first-child {
		border-top: 2rpx solid #999;
	}

	.box .comment-list .comment-item {
		width: 100%;
		/* height: 200rpx; */
		border-bottom: 2rpx solid #999;
		margin-top: 20rpx;
		/* overflow: hidden; */
	}

	/* 公共样式 */
	.box .comment-list .comment-item .comment-user,
	.box .comment-list .comment-item .like-num {
		display: flex;
		align-items: center;
	}

	/* 公共样式 */
	.box .comment-list .comment-item .comment-user image,
	.box .comment-list .comment-item .like-num image {
		width: 50rpx;
		height: 50rpx;
		margin-right: 10rpx;
	}

	.box .comment-list .comment-item .comment-user,
	.box .comment-list .comment-item .comment-content {
		margin-left: 30rpx;
	}

	.box .comment-list .comment-item .comment-content {
		text-indent: 2em;
	}


	.box .comment-list .comment-item .comment-date,
	.box .comment-list .comment-item .like-num {
		display: flex;
		justify-content: center;
		/* margin-left: 450rpx; */
		margin: 30rpx 0 30rpx 450rpx;
	}
</style>
