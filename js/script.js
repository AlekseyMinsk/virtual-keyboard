
const language = {
	rus: [['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '&#8592'],
	     ['tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/', 'del'],
	     ['capslock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter'],
	     ['shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#9650', 'shift'],
	     ['ctrl', 'win', 'alt', ' ', 'alt', 'ctrl', '&#9668', '&#9660', '&#9658']],
    eng: [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '&#8592'],
	  	 ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del'],
	   	 ['capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter'],
	  	 ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#9650', 'shift'],
	  	 ['ctrl', 'win', 'alt', ' ', 'alt', 'ctrl', '&#9668', '&#9660', '&#9658']]
};

const keyBoardIds = [
	['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Del'],
    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
    ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
    ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight']
];
const systemButton = ['Tab', 'CapsLock', 'ShiftLeft', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Backspace', 'Del', 'Enter', 'ShiftRight', 'AltRight', 'ControlRight'];
const specSymbol = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '&#8592']
let currentLang = 'eng';
let lang = localStorage.getItem('lang');
if(lang) {
	currentLang = lang;
} else {
	localStorage.setItem('lang', currentLang);
}
let caps = false;

const container = document.createElement('div');
const textarea = document.createElement('textarea');
const keyBoard = document.createElement('div');

container.className = 'container';
textarea.className = 'textarea';
textarea.id = 'textarea';
keyBoard.className = 'keyBoard';
keyBoard.id = 'keyBoard';
document.body.prepend(container);
container.append(textarea);
container.append(keyBoard);

function createKeyBoard() {
	if(document.getElementById('keyBoard')) {
		keyBoard.innerHTML = ""; 
	}
	keyBoardIds.forEach((line, lineIndex) => {
		const boardLine = document.createElement('div');
		boardLine.className = 'boardLine';
		line.forEach((button, buttonIndex) => {
			const boardButton = document.createElement('div');
			boardButton.className = 'boardButton';
			boardButton.id = keyBoardIds[lineIndex][buttonIndex];
			let buttonVal = language[currentLang][lineIndex][buttonIndex];
			if(buttonVal.length === 1 && caps) {
				buttonVal = buttonVal.toLocaleUpperCase();
			}
			boardButton.innerHTML = buttonVal;
			boardButton.addEventListener("onmousedown", function() {
				boardButton.classList.add('activeBtn');
			});
			boardButton.addEventListener("onmouseup", function() {
				boardButton.classList.remove('activeBtn');
			});
			boardLine.append(boardButton);
		})
		keyBoard.append(boardLine);
	})

}




function addText(id) {
	let lineIndex;
	let buttonIndex;
	for(let i = 0; i < keyBoardIds.length; i++) {
		if(keyBoardIds[i].indexOf(id) !== -1) {
			lineIndex = i;
			buttonIndex = keyBoardIds[i].indexOf(id);
			break;
		}
	}
	if(language[currentLang] && language[currentLang][lineIndex]) {
		let newVal = language[currentLang][lineIndex][buttonIndex];
		if(caps) {
			newVal = newVal.toLocaleUpperCase();
		}
		textarea.value = textarea.value + newVal;
	}
	
}
function proceedSystem(id) {
	if(id === 'CapsLock') {
		caps = caps ? false : true;
		createKeyBoard();
	} else if(id === 'Tab') {
		textarea.value = textarea.value + "\t";
	} else if(id === "Enter") {
		textarea.value = textarea.value + "\n";
	}

}

document.addEventListener('keydown', function(event) {
	if(event.altKey && event.ctrlKey) {
		currentLang =  currentLang  === "eng" ?  "rus" : "eng";
		createKeyBoard();
		localStorage.setItem('lang', currentLang);
	} else {
		let button = document.getElementById(event.code);
		if(button) {
			button.classList.add('activeBtn');
		}
		
		if(systemButton.includes(event.code)) {
		 	proceedSystem(event.code)
		} else {
			addText(event.code)
		}
	}
 

});

document.addEventListener('keyup', function(event) {
		
	  let button = document.getElementById(event.code);
	  if(button) {
	  	button.classList.remove('activeBtn');
	  }
	  
	});



keyBoard.addEventListener('mousedown', (e) => {
	let id = e.target.id;
	if(id) {
		document.getElementById(id).classList.add('activeBtn');
		if(systemButton.includes(id)) {
	 		proceedSystem(id)
	  	} else {
	  		addText(id)
	  	}
	}
})

keyBoard.addEventListener('mouseup', (e) => {
	let id = e.target.id;
	if(id) {
		document.getElementById(id).classList.remove('activeBtn');
	}
	
})

window.addEventListener('load', () => {
	

	createKeyBoard();
})

