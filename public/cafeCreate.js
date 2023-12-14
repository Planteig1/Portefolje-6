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
        wifi = 1
    } else {
        wifi = 0
    }
    let music;
    if (musicInput.checked) {
        music = 1
    } else {
        music = 0
    }


   let  priceRange = priceRangeInput.value
   let  country = countryInput.value
   let  city = cityInput.value
   let  address = addressInput.value
   let  lat = latInput.value
   let  lng = lngInput.value


    // Check if any of the fields are empty
    let arrayOfData = [cafeName,priceRange,country,city,address,lat,lng];
    if(!arrayOfData.every(dataPoint => dataPoint.length > 0)) {
        alert("Please provide a value for each field!")
        return;
    }

    // Find the open/close times for each day
    let timetable = [];
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    days.forEach((day) => {
        let currentDay = day
        let openTime = document.querySelector(`#${day}-time .open`).value;
        let closingTime = document.querySelector(`#${day}-time .close`).value;
        timetable.push({ dayOfWeek: currentDay, open:openTime, closing:closingTime  })
    })

    let cafeInformation = {
        "name": cafeName,
        "wifi": wifi,
        "music": music,
        "priceRange": priceRange,
        "country": country,
        "city": city,
        "address": address,
        "lat":lat,
        "lng":lng,
        "user_id": currentUserId,
        "timeTable": timetable
    }

    console.log(cafeInformation)
    createCafe(cafeInformation);

})

function createCafe(cafeInformation) {
    // Send post request
    fetch('http://localhost:3000/create/cafe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cafeInformation),
    }).then(response => response.json())
        .then((createOrNot) => {
            // Send user to the newly created cafe.
            console.log(createOrNot)

        })
}
