"use strict";

/* =========================================================
   PIECES OF RANIA
   SCRIPT.JS
   Cocok dengan index.html yang kamu kirim
   ========================================================= */


/* =========================================================
   HELPER
========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];


/* =========================================================
   ELEMENTS
========================================================= */

const loveOrb = $("#loveOrb");
const goAbout = $("#goAbout");
const toMusic = $("#toMusic");
const toGame = $("#toGame");

const aboutSection = $("#about");
const musicSection = $("#music");
const gameSection = $("#game");

const petalLayer = $("#petalLayer");
const sparkles = $("#sparkles");

const musicAudio = $("#musicAudio");
const playButton = $("#playButton");
const progressBar = $("#progressBar");
const audioStatus = $("#audioStatus");
const cassette = $("#cassette");

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
   TOAST
========================================================= */

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function goToSection(section) {

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   PAGE 1
   LOVE ORB
========================================================= */

if (loveOrb) {

    loveOrb.addEventListener("click", () => {

        loveOrb.classList.remove("orb-active");

        // Force animation restart
        void loveOrb.offsetWidth;

        loveOrb.classList.add("orb-active");

        createSparklesAround(loveOrb);

        showToast("welcome to Pieces of Rania ♡");

    });

}


/* =========================================================
   GET TO KNOW ME
========================================================= */

if (goAbout) {

    goAbout.addEventListener("click", () => {

        goToSection(aboutSection);

        showToast("let's get to know me ♡");

    });

}


/* =========================================================
   ABOUT → MUSIC
========================================================= */

if (toMusic) {

    toMusic.addEventListener("click", () => {

        goToSection(musicSection);

        showToast("a little song for you ♫");

    });

}


/* =========================================================
   MUSIC → GAME
========================================================= */

if (toGame) {

    toGame.addEventListener("click", () => {

        goToSection(gameSection);

        showToast("let's throw some love ♡");

    });

}


/* =========================================================
   SPARKLES
========================================================= */

function createSparklesAround(element) {

    if (!element) return;

    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 10; i++) {

        const sparkle = document.createElement("span");

        sparkle.className = "click-sparkle";
        sparkle.textContent = "✦";

        sparkle.style.position = "fixed";

        sparkle.style.left =
            `${rect.left + rect.width / 2}px`;

        sparkle.style.top =
            `${rect.top + rect.height / 2}px`;

        sparkle.style.setProperty(
            "--x",
            `${(Math.random() - 0.5) * 140}px`
        );

        sparkle.style.setProperty(
            "--y",
            `${(Math.random() - 0.5) * 140}px`
        );

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 900);

    }

}


/* =========================================================
   FALLING FLOWERS
========================================================= */

const flowerMessages = [

    "smile ♡",
    "have a good day!",
    "you are doing great ♡",
    "take it easy 🌷",
    "you've got this!",
    "stay soft ♡",
    "don't forget to smile",
    "a little flower for you 🌸",
    "everything will be okay",
    "be proud of yourself",
    "sending you love ♡",
    "keep going!",
    "you deserve good things",
    "enjoy your little moment ♡"

];

const flowerSymbols = [
    "🌸",
    "🌷",
    "✿",
    "❀",
    "♡"
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
        flowerSymbols[
            Math.floor(
                Math.random() * flowerSymbols.length
            )
        ];

    const left =
        Math.random() * 100;

    const duration =
        6 + Math.random() * 6;

    const delay =
        Math.random() * -8;

    const size =
        16 + Math.random() * 16;

    flower.style.left =
        `${left}%`;

    flower.style.fontSize =
        `${size}px`;

    flower.style.animationDuration =
        `${duration}s`;

    flower.style.animationDelay =
        `${delay}s`;

    flower.addEventListener("click", (event) => {

        event.stopPropagation();

        const message =
            flowerMessages[
                Math.floor(
                    Math.random() *
                    flowerMessages.length
                )
            ];

        createFlowerBubble(
            event.clientX,
            event.clientY,
            message
        );

        flower.classList.add(
            "flower-clicked"
        );

        setTimeout(() => {
            flower.remove();
        }, 400);

    });

    petalLayer.appendChild(flower);

    setTimeout(() => {

        if (flower.isConnected) {
            flower.remove();
        }

    }, 15000);

}


function createFlowerBubble(x, y, message) {

    const bubble =
        document.createElement("div");

    bubble.className =
        "flower-bubble";

    bubble.textContent =
        message;

    /*
      Supaya bubble tidak keluar layar
      di HP.
    */

    const safeX =
        Math.min(
            Math.max(20, x),
            window.innerWidth - 120
        );

    const safeY =
        Math.min(
            Math.max(50, y),
            window.innerHeight - 80
        );

    bubble.style.left =
        `${safeX}px`;

    bubble.style.top =
        `${safeY}px`;

    document.body.appendChild(bubble);

    requestAnimationFrame(() => {

        bubble.classList.add(
            "bubble-visible"
        );

    });

    setTimeout(() => {

        bubble.classList.remove(
            "bubble-visible"
        );

        setTimeout(() => {
            bubble.remove();
        }, 400);

    }, 2200);

}


/*
  Jumlah bunga dibatasi supaya HP
  tidak berat.
*/

function startFlowers() {

    for (let i = 0; i < 6; i++) {
        createFlower();
    }

    window.flowerTimer =
        setInterval(() => {

            if (
                document.hidden
            ) return;

            if (
                $$(".falling-flower").length < 12
            ) {

                createFlower();

            }

        }, 1000);

}

startFlowers();


/* =========================================================
   ABOUT ME
   FLIP CARDS
========================================================= */

const infoCards =
    $$(".info-card");

infoCards.forEach((card) => {

    card.addEventListener("click", () => {

        card.classList.toggle(
            "flipped"
        );

    });

    card.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                card.classList.toggle(
                    "flipped"
                );

            }

        }
    );

});


/* =========================================================
   MUSIC PLAYER
========================================================= */

if (musicAudio && playButton) {

    playButton.addEventListener(
        "click",
        async () => {

            try {

                if (
                    musicAudio.paused
                ) {

                    await musicAudio.play();

                } else {

                    musicAudio.pause();

                }

            } catch (error) {

                console.error(
                    "Music error:",
                    error
                );

                showToast(
                    "MP3 belum bisa diputar ♡"
                );

            }

        }
    );

}


/* =========================================================
   UPDATE MUSIC BUTTON
========================================================= */

function updateMusicButton() {

    if (!musicAudio || !playButton)
        return;

    if (
        musicAudio.paused
    ) {

        playButton.textContent =
            "▶ PLAY";

        playButton.classList.remove(
            "playing"
        );

        if (audioStatus) {

            audioStatus.textContent =
                "tap play ♫";

        }

        if (cassette) {

            cassette.classList.remove(
                "playing"
            );

        }

    } else {

        playButton.textContent =
            "Ⅱ PAUSE";

        playButton.classList.add(
            "playing"
        );

        if (audioStatus) {

            audioStatus.textContent =
                "now playing ♫";

        }

        if (cassette) {

            cassette.classList.add(
                "playing"
            );

        }

    }

}


if (musicAudio) {

    musicAudio.addEventListener(
        "play",
        updateMusicButton
    );

    musicAudio.addEventListener(
        "pause",
        updateMusicButton
    );

    musicAudio.addEventListener(
        "ended",
        () => {

            updateMusicButton();

            if (audioStatus) {

                audioStatus.textContent =
                    "music ended ♡";

            }

        }
    );

}


/* =========================================================
   MUSIC PROGRESS
========================================================= */

if (musicAudio) {

    musicAudio.addEventListener(
        "timeupdate",
        () => {

            if (
                !progressBar ||
                !musicAudio.duration
            ) return;

            const percentage =
                (
                    musicAudio.currentTime /
                    musicAudio.duration
                ) * 100;

            progressBar.style.width =
                `${percentage}%`;

        }
    );

}


/* =========================================================
   CLICK PROGRESS BAR
========================================================= */

const progressContainer =
    $(".audio-progress");

if (
    progressContainer &&
    musicAudio
) {

    progressContainer.addEventListener(
        "click",
        (event) => {

            if (!musicAudio.duration)
                return;

            const rect =
                progressContainer
                    .getBoundingClientRect();

            const percentage =
                (
                    event.clientX -
                    rect.left
                ) / rect.width;

            musicAudio.currentTime =
                percentage *
                musicAudio.duration;

        }
    );

}


/* =========================================================
   INITIAL MUSIC STATE
========================================================= */

updateMusicButton();


/* =========================================================
   GAME
========================================================= */

let score = 0;

let heartDragging = false;

let characterDragging = false;

let heartStartX = 0;
let heartStartY = 0;

let characterStartX = 0;
let characterStartY = 0;

let heartOriginalLeft = null;
let heartOriginalTop = null;

let characterX = null;
let characterY = null;


/* =========================================================
   GAME SCORE
========================================================= */

function updateScore() {

    if (!scoreElement) return;

    scoreElement.textContent =
        score;

}


/* =========================================================
   GAME MESSAGE
========================================================= */

function setGameMessage(message) {

    if (!gameMessage) return;

    gameMessage.textContent =
        message;

}


/* =========================================================
   GET POINTER POSITION
========================================================= */

function getPointerPosition(event) {

    if (
        event.touches &&
        event.touches.length
    ) {

        return {

            x:
                event.touches[0].clientX,

            y:
                event.touches[0].clientY

        };

    }

    if (
        event.changedTouches &&
        event.changedTouches.length
    ) {

        return {

            x:
                event.changedTouches[0].clientX,

            y:
                event.changedTouches[0].clientY

        };

    }

    return {

        x: event.clientX,

        y: event.clientY

    };

}


/* =========================================================
   CHARACTER POSITION
========================================================= */

function saveCharacterPosition() {

    if (
        !character ||
        !gameStage
    ) return;

    const stageRect =
        gameStage.getBoundingClientRect();

    const charRect =
        character.getBoundingClientRect();

    characterX =
        charRect.left -
        stageRect.left;

    characterY =
        charRect.top -
        stageRect.top;

}


/* =========================================================
   HEART ORIGINAL POSITION
========================================================= */

function saveHeartPosition() {

    if (
        !throwHeart ||
        !gameStage
    ) return;

    const stageRect =
        gameStage.getBoundingClientRect();

    const heartRect =
        throwHeart.getBoundingClientRect();

    heartOriginalLeft =
        heartRect.left -
        stageRect.left;

    heartOriginalTop =
        heartRect.top -
        stageRect.top;

}


/* =========================================================
   POSITION HEART BACK TO HAND
========================================================= */

function attachHeartToCharacter() {

    if (
        !throwHeart ||
        !character ||
        !gameStage
    ) return;

    const stageRect =
        gameStage.getBoundingClientRect();

    const charRect =
        character.getBoundingClientRect();

    /*
      Posisi hati di area tangan depan.
      CSS tetap bisa mengatur tampilan.
    */

    const left =
        charRect.left -
        stageRect.left +
        charRect.width * 0.68;

    const top =
        charRect.top -
        stageRect.top +
        charRect.height * 0.35;

    throwHeart.style.position =
        "absolute";

    throwHeart.style.left =
        `${left}px`;

    throwHeart.style.top =
        `${top}px`;

    throwHeart.style.transform =
        "translate(-50%, -50%)";

}


/* =========================================================
   INITIAL HEART POSITION
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            attachHeartToCharacter();

        }, 100);

    }
);


/* =========================================================
   HEART DRAG START
========================================================= */

function startHeartDrag(event) {

    if (!throwHeart) return;

    heartDragging = true;

    const pointer =
        getPointerPosition(event);

    heartStartX =
        pointer.x;

    heartStartY =
        pointer.y;

    throwHeart.classList.add(
        "dragging"
    );

    setGameMessage(
        "aim at the basket ♡"
    );

    /*
      pointer capture supaya
      jari tetap bisa ditarik
      meskipun keluar dari heart.
    */

    if (
        event.pointerId !== undefined &&
        throwHeart.setPointerCapture
    ) {

        try {

            throwHeart.setPointerCapture(
                event.pointerId
            );

        } catch (error) {}

    }

    event.preventDefault();

}


/* =========================================================
   HEART DRAG MOVE
========================================================= */

function moveHeart(event) {

    if (
        !heartDragging ||
        !throwHeart ||
        !gameStage
    ) return;

    const pointer =
        getPointerPosition(event);

    const stageRect =
        gameStage.getBoundingClientRect();

    const heartWidth =
        throwHeart.offsetWidth || 30;

    const heartHeight =
        throwHeart.offsetHeight || 30;

    let left =
        pointer.x -
        stageRect.left;

    let top =
        pointer.y -
        stageRect.top;

    /*
      Batas supaya heart tidak
      keluar arena.
    */

    left =
        Math.max(
            heartWidth / 2,
            Math.min(
                stageRect.width -
                heartWidth / 2,
                left
            )
        );

    top =
        Math.max(
            heartHeight / 2,
            Math.min(
                stageRect.height -
                heartHeight / 2,
                top
            )
        );

    throwHeart.style.position =
        "absolute";

    throwHeart.style.left =
        `${left}px`;

    throwHeart.style.top =
        `${top}px`;

    throwHeart.style.transform =
        "translate(-50%, -50%) scale(1.12)";

    event.preventDefault();

}


/* =========================================================
   CHECK HIT
========================================================= */

function isHeartInsideBasket() {

    if (
        !throwHeart ||
        !basket
    ) return false;

    const heartRect =
        throwHeart.getBoundingClientRect();

    const basketRect =
        basket.getBoundingClientRect();

    const heartCenterX =
        heartRect.left +
        heartRect.width / 2;

    const heartCenterY =
        heartRect.top +
        heartRect.height / 2;

    return (
        heartCenterX >=
            basketRect.left &&

        heartCenterX <=
            basketRect.right &&

        heartCenterY >=
            basketRect.top &&

        heartCenterY <=
            basketRect.bottom
    );

}


/* =========================================================
   HEART THROW END
========================================================= */

function endHeartDrag(event) {

    if (!heartDragging)
        return;

    heartDragging = false;

    if (throwHeart) {

        throwHeart.classList.remove(
            "dragging"
        );

        throwHeart.style.transform =
            "translate(-50%, -50%)";

    }

    const hit =
        isHeartInsideBasket();

    if (hit) {

        heartSuccess();

    } else {

        heartMiss();

    }

}


/* =========================================================
   SUCCESS
========================================================= */

function heartSuccess() {

    score += 20;

    if (score > 100) {
        score = 100;
    }

    updateScore();

    if (basket) {

        basket.classList.add(
            "basket-hit"
        );

        setTimeout(() => {

            basket.classList.remove(
                "basket-hit"
            );

        }, 600);

    }

    createSparklesAround(
        basket
    );

    if (score >= 100) {

        setGameMessage(
            "YOU DID IT! 100/100 ♡"
        );

        showToast(
            "100/100!! love delivered 💗"
        );

    } else {

        setGameMessage(
            "nice throw! +20 ♡"
        );

        showToast(
            "+20 points! ♡"
        );

    }

    /*
      Hati kembali ke tangan
      setelah berhasil.
    */

    setTimeout(() => {

        attachHeartToCharacter();

    }, 700);

}


/* =========================================================
   MISS
========================================================= */

function heartMiss() {

    setGameMessage(
        "almost! try again ♡"
    );

    showToast(
        "belum masuk basket 😭 coba lagi!"
    );

    if (throwHeart) {

        throwHeart.classList.add(
            "heart-miss"
        );

    }

    setTimeout(() => {

        if (throwHeart) {

            throwHeart.classList.remove(
                "heart-miss"
            );

        }

        attachHeartToCharacter();

        setGameMessage(
            "drag me ♡"
        );

    }, 600);

}


/* =========================================================
   HEART POINTER EVENTS
========================================================= */

if (throwHeart) {

    throwHeart.addEventListener(
        "pointerdown",
        startHeartDrag
    );

    throwHeart.addEventListener(
        "pointermove",
        moveHeart
    );

    throwHeart.addEventListener(
        "pointerup",
        endHeartDrag
    );

    throwHeart.addEventListener(
        "pointercancel",
        endHeartDrag
    );

}


/* =========================================================
   CHARACTER DRAG
   Bisa digerakkan juga.
========================================================= */

function startCharacterDrag(event) {

    if (!character || !gameStage)
        return;

    /*
      Jangan mulai character drag
      kalau yang ditekan adalah heart.
    */

    if (
        event.target === throwHeart
    ) return;

    characterDragging = true;

    const pointer =
        getPointerPosition(event);

    characterStartX =
        pointer.x;

    characterStartY =
        pointer.y;

    saveCharacterPosition();

    character.classList.add(
        "character-dragging"
    );

    if (
        event.pointerId !== undefined &&
        character.setPointerCapture
    ) {

        try {

            character.setPointerCapture(
                event.pointerId
            );

        } catch (error) {}

    }

    event.preventDefault();

}


function moveCharacter(event) {

    if (
        !characterDragging ||
        !character ||
        !gameStage
    ) return;

    const pointer =
        getPointerPosition(event);

    const stageRect =
        gameStage.getBoundingClientRect();

    const dx =
        pointer.x -
        characterStartX;

    const dy =
        pointer.y -
        characterStartY;

    let newX =
        characterX + dx;

    let newY =
        characterY + dy;

    const maxX =
        stageRect.width -
        character.offsetWidth;

    const maxY =
        stageRect.height -
        character.offsetHeight;

    newX =
        Math.max(
            0,
            Math.min(maxX, newX)
        );

    newY =
        Math.max(
            0,
            Math.min(maxY, newY)
        );

    character.style.left =
        `${newX}px`;

    character.style.top =
        `${newY}px`;

    characterX =
        newX;

    characterY =
        newY;

    characterStartX =
        pointer.x;

    characterStartY =
        pointer.y;

    /*
      Selama hati belum sedang
      dilempar, hati tetap
      menempel ke tangan.
    */

    if (!heartDragging) {

        attachHeartToCharacter();

    }

    event.preventDefault();

}


function endCharacterDrag() {

    if (!characterDragging)
        return;

    characterDragging = false;

    if (character) {

        character.classList.remove(
            "character-dragging"
        );

    }

}


/* =========================================================
   CHARACTER EVENTS
========================================================= */

if (character) {

    character.addEventListener(
        "pointerdown",
        startCharacterDrag
    );

    character.addEventListener(
        "pointermove",
        moveCharacter
    );

    character.addEventListener(
        "pointerup",
        endCharacterDrag
    );

    character.addEventListener(
        "pointercancel",
        endCharacterDrag
    );

}


/* =========================================================
   RESET GAME
========================================================= */

if (resetGame) {

    resetGame.addEventListener(
        "click",
        () => {

            score = 0;

            updateScore();

            characterDragging =
                false;

            heartDragging =
                false;

            if (character) {

                character.classList.remove(
                    "character-dragging"
                );

            }

            if (throwHeart) {

                throwHeart.classList.remove(
                    "dragging",
                    "heart-miss"
                );

            }

            /*
              Balikin character
              ke posisi awal CSS.
            */

            if (character) {

                character.style.left = "";
                character.style.top = "";

            }

            setTimeout(() => {

                attachHeartToCharacter();

            }, 50);

            setGameMessage(
                "drag me ♡"
            );

            showToast(
                "game reset ♡"
            );

        }
    );

}


/* =========================================================
   HOW TO PLAY
========================================================= */

if (helpGame) {

    helpGame.addEventListener(
        "click",
        () => {

            showToast(
                "drag the heart → aim at the basket → let go ♡"
            );

            setGameMessage(
                "1. drag the heart  2. aim  3. let go ♡"
            );

        }
    );

}


/* =========================================================
   TASK CARDS
========================================================= */

const taskCards =
    $$(".task-card");

taskCards.forEach((card) => {

    card.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            const title =
                card
                    .querySelector("b")
                    ?.textContent
                    .trim() ||
                "assignment";

            showToast(
                `${title} — coming soon ♡`
            );

        }
    );

});


/* =========================================================
   RESPONSIVE GAME
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            !heartDragging &&
            !characterDragging
        ) {

            setTimeout(() => {

                attachHeartToCharacter();

            }, 100);

        }

    }
);


/* =========================================================
   MOBILE SAFETY
========================================================= */

document.addEventListener(
    "touchmove",
    (event) => {

        if (
            heartDragging ||
            characterDragging
        ) {

            event.preventDefault();

        }

    },
    {
        passive: false
    }
);


/* =========================================================
   REDUCED MOTION
========================================================= */

const reducedMotion =
    window.matchMedia &&
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

if (reducedMotion) {

    document.documentElement.classList.add(
        "reduce-motion"
    );

}


/* =========================================================
   INITIALIZATION
========================================================= */

updateScore();

setTimeout(() => {

    if (
        throwHeart &&
        character
    ) {

        attachHeartToCharacter();

    }

}, 300);


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "%c♡ Pieces of Rania ♡",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "JavaScript loaded successfully."
);

console.log({
    loveOrb: !!loveOrb,
    goAbout: !!goAbout,
    aboutCards: infoCards.length,
    music: !!musicAudio,
    cassette: !!cassette,
    gameStage: !!gameStage,
    character: !!character,
    heart: !!throwHeart,
    basket: !!basket,
    tasks: taskCards.length
});
