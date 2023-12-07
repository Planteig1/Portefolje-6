// ALL ENDPOINTS AKA API AKA THE SERVER

// Express
const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
// Makes it possible to read JSON from post requests
app.use(express.json());

//SQL
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Planteig2667',
    database: 'portefolje6'
});


// LOGIN / REGISTER

// -/create/user - Creates a user
app.post('/create/user',(req, res) => {
    // Get the query parameter
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.first_name
    const lastName = req.body.last_name
    // Check if the username or email is already in use
    connection.query(
        'SELECT * FROM `users` WHERE username = ? OR email = ?',
        [username, email],
        function (err, result1) {
            if(result1.length === 0) {
                // If not create the user.
                connection.query(
                    'INSERT INTO `users`(username, email, password, first_name, last_name) VALUES(?,?,?,?,?)',
                    [username, email, password, firstName, lastName],
                    function (err, result) {
                        res.send(`You've successfully created a account. WELCOME!`);
                    }
                )
            } else {
                res.status(418).send("Email or username is already in use.")
            }
        }
    )
})
// LOGIN USER
// REMEBER TO SET USER ID = 0 BEFORE "LAUNCH"

let currentUserId = 3;

app.post('/login/user',(req, res) => {
    // Get the values from user
    const username = req.body.username
    const password = req.body.password

    // Check to see if theres an account with matching username and password

    connection.query(
        'SELECT * FROM `users` WHERE username = ? AND password = ?',
        [username, password],
        function (err, result) {
            if (result.length === 1) {
                res.send(`User ${username} has been logged in`)
                connection.query(
                    'SELECT user_id FROM `users` WHERE username = ?',
                    [username],
                    function (err, result) {
                        currentUserId = result[0].user_id
                    }
                )
            } else {
                res.send(`Wrong username/password`)
            }
        }
    )
})


// /cafes - Shows all cafes in the database
app.get('/cafes',(req, res) => {
    // Fetch all the cafes from the database.
    connection.query(
        'SELECT * FROM `cafes`',
        function (err, result) {
            console.log("Found all cafes in the database")
            res.send(result)
        }
    )
})

// -/cafes/:cafe_id - Shows the cafe based on id
app.get('/cafes/search/:cafe_id',(req, res) => {
    // Get the parameter
    let cafeId = req.params.cafe_id;

    //Fetch the data based on cafe ID
    connection.query(
        'SELECT * FROM `cafes` WHERE cafe_id = ?',
        [cafeId],
        function (err, result) {
            console.log("You searched for the cafe with id " + cafeId)
            res.send(result)
        }
    )
})

// -/cafes/search?city=? - Shows the cafes based on city
app.get('/cafes/search',(req, res) => {
    // Get the query parameter AKA WHAT CITY
    const city = req.query.city

    // Find which cafes are in specified city in location table
    connection.query(
        'SELECT cafe_id FROM `location` WHERE city = ?',
        [city],
        function (err, result) {
            if (err) {
                res.send(err)
            }
            // If there a cafe with that city in the database
            if (result.length > 0) {
                // Get the information for each of the cafes
                result.forEach((cafe) => {
                    // Define cafe_id
                    let currentCafeId = cafe.cafe_id

                    connection.query(
                        'SELECT * FROM `cafes` WHERE cafe_id = ?',
                        [currentCafeId],
                        function (err, result) {
                            console.log(result[0])
                        }
                    )
                })
            } else {
                res.send(`We couldnt find any cafes in this area :(`);
            }
            // res.send(result);
        }
    )
})

// SEARCH FOR USER

// -/user/search/:user_id - Search for data about user - Created view to exclude password (Could be done in js, but here we are :) )

app.get('/user/search/:userId',(req, res) => {
    // Get the parameter
    const userId = req.params.userId;

    connection.query(
        'SELECT * FROM `user_information` WHERE user_id = ?',
        [userId],
        function (err, result) {
            //Check to see if a result is returned
            if (result.length === 1) {
                res.send(result[0]);

                // Find favorited cafes ( If there is any )
                connection.query(
                    'SELECT cafe_id FROM `favorites` WHERE user_id = ?',
                    [userId],
                    function (err, result2) {
                        result2.forEach((cafe) => {
                            console.log(cafe.cafe_id)
                        })
                    }
                )
            } else {
                // The user doesn't exists
                res.status(404).send(`Sorry! We cant find the user you're looking for!`)
            }
        }
    )
})


// - Create cafe

// -/create/cafes - Creates a cafe
app.post('/create/cafe',(req, res) => {
    // Get the query parameters
    const name = req.body.name;
    const wifi = req.body.wifi;
    const music = req.body.music;
    const priceRange = req.body.priceRange;
    const userId = currentUserId;

    // Location Parameters
    const country = req.body.country;
    const city = req.body.city;
    const address = req.body.address;
    const lat = req.body.lat;
    const lng = req.body.lng;


    // Opening hours parameters

    const openCloseTime = req.body.timeTable


    // Check to see if its already made
    connection.query(
        'SELECT * FROM `cafes` WHERE name = ?',
        [name],
        function (err, result2 ) {
            if (result2.length === 0) {
                // If there is not already a cafe with the same name
                //Insert the data
                connection.query(
                    'INSERT INTO `cafes` (name, wifi, music, price_range, user_id) VALUES (?,?,?,?,?)',
                    [name, wifi, music, priceRange, userId],
                    function (err, result) {
                        if (err) {
                            res.send(err)
                        }
                        // Find the cafe id
                        connection.query(
                            'SELECT cafe_id FROM `cafes` WHERE name = ?',
                            [name],
                            function (err, result3) {
                                // Define the current cafe ID
                                const cafeId = result3[0].cafe_id

                                // Create location
                               connection.query(
                                   'INSERT INTO `location` (country, city, address, lat, lng, cafe_id) VALUES(?,?,?,?,?,?)',
                                   [country, city, address, lat, lng, cafeId],
                                   function (err, result4) {
                                       if (err) {
                                           console.log("error with location")
                                       }
                                   }
                               )
                                // Create opening and closing hours

                                openCloseTime.forEach((day) => {
                                    let currentDay = day.dayOfWeek
                                    let openingTime = day.open
                                    let closingTime = day.closing

                                    connection.query(
                                        'INSERT INTO `time`(day_of_week, opening_hour, closing_hour, cafe_id) VALUES(?,?,?,?)',
                                        [currentDay, openingTime, closingTime, cafeId],
                                        function (err, result) {
                                            if (err) {
                                                console.log("error with time" )
                                            }
                                        }
                                    )
                                })
                            }
                        )
                        res.send("You Have Created a new Cafe")
                    }
                )
            } else {
                // Give error code.
                res.status(418).send("Theres already a cafe with the same name")
            }
        }
    )
})

// FAVORITES

// -/favorite/add - Adds a favorite functionality
app.post('/favorite/add',(req, res) => {
    // Get the query parameter
    const cafeId = req.body.cafeId
    const userId = currentUserId

    // If they already has favorited a specific cafe
    connection.query(
        'SELECT * FROM `favorites` WHERE cafe_id = ? AND user_id = ?',
        [cafeId, userId],
        function (err, result1) {
            if (result1.length === 0) {
                // The user has not favorited this cafe before
                // Create the favorite connection
                connection.query(
                    'INSERT INTO `favorites`(cafe_id, user_id) VALUES (?,?)',
                    [cafeId, userId],
                    function (err , result) {
                        res.send(`The user with ID: ${userId} has added the cafe with ID: ${cafeId} to their favorite tab`);
                    }
                )
            } else {
                // The user already has favorited this cafe - Remove the favorite
                connection.query(
                    'DELETE FROM `favorites` WHERE cafe_id = ? AND user_id',
                    [cafeId, userId],
                    function (err, result) {
                        res.send(`The user with ID: ${userId}. Has removed cafe with the ID: ${cafeId} from his favorite tab`);
                    }
                )
            }
        }
    )
})


// RATING
app.post('/cafes/add/rating',(req, res) =>{
    // Get parameter.
    const cafeId = req.body.cafeId;
    const rating = req.body.rating;
    const ratingText = req.body.rText;

    connection.query(
        'INSERT INTO `rating`(user_id, cafe_id, rating, rtext) VALUES(?,?,?,?)',
        [currentUserId,cafeId, rating, ratingText],
        function (err, result) {
            if (err) {
                res.send(err)
            }
            res.send("Rating added.")
        }
    )
})


