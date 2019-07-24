// let name = require('./a.js');
require('./assets/css/index.css');
require('./assets/css/commom.less');

consose.log('hello webpack4.0');
// console.log(name);

// let test = () => {
// 	console.log('箭头函数！');
// }

// test();
// console.log(test);

// class Person{
// 	constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// let person = new Person('FinGet',24);

// console.log(person.name);

// console.log('FinGet'.includes('Get'));

import jpg from './assets/snail.jpg'
let img = new Image();
img.src = jpg 

document.body.appendChild(img);