window.onkeydown = handle;

let codeArr = [];
let keyArr = [];

function handle(e) {
  codeArr.push(e.code);
  keyArr.push(e.key);
  console.log(keyArr)
}

