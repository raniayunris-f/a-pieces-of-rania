/* =========================================================
   PIECES OF RANIA — FULL JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     1. GET TO KNOW ME
     ======================================================= */

  const getToKnowMe = document.getElementById("getToKnowMe");
  const aboutSection = document.getElementById("about");

  if (getToKnowMe && aboutSection) {
    getToKnowMe.addEventListener("click", () => {

      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });
  }


  /* =======================================================
     2. FALLING FLOWERS
     ======================================================= */

  const fallingFlowers = document.getElementById("fallingFlowers");

  if (fallingFlowers) {

    const flowerWords = [
      "🌸",
      "✿",
      "❀",
      "♡",
      "🌷",
      "little piece ♡",
      "hello ♡",
      "dream",
      "Rania ✿"
    ];

    function createFallingFlower() {

      const flower = document.createElement("span");

      flower.className = "falling-flower";

      flower.textContent =
        flowerWords[
          Math.floor(Math.random() * flowerWords.length)
        ];

      flower.style.left =
        Math.random() * 100 + "vw";

      flower.style.fontSize =
        (Math.random() * 12 + 12) + "px";

      flower.style.animationDuration =
        (Math.random() * 5 + 6) + "s";

      flower.style.animationDelay =
        (Math.random() * 1.5) + "s";

      fallingFlowers.appendChild(flower);

      setTimeout(() => {
        flower.remove();
      }, 13000);
    }

    // bunga pertama
    for (let i = 0; i < 10; i++) {
      setTimeout(createFallingFlower, i * 300);
    }

    // bunga berikutnya
    setInterval(createFallingFlower, 650);
  }


  /* =======================================================
     3. LITTLE THINGS CARD
     ======================================================= */

  const infoCards =
    document.querySelectorAll(".info-card");

  infoCards.forEach(card => {

    card.addEventListener("click", () => {

      card.classList.toggle("selected");

      // efek kecil
      card.animate(
        [
          {
            transform: "scale(1)"
          },
          {
            transform: "scale(.94)"
          },
          {
            transform: "scale(1.03)"
          },
          {
            transform: "scale(1)"
          }
        ],
        {
          duration: 350,
          easing: "ease-out"
        }
      );

    });

  });


  /* =======================================================
     4. SCROLL REVEAL
     ======================================================= */

  const revealElements = document.querySelectorAll(
    ".about-card, .info-card, .game-box, .music-section, .assignment-item"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {

      element.classList.add("reveal");

      observer.observe(element);

    });
  }


  /* =======================================================
     5. MINI GAME
     ======================================================= */

  const gameArea =
    document.getElementById("gameArea");

  const startGame =
    document.getElementById("startGame");

  const scoreElement =
    document.getElementById("score");

  const timeElement =
    document.getElementById("time");

  const gameMessage =
    document.getElementById("gameMessage");

  const gameCharacter =
    document.getElementById("gameCharacter");


  let score = 0;
  let timeLeft = 20;
  let gameRunning = false;
  let gameTimer = null;
  let flowerTimer = null;


  /* =======================================================
     CHARACTER MOVEMENT
     ======================================================= */

  function moveCharacter() {

    if (!gameCharacter || !gameArea) return;

    const areaWidth =
      gameArea.clientWidth;

    const characterWidth =
      gameCharacter.offsetWidth;

    const minX = 10;

    const maxX =
      areaWidth -
      characterWidth -
      10;

    const randomX =
      Math.random() *
      (maxX - minX) +
      minX;

    gameCharacter.style.left =
      randomX + "px";

    gameCharacter.style.transform =
      "translateX(0)";
  }


  /* =======================================================
     CREATE GAME FLOWER
     ======================================================= */

  function createGameFlower() {

    if (!gameRunning || !gameArea) return;

    const flower =
      document.createElement("button");

    flower.type = "button";

    flower.className =
      "game-flower";

    flower.textContent =
      ["🌸", "🌷", "✿", "❀"][
        Math.floor(Math.random() * 4)
      ];

    const maxX =
      gameArea.clientWidth - 50;

    const maxY =
      gameArea.clientHeight - 70;

    flower.style.left =
      Math.max(
        10,
        Math.random() * maxX
      ) + "px";

    flower.style.top =
      Math.max(
        10,
        Math.random() * maxY
      ) + "px";


    /* flower click */

    flower.addEventListener("click", () => {

      if (!gameRunning) return;

      score++;

      if (scoreElement) {
        scoreElement.textContent =
          score;
      }

      flower.animate(
        [
          {
            transform: "scale(1)",
            opacity: 1
          },
          {
            transform: "scale(1.8)",
            opacity: 0
          }
        ],
        {
          duration: 220
        }
      );

      setTimeout(() => {
        flower.remove();
      }, 180);


      moveCharacter();


      /* WIN */

      if (score >= 10) {

        finishGame(true);

      }

    });


    gameArea.appendChild(flower);


    /* flower disappears */

    setTimeout(() => {

      if (flower.isConnected) {
        flower.remove();
      }

    }, 1800);

  }


  /* =======================================================
     START GAME
     ======================================================= */

  function startTheGame() {

    if (!gameArea) return;

    gameRunning = true;

    score = 0;

    timeLeft = 20;

    if (scoreElement) {
      scoreElement.textContent =
        "0";
    }

    if (timeElement) {
      timeElement.textContent =
        "20";
    }

    if (gameMessage) {
      gameMessage.textContent =
        "catch the flowers! 🌸";
    }


    /* remove old flowers */

    gameArea
      .querySelectorAll(".game-flower")
      .forEach(flower => {
        flower.remove();
      });


    if (startGame) {
      startGame.textContent =
        "🌸 GAME ON! 🌸";
    }


    moveCharacter();


    /* create flowers */

    createGameFlower();

    flowerTimer =
      setInterval(
        createGameFlower,
        850
      );


    /* timer */

    gameTimer =
      setInterval(() => {

        timeLeft--;

        if (timeElement) {
          timeElement.textContent =
            timeLeft;
        }


        if (timeLeft <= 0) {

          finishGame(false);

        }

      }, 1000);

  }


  /* =======================================================
     FINISH GAME
     ======================================================= */

  function finishGame(won) {

    gameRunning = false;

    clearInterval(gameTimer);

    clearInterval(flowerTimer);


    if (gameArea) {

      gameArea
        .querySelectorAll(".game-flower")
        .forEach(flower => {

          flower.animate(
            [
              {
                opacity: 1
              },
              {
                opacity: 0
              }
            ],
            {
              duration: 300
            }
          );

          setTimeout(() => {
            flower.remove();
          }, 300);

        });

    }


    if (startGame) {
      startGame.textContent =
        "🌸 PLAY AGAIN 🌸";
    }


    if (gameMessage) {

      if (won) {

        gameMessage.textContent =
          "YOU DID IT! 🌷 You found all the little flowers ♡";

        celebrate();

      } else {

        gameMessage.textContent =
          "aww, time's up! ♡ Try again!";

      }

    }

  }


  /* =======================================================
     GAME CELEBRATION
     ======================================================= */

  function celebrate() {

    if (!gameArea) return;

    const message =
      document.createElement("div");

    message.textContent =
      "♡ ✿ YOU FOUND RANIA'S SECRET ✿ ♡";

    message.style.position =
      "absolute";

    message.style.left =
      "50%";

    message.style.top =
      "45%";

    message.style.transform =
      "translate(-50%, -50%)";

    message.style.width =
      "90%";

    message.style.padding =
      "18px";

    message.style.borderRadius =
      "25px";

    message.style.background =
      "rgba(255,255,255,.92)";

    message.style.color =
      "#b47797";

    message.style.fontWeight =
      "700";

    message.style.fontSize =
      "14px";

    message.style.zIndex =
      "20";

    message.style.boxShadow =
      "0 15px 40px rgba(100,70,100,.15)";

    gameArea.appendChild(message);


    message.animate(
      [
        {
          opacity: 0,
          transform:
            "translate(-50%, -50%) scale(.8)"
        },
        {
          opacity: 1,
          transform:
            "translate(-50%, -50%) scale(1)"
        }
      ],
      {
        duration: 500,
        easing: "ease-out"
      }
    );


    setTimeout(() => {

      message.animate(
        [
          {
            opacity: 1
          },
          {
            opacity: 0
          }
        ],
        {
          duration: 500
        }
      );

      setTimeout(() => {
        message.remove();
      }, 500);

    }, 2500);

  }


  if (startGame) {

    startGame.addEventListener(
      "click",
      startTheGame
    );

  }


  /* =======================================================
     6. MUSIC DECORATION
     ======================================================= */

  const fakeMusicButton =
    document.getElementById(
      "fakeMusicButton"
    );

  if (fakeMusicButton) {

    let playing = false;

    fakeMusicButton.addEventListener(
      "click",
      () => {

        playing = !playing;

        fakeMusicButton.textContent =
          playing ? "❚❚" : "▶";


        fakeMusicButton.animate(
          [
            {
              transform: "scale(1)"
            },
            {
              transform: "scale(1.15)"
            },
            {
              transform: "scale(1)"
            }
          ],
          {
            duration: 300
          }
        );

      }
    );

  }


  /* =======================================================
     7. ASSIGNMENT BUTTONS
     ======================================================= */

  const assignmentButtons =
    document.querySelectorAll(
      ".assignment-button"
    );

  assignmentButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const text =
          button.textContent
            .trim()
            .toUpperCase();


        if (text === "SOON") {

          showSmallMessage(
            "this assignment is coming soon ♡"
          );

          return;

        }


        if (text === "OPEN") {

          showSmallMessage(
            "welcome to Rania's school corner! 📚♡"
          );

        }

      }
    );

  });


  /* =======================================================
     8. SMALL MESSAGE
     ======================================================= */

  function showSmallMessage(text) {

    const message =
      document.createElement("div");

    message.textContent =
      text;

    message.style.position =
      "fixed";

    message.style.left =
      "50%";

    message.style.bottom =
      "25px";

    message.style.transform =
      "translateX(-50%) translateY(20px)";

    message.style.background =
      "rgba(255,255,255,.95)";

    message.style.color =
      "#9d6f8b";

    message.style.padding =
      "13px 20px";

    message.style.borderRadius =
      "50px";

    message.style.boxShadow =
      "0 10px 30px rgba(100,70,100,.15)";

    message.style.fontSize =
      "13px";

    message.style.fontWeight =
      "600";

    message.style.zIndex =
      "999";

    document.body.appendChild(
      message
    );


    message.animate(
      [
        {
          opacity: 0,
          transform:
            "translateX(-50%) translateY(20px)"
        },
        {
          opacity: 1,
          transform:
            "translateX(-50%) translateY(0)"
        }
      ],
      {
        duration: 350,
        easing: "ease-out"
      }
    );


    setTimeout(() => {

      message.animate(
        [
          {
            opacity: 1
          },
          {
            opacity: 0
          }
        ],
        {
          duration: 400
        }
      );

      setTimeout(() => {
        message.remove();
      }, 400);

    }, 1800);

  }


  /* =======================================================
     9. RESIZE
     ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (gameRunning) {
        moveCharacter();
      }

    }
  );


  /* =======================================================
     10. PAGE LOADED
     ======================================================= */

  document.body.classList.add(
    "page-loaded"
  );

});
