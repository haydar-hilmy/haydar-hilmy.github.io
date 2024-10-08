article_main = document.querySelector('article.main');
let about = document.getElementById('about');

let media_display = document.querySelectorAll('article.media-display');

let box_relevant_wrap = document.querySelector('div.box-relevant-wrap');
let box_relevants = document.querySelectorAll('div.box-relevant');

let maxVh = window.innerHeight; // ukuran maksimal dari sebuah device

window.addEventListener('load', function () {
    article_main.style.transform = "translateY(0px)";
    article_main.style.opacity = 1;
    about.style.transform = "translateY(200px)";
    about.style.opacity = 0;

    media_display.forEach(md => {
        md.style.opacity = 0;
    });

    box_relevants.forEach(br => {
        br.style.opacity = 0;
        br.style.transform = "translateY(100%)";
    });

});

window.addEventListener('scroll', function(){
    let Ylevel = window.scrollY;
    let loc_about = about.getBoundingClientRect().top;
    let loc_box_relevant_wrap = box_relevant_wrap.getBoundingClientRect().top;

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
    
    media_display.forEach(md => {
        let loc_md = md.getBoundingClientRect().top;
        if(loc_md < 300){
            md.style.opacity = 1;
        } else {
            md.style.opacity = 0;
        }
    });

    if(loc_box_relevant_wrap < 400){
        box_relevants.forEach((br, idx) => {
            setTimeout(() => {
                br.style.transform = "translateY(0)";
                br.style.opacity = 1;
            }, idx * 50);
        });
    } else {
        box_relevants.forEach((br, idx) => {
            setTimeout(() => {
                br.style.transform = "translateY(100%)";
                br.style.opacity = 0;
            }, idx * 50);
        });
    }

    
})

