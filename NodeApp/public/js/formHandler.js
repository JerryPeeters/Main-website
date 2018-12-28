'use strict';

//send form without page refresh and handle the response

function loginFormHandler() {
    let form = document.getElementById('loginForm');
    let inputs = form.getElementsByTagName('input');
    let newInputs = {};
    for (let input of inputs) { //new obj for relevant values
        newInputs[input.name] = input.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send( JSON.stringify(newInputs) );
    // xhr.onload handle response event
}

function registerFormHandler() {
    let form = document.getElementById('registerForm');
    let inputs = form.getElementsByTagName('input');
    let newInputs = {};
    for (let input of inputs) { //new obj for relevant values
        newInputs[input.name] = input.value
    }
    
    if (newInputs.password != newInputs.passwordCheck) {
        return alert('Wachtwoorden komen niet overeen.')
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/register', true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send( JSON.stringify(newInputs) );
    // xhr.onload handle response event
}