let fieldOpenData = document.querySelectorAll('.open-data'),
    openDataArr = [],
    limitDataArr = [];

$(document).ready(function () {
    $(fieldOpenData).each(function () {
        openDataArr.push($(this).attr('openData'));
        if ($(this).attr('limitData') != null || $(this).attr('limitData') != "") {
            limitDataArr.push($(this).attr('limitData'));
        }
    });

    $(fieldOpenData).each(function (idx) {
        fetch(`../main/data/${openDataArr[idx]}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(datas => {
                datas.forEach((data, idxData) => {
                    // $(this).html(`
                    //     <div class="box">
                    //         <a><div class="img" style="background-image: url('main/assets/projects/ecoticraft.png');"></div></a>
                    //         <h3>${data.nama}</h3>
                    //     </div>
                    //     `)
                    if (idxData < limitDataArr[idx]) {
                        if (idxData + 1 == limitDataArr[idx]) {
                            $(this).append(`
                                    <div class="box">
                                        <div class="img" style="background-image: url('main/assets/${data.gambar}');">
                                            <div class="last">
                                                <a href="${data.kategori}"><button class='btn btn-secondary'>View More</button></a>
                                            </div>
                                        </div>
                                    </div>`);

                        } else {
                            $(this).append(`
                                    <div class="box">
                                    <a href="${data.kategori}/${data.id}"><div class="img" style="background-image: url('main/assets/${data.gambar}');">
                                    </div></a>
                                    <h3>${data.nama}</h3>
                                    </div>`);
                        }
                    }
                });
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    });

});