import { getData } from "./library.js";

let fieldOpenData = document.querySelectorAll('.open-data'),
    openDataArr = [],
    limitDataArr = [],
    isFullData = false;

$(document).ready(function () {
    $(fieldOpenData).each(function () {
        openDataArr.push($(this).attr('openData'));
        if ($(this).attr('limitData') != null || $(this).attr('limitData') != "") {
            limitDataArr.push($(this).attr('limitData'));
        }
        if ($(this).attr('fullData') != null || $(this).attr('fullData') != "") {
            if ($(this).attr('fullData') == "true") {
                isFullData = true;
            } else {
                isFullData = false;
            }
        }
    });

    $(fieldOpenData).each(function (idx) {
        getData(openDataArr[idx])
            .then(datas => {
                datas.forEach((data, idxData) => {
                    if (isFullData == true) {
                        let linkTxt = data.link != null ? `<a href="${data.link}" target="_blank">check this <i class="fas fa-external-link-alt"></i></a>` : null;
                        $(this).append(`
                                    <div class="box">
                                    <div class="img" style="background-image: url('main/assets/${data.gambar}');">
                                    </div>
                                    <h3><b>${data.nama}</b></h3>
                                    <h6 class="light-text">${data.tanggal}</h6>
                                    <p>${data.deskripsi} ${linkTxt != null ? linkTxt : ""}</p>
                                    </div>`);

                    } else {
                        if (idxData < limitDataArr[idx]) {
                            if (idxData + 1 == limitDataArr[idx]) {
                                $(this).append(`
                                    <div class="box">
                                        <div class="img" style="background-image: url('main/assets/${data.gambar}');">
                                            <div class="last">
                                                <a href="${data.kategori}.html"><button class='btn btn-secondary'>View More</button></a>
                                            </div>
                                            </div>
                                    </div>`);

                            } else {
                                $(this).append(`
                                    <div class="box">
                                    <div class="img" style="background-image: url('main/assets/${data.gambar}');">
                                    </div>
                                    <h3>${data.nama}</h3>
                                    </div>`);
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    });

});