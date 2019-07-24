let {SyncLoopHook} = require('tapable');
// 同步遇到某个不反悔undefined的监听函数会多次执行
class Lesson {
	constructor() {
		this.index = 0;
		this.hooks = {
			arch: new SyncLoopHook(['name'])
		}
	}
	tap() { // 注册监听函数 -- 订阅
		this.hooks.arch.tap('node', name => {
			console.log('node', name);
			return ++this.index === 3?undefined:'继续学';
		})
		this.hooks.arch.tap('react', name => {
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
node FinGet
node FinGet
react FinGet
*/