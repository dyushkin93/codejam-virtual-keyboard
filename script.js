const keyCodes = ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace", "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter", "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ShiftRight", "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];

const ruLowerCases = ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Shift", "Ctrl", "Win", "Alt", " ", "AltGraph", "Ctrl", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];

const ruUpperCases = ["Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace", "Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/", "CapsLock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter", "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "Shift", "Ctrl", "Win", "Alt", " ", "AltGraph", "Ctrl", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];

const enUpperCases = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace", "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "Enter", "Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "Shift", "Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];

const enLowerCases = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift", "Ctrl", "Win", "Alt", "space", "Alt", "Ctrl", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];

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
    if (/^(Backspace|Tab|CapsLock|Enter|Shift|Control|Alt|Meta|Space)/.test(this.keyCode)) { // set names of functional keys
      this.block.className = `modifier-key ${this.enLowerCase.toLowerCase()}`;
      this.block.innerHTML = `<p>${this.enLowerCase}</p>`;
    } else if (/^Arrow/.test(this.keyCode)) { // set arrow keys icon
      this.block.classList.add("arrow");
      switch (this.keyCode) {
        case "ArrowLeft":
          this.block.classList.add("arrow-left");
          this.block.innerHTML = "&#8592";
          break;
        case "ArrowUp":
          this.block.classList.add("arrow-up");
          this.block.innerHTML = "&#8593";
          break;
        case "ArrowDown":
          this.block.classList.add("arrow-down");
          this.block.innerHTML = "&#8595";
          break;
        case "ArrowRight":
          this.block.classList.add("arrow-right");
          this.block.innerHTML = "&#8594";
          break;
        default: 
          break;
      }
    } else if (/^Key/.test(this.keyCode)) { // set letter keys name
      this.block.className = "letter-key small-key";
      this.block.innerHTML = `<div class="title english">${this.enUpperCase}</div><div class="title russian">${this.ruUpperCase}</div>`
    } else {
      this.block.className = "small-key";
      this.block.insertAdjacentHTML("beforeend", `<div class="title english"><p>${this.enUpperCase}</p><p>${this.enLowerCase}</p></div>`);
      if (this.ruLowerCase === this.ruUpperCase.toLowerCase()) {
        this.block.insertAdjacentHTML("beforeend", `<div class="title russian"><p>${this.ruUpperCase}</p></div>`);
      } else {
        this.block.insertAdjacentHTML("beforeend", `<div class="title russian"><p>${this.ruUpperCase}</p><p>${this.ruLowerCase}</p></div>`);
      }

    }
  }
}

let header = document.createElement("header");
header.innerHTML = "<h1>Virtual Keyboard</h1><p>Type your text in the field below</p>";
document.body.append(header)

let keyboardFrame = document.createElement("div");
let textArea = document.createElement("textarea");
textArea.autofocus = true;
let keyboard = document.createElement("div");

keyboardFrame.className = "keyboard-wrapper";
keyboard.className = "keyboard";

keyboardFrame.append(textArea, keyboard);
keyboardFrame.insertAdjacentHTML("beforeend", "<p>Change language (RU / ENG): Alt + Shift</p>")
document.body.append(keyboardFrame);

let keys = [];
for (let i = 0; i < keyCodes.length; i++) {
  keys.push(new Key(keyCodes[i], enLowerCases[i], enUpperCases[i], ruLowerCases[i], ruUpperCases[i]));
  keys[i].init();
  keyboard.append(keys[i].block);
}
