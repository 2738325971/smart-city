<template>
	<view class="box">
		<view class="back">
			<view @click="back">
				< </view>
			</view>

			<view class="input-data">
				<input type="text" v-model="username" />
				<view>
					用户名
				</view>
			</view>
			<view class="input-data">
				<input type="password" v-model="password">
				<view>
					密码
				</view>
			</view>

			<button @click="login()">登录</button>
		</view>
</template>
<script>
	import {
		login
	} from '@/api/index/index.js'

	export default {
		data() {
			return {
				baseURL: 'http://124.93.196.45:10001',
				username: '',
				password: ''
			}
		},
		methods: {
			back() {
				uni.switchTab({
					url: '/pages/home/tabBar/my/my'
				})
			},
			async login() {
				let that = this;

				if (that.username.trim().length == 0) {
					uni.showToast({
						icon: 'error',
						title: '请输入用户名',
						duration: 1000
					})
				} else if (that.password.trim().length == 0) {
					uni.showToast({
						icon: 'error',
						title: '请输入密码',
						duration: 1000
					})
				} else {
					let result = await login({
						username: that.username,
						password: that.password
					})
					console.log(result);
					if (result.code == '200') {
						console.log('sucsses');
						uni.setStorageSync('token', result.token)
						uni.showToast({
							title: '登录成功',
							success: res => {
								setTimeout(() => {
									uni.reLaunch({
										url: '/pages/home/home'
									})
								}, 2000)
							}
						})
					} else {
						console.log('登陆失败');
						uni.showToast({
							title: '登陆失败',
							icon: 'error',
							duration: 1500

						})
					}

				}

			}
		}
	}
</script>

<style scoped>
	.box {
		height: 1200rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.box .back {
		position: absolute;
		top: 40rpx;
		left: 40rpx;
		font-size: 60rpx;
	}

	.box .back view {
		text-align: center;
		line-height: 80rpx;
		width: 80rpx;
		height: 80rpx;
	}

	.box .input-data {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 50rpx;
		margin-left: 200rpx;
	}

	.box .input-data input {
		border-radius: 25rpx;
		width: 80%;
		height: 80rpx;
		border: 1px solid #409eff;

		box-sizing: border-box;
		padding-left: 30rpx;
	}
</style>
