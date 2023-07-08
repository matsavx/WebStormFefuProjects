let moleArr = ['mole1', 'mole2', 'mole3', 'mole4', 'mole5', 'mole6', 'mole7', 'mole8', 'mole9'];
let points = 0;
let timeCounter;
let endFlag = true;

window.addEventListener('DOMContentLoaded', gameStart);
document.getElementsByClassName('play')[0].addEventListener('click', start);

function gameStart() {
    document.getElementById('game-field').addEventListener('click', function (wtf) {
        if (moleArr.indexOf(wtf.target.id) !== -1) {
            deleteMole(wtf.target.id);
            PointsCounter(++points);
            setTimeout(addMole, 300, getRandomMole());
        }
    })
}

function addMole(id) {
    document.getElementById(id).style.display = "block";
    if (!endFlag) {
        setTimeout(function () {
            if (document.getElementById(id).style.display !== "none") {
                deleteMole(id);
                setTimeout(addMole, Math.random()*Math.floor(300) + 100, getRandomMole());
            }
        }, Math.round(Math.random()*Math.floor(800))+300);
    }
}

function getRandomMole() {
    return moleArr[Math.floor(Math.random()*Math.floor(8))];
}

function deleteMole(id) {
    document.getElementById(id).style.display = "none";
}

function PointsCounter() {
    document.getElementById("points").innerHTML = points;
}

function timeStart() {
    timeCounter = Date.now();
    count();
}

function count() {
    if ((Date.now() - timeCounter) >= 30000)
        gameStop();
    else {
        setTimeout(count, 30);
        document.getElementById("time").innerHTML = (Math.round(30 - (Date.now() - timeCounter)/1000)).toString();
    }
}
function gameStop() {
    clearAll();
    points = 0;
    document.getElementById("time").innerHTML = "30";
}

function clearAll() {
    for (let i = 0; i < moleArr.length; i++)
        document.getElementsByClassName("mole-img")[i].style.display = "none";
}

function start() {
    points = 0;
    document.getElementById("points").innerHTML = "0";
    clearAll();
    timeStart();
    setTimeout(addMole, 300, getRandomMole());
}