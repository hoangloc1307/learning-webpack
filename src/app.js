import 'core-js/modules/es.object.values';
import 'core-js/modules/es.promise';

import { uppercase } from './ultis/stringFormat';
import './styles/style.css';
import domHandler from './dom';

domHandler();

const value = uppercase('test');
console.log(value);

// ES6 Spread Operator
const person = { name: 'Duoc' };
const personClone = { ...person };
console.log('personClone', personClone);

// ES7 Object.values
console.log('Object.values', Object.values(personClone));

// Promise Async Await

const proms = () =>
    new Promise((res, rej) => {
        setTimeout(() => res(100), 1000);
    });

(async () => {
    const value = await proms();
    console.log(value);
})();
