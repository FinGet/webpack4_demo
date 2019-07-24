class AsyncSeriesHook {
  constructor(args) {
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) {
    let index = 0;
    let finalCallBack = args.pop();
    let next = () => {
      if (this.tasks.length === index) return finalCallBack()
      let task = this.tasks[index++];
      task(...args, next)
    };
    next();
  }
}

let hook = new AsyncSeriesHook(['name'])
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
/**
 * node FinGet //一秒后打印
   react FinGet // 两秒后打印
   end // 三秒后打印
 */