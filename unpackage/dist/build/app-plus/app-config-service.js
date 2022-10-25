
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/guide/guide","pages/home/home","pages/toSearch/toSearch","pages/home/tabBar/news/news","pages/home/tabBar/service/service","pages/home/searchHouse/searchHouse","pages/home/cloudManager/cloudManager","pages/home/governmentWork/governmentWork","pages/home/moreService/moreService","pages/home/tabBar/party/party","pages/home/tabBar/my/my","pages/home/settings/settings","pages/home/errorScreen/errorScreen","pages/home/gift/gift","pages/home/rocket/rocket","pages/home/teamwork/teamwork","pages/home/inspectCar/car-tabBar/inspect-record/inspect-record","pages/home/inspectCar/car-tabBar/car-manager/car-manager","pages/home/inspectCar/car-tabBar/now-subscribe/now-subscribe","pages/home/inspectCar/inspectCar","pages/login/login","pages/home/tabBar/news/newsDetails/newsDetails","pages/home/tabBar/my/getInfo/getInfo","pages/home/tabBar/my/updateUserPassword/updateUserPassword","pages/home/tabBar/my/feedback/feedback","pages/home/tabBar/my/getOrderList/getOrderList"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"list":[{"pagePath":"pages/home/home","iconPath":"static/tabBar/home.png","selectedIconPath":"static/tabBar/home_down.png","text":"首页"},{"pagePath":"pages/home/tabBar/service/service","iconPath":"static/tabBar/service.png","selectedIconPath":"static/tabBar/service_down.png","text":"全部服务"},{"pagePath":"pages/home/tabBar/party/party","iconPath":"static/tabBar/books.png","selectedIconPath":"static/tabBar/books_down.png","text":"智慧党建"},{"pagePath":"pages/home/tabBar/news/news","iconPath":"static/tabBar/news.png","selectedIconPath":"static/tabBar/news_down.png","text":"新闻"},{"pagePath":"pages/home/tabBar/my/my","iconPath":"static/tabBar/my.png","selectedIconPath":"static/tabBar/my_down.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"智慧城市","compilerVersion":"3.1.22","entryPagePath":"pages/guide/guide","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/guide/guide","meta":{"isQuit":true},"window":{"navigationBarTitleText":"智慧城市"}},{"path":"/pages/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"主页","enablePullDownRefresh":false}},{"path":"/pages/toSearch/toSearch","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/home/tabBar/news/news","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"新闻","enablePullDownRefresh":false}},{"path":"/pages/home/tabBar/service/service","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"全部服务","enablePullDownRefresh":false}},{"path":"/pages/home/searchHouse/searchHouse","meta":{},"window":{"navigationBarTitleText":"找房子","enablePullDownRefresh":false}},{"path":"/pages/home/cloudManager/cloudManager","meta":{},"window":{"navigationBarTitleText":"云端管理","enablePullDownRefresh":false}},{"path":"/pages/home/governmentWork/governmentWork","meta":{},"window":{"navigationBarTitleText":"政府工作","enablePullDownRefresh":false}},{"path":"/pages/home/moreService/moreService","meta":{},"window":{"navigationBarTitleText":"更多服务","enablePullDownRefresh":false}},{"path":"/pages/home/tabBar/party/party","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"智慧党建","enablePullDownRefresh":false}},{"path":"/pages/home/tabBar/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","enablePullDownRefresh":false}},{"path":"/pages/home/settings/settings","meta":{},"window":{"navigationBarTitleText":"设备设置","enablePullDownRefresh":false}},{"path":"/pages/home/errorScreen/errorScreen","meta":{},"window":{"navigationBarTitleText":"错误排查","enablePullDownRefresh":false}},{"path":"/pages/home/gift/gift","meta":{},"window":{"navigationBarTitleText":"随赠品","enablePullDownRefresh":false}},{"path":"/pages/home/rocket/rocket","meta":{},"window":{"navigationBarTitleText":"火箭发射","enablePullDownRefresh":false}},{"path":"/pages/home/teamwork/teamwork","meta":{},"window":{"navigationBarTitleText":"团队工作","enablePullDownRefresh":false}},{"path":"/pages/home/inspectCar/car-tabBar/inspect-record/inspect-record","meta":{},"window":{"navigationBarTitleText":"预约记录","enablePullDownRefresh":false}},{"path":"/pages/home/inspectCar/car-tabBar/car-manager/car-manager","meta":{},"window":{"navigationBarTitleText":"车辆管理","enablePullDownRefresh":false}},{"path":"/pages/home/inspectCar/car-tabBar/now-subscribe/now-subscribe","meta":{},"window":{"navigationBarTitleText":"立即预约","enablePullDownRefresh":false}},{"path":"/pages/home/inspectCar/inspectCar","meta":{},"window":{"navigationBarTitleText":"检车","enablePullDownRefresh":false}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/tabBar/news/newsDetails/newsDetails","meta":{},"window":{"navigationBarTitleText":"详细信息","enablePullDownRefresh":true}},{"path":"/pages/home/tabBar/my/getInfo/getInfo","meta":{},"window":{"navigationBarTitleText":"个人信息","enablePullDownRefresh":false}},{"path":"/pages/home/tabBar/my/updateUserPassword/updateUserPassword","meta":{},"window":{"navigationBarTitleText":"修改密码","enablePullDownRefresh":false}},{"path":"/pages/home/tabBar/my/feedback/feedback","meta":{},"window":{"navigationBarTitleText":"意见反馈","enablePullDownRefresh":false}},{"path":"/pages/home/tabBar/my/getOrderList/getOrderList","meta":{},"window":{"navigationBarTitleText":"订单列表","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
