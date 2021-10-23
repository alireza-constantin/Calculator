const operators = document.querySelectorAll('.op');
const panel = document.getElementById('panel');
const prev = document.getElementById('prevDis');
const curr = document.getElementById('currDis');

let prevVal = 0;
let currVal = 0;
let answer = 0;
let operator = '';

let first = true;

panel.addEventListener('click', (e) => {
	const target = e.target;
	const text = target.innerText;

	currVal = +curr.innerText;

	if (target.classList.contains('op')) {
		if (text !== '=') {
			operator = text;
		}
		switch (text) {
			case '+':
				if (currVal === answer) {
					return;
				}
				answer = +prevVal + +currVal;
				break;
			case '-':
				console.log('manfi');
				if (currVal === answer) {
					return;
				}
				answer = +prevVal - +currVal;
				break;
			case '×':
				if (currVal === answer) {
					return;
				}
				first ? (prevVal = 1) : prevVal;
				answer = +prevVal * +currVal;
				first = false;
				break;
			case '÷':
				if (currVal === answer) {
					return;
				}
				console.log('hi');
				// first ? (prevVal = 1) : prevVal;
				answer = +prevVal / +currVal;
				first = false;
				break;
			case '=':
				if (operator === '+') {
					answer = +prevVal + +currVal;
					operator = '+';
				} else if (operator === '-') {
					answer = +prevVal - +currVal;
					operator = '-';
				} else if (operator === '×') {
					answer = +prevVal * +currVal;
					operator = '×';
				} else if (operator === '÷') {
					answer = +prevVal / +currVal;
					operator = '÷';
				}

			default:
				break;
		}

		prevVal = answer;
		currVal = answer;
	} else {
		if (currVal === answer) {
			currVal = 0;
		}
		currVal += text;
	}

	curr.innerText = +currVal;
	prev.innerText = `${prevVal} ${operator}`;
});
