class AsyncParallelHook {
  constructor(args) {
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) {
    let finalCallBack = args.pop();
    let index = 0, _this = this;
    function done() {
    	index ++;
    	if(index == _this.tasks.length) {
    		finalCallBack();
    	}
    }
    this.tasks.forEach(task => {
    	task(...args, done)
    });
  }
}

let hook = new AsyncParallelHook(['name'])
hook.tapAsync('react', function(name, cb) {
  setTimeout(() => {
    console.log('react', name);
    cb();
  }, 1000)
})
hook.tapAsync('node', function(name, cb) {
  setTimeout(() => {
    console.log('node', name);
    cb();
  }, 1000)
})

hook.callAsync('FinGet', function() {
	console.log('end');
});
/**一秒后打印
 * node FinGet
	 react FinGet
	 end
 */