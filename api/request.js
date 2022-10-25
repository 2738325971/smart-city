// 全局请求封装
export default (url, method, params) => {
	const baseURL = 'http://124.93.196.45:10001'
	const token = uni.getStorageSync('token');
	uni.showLoading({
		title: "加载中"
	});

	// 这里可以不用写校验token，因为有的接口不需要携带token去访问，如果让每个请求带校验token会导致方法不能用
	// if (!token) {
	// 	// 执行没有登录的逻辑
	// 	return;
	// }
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + url,
			method: method,
			header: {
				'Authorization': token
			},
			data: {
				...params
			},
			success(res) {
				resolve(res.data);
			},
			fail(err) {
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	});
};
