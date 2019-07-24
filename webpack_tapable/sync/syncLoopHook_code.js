class SyncLoopHook {
  constructor(args) {
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    this.tasks.forEach(task => {
      let res;
      do {
        res = task(...args)
      } while (res !== undefined)
    });
  }
}

let hook = new SyncLoopHook(['name'])
let total = 0;
hook.tap('react', function(name) {
  console.log('react', name);
  return ++total == 3 ? undefined : '继续学';
})
hook.tap('node', function(name) {
  console.log('node', name);
})

hook.call('FinGet');
/* 打印结果
node FinGet
node FinGet
node FinGet
react FinGet
*/