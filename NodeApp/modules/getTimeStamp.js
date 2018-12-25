'use strict';

module.exports = shortDate;

function shortDate() {
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
};