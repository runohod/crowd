const year = documents.quarySelector('#year');
const days = documents.quarySelector('#days');
const hours = documents.quarySelector('#hours');
const minutes = documents.quarySelector('#minutes');
const seconds = documents.quarySelector('#seconds');



const  currentYear = new Date().getFullYear();
const nextYear = new Date(`Januar 01 ${currentYear + 1} 00:00:00`);
const currentTime = Date();
const diff = nextYear - currentTime

const daysLeft = Math.floor(diff  / 1000 / 60 / 60 / 24);
const hoursLeft = Math.floor(diff  / 1000 / 60 / 60) % 24;
const minutesLeft = Math.floor(diff  / 1000 / 60) % 60;
const secondsLeft = Math.floor(diff  / 1000) % 60;

console.log(daysLeft, hoursLeft, minutesLeft, secondsLeft);

days.innerText = daysLeft; 
hours.innerText = hoursLeft < 10 ? '0' + hoursLeft : hoursLeft; 
minutes.innerText = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft; ; 
seconds.innerText = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft; ; 


year.innerText = currentYear + 1; 
function updateCounter() {

}

setInterval(updateCounter, 1000);