<template>
	<view class="box">
		<view class="oldPassword">
			<input type="text" placeholder="请输入旧密码" v-model="oldPassword" />
		</view>

		<view class="newPassword">
			<input type="password" value="" placeholder="请输入新密码" v-model="newPassword" />
		</view>
		<view class="checkNewPassword">
			<input type="password" placeholder="请确认新密码" v-model="checkNewPassword" />
		</view>

		<button @click="updatePassword()">确认修改</button>
	</view>
</template>

<script>
	import {
		updatePassword
	} from '@/api/index/index.js'
	export default {
		data() {
			return {
				baseURL: 'http://124.93.196.45:10001',
				oldPassword: '',
				newPassword: '',
				checkNewPassword: ''
			}
		},
		methods: {
			async updatePassword() {
				let that = this;

				//判断三个密码框是否为空
				if (that.oldPassword !== '' && that.newPassword !== '' && that.checkNewPassword !== '') {
					//判断新密码是否一致
					if (that.newPassword != that.checkNewPassword) {
						console.log('两次密码不一样');
						uni.showToast({
							title: '两次密码不一样',
							icon: 'error'
						})
					} else {

						let res = await updatePassword({
							newPassword: that.newPassword,
							oldPassword: that.oldPassword
						})

						console.log(res);
						if (res.code == 200) {
							//修改成功提示框
							uni.showToast({
								title: '修改成功',
								icon: 'success',
								duration: 2000,
								//提示框的回调，提示框完成以后跳转到 （my） 个人信息页面
								success: res => {
									setTimeout(() => {
										uni.switchTab({
											url: '/pages/home/tabBar/my/my'
										})
									}, 2000)

								}
							})
						} else {
							//修改失败的提示框
							uni.showToast({
								title: '旧密码错误',
								icon: 'error',
								duration: 2000
							})
						}
					}
				} else {
					uni.showToast({
						title: '请输入密码',
						icon: 'error'
					})
				}
			}
		}
	}
</script>

<style>
	.box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.box .oldPassword input,
	.box .newPassword input,
	.box .checkNewPassword input {
		margin: 10rpx 0;
		border: 2rpx solid #409EFF;
		height: 80rpx;
		border-radius: 30rpx;
		padding: 0 20rpx;
	}
</style>
