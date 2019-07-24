let {SyncHook} = require('tapable');

class Lesson {
	constructor() {
		this.hooks = {
			arch: new SyncHook(['name'])
		}
	}
	tap() { // 注册监听函数 -- 订阅
		this.hooks.arch.tap('node', function(name) {
			console.log('node', name);
		})
		this.hooks.arch.tap('react', function(name) {
			console.log('react', name);
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
react FinGet
*/