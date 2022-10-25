<template>
	<view class='vh100 w100 box' >
		<swiper class="swiper" :indicator-dots="true" :autoplay="false" indicator-active-color="#fff" indicator-color="#eee">
			<swiper-item class="item1">
				<image src="/static/guide-1.png" alt="">
			</swiper-item>
			<swiper-item class="item2">
				<image src="/static/guide-2.png" alt="">
			</swiper-item>
			<swiper-item class="relative item3">
				<image src="/static/guide-3.png" alt="">
			</swiper-item>
			<swiper-item class="item4">
				<image src="/static/guide-4.png" alt="">
			</swiper-item>
			<swiper-item class="item5">
				<image src="/static/guide-5.png" alt="">
				<view class="setting">
					<view class="showIntenet">设置网络</view>
					<view class="absolute center btn" @click="toHome()">立即体验</view>
				</view>
			</swiper-item>

		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hasGuide: 1
			}
		},
		onLoad() {
			
		},
		created() {
			this.hasGuide = uni.getStorageSync('hasGuide')
			console.log(this.hasGuide)
			if (uni.getStorageSync('hasGuide')==1) {
				uni.switchTab({
					url: '/pages/home/home'
				})
			}else{
				uni.setStorageSync('hasGuide',1)
			}
		},
		methods: {
			toHome(res) {
				console.log("123");
				uni.switchTab({
					url: '/pages/home/home',
					success: res =>{
						console.log(res);
					},
					fail:res => {
						console.log(res);
					}
				})

			}
		},

	}
</script>

<style scoped>
	.box {
		padding: 100rpx;
		background-color: #e5e5e5;
	}

	.swiper {
		height: 600rpx;
		padding-bottom: 430rpx;
	}

	.item1,
	.item2,
	.item3,
	.item4,
	.item5 {
		background-color: #00bcd4;
		text-align: center;
		height: 650rpx !important;
	}

	.item5 .setting {
		display: flex;
		justify-content: space-around;

	}


	.btn,
	.showIntenet {
		bottom: 80rpx;
		border: 1rpx solid #333;
		border-radius: 44rpx;
		width: 250rpx;
		height: 80rpx;
		line-height: 80rpx;

	}
</style>
