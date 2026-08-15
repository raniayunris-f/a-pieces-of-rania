  /* =========================================================
   PIECES OF RANIA
   SCRIPT.JS — FINAL
   Cocok dengan index.html yang kamu kirim
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     HELPER
  ======================================================= */

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);


  /* =======================================================
     TOAST
  ======================================================= */

  const toast = $("#toast");

  let toastTimer;

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }


  /* =======================================================
     SPARKLES
  ======================================================= */

  const sparkleContainer = $("#sparkles");

  function sparkle(x, y, amount = 7) {
    if (!sparkleContainer) return;

    for (let i = 0; i < amount; i++) {

      const star = document.createElement("span");

      star.className = "click-sparkle";
      star.textContent = Math.random() > 0.5 ? "✦" : "♡";

      star.style.position = "fixed";
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;

      star.style.setProperty(
        "--x",
        `${Math.random() * 100 - 50}px`
      );

      star.style.setProperty(
        "--y",
        `${Math.random() * 100 - 50}px`
      );

      sparkleContainer.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 950);
    }
  }


  /* =======================================================
     PAGE SCROLL
  ======================================================= */

  function goTo(id) {
    const target = document.getElementById(id);

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }


  /* =======================================================
     HERO — LOVE ORB
  ======================================================= */

  const loveOrb = $("#loveOrb");

  if (loveOrb) {

    loveOrb.addEventListener("click", (event) => {

      loveOrb.classList.remove("orb-active");

      // force animation restart
      void loveOrb.offsetWidth;

      loveOrb.classList.add("orb-active");

      sparkle(
        event.clientX,
        event.clientY,
        10
      );

      showToast("welcome to my little world ♡");

    });

  }


  /* =======================================================
     HERO — GET TO KNOW ME
  ======================================================= */

  const goAbout = $("#goAbout");

  if (goAbout) {

    goAbout.addEventListener("click", () => {

      goTo("about");

    });

  }


  /* =======================================================
     FALLING FLOWERS
  ======================================================= */

  const petalLayer = $("#petalLayer");

  const flowerMessages = [
    "have a good day ♡",
    "you are doing great ✿",
    "keep smiling ♡",
    "you got this!",
    "stay happy 🌸",
    "a little flower for you ♡",
    "don't forget to smile ✨",
    "you deserve nice things ♡",
    "everything will be okay",
    "sending you a little love ♡"
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

    const symbols = [
      "✿",
      "❀",
      "✾",
      "🌸",
      "🌷",
      "♡"
    ];

    flower.textContent =
      symbols[
        Math.floor(
          Math.random() * symbols.length
        )
      ];

    flower.style.left =
      `${Math.random() * 100}%`;

    flower.style.fontSize =
      `${Math.random() * 13 + 15}px`;

    flower.style.animationDuration =
      `${Math.random() * 6 + 7}s`;

    flower.style.animationDelay =
      `${Math.random() * -6}s`;

    flower.style.setProperty(
      "--sway",
      `${Math.random() * 80 - 40}px`
    );

    petalLayer.appendChild(flower);


    /* CLICK FLOWER */

    flower.addEventListener("click", (event) => {

      const message =
        flowerMessages[
          Math.floor(
            Math.random() *
            flowerMessages.length
          )
        ];


     
