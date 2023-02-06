"use strict";

let currentColor = "black";

let isMouseDown = false;
window.onmousedown = () => isMouseDown = true;
window.onmouseup = () => isMouseDown = false;

const createBtn = document.querySelector(".btn");

createBtn.addEventListener("click", () => {
  const gridSize = +prompt("Hello");
  createCanvasGrid(gridSize);
})

function createCanvasGrid(size) {
  const canvas = document.querySelector(".canvas");
  canvas.innerHTML = "";
  canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for (let i = 1; i <= size * size; i++) {
    const newCell = document.createElement("div");
    newCell.classList.add("canvas__cell");
    canvas.appendChild(newCell);
  }

  drawOnCanvas();
}

function drawOnCanvas() {
  const canvasCells = document.querySelectorAll(".canvas__cell");

  canvasCells.forEach((cell) => {
    cell.addEventListener("mouseover", (event) => {
      if (isMouseDown) {
        event.target.style.backgroundColor = currentColor;
      } 
    })
  })
}