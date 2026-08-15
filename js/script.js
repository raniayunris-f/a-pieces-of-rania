document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // FLIP CARD
  // =========================
  document.addEventListener("click", function (event) {

    const card = event.target.closest(".flip-card");

    if (card) {
      event.preventDefault();
      card.classList.toggle("flipped");
    }

  });


  // =========================
  // WELCOME BUTTON
  // =========================
  const welcomeBtn = document.getElementById("welcomeBtn");

  if (welcomeBtn) {
    welcomeBtn.addEventListener("click", function () {

      const about = document.getElementById("about");

      if (about) {
        about.scrollIntoView({
          behavior: "smooth"
        });
      }

    });
  }


  // =========================
  // SEMUA DATA-SCROLL
  // =========================
  document.querySelectorAll("[data-scroll]").forEach(function (button) {

    button.addEventListener("click", function () {

      const targetId = button.getAttribute("data-scroll");
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }

    });

  });


  // =========================
  // PHOTO REVEAL
  // =========================
  const photoCover = document.getElementById("photoCover");
  const revealBtn = document.getElementById("revealBtn");

  function togglePhoto() {

    if (!photoCover) return;

    photoCover.classList.toggle("revealed");

    if (revealBtn) {

      if (photoCover.classList.contains("revealed")) {
        revealBtn.textContent = "tutup lagi ♡";
      } else {
        revealBtn.textContent = "buka potonganku ♡";
      }

    }

  }

  if (photoCover) {
    photoCover.addEventListener("click", togglePhoto);
  }

  if (revealBtn) {
    revealBtn.addEventListener("click", togglePhoto);
  }


  // =========================
  // MUSIC
  // =========================
  const music = document.getElementById("musicAudio");
  const musicButton = document.getElementById("musicBtn");

  if (music) {

    music.volume = 0.5;

    if (musicButton) {

      musicButton.addEventListener("click", function () {

        if (music.paused) {
          music.play().catch(() => {});
          musicButton.textContent = "pause musik ♫";
        } else {
          music.pause();
          musicButton.textContent = "lanjutkan dengan musik ♫";
        }

      });

    }

  }

});
