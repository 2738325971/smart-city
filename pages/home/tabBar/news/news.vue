<template>
	<view class="box">
		<view class="content-view" @click="toNewsDetails(index)" v-for="(item,index) in newsList" :key="index">
			<view class="user-avatar">
				<image class="cover" :src="baseURL + item.cover" mode=""></image>
			</view>
			<view class="news-content">
				<!-- 新闻标题 -->
				<view class="news-title">
					{{item.title}}
				</view>

				<!-- 发布时间与阅读量 -->
				<view class="news-time">

					<text class="read-num">
						阅读量:{{item.readNum}}
					</text>

					<text class="create-time">
						发布时间:{{item.createTime}}
					</text>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getNewsList} from '@/api/index/index.js'
	
	export default {
		data() {
			return {
				baseURL: 'http://124.93.196.45:10001',
				newsList: ''
			}
		},
		onLoad() {
			this.getNews();
		},
		methods: {
			//跳转到新闻详细信息页
			toNewsDetails(index) {
				let that = this;
				let newsID = that.newsList[index].id;

				uni.navigateTo({
					url: '/pages/home/tabBar/news/newsDetails/newsDetails?newsID=' + newsID
				})
			},
			// 获取新闻列表
			async getNews() {

				let that = this
				
				let res = await getNewsList()
				console.log(res);
				if(res.code == 200) {
					that.newsList = res.rows;
				}

			}
		}
	}
</script>

<style>
	.box {
		width: 100%;
	}

	.box .content-view {
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		margin: 20px auto;
		width: 95%;
		height: 300rpx;
		border: 2rpx solid #000;
		border-radius: 30rpx;
		box-sizing: border-box;
		padding: 20rpx;
		align-items: center;
	}


	.box .content-view .cover {
		width: 200rpx;
		height: 200rpx;
		border-radius: 30rpx;
	}

	.box .content-view .news-content {
		height: 90%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

	}

	.box .content-view .news-content .news-title {
		font-size: 28rpx;
		margin-left: 20rpx;
	}

	.box .content-view .news-content .news-time {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		font-size: 12rpx;
	}
</style>
