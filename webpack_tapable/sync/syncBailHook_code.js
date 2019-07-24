class SyncBailHook {
	constructor(args) {
		this.tasks = [];
	}
	tap(name, task) {
		this.tasks.push(task);
	}
	call(...args) {
		let res, index = 0;
		do{
			res = this.tasks[index++](...args);
		}while(res === undefined && index < this.tasks.length);
	}
}

let hook = new SyncBailHook(['name'])
hook.tap('react', function(name) {
	console.log('react', name);
	return '停止向下执行';
})
hook.tap('node', function(name) {
	console.log('node', name);
})

hook.call('FinGet');