<template>
	<view class="box">
		<view class="area-box">
			<textarea v-model="inputValue" @input="showLength" maxlength="150" class="input-area" placeholder="请输入反馈内容"
				name="" id="" cols="30" rows="10"></textarea>
		</view>
		<view class="hint">
			当前字数 {{inputValue.length}} / 150
		</view>
		<view class="submit">
			<button @click="submit()">提交反馈</button>
		</view>

		<view class="feedback-list">
			<view class="feedback-list-head">
				<view class="border-left">

				</view>
				<text>我的反馈</text>
			</view>

			<view class="my-feedback">
				<view class="list-content" v-for="(item,index) in feedbackList" :key="index">
					<view class="feedback-userId">
							{{item.userId}}
						</view>
						
						<!-- <view class="feedback-title">
							反馈标题:{{item.title}}
						</view> -->
						
						<view class="feedback-content">
							反馈内容:{{item.content}}
						</view>
						
						<view class="publish-time">
							发布时间:{{item.createTime}}
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	import {
		getFeedback,
		submitFeedback
	} from '@/api/index/index.js'
	export default {
		data() {
			return {
				baseURL: 'http://124.93.196.45:10001',
				inputValue: '',
				feedbackList: []
			}
		},
		onLoad() {
			this.getFeedback()
		},
		methods: {
			showLength() {
				let that = this;
				console.log(that.inputValue.length);
			},
			async submit() {
				let that = this;
				if (that.inputValue.length == 0) {
					uni.showToast({
						title: '请输入内容',
						icon: 'error',
						duration: 2000
					})
				} else {
					console.log('value is:' + that.inputValue);

					let res = await submitFeedback({
						content: that.inputValue
					});
					console.log(res);
					if (res.code == 200) {
						
						uni.showToast({
							title: '收到了你的反馈!',
							icon: 'success',
							duration: 2000
						})
						that.getFeedback()
						that.inputValue = ''
					}
				}
			},
			// 获取意见反馈
			async getFeedback() {
				let that = this;
					
				let res = await getFeedback();
				// console.log(res);
				if(res.code == 200) {
					that.feedbackList = res.rows
					console.log(that.feedbackList);
				}
			}
		}
	}
</script>

<style scoped>
	.box .area-box {
		margin: 30rpx;
	}

	.box .input-area {
		border-radius: 16rpx;
		border: 2rpx solid #66B4F8;
		margin: auto;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.box .hint {
		display: flex;
		justify-content: end;
		color: #666;
		font-size: 28rpx;
		margin: 20rpx 100rpx 40rpx 0;
	}

	.box .submit button {
		width: 30%;
		border-radius: 50rpx;
		color: #fff;
		background-color: #2979FF;
	}

	.box .feedback-list {}

	.box .feedback-list .feedback-list-head {
		display: flex;
		align-items: center;
	}

	.box .feedback-list .feedback-list-head .border-left {
		width: 8rpx;
		height: 40rpx;
		background-color: #00AAFF;
		border-radius: 10rpx;
		margin: 20rpx 10rpx 20rpx 30rpx;
	}
	
	.box .feedback-list .my-feedback {
	}
	
	.box .feedback-list .my-feedback .list-content {
		box-sizing: border-box;
		width: 90%;
		margin: auto;
		padding: 30rpx 0;
	}
</style>
