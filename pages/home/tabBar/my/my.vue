<template>
	<view class="box">
		<button @click="loginBtn()" v-if="!userToken">登录</button>

		<view class="hasUser" v-if="user != ''">
			<view class="avatar">
				<image :src="baseURL +'/prod-api' + user.avatar" mode=""></image>
				<view class="info">
					<text>昵称:{{user.nickName}}</text>
					<text>用户:{{user.userName}}</text>
				</view>
			</view>
			<view class="getUserInfo" @click="getUserInfo()">
				<text>个人信息</text>
				<text>></text>
			</view>

			<view class="getOrderList" @click="getOrderList()">
				<text>订单列表</text>
				<text>></text>
			</view>

			<view class="updateUserPassword" @click="updateUserPassword()">
				<text>修改密码</text>
				<text>></text>
			</view>

			<view class="feekback" @click="feekback()">
				<text>意见反馈</text>
				<text>></text>
			</view>

			<button @click="exitLogin()">退出登录</button>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseURL: 'http://124.93.196.45:10001',
				userToken: '',
				user: '',
				reloadNum: 0
			}
		},
		onLoad() {

		},
		onShow() {
			this.readToken();
			this.readUser();

		},

		methods: {
			//退出登录
			exitLogin() {
				let that = this;

				uni.showToast({
					title: '即将退出',
					duration: 1500,
					icon: 'loading',
					success: res => {
						//删除缓存里的token和用户信息 user
						uni.removeStorage({
							key: 'user'
						});
						uni.removeStorage({
							key: 'token'
						})
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/home/home'
							})
						}, 1500)
					}
				})




			},
			//检验token
			readToken() {
				let that = this;
				// 从缓存读token
				let token = uni.getStorageSync('token');
				// 判断有没有拿到token
				if (token) {
					// 把从本地拿到的token赋值给页面的userToken
					this.userToken = token
					//并携带token查询用户信息
					uni.request({
						// 接口地址
						url: that.baseURL + '/prod-api/api/common/user/getInfo',
						method: 'GET',
						header: {
							//这个接口需要请求头携带token
							'Authorization': uni.getStorageSync('token')
						},
						data: {},
						success: res => {
							//把返回的user对象缓存到本地
							uni.setStorageSync('user', res.data.user);

						},
						fail: res => {
							console.log(res);
						}
					})

				} else {
					console.log('没有token,去注册', token);
					uni.navigateTo({
						// url:'/pages/login/login'
					})
				}
			},
			loginBtn() {
				uni.navigateTo({
					url: '/pages/login/login',
					complete: res => {
						console.log('over');
					}
				})
			},
			readUser() {
				let that = this;
				that.user = uni.getStorageSync('user');
				console.log(that.user);

				// location.reload()
			},
			getUserInfo() {
				uni.navigateTo({
					url: '/pages/home/tabBar/my/getInfo/getInfo'
				})
			},
			updateUserPassword() {
				uni.navigateTo({
					url: '/pages/home/tabBar/my/updateUserPassword/updateUserPassword'
				})
			},
			getOrderList() {
				uni.navigateTo({
					url: '/pages/home/tabBar/my/getOrderList/getOrderList'
				})
			},
			feekback() {
				uni.navigateTo({
					url: '/pages/home/tabBar/my/feedback/feedback'
				})
			}

		},

	}
</script>

<style scoped>
	.box {
		/* width: 100%; */
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.box .hasUser {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 40rpx;
	}

	.box .hasUser .avatar {
		width: 90%;
		display: flex;
		/* justify-content: space-around; */
		margin-bottom: 30rpx;
	}

	.box .hasUser .avatar image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10%;
		/* padding: 0 80rpx 0 50rpx; */
		margin: 0 80rpx 0 50rpx;
	}

	.box .hasUser .avatar .info {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.box .hasUser .getUserInfo,
	.box .hasUser .updateUserPassword,
	.box .hasUser .getOrderList,
	.box .hasUser .feekback {
		width: 80%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 1px solid #409EFF;
		margin: 10rpx 0;
		height: 80rpx;
		padding: 0 20rpx;
		border-radius: 30rpx;

	}
</style>
