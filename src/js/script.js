"use strict";

const DEFAULT_GRID = 16;
const DEFAULT_COLOR = "#000000";

let isMouseDown = false;
window.onmousedown = () => isMouseDown = true;
window.onmouseup = () => isMouseDown = false;

createCanvasGrid(DEFAULT_GRID);
let currentColor = DEFAULT_COLOR;

const colorPicker = document.querySelector(".color");
colorPicker.addEventListener("change", () => {
  currentColor = colorPicker.value;
})

const gridSlider = document.querySelector(".slider");
gridSlider.addEventListener("change", () => {
  const sliderOutput = document.querySelector(".slider__output");
  sliderOutput.textContent = `${gridSlider.value} x ${gridSlider.value}`;

  createCanvasGrid(gridSlider.value);
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