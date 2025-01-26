const boxDiv = document.querySelector(".box");
// add local storage here
let x = 0;
let y = 0;

function boxup() {
  y = y - 50;
  movebox();
}

function boxdown() {
  y = y + 50;
  movebox();
}

function boxleft() {
  x = x - 50;
  movebox();
}

function boxright() {
  x = x + 50;
  movebox();
}
function movebox() {
  boxDiv.style.left = `${x}px`;
  boxDiv.style.top = `${y}px`;
  console.log(x);
  console.log(y);
}
