let {AsyncParallelHook} =  require('tapable');

class Lesson {
	constructor() {
		this.hooks = {
			arch: new AsyncParallelHook(['name'])
		}
	}
	tap() { // 注册监听函数 -- 订阅
		this.hooks.arch.tapAsync('node', function(name, cb) {
			setTimeout(() => {
				console.log('node', name);
				cb(); // 如果有一个任务的cb没有执行，最后都不会打印end
			}, 1000)
		})
		this.hooks.arch.tapAsync('react', function(name, cb) {
			setTimeout(() => {
				console.log('react', name);
				cb();
			}, 1000)
		})
	}
	start() { // 发布
		this.hooks.arch.callAsync('FinGet', function() {
			console.log('end');
		});
	}
}

let lesson = new Lesson()

lesson.tap(); // 注册这两个事件
lesson.start(); // 启动钩子

/**一秒后打印
 * node FinGet
	 react FinGet
	 end
 */