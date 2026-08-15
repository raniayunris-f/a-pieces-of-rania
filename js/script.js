/* =========================================================
   PIECES OF RANIA
   SCRIPT.JS
   FULL INTERACTIVE VERSION
========================================================= */

"use strict";

/* =========================================================
   ELEMENT HELPERS
========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/* =========================================================
   GLOBAL ELEMENTS
========================================================= */

const sparkles = $("#sparkles");
const petalLayer = $("#petalLayer");

const loveOrb = $("#loveOrb");
const goAbout = $("#goAbout");

const toMusic = $("#toMusic");
const toGame = $("#toGame");

const musicAudio = $("#musicAudio");
const playButton = $("#playButton");
const cassette = $("#cassette");
const progressBar = $("#progressBar");
const audioStatus = $("#audioStatus");

const gameStage = $("#gameStage");
const character = $("#character");
const throwHeart = $("#throwHeart");
const basket = $("#basket");

const scoreElement = $("#score");
const gameMessage = $("#gameMessage");

const resetGame = $("#resetGame");
const helpGame = $("#helpGame");

const toast = $("#toast");


/* =========================================================
   GENERAL UTILITIES
========================================================= */

function showToast(message, duration = 2200) {

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}


/* =========================================================
   SCROLL TO SECTION
========================================================= */

function goToSection(id) {

  const section = document.getElementById(id);

  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* =========================================================
   SPARKLE EFFECT
========================================================= */

function createSparkles(x, y, amount = 8) {

  if (!sparkles) return;

  const symbols = ["✦", "✧", "♡", "⋆"];

  for (let i = 0; i < amount; i++) {

    const sparkle = document.createElement("span");

    sparkle.className = "click-sparkle";

    sparkle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    sparkle.style.position = "fixed";
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    sparkle.style.setProperty(
      "--x",
      `${(Math.random() - 0.5) * 100}px`
    );

    sparkle.style.setProperty(
      "--y",
      `${(Math.random() - 0.5) * 100}px`
    );

    sparkle.style.animationDelay =
      `${Math.random() * 0.12}s`;

    sparkles.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }
}


/* =========================================================
   GLOBAL CLICK SPARKLES
========================================================= */

document.addEventListener("click", (event) => {

  const target = event.target;

  if (
    target.closest("button") ||
    target.closest("a") ||
    target.closest(".falling-flower") ||
    target.closest(".hand-heart")
  ) {

    createSparkles(
      event.clientX,
      event.clientY,
      6
    );
  }

});


/* =========================================================
   HERO HEART
========================================================= */

if (loveOrb) {

  loveOrb.addEventListener("click", (event) => {

    loveOrb.classList.remove("orb-active");

    void loveOrb.offsetWidth;

    loveOrb.classList.add("orb-active");

    createSparkles(
      event.clientX,
      event.clientY,
      14
    );

    showToast(
      "welcome to my little world ♡"
    );

    setTimeout(() => {
      loveOrb.classList.remove("orb-active");
    }, 800);

  });

}


/* =========================================================
   GET TO KNOW ME
========================================================= */

if (goAbout) {

  goAbout.addEventListener("click", () => {

    goToSection("about");

  });

}


/* =========================================================
   FALLING FLOWERS
========================================================= */

const flowerMessages = [

  "have a good day ♡",
  "you are doing great ✦",
  "smile today ♡",
  "you've got this!",
  "take a little breath 🌸",
  "you deserve good things ♡",
  "stay soft, stay strong",
  "something beautiful is coming ✦",
  "keep going ♡",
  "don't forget to smile",
  "you are enough ♡",
  "sending you a little love 🌷"

];


function createFlower() {

  if (!petalLayer) return;

  const flower = document.createElement("button");

  flower.type = "button";

  flower.className = "falling-flower";

  flower.setAttribute(
    "aria-label",
    "click the flower"
  );

  flower.textContent =
    Math.random() > 0.5 ? "✿" : "❀";


  const size =
    Math.floor(Math.random() * 18) + 18;

  const left =
    Math.random() * 96;

  const duration =
    Math.random() * 7 + 9;

  const delay =
    Math.random() * -12;


  flower.style.left = `${left}%`;

  flower.style.fontSize = `${size}px`;

  flower.style.animationDuration =
    `${duration}s`;

  flower.style.animationDelay =
    `${delay}s`;


  flower.dataset.message =
    flowerMessages[
      Math.floor(
        Math.random() * flowerMessages.length
      )
    ];


  flower.addEventListener("click", (event) => {

    event.stopPropagation();

    createFlowerBubble(
      event.clientX,
      event.clientY,
      flower.dataset.message
    );

    createSparkles(
      event.clientX,
      event.clientY,
      12
    );

    flower.classList.add("flower-clicked");

    setTimeout(() => {

      flower.remove();

      createFlower();

    }, 350);

  });


  petalLayer.appendChild(flower);

}


/* Create enough flowers */

if (petalLayer) {

  for (let i = 0; i < 18; i++) {
    createFlower();
  }

}


/* =========================================================
   FLOWER BUBBLE
========================================================= */

function createFlowerBubble(x, y, message) {

  const bubble =
    document.createElement("div");

  bubble
