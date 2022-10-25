import request from '@/api/request.js'

// 登录
export const login = (params) => {
	return request('/prod-api/api/login', 'POST', params)
}

//新闻评论点赞
export const doLike = (id) => {
	return request('/prod-api/press/pressComment/like/' + id, 'PUT')
}

// 获取评论列表
export const getAllComment = (params) => {
	return request('/prod-api/press/comments/list', 'GET', params)
}

// 获取新闻详细信息
export const getNewsDetails = (id) => {
	return request('/prod-api/press/press/' + id, 'GET')
}

// 提交新闻评论
export const submieComment = (params) => {
	if (uni.getStorageSync('token') == '') {
		console.log('not have token');
		return request('/prod-api/press/pressComment', 'POST', params)
	}else{
		console.log('has token');
		return request('/prod-api/press/pressComment', 'POST', params)
	}
}

// 修改密码
export const updatePassword = (params) => {
	return request('/prod-api/api/common/user/resetPwd', 'PUT', params)
}

// 获取新闻列表
export const getNewsList = () => {
	return request('/prod-api/press/press/list', 'GET')
}

// 获取主页轮播图
export const getSlideImg = (params) => {
	return request('/prod-api/api/rotation/list', 'GET', params)
}

// 获取主页新闻列表
export const getHomeNewsList = () => {
	return request('/prod-api/press/category/list', 'GET')
}

// 获取用户信息
export const getUserInfo = () => {
	return request('/prod-api/api/common/user/getInfo', 'GET')
}

// 用户意见反馈
export const submitFeedback = (params) => {
	return request('/prod-api/api/common/feedback', 'POST', params)
}

// 获取意见反馈
export const getFeedback= () =>{
	return request('/prod-api/api/common/feedback/list','GET')
}