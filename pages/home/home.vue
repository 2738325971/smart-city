<template>
	<view class="box">
		<view class="head">
			<input type="text" @confirm="search()" v-model="input" placeholder="请输入...">
			<!-- <image src="@/static/search.png" @click="search()" alt="" srcset=""> -->
		</view>

		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">

			<swiper-item class="swiper-item" v-for="(item,index) in viewPageList" :key="index">
				<image :src="ip+item.advImg" class="img_swiper" mode=""></image>
			</swiper-item>

		</swiper>

		<view class="service">

			<navigator url="inspectCar/inspectCar">
				<image src="../../static/guide-1.png" mode=""></image>
				<text>预约检车</text>
			</navigator>

			<navigator url="searchHouse/searchHouse">
				<image src="../../static/guide-1.png" mode=""></image>
				<text>找房子</text>
			</navigator>

			<navigator url="settings/settings">
				<image src="../../static/guide-1.png" mode=""></image>
				<text>设备设置</text>
			</navigator>

			<navigator url="cloudManager/cloudManager">
				<image src="../../static/guide-1.png" mode=""></image>
				<text>云端管理</text>
			</navigator>

			<navigator url="governmentWork/governmentWork">
				<image src="../../static/guide-1.png" mode=""></image>
				<text>政府工作</text>
			</navigator>

			<navigator url="errorScreen/errorScreen">
				<image src="../../static/guide-1.png" mode=""></image>
				<text>错误排查</text>
			</navigator>

			<navigator url="gift/gift">
				<image src="../../static/guide-1.png" mode=""></image>
				<text>随赠品</text>
			</navigator>

			<navigator url="rocket/rocket">
				<image src="../../static/guide-1.png" mode=""></image>
				<text>火箭发射</text>
			</navigator>

			<navigator url="teamwork/teamwork">
				<image src="../../static/guide-1.png" mode=""></image>
				<text>协同工作</text>
			</navigator>

			<navigator url="moreService/moreService">
				<text>更多服务</text>
			</navigator>
		</view>

		<scroll-view class="scroll-view" scroll-y="true" show-scrollbar="false">

			<view v-for="(item,index) in newsList" :key="index">
				<text>
					{{item.name}}
					{{item.id}}
				</text>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import {
		getSlideImg,
		getHomeNewsList,
		getUserInfo
	} from '@/api/index/index.js'

	export default {
		data() {
			return {
				input: '',
				baseURL: 'http://124.93.196.45:10001',
				newsList: '',
				viewPageList: '', //获取轮播图
				ip: 'http://124.93.196.45:10001'
			}
		},
		onLoad() {
			let that = this

			this.readToken()

			this.getSlide()

			this.getHomeNewsList()
		},
		methods: {
			//获取轮播图
			async getSlide() {
				let that = this
				let res = await getSlideImg({
					type: 2
				});
				if (res.code == 200) {
					that.viewPageList = res.rows
				}
			},
			//获取主页新闻列表
			async getHomeNewsList() {
				let that = this
				let res = await getHomeNewsList();
				// console.log(res);
				if (res.code == 200) {
					that.newsList = res.data
				}
			},
			search() {
				console.log('input value is:' + this.input);
				if (this.input === '') {
					uni.showModal({
						content: '请输入内容',
						showCancel: false
					})
				} else {
					// uni.request({
					// 	url: '',
					// 	data: {
					// 		tex: this.input
					// 	},
					// 	method: 'get',
					// 	success: res => {
					// 		console.log(res);
					// 	}
					// })
					uni.showToast({
						title: this.input
					})
				}


			},
			// 
			async readToken() {
				let that = this
				if (uni.getStorageSync('token') != '' && uni.getStorageSync('user') == '') {
					if (uni.getStorageSync('user') == '') {
						
						// 查询用户信息并且缓存在本地
						let res = await getUserInfo();
						console.log(res);
						if(res.code == 200 ) {
							uni.setStorageSync('user', res.user);
							console.log('user已经缓存在本地');
						}
					}
				}
			}

		}
	}
</script>

<style scoped>
	.box {
		padding: 25rpx;
	}

	.box .head {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
	}

	.box .head input {
		width: 95%;
		height: 55px;
		border: 1px solid #333;
		outline: none;
		box-sizing: border-box;
		border-radius: 15px 15px 15px 15px;
		padding: 15rpx;
		padding-left: 30rpx;
	}

	.box .swiper {
		height: 200px !important;
		margin-bottom: 20px;
	}

	.box .swiper .swiper-item {
		display: flex;
		justify-content: center;
	}


	.img_swiper {
		width: 95%;
	}


	.box .service {
		display: flex;
		width: 95%;
		height: 300rpx;
		margin: 0 auto;
		flex-wrap: wrap;
		margin-bottom: 20px;
	}

	.box .service navigator {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		width: 20%;
		height: 50%;
	}

	.box .service navigator image {
		width: 100%;
		height: 60%;
	}

	.box .service navigator text {
		font-size: 14px;
	}

	.box .scroll-view {
		box-sizing: border-box;
		height: 500px;
		width: 100%;
		background-color: #EDEDED;
		padding: 20px;
	}

	.box .scroll-view view {
		height: 60%;
		border: 1px solid #fff;
		margin: 10px 0;
		border-radius: 25px;
		display: flex;
		justify-content: center;
		align-items: center;

	}
</style>
