/* =========================================================
   POTONGAN-POTONGAN RANIA
   JAVASCRIPT FINAL - FIXED
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("♡ JavaScript Rania berhasil dimuat!");

    /* =====================================================
       1. TOMBOL JUDUL
    ===================================================== */

    const tombolJudul = document.querySelector(".tombol.judul");

    if (tombolJudul) {
        tombolJudul.addEventListener("click", function () {

            const bagianTentang =
                document.querySelector(
                    ".bagian.tentang, .bagian-interaktif, section"
                );

            if (bagianTentang) {
                bagianTentang.scrollIntoView({
                    behavior: "smooth"
                });
            }

        });
    }


    /* =====================================================
       2. KARAKTER RANIA
    ===================================================== */

    const tombolKarakter =
        document.querySelector(".tombol.karakter");

    const karakter =
        document.querySelector(".karakter");

    if (tombolKarakter && karakter) {

        tombolKarakter.addEventListener("click", function () {

            karakter.classList.toggle("aktif");

            if (karakter.classList.contains("aktif")) {

                tombolKarakter.textContent =
                    "♡ Rania siap ngobrol!";

            } else {

                tombolKarakter.textContent =
                    "KENALI SAYA LEBIH DEKAT ↓";

            }

        });

    }


    /* =====================================================
       3. GELEMBUNG UCAPAN
    ===================================================== */

    setTimeout(function () {

        const gelembung =
            document.querySelector(".gelembung.ucapan");

        if (gelembung) {
            gelembung.classList.add("muncul");
        }

    }, 1000);


    /* =====================================================
       4. ANIMASI SAAT SCROLL
    ===================================================== */

    const semuaBagian =
        document.querySelectorAll(
            "section, .bagian, .bagian-interaktif"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "terlihat"
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

        semuaBagian.forEach(function (bagian) {
            observer.observe(bagian);
        });

    } else {

        semuaBagian.forEach(function (bagian) {
            bagian.classList.add("terlihat");
        });

    }


    /* =====================================================
       5. KARTU INFORMASI
       FIX UNTUK HTML RANIA
    ===================================================== */

    const semuaKartu =
        document.querySelectorAll(
            ".kartu.informasi"
        );

    const modal =
        document.querySelector(".modal");

    const judulModal =
        document.querySelector(
            ".judul-modal, [data-judul-modal], [pengenal='Judul modal']"
        );

    const teksModal =
        document.querySelector(
            ".teks-modal, [data-teks-modal], [pengenal='Teks modal']"
        );


    console.log(
        "♡ Jumlah kartu ditemukan:",
        semuaKartu.length
    );


    semuaKartu.forEach(function (kartu) {

        kartu.setAttribute(
            "tabindex",
            "0"
        );


        kartu.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                console.log("♡ Kartu informasi diklik!");


                /* -----------------------------------------
                   BACA ATRIBUT HTML KAMU
                   BISA judul-data ATAU data-judul
                ----------------------------------------- */

                const judul =
                    kartu.getAttribute("judul-data") ||
                    kartu.getAttribute("data-judul") ||
                    "Tentang Rania ♡";


                const teks =
                    kartu.getAttribute("teks-data") ||
                    kartu.getAttribute("data-teks") ||
                    "Ini adalah salah satu potongan kecil tentang Rania ♡";


                /* -----------------------------------------
                   MASUKKAN ISI KE MODAL
                ----------------------------------------- */

                if (judulModal) {
                    judulModal.textContent = judul;
                }


                if (teksModal) {
                    teksModal.textContent = teks;
                }


                /* -----------------------------------------
                   BUKA MODAL
                ----------------------------------------- */

                if (modal) {

                    modal.classList.add("aktif");

                    document.body.classList.add(
                        "modal-terbuka"
                    );

                }

            }
        );


        /* ENTER / SPASI */

        kartu.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    kartu.click();

                }

            }
        );

    });


    /* =====================================================
       6. TUTUP MODAL
    ===================================================== */

    const tombolTutupModal =
        document.querySelector(
            ".tutup.modal, .tutup"
        );

    const tombolOke =
        document.querySelector(
            "#modalOke, [data-modal-oke], [pengenal='modalOke']"
        );


    function tutupModal() {

        if (modal) {

            modal.classList.remove(
                "aktif"
            );

        }

        document.body.classList.remove(
            "modal-terbuka"
        );

    }


    if (tombolTutupModal) {

        tombolTutupModal.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                tutupModal();

            }
        );

    }


    if (tombolOke) {

        tombolOke.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                tutupModal();

            }
        );

    }


    /* =====================================================
       7. KLIK LATAR MODAL
    ===================================================== */

    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {
                    tutupModal();
                }

                if (
                    event.target.classList &&
                    event.target.classList.contains("latar")
                ) {
                    tutupModal();
                }

            }
        );

    }


    /* =====================================================
       8. ESC UNTUK MENUTUP
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("aktif")
            ) {

                tutupModal();

            }

        }
    );


    /* =====================================================
       9. EFEK KARTU SAAT DIKLIK
    ===================================================== */

    semuaKartu.forEach(function (kartu) {

        kartu.addEventListener(
            "click",
            function () {

                kartu.classList.add(
                    "dipilih"
                );

                setTimeout(function () {

                    kartu.classList.remove(
                        "dipilih"
                    );

                }, 400);

            }
        );

    });


    /* =====================================================
       10. GAME MINI
    ===================================================== */

    const tombolGame =
        document.querySelector(
            ".tombol.sekunder, .sekunder"
        );

    const areaGame =
        document.querySelector(
            ".area.permainan"
        );


    let gameAktif = false;
    let skor = 0;
    let waktu = 10;
    let timerGame = null;


    function ambilTargetGame() {

        if (!areaGame) return;

        const target =
            document.createElement("button");

        target.className =
            "target-hati";

        target.innerHTML =
            "♡";

        target.type =
            "button";


        target.style.left =
            (Math.random() * 80 + 10) + "%";

        target.style.top =
            (Math.random() * 70 + 10) + "%";


        target.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                if (!gameAktif) return;

                skor++;

                updateStatistik();

                target.remove();

                ambilTargetGame();

            }
        );


        areaGame.appendChild(
            target
        );

    }


    function updateStatistik() {

        const skorElement =
            document.querySelector(
                '[data-pengenal="skor"], [pengenal="skor"]'
            );

        const waktuElement =
            document.querySelector(
                '[data-pengenal="waktu"], [pengenal="waktu"]'
            );


        if (skorElement) {
            skorElement.textContent = skor;
        }


        if (waktuElement) {
            waktuElement.textContent = waktu;
        }

    }


    function bersihkanTarget() {

        if (!areaGame) return;

        areaGame
            .querySelectorAll(".target-hati")
            .forEach(function (target) {
                target.remove();
            });

    }


    function selesaiGame() {

        gameAktif = false;

        clearInterval(timerGame);

        bersihkanTarget();


        if (areaGame) {

            const pesan =
                document.createElement("div");

            pesan.className =
                "pesan-selesai-game";

            pesan.innerHTML =
                "♡ Waktu habis!<br>" +
                "Kamu mendapatkan <strong>" +
                skor +
                "</strong> hati! ♡";


            areaGame.appendChild(
                pesan
            );


            setTimeout(function () {

                if (pesan) {
                    pesan.remove();
                }

            }, 3000);

        }


        if (tombolGame) {

            tombolGame.textContent =
                "MAIN LAGI ♡";

        }

    }


    function mulaiGame() {

        if (!areaGame) return;

        clearInterval(timerGame);

        bersihkanTarget();

        gameAktif = true;

        skor = 0;

        waktu = 10;

        updateStatistik();


        if (tombolGame) {

            tombolGame.textContent =
                "SEDANG BERMAIN... ♡";

        }


        ambilTargetGame();


        timerGame =
            setInterval(function () {

                waktu--;

                updateStatistik();

                if (waktu <= 0) {
                    selesaiGame();
                }

            }, 1000);

    }


    if (tombolGame) {

        tombolGame.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                mulaiGame();

            }
        );

    }


    /* =====================================================
       11. BUNGA / HATI / HIASAN BISA DIPENCET
    ===================================================== */

    const semuaHiasan =
        document.querySelectorAll(
            ".hati, .berkilau, .bunga, .bunga-jatuh, .bunga-jatuh *, .ikon"
        );


    semuaHiasan.forEach(function (hiasan) {

        hiasan.style.cursor =
            "pointer";


        hiasan.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                hiasan.classList.add(
                    "loncat"
                );


                setTimeout(function () {

                    hiasan.classList.remove(
                        "loncat"
                    );

                }, 500);

            }
        );

    });


    /* =====================================================
       12. SEMUA TOMBOL
    ===================================================== */

    const semuaTombol =
        document.querySelectorAll(
            "button, tombol, .tombol"
        );


    semuaTombol.forEach(function (tombol) {

        tombol.addEventListener(
            "click",
            function () {

                tombol.classList.add(
                    "ditekan"
                );


                setTimeout(function () {

                    tombol.classList.remove(
                        "ditekan"
                    );

                }, 250);

            }
        );

    });


    /* =====================================================
       13. SMOOTH SCROLL
    ===================================================== */

    document.documentElement.style.scrollBehavior =
        "smooth";


    /* =====================================================
       14. PEMBUKA
    ===================================================== */

    setTimeout(function () {

        const pembuka =
            document.querySelector(
                ".pahlawan"
            );


        if (pembuka) {

            pembuka.classList.add(
                "siap"
            );

        }

    }, 300);


    /* =====================================================
       15. PARALLAX
    ===================================================== */

    window.addEventListener(
        "scroll",
        function () {

            const karakterAnimasi =
                document.querySelector(
                    ".pembungkus.karakter"
                );


            if (
                karakterAnimasi &&
                window.innerWidth > 700
            ) {

                karakterAnimasi.style.transform =
                    "translateY(" +
                    window.scrollY * 0.03 +
                    "px)";

            }

        }
    );


    /* =====================================================
       16. PESAN KONSOL
    ===================================================== */

    console.log(
        "♡ Potongan-potongan Rania berhasil dimuat!"
    );

    console.log(
        "♡ Kartu informasi siap!"
    );

    console.log(
        "♡ Bunga siap dipencet!"
    );

    console.log(
        "♡ Game siap dimainkan!"
    );

});
