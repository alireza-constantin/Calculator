const operators = document.querySelectorAll('.op');
const panel = document.getElementById('panel');
const prev = document.getElementById('prevDis');
const curr = document.getElementById('currDis');
const modal = document.querySelector('.modal');

let prevVal = '';
let currVal = '';
let answer = '';
let operation;

const history = [];

panel.addEventListener('click', (e) => {
	const target = e.target;
	const text = target.innerText;

	if (target.classList.contains('op')) {
		chooseOperation(text);
		updateUI();
	} else if (target.classList.contains('equal')) {
		calculate();
		updateUI();
	} else if (target.classList.contains('clear')) {
		clear();
		updateUI();
	} else if (target.classList.contains('delete')) {
		backSpace();
		updateUI();
	} else if (target.classList.contains('history')) {
		modal.classList.add('show');
		createHistory();
	} else {
		if (currVal.includes('.') && text === '.') return;
		currVal += text;
		updateUI();
	}
});

function updateUI() {
	curr.innerText = currVal;
	if (operation != null) {
		prev.innerText = `${prevVal} ${operation}`;
	} else {
		prev.innerText = '';
	}
}

function chooseOperation(text) {
	if (currVal === '') return;
	if (prevVal !== '') calculate();
	operation = text;
	prevVal = currVal;
	currVal = '';
}

function clear() {
	currVal = '';
	prevVal = '';
	operation = '';
}

function backSpace() {
	currVal = currVal.toString().slice(0, -1);
}

function calculate() {
	let answer;
	const prev = +prevVal;
	const curr = +currVal;

	// Checking if the values exists
	if (isNaN(prev) || isNaN(curr)) return;

	switch (operation) {
		case '+':
			answer = prev + curr;
			break;
		case '-':
			answer = prev - curr;
			break;
		case '÷':
			answer = prev / curr;
			break;
		case '×':
			answer = prev * curr;
			break;
		default:
			return;
	}

	history.push(`${prevVal} ${operation} ${currVal} = ${answer}`);

	currVal = answer;
	operation = undefined;
	prevVal = '';
}

function createHistory() {
	const root = document.getElementById('root');
	root.innerHTML = '';
	history.forEach((item) => {
		const p = document.createElement('p');
		p.innerText = item;
		root.append(p);
	});
}

modal.addEventListener('click', function (e) {
	e.stopPropagation();
});

document.querySelector('.close').addEventListener('click', () => {
	modal.classList.remove('show');
});
