"use strict";

const DEFAULT_MODE = "default";
const DEFAULT_COLOR = "#000000";
const DEFAULT_GRID = 16;

let currentMode, isMouseDown;

document.addEventListener("mousedown", () => (isMouseDown = true));
document.addEventListener("mouseup", () => (isMouseDown = false));

const colorPicker = document.querySelector(".color");

const initializeApp = () => {
  createCanvasGrid(DEFAULT_GRID);
  colorPicker.value = DEFAULT_COLOR;
  currentMode = "default";
  isMouseDown = false;
};

const createCanvasGrid = (pixels) => {
  const canvas = document.querySelector(".canvas");
  canvas.innerHTML = "";
  canvas.style.gridTemplateColumns = `repeat(${pixels}, 1fr)`;

  for (let i = 1; i <= pixels * pixels; i++) {
    const newPixel = document.createElement("div");
    newPixel.classList.add("canvas__cell");
    canvas.appendChild(newPixel);
  }
  listenPixels();
};

initializeApp();

const drawOnCanvas = (pixel) => {
  if (currentMode === "default" && isMouseDown) {
    pixel.style.backgroundColor = colorPicker.value;
  } else if (currentMode === "random" && isMouseDown) {
    pixel.style.backgroundColor = getRandomColor();
  } else if (currentMode === "mono" && isMouseDown) {
    pixel.style.backgroundColor = getMonoColor();
  }
};

const gridSlider = document.querySelector(".slider");
gridSlider.addEventListener("change", () => {
  createCanvasGrid(gridSlider.value);
  const gridOutput = document.querySelector(".slider__output");
  gridOutput.textContent = `${gridSlider.value} x ${gridSlider.value}`;
});

function listenPixels() {
  const canvasPixels = document.querySelectorAll(".canvas__cell");
  canvasPixels.forEach((pixel) => {
    pixel.addEventListener("mouseover", (evt) => {
      drawOnCanvas(evt.target);
    });
  });
}

function getRandomColor() {
  return `rgb(${Math.floor(Math.random() * 256)},
              ${Math.floor(Math.random() * 256)},
              ${Math.floor(Math.random() * 256)})`;
}

// function getMonoColor() {
//   console.log("Hello world");
// }

const clearBtn = document.querySelector(".btn_clear");
clearBtn.addEventListener("click", () => {
  createCanvasGrid(gridSlider.value);
});

const switchCurrentMode = (modeName) => {
  switch (modeName) {
    case "default":
      currentMode = "default";
      break;
    case "random":
      currentMode = "random";
      break;
    case "mono":
      currentMode = "mono";
      break;
    default:
      currentMode = "default";
  }
};

const modeBtns = document.querySelectorAll(".btn_mode");
modeBtns.forEach((button) => {
  button.addEventListener("click", (evt) => {
    switchCurrentMode(evt.target.dataset.mode);

    for (let i = 0; i < modeBtns.length; i++) {
      modeBtns[i].classList.remove("btn_active");
    }

    evt.target.classList.add("btn_active");
  });
});
