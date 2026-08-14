/* =========================================
   PIECES OF RANIA — INTERACTION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const page1 = document.getElementById("page1");
  const page2 = document.getElementById("page2");

  /* =========================
     PAGE TRANSITION
  ========================= */

  window.goToPage = function(pageNumber) {

    const currentPage = document.querySelector(".page.active");
    const targetPage = document.getElementById("page" + pageNumber);

    if (!targetPage || currentPage === targetPage) return;

    currentPage.classList.remove("active");
    currentPage.classList.add("page-leaving");

    setTimeout(() => {

      currentPage.classList.remove("page-leaving");

      targetPage.classList.add("active");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }, 350);
  };


  /* =========================
     "GET TO KNOW ME" CLICK
  ========================= */

  if (page1) {

    const clickableTexts = page1.querySelectorAll("p, button, div");

    clickableTexts.forEach(element => {

      const text = element.textContent
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

      if (
        text.includes("get to know me") ||
        text.includes("click me") ||
        text.includes("klik")
      ) {

        element.style.cursor = "pointer";

        element.addEventListener("click", () => {

          // efek kecil sebelum pindah
          document.body.classList.add("transitioning");

          setTimeout(() => {
            goToPage(2);
          }, 250);

          setTimeout(() => {
            document.body.classList.remove("transitioning");
          }, 900);

        });

      }

    });

  }


  /* =========================
     FALLING FLOWERS
  ========================= */

  const flowerContainer =
    document.getElementById("flower-container");

  if (flowerContainer) {

    const flowers = ["🌸", "✿", "❀", "♡", "✿"];

    function createFlower() {

      const flower = document.createElement("span");

      flower.className = "falling-flower";

      flower.textContent =
        flowers[Math.floor(Math.random() * flowers.length)];

      flower.style.left =
        Math.random() * 100 + "vw";

      flower.style.animationDuration =
        (5 + Math.random() * 6) + "s";

      flower.style.fontSize =
        (12 + Math.random() * 18) + "px";

      flower.style.opacity =
        0.25 + Math.random() * 0.55;

      flowerContainer.appendChild(flower);

      setTimeout(() => {
        flower.remove();
      }, 12000);
    }

    setInterval(createFlower, 700);

  }


  /* =========================
     LITTLE CARD INTERACTION
  ========================= */

  const cards = document.querySelectorAll(
    ".info-card, .card, .fact-card"
  );

  cards.forEach(card => {

    card.addEventListener("click", () => {

      card.classList.toggle("opened");

    });

  });


  /* =========================
     MUSIC PLAYER
  ========================= */

  const playButton =
    document.querySelector(
      ".music-player button, .music-player .play-button"
    );

  const audio =
    document.querySelector("audio");

  if (playButton && audio) {

    playButton.addEventListener("click", () => {

      if (audio.paused) {

        audio.play();

        playButton.textContent = "❚❚ PAUSE";

      } else {

        audio.pause();

        playButton.textContent = "▶ PLAY";

      }

    });

  }

});
