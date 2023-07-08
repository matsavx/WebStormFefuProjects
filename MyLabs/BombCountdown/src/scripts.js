let timerField = document.getElementById('timer-field');
let hours = document.getElementById('timer-hours');
let minutes = document.getElementById('timer-minutes');
let seconds = document.getElementById('timer-seconds');

function start(){
    document.querySelector(".wait").classList.toggle("none");
    document.querySelector(".timer-main").classList.toggle("none");
}

timerField.onsubmit = function () {

    const p = new Promise((resolve, reject) => {
        if (hours.value !== "0" || minutes.value !== "0" || seconds.value !== "0") {
            start();
            let timeLeft = parseInt(hours.value, 10) * 3600 + parseInt(minutes.value, 10) * 60 + parseInt(seconds.value, 10);
            setTimeout(() => {
                resolve();
            }, timeLeft * 1000);
        }
        else reject();
    });

    p.then(() => {
            start();
            alert("Время вышло");
            hours.value = "0";
            minutes.value = "0";
            seconds.value = "0";
        }
    );

    p.catch(() => alert("Чтобы запустить таймер, введите время"));

    return false;
}