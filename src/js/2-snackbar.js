import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form")
const delayInput = form.elements.delay;
const stateInput = form.elements.state;


form.addEventListener("submit", formSubmitHandler)

function formSubmitHandler(event) {
    event.preventDefault()
    const dalayValue = delayInput.value;
    const stateValue = stateInput.value;
    const promise = createPromise(dalayValue, stateValue);

    promise
    .then((message) => iziToast.show({
        color: "green",
        position: "topCenter",
        message: message,
        progressBar: false,
    }))
    .catch((message) => iziToast.show({
        color: "red",
        position: "topCenter",
        message: message,
        progressBar: false,
    }))
    form.reset()
    
}

function createPromise(delay, state) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${delay}ms`)
            }
            else {
                reject (`❌ Rejected promise in ${delay}ms`)
            }
        }, delay)

    })

    return promise;
}

