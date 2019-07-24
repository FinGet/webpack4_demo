class SyncWatterfallHook {
	constructor(args) {
		this.tasks = [];
	}
	tap(name, task) {
		this.tasks.push(task);
	}
	call(...args) {
		let [first, ...others] = this.tasks;
		let res = first(...args);

		others.reduce((a,b) => {
			return b(a)
		}, res)
	}
}

let hook = new SyncWatterfallHook(['name'])
hook.tap('react', function(name) {
	console.log('react', name);
	return 'react 全学会了！';
})
hook.tap('node', function(data) {
	console.log('node', data);
	return 'node 也学会了!'
})
hook.tap('webpack', function(data) {
	console.log('webpack', data);
})

hook.call('FinGet');

/**打印结果
 * react FinGet
	 node react 全学会了！
	 webpack node 也学会了!
 */