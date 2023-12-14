// Find all the inputFields

const cafeNameInput = document.querySelector("#name")
const wifiInput = document.querySelector("#wifi")
const musicInput = document.querySelector("#music")
const priceRangeInput = document.querySelector("#price-range")
const countryInput = document.querySelector("#country");
const cityInput = document.querySelector("#city")
const addressInput = document.querySelector("#address");
const latInput = document.querySelector("#lat")
const lngInput = document.querySelector("#lng")

// Submit Button
const submitButton = document.querySelector("#submit-button");


submitButton.addEventListener("click",() => {

   let  cafeName = cafeNameInput.value
    let wifi;
    if (wifiInput.checked) {
        wifi = wifiInput.value
    } else {
        wifi = false
    }
    let music;
    if (musicInput.checked) {
        music = musicInput.value
    } else {
        music = false
    }

   let  priceRange = priceRangeInput.value
   let  country = countryInput.value
   let  city = cityInput.value
   let  address = addressInput.value
   let  lat = latInput.value
   let  lng = lngInput.value

    // Check if any of the fields are empty



    // Find the open/close times for each day
    let timetable = {};
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    days.forEach((day) => {
        let openTime = document.querySelector(`#${day}-time .open`).value;
        let closeTime = document.querySelector(`#${day}-time .close`).value;
        timetable[day] = { open: openTime, close: closeTime };
    })
    console.log(timetable)

    let returnObject = {
        "name": cafeName,
        "wifi": wifi,
        "music": music,
        "priceRange": priceRange,
        "country": country,
        "city": city,
        "address": address,
        "lat":lat,
        "lng":lng,
        "timeTable": timetable
    }
    console.log(returnObject)
})
