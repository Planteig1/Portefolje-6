// UL ELEMENT FOR LIST OF CAFES
const containerForCafes = document.querySelector(".list-of-cafes")
let favoriteButtons;

// STORED USERID
console.log(currentUserId)

// FETCH THE DATA WHEN LOADED
fetchCafesData()
function fetchCafesData(listOfFilters) {

    //If theres filters tp be applied
    if (listOfFilters && Object.keys(listOfFilters).length > 0) {
        //Map the object to the desired format
        let queryParams = Object.entries(listOfFilters)
            .map(([key,value]) => `${key}=${value}`)
            .join('&')
        fetch(`http://localhost:3000/cafes/search?${queryParams}`)
            .then(response => response.json())
            .then((listOfCafes) => {
                createCafeCards(listOfCafes)
            })

    } else {
        //If theres no filters to be applied
        // Fetch the data - All Cafes.
        console.log("no filters")
        fetch('http://localhost:3000/cafes')
            .then(response => response.json())
            .then((listOfCafes) => {
                // Create all cafes
                createCafeCards(listOfCafes)
            })
    }
}
function createCafeCards(listOfCafes) {
    //Clear the list
    containerForCafes.innerHTML = "";

    // CREATE "CARD" FOR EACH CAFE
    listOfCafes.forEach((cafe) => {
        console.log(cafe)
        // Recreate the html template for a cafe-card
        // Create LI Element - place 0
        let liElementForCafe = document.createElement("li");
        liElementForCafe.classList.add(`${cafe.cafe_id}`)


        let attributeIcons = [];
        if (cafe.wifi === 1) {
            attributeIcons.push('<span class="fa-solid fa-wifi attribute"></span>');
        }
        if (cafe.music === 1) {
            attributeIcons.push('<span class="fa-solid fa-music attribute"></span>');
        }

        // Change the innerHTML to the template made
        liElementForCafe.innerHTML = `
                    <div class="cafe-content">
                        <a href="#" >
                            <div class="cafe-attributes">
                                <button class="fav-button"><span class="fa-solid fa-heart attribute"></span></button>
                                ${attributeIcons.join(' ')}
                            </div>
                            <img src="https://images.squarespace-cdn.com/content/v1/630df13c6197615113e5d249/a72505be-7a7b-450a-a7b9-c4d97a71c2c6/unda_restaurant_21.09.22.jpg" alt="Picture Of The cafe">
                            <div class="card-details">
                                <h3>${cafe.name}</h3>
                                <p>${cafe.address}, ${cafe.city}, ${cafe.country}</p>
                                <div class="card-rating">
                                    <span class="fa-solid fa-calendar-days"></span>
                                    <h3>${cafe.opening_hour} - ${cafe.closing_hour}</h3>
                                </div>
                            </div>
                        </a>
                    </div>`

        // Check if the cafe has rating
        if (cafe.avg_rating) {
            let cardRatingContainer = liElementForCafe.querySelector(".card-rating");
            let ratingForCafe = (cafe.avg_rating).substring(0,1)
            cardRatingContainer.innerHTML = `<span class="fa-solid fa-star"></span>
                                                 <h3>${ratingForCafe}</h3>
                                                 <span class="fa-solid fa-calendar-days"></span>
                                                 <h3>${cafe.opening_hour} - ${cafe.closing_hour}</h3>`
        }
        // Append to the container
        containerForCafes.append(liElementForCafe)
    })
    // Find all of the favorite buttons, when all cards have been made.
    addFavorite(listOfCafes)
}

function addFavorite(listOfCafes) {


    favoriteButtons = document.querySelectorAll(".fav-button");

    favoriteButtons.forEach((button, index) => {
        button.addEventListener("click",() => {
            if (!userLoggedIn) {
                alert("Please Login or register an account before trying to favorite a cafe")

                //Change the page to login/register page when user is ready
                window.location.pathname  = "/Portefolje-6/public/log.html";
            }

            let currentHeartIcon = button.querySelector(".fa-heart");
            currentHeartIcon.classList.toggle("favorite");
            let currentCafe = listOfCafes[index].cafe_id

            let favoriteData = {
                "cafe_id": currentCafe,
                "user_id": currentUserId
            }

            fetch('http://localhost:3000/favorite/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(favoriteData),
            }).then(response => response.text())
                .then((favorited) => {
                    console.log(favorited)
                })

        })
    })
}

// Find the all cities in the database.

// Find the selector
const citiesListSelector = document.querySelector("#location")

fetch('http://localhost:3000/cafes/list-of-cities')
    .then(response => response.json())
    .then((listOfCities) => {
        // Create a option for each city
        listOfCities.forEach((city) => {
            let cityOption = document.createElement("option")
            cityOption.setAttribute("value",city)
            cityOption.innerText = city

            citiesListSelector.append(cityOption);
        })
    })


// SUBMIT FILTERING
// FIND THE VALUES OF ALL FILTERS
const priceRange = document.querySelectorAll(".price-range input");
const wifi = document.querySelector("#wifi");
const music = document.querySelector("#music");
const locationOfCafe = document.querySelector("#location");
let arrayOfFilters = [...priceRange,wifi,music,locationOfCafe];

const submitButton = document.querySelector("#search");
submitButton.addEventListener("click",() => {
    let objectWithAppliedFilters = {

    }
    // Find if the user has selected som of the filters
    arrayOfFilters.forEach((filter) => {
        if (filter.type === "radio" && filter.checked) {
            objectWithAppliedFilters[filter.name] = filter.value
        } else if (filter.type === "select-one") {
            if(filter.value !== "") {
                objectWithAppliedFilters[filter.name] = filter.value
            }
        }
    })
    console.log(objectWithAppliedFilters)
    //Create the cards based on the filters.
    fetchCafesData(objectWithAppliedFilters)
})


