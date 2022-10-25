<template>
	<view class="box">
		<image @click="updateAvatar()" class="avatar" :src="baseURL + '/prod-api' + user.avatar" mode=""></image>
		<view>
			昵称：{{user.nickName}}
		</view>

		<view>
			用户名：{{user.userName}}
		</view>

		<view>
			手机号码：{{user.phonenumber}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseURL: 'http://124.93.196.45:10001',
				user: ''
			}
		},
		onShow() {
			this.getStorageSyncUser();
		},
		methods: {
			getStorageSyncUser() {
				let that = this;
				that.user = uni.getStorageSync('user')
			},
			updateAvatar(type) {
				let that = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: res => {
						console.log(res.tempFilePaths[0]);
						uni.request({
							url: that.baseURL + '/prod-api/common/upload',
							// url:'http://192.168.1.149:9000/upData',
							header:{
								'Authorization': uni.getStorageSync('token'),
								'Content-Type': 'multipart/form-data'
							},
							data: {
								file: res.tempFilePaths[0]
							},
							method:'POST',
							success:res =>{
								console.log(res);
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.box .avatar {
		width: 200rpx;
		height: 200rpx;
		border-radius: 15%;
	}
</style>
