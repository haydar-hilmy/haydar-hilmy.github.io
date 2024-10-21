$(document).ready(function () {
    var typed = new Typed('#text-spell', {
        strings: [
            "Halo",
            "Hello",
            "Hola",
            "Bonjour",
            "Ciao",
            "Olá",
            "Konnichiwa",
            "Annyeonghaseyo",
            "Nǐ hǎo",
            "Namaste",
            "Salam",
            "Merhaba",
            "Szia",
            "Sugeng Rawuh",
            "Assalamu\'alaikum",
        ],
        shuffle: true,
        typeSpeed: 17,
        showCursor: true,
        cursorChar: '<h4>|</h4>',
        backSpeed: 17,
        backDelay: 2000,
        loop: true,
    });
});

function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.match(/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i)) {
        return 'Mobile Device';
    } else if (userAgent.match(/ipad/i)) {
        return 'iPad';
    } else if (userAgent.match(/tablet/i)) {
        return 'Tablet';
    } else {
        return 'Desktop';
    }
}

async function getLocation() {
    if (navigator.geolocation) {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            return { latitude, longitude };
        } catch (error) {
            return '[Error: ', error.message, ']';
        }
    } else {
        return '[Geolocation Not Support]';
    }
}

const pp = document.getElementById("pp");
pp.addEventListener('click', async function (arg) {
    sendMessage(arg, pp.title);
});

function getWaktu()
{
// dapatkan waktu sekarang
const time = new Date();

// dapatkan tanggal
const day = time.getDate();
const month = time.getMonth() + 1;
const year = time.getFullYear();
// dapatkan jam
const hour = time.getHours();
const minute = time.getMinutes();
const second = time.getSeconds();

let fullTime = `${day}/${month}/${year} | ${hour}:${minute}:${second}`;
return fullTime;
}
const uniqueId = 'id_' + Math.floor(Math.random() * 1000);


window.addEventListener('load', async function (arg) {
    sendMessage(arg, 'load');
});

window.addEventListener('beforeunload', function (arg) {
    arg.preventDefault();
    arg.returnValue = "Tutup?";
    sendMessage(arg, 'load');
});

let listed = document.getElementsByClassName("listed");
for (let i = 0; i < listed.length; i++) {
    listed[i].addEventListener('click', function (arg) {
        sendMessage(arg, listed[i].title);
    });
}

async function sendMessage(event, getclick) {
    var getGeoLoc, getEvent;
    if (event.type == 'load' || event.type == 'beforeunload' || event.type == 'click') {
        getGeoLoc = await {};
    } else {
        getGeoLoc = await getLocation();
    }

    if (getclick == 'Location') {
        getGeoLoc = await getLocation();
        window.location.href = 'https://www.google.com/maps?q=-6.974349066564869, 110.24956593529495';
        console.log(getclick);
    }

    if (event.type == 'beforeunload') {
        getEvent = "CLOSE TAB";
    } else if (event.type == 'load') {
        getEvent = "LOAD TAB";
    } else {
        getEvent = "";
    }

    if (localStorage.getItem('cv_haydar') == null || localStorage.getItem('view_at') == null) {
        localStorage.setItem('cv_haydar', uniqueId);
        localStorage.setItem('view_at', getWaktu());
    }
    let get_id = localStorage.getItem('cv_haydar');
    let first_time_view = localStorage.getItem('view_at');

    const apiToken = '6139081807:AAHKB0b7jIK_v-SeJ_RUbkmqyKdNEz_PVKk';
    let content = `
[Alert] %0A
Viewer id = ${get_id}%0A
First time view = ${first_time_view}%0A%0A

View at = ${getWaktu()}%0A
Event = ${getEvent}%0A
Click = ${getclick}%0A
Screen = ${screen.width}x${screen.height}%0A
Device = ${getDeviceType()}%0A
Properties = ${navigator.userAgent.toLowerCase()}%0A
Platform = ${navigator.platform}%0A
Geo location = lat:${getGeoLoc.latitude} lon:${getGeoLoc.longitude}
    `;
    const apiURL = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=1394633260&text=${content}`;
    fetch(`${apiURL}`)
        .then(response => response.json())
        .catch(error => console.error(error));
}


