/* =========================================================
   POTONGAN-POTONGAN RANIA
   JAVASCRIPT - VERSI FINAL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. TOMBOL JUDUL
    ===================================================== */

    const tombolJudul = document.querySelector(".tombol.judul");

    if (tombolJudul) {

        tombolJudul.addEventListener("click", function () {

            const bagianTentang =
                document.querySelector(".bagian.tentang");

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
       4. ANIMASI BAGIAN SAAT DI-SCROLL
    ===================================================== */

    const semuaBagian =
        document.querySelectorAll(".bagian");

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
    ===================================================== */

    /*
       PENTING:
       HTML kamu menggunakan <button>,
       jadi selector harus "button.kartu.informasi",
       BUKAN "tombol.kartu.informasi".
    */

    const semuaKartu =
        document.querySelectorAll(
            "button.kartu.informasi"
        );


    const modal =
        document.querySelector(".modal");


    const judulModal =
        document.querySelector(
            '[pengenal="Judul modal"]'
        );


    const teksModal =
        document.querySelector(
            '[pengenal="Teks modal"]'
        );


    semuaKartu.forEach(function (kartu) {

        kartu.addEventListener("click", function () {

            const judul =
                kartu.getAttribute("judul-data") ||
                kartu.getAttribute("data-judul") ||
                "Tentang Rania ♡";


            const teks =
                kartu.getAttribute("teks-data") ||
                kartu.getAttribute("data-teks") ||
                "Ini adalah salah satu potongan kecil tentang Rania ♡";


            if (judulModal) {

                judulModal.textContent = judul;

            }


            if (teksModal) {

                teksModal.textContent = teks;

            }


            if (modal) {

                modal.classList.add("aktif");

                document.body.classList.add(
                    "modal-terbuka"
                );

            }

        });

    });


    /* =====================================================
       6. TUTUP MODAL
    ===================================================== */

    const tombolTutupModal =
        document.querySelector(".tutup.modal");


    const tombolOke =
        document.querySelector(
            '[pengenal="modalOke"]'
        );


    function tutupModal() {

        if (modal) {

            modal.classList.remove("aktif");

        }

        document.body.classList.remove(
            "modal-terbuka"
        );

    }


    if (tombolTutupModal) {

        tombolTutupModal.addEventListener(
            "click",
            tutupModal
        );

    }


    if (tombolOke) {

        tombolOke.addEventListener(
            "click",
            tutupModal
        );

    }


    /* =====================================================
       7. TUTUP MODAL KLIK LATAR
    ===================================================== */

    if (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {

                tutupModal();

            }

        });

    }


    /* =====================================================
       8. ESC UNTUK MENUTUP MODAL
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
       9. EFEK KARTU KETIKA DIKLIK
    ===================================================== */

    semuaKartu.forEach(function (kartu) {

        kartu.addEventListener(
            "click",
            function () {

                kartu.classList.add("dipilih");


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
            ".tombol.sekunder"
        );


    const areaGame =
        document.querySelector(
            ".area.permainan"
        );


    let gameAktif = false;
    let skor = 0;
    let waktu = 10;
    let timerGame = null;
    let targetGame = 0;


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


        const posisiX =
            Math.random() * 80 + 10;


        const posisiY =
            Math.random() * 70 + 10;


        target.style.left =
            posisiX + "%";


        target.style.top =
            posisiY + "%";


        target.addEventListener(
            "click",
            function () {

                if (!gameAktif) return;


                skor++;

                targetGame++;


                updateStatistik();


                target.remove();


                ambilTargetGame();

            }
        );


        areaGame.appendChild(target);

    }


    function updateStatistik() {

        const skorElement =
            document.querySelector(
                '[pengenal="skor"]'
            );


        const sasaranElement =
            document.querySelector(
                '[pengenal="saran"]'
            );


        const waktuElement =
            document.querySelector(
                '[pengenal="waktu"]'
            );


        if (skorElement) {

            skorElement.textContent =
                skor;

        }


        if (sasaranElement) {

            sasaranElement.textContent =
                targetGame;

        }


        if (waktuElement) {

            waktuElement.textContent =
                waktu;

        }

    }


    function bersihkanTarget() {

        if (!areaGame) return;


        const semuaTarget =
            areaGame.querySelectorAll(
                ".target-hati"
            );


        semuaTarget.forEach(function (target) {

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


            areaGame.appendChild(pesan);


            setTimeout(function () {

                pesan.remove();

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


        targetGame = 0;


        updateStatistik();


        if (tombolGame) {

            tombolGame.textContent =
                "SEDANG BERMAIN... ♡";

        }


        ambilTargetGame();


        timerGame =
            setInterval(
                function () {

                    waktu--;


                    updateStatistik();


                    if (waktu <= 0) {

                        selesaiGame();

                    }

                },
                1000
            );

    }


    if (tombolGame) {

        tombolGame.addEventListener(
            "click",
            mulaiGame
        );

    }


    /* =====================================================
       11. BUNGA / HATI BISA DIPENCET 🌷
    ===================================================== */

    /*
       Dibuat banyak selector supaya bunga kamu
       tetap bisa bekerja walaupun class HTML-nya
       menggunakan nama yang sedikit berbeda.
    */

    const semuaBunga =
        document.querySelectorAll(
            ".bunga, .bunga-jatuh, .kelopak, .flower, .hati, .berkilau"
        );


    semuaBunga.forEach(function (bunga) {

        bunga.style.cursor = "pointer";


        bunga.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                bunga.classList.add("loncat");


                /* bikin gelembung kecil */

                const gelembungKecil =
                    document.createElement("span");


                gelembungKecil.className =
                    "gelembung-bunga";


                gelembungKecil.innerHTML =
                    "♡";


                document.body.appendChild(
                    gelembungKecil
                );


                const posisi =
                    bunga.getBoundingClientRect();


                gelembungKecil.style.left =
                    (
                        posisi.left +
                        posisi.width / 2
                    ) + "px";


                gelembungKecil.style.top =
                    (
                        posisi.top +
                        window.scrollY
                    ) + "px";


                setTimeout(function () {

                    bunga.classList.remove(
                        "loncat"
                    );

                }, 500);


                setTimeout(function () {

                    gelembungKecil.remove();

                }, 1000);

            }
        );

    });


    /* =====================================================
       12. SEMUA TOMBOL DAPAT EFEK KLIK
    ===================================================== */

    const semuaTombol =
        document.querySelectorAll("button");


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
       14. PESAN KETIKA WEBSITE DIBUKA
    ===================================================== */

    setTimeout(function () {

        const pembuka =
            document.querySelector(".pahlawan");


        if (pembuka) {

            pembuka.classList.add(
                "siap"
            );

        }

    }, 300);


    /* =====================================================
       15. PARALLAX RINGAN
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

                const posisi =
                    window.scrollY * 0.03;


                karakterAnimasi.style.transform =
                    "translateY(" +
                    posisi +
                    "px)";

            }

        }
    );


    /* =====================================================
       16. KARTU BISA DIBUKA DENGAN ENTER
    ===================================================== */

    semuaKartu.forEach(function (kartu) {

        kartu.setAttribute(
            "tabindex",
            "0"
        );


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
       17. PESAN KONSOL
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
