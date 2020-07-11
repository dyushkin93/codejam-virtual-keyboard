const keyCodes = ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace", "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter", "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ShiftRight", "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];

const ruLowerCases = ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Shift", "Ctrl", "Win", "Alt", " ", "AltGraph", "Ctrl", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];

const ruUpperCases = ["Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace", "Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/", "CapsLock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter", "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "Shift", "Ctrl", "Win", "Alt", " ", "AltGraph", "Ctrl", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];

const enUpperCases = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace", "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "Enter", "Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "Shift", "Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];

const enLowerCases = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift", "Ctrl", "Win", "Alt", "space", "Alt", "Ctrl", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"]; 

let language = "EN";

class Key {
  constructor(keyCode, enLowerCase, enUpperCase, ruLowerCase, ruUpperCase) {
    this.keyCode = keyCode;
    this.enLowerCase = enLowerCase;
    this.enUpperCase = enUpperCase;
    this.ruLowerCase = ruLowerCase;
    this.ruUpperCase = ruUpperCase;
    this.init();
    this.pressed = false;
  }
  init() {
    this.block = document.createElement("div");
    if (/^(Backspace|Tab|CapsLock|Enter|Shift|Control|Alt|Meta|Space)/.test(this.keyCode)) { // set titles of modifier keys
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
    } else if (/^Key/.test(this.keyCode)) { // set letter keys title
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
keyboardFrame.insertAdjacentHTML("beforeend", "<p>Change language (RU / ENG): Alt + Shift</p><p>&#9888 Language may be different from current input language of your PC</p>")
document.body.append(keyboardFrame);


let Keyboard = {};

for (let i = 0; i < keyCodes.length; i++) {
  Keyboard[keyCodes[i]] = new Key(keyCodes[i], enLowerCases[i], enUpperCases[i], ruLowerCases[i], ruUpperCases[i]);
}

for (let key in Keyboard) {
  keyboard.append(Keyboard[key].block);
}

let keyActions = {
  input(letter) {
    textArea.setRangeText(letter, textArea.selectionStart, textArea.selectionEnd, "end");
  },
  delete() {
    if (textArea.selectionStart != 0) {
      if (textArea.selectionStart === textArea.selectionEnd) {
        textArea.setRangeText("", textArea.selectionStart - 1, textArea.selectionEnd, "end");
      } else {
        textArea.setRangeText("", textArea.selectionStart, textArea.selectionEnd, "end");
      }
    }
  },
  unpressAll() {
    for (let key in Keyboard) {
      Keyboard[key].pressed = false;
      Keyboard[key].block.classList.remove("pressed");
    }
  },
  modifierToggle(keyObj) {
    return keyObj.pressed === true ? keyObj.pressed = false : keyObj.pressed = true;
  },
  changeLang () {
    language === "EN" ? language = "RU" : language = "EN";
    ruTitles = document.querySelectorAll(".russian");
    enTitles = document.querySelectorAll(".english");
    if (language === "EN") {
      ruTitles.forEach(element => {
        element.style.display = "none";
      });
      enTitles.forEach(element => {
        element.style.display = "block";
      });
    } else {
      ruTitles.forEach(element => {
        element.style.display = "block";
      });
      enTitles.forEach(element => {
        element.style.display = "none";
      });
    }
  }
}

// add handler for mouse click

for (let key in Keyboard) {
  Keyboard[key].block.addEventListener("mousedown", e => {
    e.preventDefault();
    textArea.focus();
    if (/^(CapsLock)/.test(Keyboard[key].keyCode)) {
      Keyboard[key].block.classList.add("pressed");
      keyActions.modifierToggle(Keyboard[key]);
    } else if (/^(Shift)/.test(Keyboard[key].keyCode)) {
      if (Keyboard.AltLeft.pressed === true || Keyboard.AltRight.pressed === true) {
        keyActions.changeLang();
        Keyboard[key].block.classList.add("pressed");
      } else {
        Keyboard[key].block.classList.toggle("pressed");
        keyActions.modifierToggle(Keyboard[key]);
      }
    } else if (/^(Alt)/.test(Keyboard[key].keyCode)) {
      if (Keyboard.ShiftLeft.pressed === true || Keyboard.ShiftRight.pressed === true) {
        keyActions.changeLang();
        Keyboard[key].block.classList.add("pressed");
      } else {
        Keyboard[key].block.classList.toggle("pressed");
        keyActions.modifierToggle(Keyboard[key]);
      }
    } else if (/^Key/.test(Keyboard[key].keyCode)) {
      Keyboard[key].block.classList.add("pressed");
      if ((Keyboard.CapsLock.pressed === true || Keyboard.ShiftRight.pressed === true || Keyboard.ShiftLeft.pressed === true) && language === "EN") {
        keyActions.input(Keyboard[key].enUpperCase);
      } else if ((Keyboard.CapsLock.pressed === true || Keyboard.ShiftRight.pressed === true || Keyboard.ShiftLeft.pressed === true) && language === "RU") {
        keyActions.input(Keyboard[key].ruUpperCase);
      } else if (language === "EN") {
        keyActions.input(Keyboard[key].enLowerCase);
      } else {
        keyActions.input(Keyboard[key].ruLowerCase);
      }
    } else if (/^Arrow/.test(Keyboard[key].keyCode)) {
      //move target
      switch (Keyboard[key].keyCode) {
        case "ArrowLeft":
          if (textArea.selectionStart != 0) {
            textArea.selectionStart = textArea.selectionStart - 1;
            textArea.selectionEnd = textArea.selectionStart;
          }
          break;
        case "ArrowUp":
          
          break;
        case "ArrowDown":
          
          break;
        case "ArrowRight":
          textArea.selectionStart = textArea.selectionStart + 1;
          textArea.selectionEnd = textArea.selectionStart;
          break;
        default: 
          break;
      }
    } else if (/Backspace/.test(Keyboard[key].keyCode)) {
      //delete char or selected
      keyActions.delete();
    } else if (/Enter/.test(Keyboard[key].keyCode)) {
      keyActions.input("\n");
    } else if (/Tab/.test(Keyboard[key].keyCode)) {
      keyActions.input("  ");
    } else if (/BracketLeft|BracketRight|Semicolon|Quote|Comma|Period/.test(Keyboard[key].keyCode)) { //keys with only russian letters
      Keyboard[key].block.classList.add("pressed");
      if ((Keyboard.ShiftRight.pressed === true || Keyboard.ShiftLeft.pressed === true) && language === "EN") {
        keyActions.input(Keyboard[key].enUpperCase);
      } else if ((Keyboard.CapsLock.pressed === true || Keyboard.ShiftRight.pressed === true || Keyboard.ShiftLeft.pressed === true) && language === "RU") {
        keyActions.input(Keyboard[key].ruUpperCase);
      } else if (language === "EN") {
        keyActions.input(Keyboard[key].enLowerCase);
      } else {
        keyActions.input(Keyboard[key].ruLowerCase);
      }
    } else if (!/Meta/.test(Keyboard[key].keyCode)) { // all other keys
      Keyboard[key].block.classList.add("pressed");
      if ((Keyboard.ShiftRight.pressed === true || Keyboard.ShiftLeft.pressed === true) && language === "EN") {
        keyActions.input(Keyboard[key].enUpperCase);
      } else if ((Keyboard.ShiftRight.pressed === true || Keyboard.ShiftLeft.pressed === true) && language === "RU") {
        keyActions.input(Keyboard[key].ruUpperCase);
      } else if (language === "EN") {
        keyActions.input(Keyboard[key].enLowerCase);
      } else {
        keyActions.input(Keyboard[key].ruLowerCase);
      }
    }
  })
}

for (let key in Keyboard) {
  Keyboard[key].block.addEventListener("mouseup", e => {
    if (Keyboard[key].enLowerCase === "Shift" && (Keyboard.AltLeft.pressed === true || Keyboard.AltRight.pressed === true)) {
      Keyboard.AltLeft.block.classList.remove("pressed");
      Keyboard.AltRight.block.classList.remove("pressed");
      Keyboard[key].block.classList.remove("pressed");
      Keyboard.AltLeft.pressed = false;
      Keyboard.AltRight.pressed = false;
    } else if (Keyboard[key].enLowerCase === "Alt" && (Keyboard.ShiftLeft.pressed === true || Keyboard.ShiftRight.pressed === true)) {
      Keyboard.ShiftLeft.block.classList.remove("pressed");
      Keyboard.ShiftRight.block.classList.remove("pressed");
      Keyboard[key].block.classList.remove("pressed");
      Keyboard.ShiftLeft.pressed = false;
      Keyboard.ShiftRight.pressed = false;
    } else if (/CapsLock/.test(Keyboard[key].keyCode) && Keyboard[key].pressed === false) {
      Keyboard[key].block.classList.remove("pressed");
    } else if ((!/^(Shift|Alt|Caps)/.test(Keyboard[key].enLowerCase))) {
      Keyboard[key].block.classList.remove("pressed");
    }
  })
}