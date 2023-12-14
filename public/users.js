
// GET STORED USER

console.log(!userLoggedIn)
if (!userLoggedIn) {
    alert("Please Login or register an account before accessing this page!")

    //Change the page to login/register page when user is ready
    window.location.pathname  = "/Portefolje-6/public/log.html";
}


// Find the elements we want to change
const username = document.querySelector("#username")
const firstName = document.querySelector("#first-name")
const lastName = document.querySelector("#last-name")
const email = document.querySelector("#email")

//Find Ul for cafes list
const cafeList = document.querySelector(".list-of-cafes")
// Get the data about the user.
fetch(`http://localhost:3000/user/search/${currentUserId}`)
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        // Change the text to the users information
        username.innerText = data.userInformation.username;
        firstName.innerText = data.userInformation.first_name;
        lastName.innerText = data.userInformation.last_name;
        email.innerText = data.userInformation.email;

        let cafeInformation = data.cafeInformation

        console.log(cafeInformation)
        cafeInformation.forEach((cafe) => {
            createCafeCards(cafe)
        })
    })

function createCafeCards (cafe) {

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
                                </div>
                            </div>
                        </a>
                    </div>`
    cafeList.append(liElementForCafe);
}
