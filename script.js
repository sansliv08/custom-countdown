const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span'); //transforma todos os valores de span em array

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const CompleteBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date; // It's the same = new Date() // Return date em milseconds
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);


// Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime(); // Return date em milseconds
        const distance = countdownValue - now;
        // console.log('distance: ', distance);
    
        const days = Math.floor(distance/ day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        // console.log(days, hours, minutes, seconds);

        // Hide Input
        inputContainer.hidden = true;

        // If the countdown has ended, show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false
        } else {
            // Else, show the countdown in progress
                // Populate Countdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
                // Show Countdown
            countdownEl.hidden = false;
        }
    }, second);
}

// Take Values from Form Inout
function updateCountdown (e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    }
    // console.log(savedCountdown);
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // console.log(countdownTitle, countdownDate);
    // Check for valid date
    if ( countdownDate === '') {
        alert('Please select a date for the countdown.');
    } else {
        // Get number version of current Date, updateDom
        countdownValue = new Date(countdownDate).getTime(); // Return date em milseconds
        // console.log('countdownValue: ', countdownValue);
        updateDOM();
    }
}

// Reset All Values
function reset() {
    // Hide Countdowns, show Input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the countdown
    clearInterval(countdownActive);
    // Reset Values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
    // Get countdown from localstorage if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
CompleteBtn.addEventListener('click', reset);

// On Load, check localStorage
restorePreviousCountdown();