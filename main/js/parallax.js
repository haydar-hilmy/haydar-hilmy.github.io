article_main = document.querySelector('article.main');
let about = document.getElementById('about');

let maxVh = window.innerHeight; // ukuran maksimal dari sebuah device

window.addEventListener('load', function () {
    article_main.style.transform = "translateY(0px)";
    article_main.style.opacity = 1;
    about.style.transform = "translateY(200px)";
    about.style.opacity = 0;
});

window.addEventListener('scroll', function(){
    let Ylevel = window.scrollY;
    let loc_about = about.getBoundingClientRect().top;

    if (Ylevel > article_main.offsetHeight * 0.7) {
        article_main.style.opacity = 0.3;
    } else {
        article_main.style.opacity = 1;
    }

    if(loc_about < 400){
        about.style.transform = "translateY(0)";
        about.style.opacity = 1;
    } else {
        about.style.transform = "translateY(200px)";
        about.style.opacity = 0;
    }
    console.log(loc_about)
})

