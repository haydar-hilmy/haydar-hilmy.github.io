$(document).ready(function(){
    setInterval(() => {
        setTimeout(() => {
            let myInterval = 1;
            const blinkInterval = setInterval(() => {
                $(`.letter:nth-child(${myInterval++})`).css("animation-name", "blink"); 
            }, 250);
            window.globalBlinkInterval = blinkInterval;
        }, 1000);
        clearInterval(globalBlinkInterval);
        $(".letter").css("animation-name", "none");
    }, 3000);
})

const apiToken = "6197340817:AAEp9ZuGwvWOn6w_nl33jWVrt3ZW-dLLFQY";

function sendMessage(){
    if(confirm("mo ngasih pesan si haydar?") == true){
        let nama = prompt("Isi dulu namamu");
        let pesan = prompt("Pesan");
        let myMessage = `
${nama}, mau ngasih pesan%0A
----------------%0A
${pesan}
        `;
        const apiURL = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=1394633260&text=${myMessage}`;
        fetch(`${apiURL}`)
        .then(response => response.json())
        .then(data => {
            alert("makasih :)");
        })
        .catch(error => console.error(error));
    } else {
        alert("okedeh :)");
    }
}