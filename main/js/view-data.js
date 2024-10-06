import { getData } from "./library.js";

window.addEventListener('load', function () {
    let queryString = window.location.search;

    let urlParams = new URLSearchParams(queryString);

    let id = urlParams.get('id');
    let kategori = urlParams.get('kategori');
    id = parseInt(id);

    if (id != null && kategori != null) {


        getData(kategori)
            .then(data => {
                let getDatabyId = data.filter(item => item.id == id);

                let mainDoc = this.document.getElementById('main');
                let linkTxt = getDatabyId[0].link != null ? `<a href="${getDatabyId[0].link}" target="_blank">check this <i class="fas fa-external-link-alt"></i></a>` : null;

                $(mainDoc).html(`
        <article class="media-display">
            <section>
            <div class="banner-img" style="background-image: url('main/assets/${getDatabyId[0].gambar}');"></div>
                <h2>${getDatabyId[0].nama}</h2>
                <h6 class="light-text">${getDatabyId[0].tanggal}</h6>
                <p class="one-col">${getDatabyId[0].deskripsi}  ${linkTxt != null ? linkTxt : ""}</p>
            </section>
            <section class="flex-100">
                <div class="carousel-box">
                    ${
                        getDatabyId[0].gambar_lain.map((item, index) => {
                            return `
                            <div class="box">
                                <div class="img" style="background-image: url('main/assets/${item}');">
                                </div>
                            </div>`;
                        })
                    }
                </div>
            </section>
        </article>
        `);

            })
            .catch(error => console.error('Error:', error));
    }


})