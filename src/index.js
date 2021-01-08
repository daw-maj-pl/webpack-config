import { sum } from './sum';
import style from './css/index.scss';
console.log('Hello World');
console.log(sum(11, 2));

const heading = document.getElementById('demo');
const sumValue = `Suma: ${sum(10, 5)}`;
heading.innerHTML = sumValue;

import Icon from './assets/img/wsb.png';

let myIcon = new Image();
// let myIcon = document.createElement('img');

myIcon.src = Icon;
document.querySelector('.img-wsb').appendChild(myIcon);
