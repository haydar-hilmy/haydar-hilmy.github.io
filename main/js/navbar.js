var header_navbar = document.getElementById("header_navbar");
let article_main = document.querySelector('article.main');

let lastScrollTop = 0; // Inisialisasi posisi scroll sebelumnya

let fileName = "";

window.addEventListener('load', () => {

    // GET FILENAME
    let path = window.location.pathname;
    fileName = path.substring(path.lastIndexOf('/') + 1);
});

window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll ke bawah
        header_navbar.style.transform = 'translateY(-75px)';
    } else {
        // Scroll ke atas
        header_navbar.style.transform = 'translateY(0)';
    }

    // OTOMATIS BERUBAH WARNA NAVBAR NYA
    if(scrollTop > article_main.offsetHeight){
        header_navbar.style.backgroundColor = "#FFF";
        header_navbar.style.boxShadow = "-2px 0px 6px 0px rgba(0, 0, 0, 0.1)";
    } else {
        header_navbar.style.backgroundColor = "";
        header_navbar.style.boxShadow = "";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Untuk menghindari nilai negatif
});