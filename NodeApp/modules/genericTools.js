'use strict';

module.exports.formatName = (str) => {
    let name = ''
    str = str.toLowerCase();
    str = str[0].toUpperCase() + str.slice(1);

    if ( str.includes(' ') ) { //if multiple names
        let arr = str.split(' ');
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
            if ( i > 0 ) arr[i] = ' ' + arr[i];
            name += arr[i];
        }
        str = name;
        name = '';
    }
    if ( str.includes('-') ) { //if multiple names '-'
        let arr = str.split('-');
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
            if ( i > 0 ) arr[i] = '-' + arr[i];
            name += arr[i];
        }
        str = name;
        name = '';
    }
    return str;
}

module.exports.getBody = (request) => {
    return new Promise((resolve, reject) => { //async datastream promise
        let body = [];

        request.on('data', (chunk) => { 
            body.push(chunk);
        })
        .on('end', () => {
            body = Buffer.concat(body).toString();
            resolve(body);
        })
        .on('error', (err) => {
            reject(err);
        })
    })
}

module.exports.getTimeStamp = () => {
    let date = new Date();
    let day = date.getDate().toString(), 
      month = ( date.getMonth() + 1 ).toString(),
      year = date.getFullYear().toString(),
      hours = date.getHours().toString(),
      minutes = date.getMinutes().toString(),
      seconds = date.getSeconds().toString();
   
    let dd = day.length == 1 ? '0' + day : day;
    let mm = month.length == 1 ? '0' + month : month;
    let yy = year.slice(2);
    let hh = hours.length == 1 ? '0' + hours : hours;
    let minmin = minutes.length == 1 ? '0' + minutes : minutes;
    let sec = seconds.length == 1 ? '0' + seconds : seconds;
    
    return `${dd}.${mm}.${yy} ${hh}:${minmin}:${sec}`;
}

module.exports.parseCookie = (cookie) => {
    if (!cookie) return new Error('cookie not found');
    if ( cookie.startsWith('userId=') ) {
        let start = cookie.indexOf('='),
            mid = cookie.indexOf('+'),
            end = cookie.indexOf('-');

        let userId = cookie.slice(start+1, mid),
            checksum = cookie.slice(mid+1, end);

        let cookieObj = {
            'userId' : userId, 
            'checksum' : checksum
        }
        return cookieObj;

    } else return new Error('invalid cookie')
}

module.exports.randomInt = () => {
    let value = Math.random();
    value = value * 1000000000000000000;
    value = Math.round(value);
    return value;
}
