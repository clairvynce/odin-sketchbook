"use strict";

const DEFAULT_GRID = 16;
const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "default";

let currentMode = DEFAULT_MODE;

let isMouseDown = false;
window.onmousedown = () => isMouseDown = true;
window.onmouseup = () => isMouseDown = false;

const modeButtons = document.querySelectorAll(".btn");
modeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    for (let i = 0; i < modeButtons.length; i++) {
      modeButtons[i].classList.remove("btn_active");
    }
    if (event.target.classList.contains("btn_clear")) {
      modeButtons[0].classList.add("btn_active");
      createCanvasGrid(gridSlider.value);
      currentMode = "default";
    } else {
      event.target.classList.add("btn_active");
      handleModeChange(event.target.classList);
    }
  })
})

function handleModeChange(mode) {
  if (mode.contains("btn_default")) {
    currentMode = "default";
  } else if (mode.contains("btn_random")) {
    currentMode = "random";
  } else if (mode.contains("btn_mono")) {
    currentMode = "mono";
  }
  console.log(currentMode);
}

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
      if (isMouseDown && currentMode === "default") {
        event.target.style.backgroundColor = currentColor;
      } else if (isMouseDown && currentMode === "random") {
        event.target.style.backgroundColor = `rgb(${getRandomNumber(1, 255)},
                                                  ${getRandomNumber(1, 255)},
                                                  ${getRandomNumber(1, 255)})`;
      }
    })
  })
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}