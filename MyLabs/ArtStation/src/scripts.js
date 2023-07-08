const requestURL = "https://picsum.photos/v2/list?page=2&limit=12";

window.addEventListener('DOMContentLoaded', artMain());
function artMain() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', requestURL);
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.status === 200)
            create(xhr.responseText);
    })

    xhr.onload = () => {
        console.log(xhr.response);
    }

    xhr.send();
}

function create(data) {
    let img = JSON.parse(data);
    for (let i of img)
        insert(i['download_url'])
}

function insert(url) {
    document.getElementById('grid').insertAdjacentHTML('beforeend', '<div class="img" style="background: url(' + url + ');"></div>');
}