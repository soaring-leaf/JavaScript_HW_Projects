console.log("JS is Loaded");
const $webBtn = $('#activate-button');
const $webBtn2 = $('#2-button')
const httpRequest = new XMLHttpRequest();

$webBtn.on('click',function(evt) {
    evt.preventDefault();

    httpRequest.onreadystatechange = responseMethod;

    // open takes 3 parms
    // 1 Request type (HTTP verbs [Get Post Patch Put Delete])
    // 2 URL
    // 3 Optional* Tell whether this req is Async or not (Defaults to True)
    httpRequest.open('GET','https://data.cityofnewyork.us/api/views/jb7j-dtam/rows.json?accessType=DOWNLOAD');
    httpRequest.send();
})

$webBtn2.on('click',function(evt) {
    evt.preventDefault();

    httpRequest.onreadystatechange = responseMethod;

    // open takes 3 parms
    // 1 Request type (HTTP verbs [Get Post Patch Put Delete])
    // 2 URL
    // 3 Optional* Tell whether this req is Async or not (Defaults to True)
    httpRequest.open('GET','https://official-joke-api.appspot.com/jokes/ten');
    httpRequest.send();
})

function responseMethod() {
    // insure response has been fully returned
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
        // do stuff after checking the status returned
        if(httpRequest.status === 200) {
            // it worked!
            console.log(httpRequest.responseText);
        }
        // else show error!
    }
}

// FETCH
fetch('https://data.cityofnewyork.us/api/views/jb7j-dtam/rows.json?accessType=DOWNLOAD')
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))

const API_KEY = 'fbfce4dd492393202fe6e385383bd31b';
const CITY = 'buffalo';

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`)
.then(function(resp) {
    return resp.json();
})
.then(function(weatherData) {
    console.log(weatherData);
})
.catch(err => console.error(err))

// https://randomuser.me/api/
fetch(`https://randomuser.me/api/`)
    .then(function(res) {
        return res.json();
    })
    .then(function(user) {
        console.log(user);
        //create image element
        const userImg = document.createElement('img');
        const userName = document.createElement('p');
        userImg.src = user.results[0].picture.large;
        userName.textContent = user.results[0].login.username;
        userName.id = "user-name";
        // add element to DOM
        document.body.appendChild(userImg);
        document.body.appendChild(userName);

    })