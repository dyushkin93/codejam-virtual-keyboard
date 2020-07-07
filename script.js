const keyCodes = ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace", "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete", "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter", "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ShiftRight", "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];

const ruLowerCases = ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "Delete", "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Shift", "Ctrl", "Win", "Alt", " ", "AltGraph", "Ctrl", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];

const ruUpperCases = ["Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace", "Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/", "Delete", "CapsLock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter", "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "Shift", "Ctrl", "Win", "Alt", " ", "AltGraph", "Ctrl", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];

const enUpperCases = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace", "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", "Delete", "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "Enter", "Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift", "Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];

const enLowerCases = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Delete", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift", "Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];

class Key {
  constructor(keyCode, enLowerCase, enUpperCase, ruLowerCase, ruUpperCase) {
    this.keyCode = keyCode;
    this.enLowerCase = enLowerCase;
    this.enUpperCase = enUpperCase;
    this.ruLowerCase = ruLowerCase;
    this.ruUpperCase = ruUpperCase;
  }

  init() {
    this.block = document.createElement("div");
    if (/^(Backspace|Tab|CapsLock|Enter|Shift|Control|Alt|Meta|Space|Delete)/.test(this.keyCode)) { // set names of functional keys
      this.block.className = this.enLowerCase;
      this.block.innerHTML = `<p>${this.enLowerCase}</p>`;
    } else if (/^Arrow/.test(this.keyCode)) { // set arrow keys icon
      switch (this.keyCode) {
        case "ArrowLeft":
          this.block.className = "arrow-left";
          this.block.innerHTML = "&#8592";
          break;
        case "ArrowUp":
          this.block.className = "arrow-up";
          this.block.innerHTML = "&#8593";
          break;
        case "ArrowDown":
          this.block.className = "arrow-down";
          this.block.innerHTML = "&#8594";
          break;
        case "ArrowRight":
          this.block.className = "arrow-right";
          this.block.innerHTML = "&#8595";
          break;
        default: 
          break;
      }
    } else if (/^Key/.test(this.keyCode)) { // set letter keys name
      this.block.className = "letter-key smallKey";
      this.block.innerHTML = `<div class="english">${this.enUpperCase}</div><div class="russian">${this.ruUpperCase}</div>`
    } else if (/^(Backquote|BracketLeft|BracketRight|Semicolon|Quote|Comma|Period)/.test(this.keyCode)){ // keys with only russian letters
      this.block.className = "letter-key smallKey";
      this.block.innerHTML = `<div class="english"><p>${this.enUpperCase}</p><p>${this.enLowerCase}</p></div><div class="russian">${this.ruUpperCase}</div>`;
    } else { // all other non-letter keys but same size, disable same symbols in both languages
      this.block.className = "smallKey";
      if (this.ruLowerCase === this.enLowerCase) {
        this.block.insertAdjacentHTML("beforeend",`<div>${this.enLowerCase}</div>`)
      } else {
        this.block.insertAdjacentHTML("beforeend",`<div class="english">${this.enLowerCase}</div><div class="russian">${this.ruLowerCase}</div>`)
      }
      if (this.ruUpperCase === this.enUpperCase) {
        this.block.insertAdjacentHTML("beforeend",`<div>${this.enUpperCase}</div>`)
      } else {
        this.block.insertAdjacentHTML("beforeend",`<div class="english">${this.enUpperCase}</div><div class="russian">${this.ruUpperCase}</div>`)
      }
    }
  }
}

let keyboardFrame = document.createElement("div");
keyboardFrame.innerHTML = "<p>Change language (RU - ENG): Alt + Shift</p>";
let textArea = document.createElement("input");
textArea.type = "text";
textArea.autofocus = true;
let keyboard = document.createElement("div");

keyboardFrame.className = "keyboard-wrapper";
keyboard.className = "keyboard";

keyboardFrame.append(textArea, keyboard);
document.body.append(keyboardFrame);

let keys = [];
for (let i = 0; i < keyCodes.length; i++) {
  keys.push(new Key(keyCodes[i], enLowerCases[i], enUpperCases[i], ruLowerCases[i], ruUpperCases[i]));
  keys[i].init();
  keyboard.append(keys[i].block);
}

console.log(ruUpperCases.length);
console.log(ruLowerCases.length);
console.log(enUpperCases.length);
console.log(enLowerCases.length);
