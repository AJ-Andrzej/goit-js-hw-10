import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector("[data-start]");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");
const dateInput = document.querySelector("#datetime-picker")
let userSelectedDate = null;
let inetrvalID = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0].getTime()
        if (userSelectedDate <= Date.now()) {
            iziToast.show({
            color: "red",
            position: "topCenter",
            message: "Please choose a date in the future",
            progressBar: false,
            })
            startBtn.setAttribute("disabled", "true")
        } else {
            startBtn.removeAttribute("disabled")
        }
        return userSelectedDate
        
  },
};

const calendar = flatpickr(dateInput, options)
startBtn.addEventListener("click", timer)


function timer () {
    const initDate = userSelectedDate;
    inetrvalID = setInterval(() => {
        const currentTime = Date.now();
        const diff = initDate - currentTime;
        const DiffTime = formatTime(diff)
        if (diff < 1000) clearInterval(inetrvalID);
        for (let i = 0; i < 4; i++){
            days.textContent = DiffTime[0];
            hours.textContent = DiffTime[1];
            minutes.textContent = DiffTime[2];
            seconds.textContent = DiffTime[3];
        }
    }, 1000)
    startBtn.setAttribute("disabled", "true")
    dateInput.setAttribute("disabled", "true")
    
}

const formatTime = milliseconds => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
    const days = Math.floor((milliseconds / 1000 / 60 / 60 / 24) % 365);

    return [
        days.toString().padStart(2, "0"),
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0")
    ]
}


