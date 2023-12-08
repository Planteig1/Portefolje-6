// UL ELEMENT FOR LIST OF CAFES
const containerForCafes = document.querySelector(".list-of-cafes")

// STORED USERID


// FETCH THE DATA WHEN LOADED

fetch('http://localhost:3000/cafes')
    .then(response => response.json())
    .then((listOfCafes) => {
        // CREATE "CARD" FOR EACH CAFE
        listOfCafes.forEach((cafe) => {
            console.log(cafe)
            // Recreate the html template for a cafe-card
            // Create LI Element - place 0
            let liElementForCafe = document.createElement("li");

            // Change the innerHTML to the template made
            liElementForCafe.innerHTML = `
                <li class=${cafe.cafe_id}>
                    <div class="cafe-content">
                        <a href="#" >
                            <div class="cafe-attributes">
                                <button class="fav-button"><span class="fa-regular fa-heart attribute"></span></button>
<!--                                <span class="fa-solid fa-wifi attribute"></span>-->
<!--                                <span class="fa-solid fa-music attribute"></span>-->
                            </div>
                            <img src="https://images.squarespace-cdn.com/content/v1/630df13c6197615113e5d249/a72505be-7a7b-450a-a7b9-c4d97a71c2c6/unda_restaurant_21.09.22.jpg">
                            <div class="card-details">
                                <h3>${cafe.name}</h3>
                                <p>Lisegårdsvænget 1, Tune, Denmark</p>
                                <div class="card-rating">
<!--                                    <span class="fa-solid fa-star"></span>-->
<!--                                    <h3>5.0</h3>-->
                                    <span class="fa-solid fa-calendar-days"></span>
                                    <h3> 08:00 - 20:00</h3>
                                </div>
                            </div>
                        </a>
                    </div>
                </li>`


            // Append to the container
            containerForCafes.append(liElementForCafe)

        })
    })
