// FIND WHAT CAFE USER CLICKED ON

const urlParams = new URLSearchParams(window.location.search);
const cafeId = urlParams.get('cafe_id');

// Find all the html elements
const cafeName = document.querySelector("#name");
const cafeLocation = document.querySelector("#location")

// Submit button
const submitRatingButton = document.querySelector("#rating-submit-button");
//InputFields
const ratingNumber = document.querySelector("#rating-number");
const ratingText = document.querySelector("#rating-text");




// Fetch the data about the cafe
fetch(`http://localhost:3000/cafe/search/${cafeId}`)
    .then(response => response.json())
    .then((cafeData) => {
        // Update the fields with the data
        console.log(cafeData)
        updateDataForCafeShowcase(cafeData.cafeData)
        createLeafletMap(cafeData.cafeData.lat, cafeData.cafeData.lng)
        updateTimetable(cafeData.timeTable)
        createReviews(cafeData.ratings)
    })

function updateDataForCafeShowcase(cafeData) {
    //Update the elements
    cafeName.innerText = cafeData.name
    cafeLocation.innerText = `${cafeData.address}, ${cafeData.city}, ${cafeData.country}`

    //Check to see if the cafe has any ratings yet
    if (cafeData.avg_rating) {
        let star = document.createElement("span")
        star.classList.add("fa-solid","fa-star")

        let ratingForCafe = (cafeData.avg_rating).substring(0,1)
        let rating = document.createElement("h3")
        rating.innerText = ratingForCafe

        //Find the container
        let addressRatingContainer = document.querySelector(".address-rating");
        //Append them both
        addressRatingContainer.append(star)
        addressRatingContainer.append(rating)

    }
}
function createLeafletMap(lat,lng) {


    let map = L.map('map').setView([lat, lng], 13)
    //Create map tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    //Create marker on cafe location
    let marker = L.marker([lat, lng]).addTo(map);
}

function updateTimetable(timeTable) {
    console.log(timeTable)
    // Find container
    const containerForTimetable = document.querySelector(".open-close")
    timeTable.forEach((day) => {
        let currentDayElement = document.createElement("li")
        currentDayElement.classList.add("day")
        currentDayElement.innerHTML = `
        <h3> ${(day.day_of_week).toUpperCase()}</h3>
        <div>
            <div class="time">
                <h4>Opens</h4>
                <h4>${day.opening_hour}</h4>
            </div>
            <div class="time">
                <h4>Closes</h4>
                <h4>${day.closing_hour}</h4>
            </div>
        </div>
        `
        containerForTimetable.append(currentDayElement)
    })
}

function createReviews(ratings) {
    // Find the container
    const reviewContainer = document.querySelector(".review-list")
    ratings.forEach((rating) => {
        //Create li element
        let currentRating = document.createElement("li")
        currentRating.classList.add("rating-li");

        currentRating.innerHTML = `
                        <div class="rating">
                            <h3>${rating.rating}</h3>
                        </div>
                        <div class="rating-text">
                            <p>${rating.rtext}</p>
                        </div>
        `
        //Append them
        reviewContainer.append(currentRating)
    })
    console.log(ratings)
}

// Add a rating
submitRatingButton.addEventListener("click",() => {

    if (!userLoggedIn) {
        alert("Please Login or register an account before accessing this page!")

        //Change the page to login/register page when user is ready
        window.location.pathname  = "/Portefolje-6/public/log.html";
    }

    let ratingNumberValue = ratingNumber.value
    let ratingTextValue = ratingText.value



    let arrayOfData = [ratingTextValue,ratingNumberValue];
    if(!arrayOfData.every(dataPoint => dataPoint.length > 0)) {
        alert("Please provide a value for each field!")
        return;
    }
    // Send it to the database
    let returnObject = {
        "cafe_id": cafeId,
        "rating": ratingNumberValue,
        "rText": ratingTextValue,
        "user_id": currentUserId
    }

    fetch('http://localhost:3000/cafes/add/rating', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(returnObject),
    }).then(response => response.text())
        .then((response) => {
            location.reload();
        })

})