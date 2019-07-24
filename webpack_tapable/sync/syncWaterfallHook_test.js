let {SyncWaterfallHook} = require('tapable');

// Waterfall 瀑布
class Lesson {
	constructor() {
		this.hooks = {
			arch: new SyncWaterfallHook(['name'])
		}
	}
	tap() { // 注册监听函数 -- 订阅
		this.hooks.arch.tap('node', function(name) {
			console.log('node', name);
			return 'node 学的还不错'; // 会作为参数传给下一个任务
		})
		this.hooks.arch.tap('react', function(data) {
			console.log('react', data);
		})
	}
	start() { // 发布
		this.hooks.arch.call('FinGet');
	}
}

let lesson = new Lesson()

lesson.tap(); // 注册这两个事件
lesson.start(); // 启动钩子
/* 打印结果
node FinGet
react node 学的还不错
*/