// UL ELEMENT FOR LIST OF CAFES
const containerForCafes = document.querySelector(".list-of-cafes")

// FETCH THE DATA WHEN LOADED

fetch('http://localhost:3000/cafes')
    .then(response => response.json())
    .then((listOfCafes) => {
        // CREATE "CARD" FOR EACH CAFE
        listOfCafes.forEach((cafe) => {
            console.log(cafe)
            // Create the div for the information to be contained withing
            let currentCafeDiv = document.createElement("div");
            currentCafeDiv.classList.add(cafe.cafe_id, "cafe-card")

            // Create the elements
            let currentCafeImg = document.createElement("h3")
            currentCafeImg.innerText = "PLACEHOLDER"

            let currentCafeName = document.createElement("h3")
            currentCafeName.innerText = cafe.name

            let currentCafeRating = document.createElement("h3")
            currentCafeRating.innerText = "PLACEHOLDER"

            let currentCafeOpenClose = document.createElement("h3")
            currentCafeOpenClose.innerText = "PLACEHOLDER"

            currentCafeDiv.append(currentCafeImg,currentCafeName,currentCafeRating,currentCafeOpenClose)

            containerForCafes.append(currentCafeDiv);


        })
    })