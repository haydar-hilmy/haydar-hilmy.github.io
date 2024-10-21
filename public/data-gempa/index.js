const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const gempaterakhir = 'https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json';
const gempanow = 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json';

$(document).ready(function(){
    $(".main-data").hide();
    $(".list-other-data").hide();
});

const title_data = document.querySelector("#title-data");

const magnitudo = document.querySelector("#show-magnitudo");
const koor = document.querySelector("#show-koor");
const kedalaman = document.querySelector("#show-kedalaman");
const jam = document.querySelector("#show-jam");
const tanggal = document.querySelector("#show-tanggal");
const lintang = document.querySelector("#show-lintang");
const bujur = document.querySelector("#show-bujur");
const wilayah = document.querySelector("#show-wilayah");
const potensi = document.querySelector("#show-potensi");

const show_other_data1 = document.querySelector("#show-other-data1");
const show_other_data2 = document.querySelector("#show-other-data2");
const show_other_data3 = document.querySelector("#show-other-data3");
const show_other_data4 = document.querySelector("#show-other-data4");


// DIBANTU OLEH CHATGPT
function fetchDataWithRetry(url, options = {}, retries = 3, delay = 1000) {
    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            $(document).ready(function(){
                $(".list-other-data").show(150);
            });
            title_data.innerHTML = "Error Fetching Data :(";
            alert("Sorry masbro, ada masalah di servernya\nsoalnya pake proxyURL gratisan si wkwk");
            if (retries > 0) {
                console.log(`Retrying in ${delay} ms...`);
                return new Promise(resolve => setTimeout(resolve, delay)).then(() =>
                    fetchDataWithRetry(url, options, retries - 1, delay * 2)
                );
            } else {
                throw error;
            }
        });
}


fetchDataWithRetry(proxyUrl + gempanow)
    .then(data => {
        $(document).ready(function(){
            $(".main-data").show(150);
        });
        const get_magnitude = data.Infogempa.gempa.Magnitude;
        const get_koor = data.Infogempa.gempa.Coordinates;
        const get_kedalaman = data.Infogempa.gempa.Kedalaman;
        const get_jam = data.Infogempa.gempa.Jam;
        const get_tanggal = data.Infogempa.gempa.Tanggal;
        const get_lintang = data.Infogempa.gempa.Lintang;
        const get_bujur = data.Infogempa.gempa.Bujur;
        const get_wilayah = data.Infogempa.gempa.Wilayah;
        const get_potensi = data.Infogempa.gempa.Potensi;

        magnitudo.innerHTML = get_magnitude;
        koor.innerHTML = get_koor;
        kedalaman.innerHTML = get_kedalaman;
        jam.innerHTML = get_jam;
        tanggal.innerHTML = get_tanggal;
        lintang.innerHTML = get_lintang;
        bujur.innerHTML = get_bujur;
        wilayah.innerHTML = get_wilayah;
        potensi.innerHTML = get_potensi;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        $(document).ready(function(){
            $(".list-other-data").show(150);
        });
        title_data.innerHTML = "Error Fetching Data :(";
        alert("Sorry masbro, ada masalah di servernya\nsoalnya pake proxyURL gratisan si wkwk");
    });

    fetchDataWithRetry(proxyUrl + gempaterakhir)
    .then(data => {
        $(document).ready(function(){
            $(".list-other-data").show(150);
        });
        const show_other_data_tanggal = document.querySelectorAll("#show-other-data-tanggal");
        const show_other_data_magn = document.querySelectorAll("#show-other-data-magn");
        const show_other_data_wil = document.querySelectorAll("#show-other-data-wil");
        const show_other_data_potensi = document.querySelectorAll("#show-other-data-potensi");
        for (let index = 0; index < show_other_data_tanggal.length; index++) {
            const getData = data.Infogempa.gempa[index];
            show_other_data_tanggal[index].innerHTML = getData.Tanggal + " - " + getData.Jam;
            show_other_data_magn[index].innerHTML = getData.Magnitude + " Kedalaman " + getData.Kedalaman;
            show_other_data_wil[index].innerHTML = getData.Wilayah;
            show_other_data_potensi[index].innerHTML = getData.Potensi;
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        $(document).ready(function(){
            $(".list-other-data").show(150);
        });
        title_data.innerHTML = "Error Fetching Data :(";
        alert("Sorry masbro, ada masalah di servernya\nsoalnya pake proxyURL gratisan si wkwk");
    });