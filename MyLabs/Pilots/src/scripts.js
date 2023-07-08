let wandArr = [[true, true, true, true], [true, true, true, true], [true, true, true, true], [true, true, true, true]];
window.addEventListener('DOMContentLoaded', main());
function main() {
    document.getElementsByClassName('start-button')[0].addEventListener('mouseup', function () {
        start();
    })
    document.getElementsByClassName('start-button')[1].addEventListener('mouseup', function () {
        start();
    })
    document.getElementById('game-field').addEventListener('mouseup', function (wtf) {
        if (wtf.target.id !== "game-field") {
            turn(wtf.target.getAttribute('line') - 1, wtf.target.getAttribute('column') - 1);
        }
    });
}
function turn(line, column) {
    let gameField = document.getElementById('game-field');
    for (let i=0; i < 4; i++) {
        wandArr[line][i] = !wandArr[line][i];
        wandTurn(gameField.children[line*4 + i]);
        wandArr[i][column] = !wandArr[i][column];
        wandTurn(gameField.children[i*4 + column]);
    }
    wandArr[line][column] = !wandArr[line][column];
    check();
}
function wandTurn(wand) { //Может быть ошибка в этой шняге
    let angle = rotation(wand);
    if (angle%90 === 0) {
        wand.animate([{transform: 'rotate(' + angle + 'deg]'}, {transform: 'rotate(' + (angle+90) + 'deg]'}], 200).addEventListener('finish', function () {
            wand.style.transform = 'rotate(' + (angle + 90) + 'deg)';
        })
    }
}
function rotation(wand) {
    const omg = window.getComputedStyle(wand, null);
    const matrix = omg.getPropertyValue('-webkit-transform') || omg.getPropertyValue('-moz-transform') || omg.getPropertyValue('-ms-transform') || omg.getPropertyValue('-o-transform') || omg.getPropertyValue('transform');
    let angle = 0;
    if (matrix !== 'none') {
        const values = matrix.split('(')[1].split(')')[0].split(',');
        const first = values[0];
        const second = values[1];
        angle = Math.round(Math.atan2(second, first)*(180/Math.PI));
    }
    return ((angle < 0) ? angle += 360 : angle);
}
function change() {
    for (let i = 0; i < Math.round(Math.random() * Math.floor(20) + 10); i++) {
        let line = Math.round(Math.random() * Math.floor(3));
        let column = Math.round(Math.random() * Math.floor(3));
        for (let j = 0; j < 4; j++) {
            wandArr[line][j] = !wandArr[line][j];
            wandArr[j][column] = !wandArr[j][column];
        }
    }
}
function position() {
    let gameField = document.getElementById('game-field');
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
            gameField.children[i*4 + j].style.transform = wandArr[i][j] ? 'rotate(90deg)' : 'rotate(0deg)';
}
function check() {
    let sum = 0;
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
            sum += wandArr[i][j];
    if (sum === 16)
        end();
}
function start() {
    document.getElementById('game-field').classList.remove('gaming');
    document.getElementById('top-menu').style.display = 'none';
    document.getElementById('lower-menu').style.display = 'none';
    change();
    position();
}
function end() {
    document.getElementById('game-field').classList.add('gaming');
    document.getElementById('lower-menu').style.display = 'block';
}

