
window.addEventListener('load', async function (arg) {
    sendMessage(arg);
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

function setCookie(name, value, waktu) {
    let expires = "";
    if (waktu) {
        let date = new Date();
        date.setTime(date.getTime() + (1 * waktu * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

async function getIpAddress() {
    try {
        let response = await fetch('https://api.ipify.org/?format=json');
        let data = await response.json();
        return data.ip;
    } catch (error) {
        return error;
    }
}

function getWaktu() {
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

    let fullTime = `${day}/${month}/${year}|${hour}:${minute}:${second}`;
    return fullTime;
}

window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "\o/";

    // (e || window.event).returnValue = confirmationMessage;
    // sendMessage(e);
    // return confirmationMessage;
});

const uniqueId = 'id_' + Math.floor(Math.random() * 1000) + "_" + getWaktu();

async function sendToTelegram(content) {
    const apiToken = '6442218087:AAHmLqixPdNEsbOZ7mRAr7v7SRFWYo9pKh4';
    const apiURL = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=1394633260&text=${content}`;
    fetch(`${apiURL}`)
        .then(response => response.json())
        .catch(error => console.error(error));
}

async function sendMessage(event) {
    var getEvent;

    if (event.type == 'beforeunload') {
        getEvent = "CLOSE TAB";
    } else if (event.type == 'load') {
        getEvent = "LOAD TAB";
    } else {
        getEvent = event.type;
    }

    if (localStorage.getItem('aezakmi') == null || localStorage.getItem('aezakmi') == "") {
        localStorage.setItem('aezakmi', uniqueId);
        let get_id = localStorage.getItem('aezakmi');

        let content = `
        [ NEW VIEWER ] %0A%0A
    - ID         : ${get_id}%0A%0A
    - Time       : ${getWaktu()}%0A%0A
    - Event      : ${getEvent}%0A%0A
    - Screen     : ${screen.width}x${screen.height}%0A%0A
    - Device     : ${getDeviceType()}%0A%0A
    - Properties : ${navigator.userAgent.toLowerCase()}%0A%0A
    - Platform   : ${navigator.platform}%0A%0A
    - Path       : ${window.location.href}%0A%0A
    - Public IP  : ${await getIpAddress()}%0A%0A
    `;
        sendToTelegram(content);
    } else {
        let get_id = localStorage.getItem('aezakmi');

        if (getCookie('AEZAKMI') == null || getCookie('AEZAKMI') == "") {

            setCookie('AEZAKMI', get_id, 1);

            let content = `
    [ SOMEONE ${getEvent} ] %0A%0A
    - ID         : ${get_id}%0A%0A
    - Time       : ${getWaktu()}%0A%0A
    - Event      : ${getEvent}%0A%0A
    - Screen     : ${screen.width}x${screen.height}%0A%0A
    - Device     : ${getDeviceType()}%0A%0A
    - Properties : ${navigator.userAgent.toLowerCase()}%0A%0A
    - Platform   : ${navigator.platform}%0A%0A
    - Path       : ${window.location.href}%0A%0A
    - Public IP  : ${await getIpAddress()}%0A%0A
        `;

            sendToTelegram(content);
        }
    }
}



// document.getElementById("GuestForm").addEventListener('submit', function (e) {
//     e.preventDefault();

//     let nameForm = document.getElementById("nameForm");
//     let commentForm = document.getElementById("commentForm");
//     let rateForm = document.getElementById("rateForm");

//     if (localStorage.getItem('aezakmi') == null || localStorage.getItem('aezakmi') == "") {
//         localStorage.setItem('aezakmi', uniqueId);
//     }
//     let get_id = localStorage.getItem('aezakmi');

//     let content = `
//     [ SOMEONE LEFT A COMMENT ]%0A%0A
//     - ID: ${get_id}%0A%0A
//     - Name: ${nameForm.value}%0A%0A
//     - Comment: ${commentForm.value}%0A%0A
//     - Rate: ${rateForm.value}%0A%0A
//     - Time: ${getWaktu()} %0A%0A
//     `;

//     nameForm.disabled = true;
//     // disabled input
//     setTimeout(() => {
//         nameForm.disabled = false;
//     }, 5000);

//     sendToTelegram(content);
// });