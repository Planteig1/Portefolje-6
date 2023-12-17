DATABASE CODE

-- NEW DATBASE FOR PORTEFØLJE 6 --

create database portefolje6;

use portefolje6;
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

CREATE TABLE cafes (
    cafe_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    wifi BOOLEAN NOT NULL,
    music BOOLEAN NOT NULL,
    price_range enum('inexpensive', 'moderately expensive','expensive') NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE favorites (
    user_id INT,
    cafe_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (cafe_id) REFERENCES cafes(cafe_id)
);

CREATE TABLE rating (
    user_id INT,
    cafe_id INT,
	rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
    rtext TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (cafe_id) REFERENCES cafes(cafe_id)
);

CREATE TABLE location (
	country VARCHAR(250),
    city VARCHAR(250),
    address VARCHAR(250),
	lat DECIMAL(10, 8),
    lng DECIMAL(10, 8),
    cafe_id INT,
	foreign key (cafe_id) REFERENCES cafes(cafe_id)
);

CREATE TABLE time (
	day_of_week ENUM('sunday','monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'),
    opening_hour TIME,
    closing_hour TIME,
    cafe_id INT,
    foreign key (cafe_id) references cafes(cafe_id)
);


-- Create a view for user information - no password. 

CREATE VIEW user_information as
select user_id, username, email, first_name, last_name
from users;

CREATE VIEW cafe_card_details as
SELECT cafes.cafe_id, cafes.name, cafes.wifi,cafes.music, cafes.price_range, location.country, location.city,location.address,location.lat,location.lng , time.day_of_week, time.opening_hour, time.closing_hour , AVG(rating.rating) AS avg_rating
FROM cafes
INNER JOIN location ON cafes.cafe_id = location.cafe_id
LEFT JOIN rating ON cafes.cafe_id = rating.cafe_id
INNER JOIN time ON cafes.cafe_id = time.cafe_id
GROUP BY cafes.cafe_id,cafes.name,cafes.wifi,cafes.music,cafes.price_range,cafes.user_id,location.country,location.city,location.address,location.lat,location.lng,time.day_of_week,time.opening_hour,time.closing_hour;


create view all_cafe_content AS
SELECT cafes.cafe_id, cafes.name, cafes.wifi,cafes.music, cafes.price_range, location.country, location.city,location.address,location.lat,location.lng, AVG(rating.rating) AS avg_rating
FROM cafes
INNER JOIN location ON cafes.cafe_id = location.cafe_id
LEFT JOIN rating ON cafes.cafe_id = rating.cafe_id
GROUP BY cafes.cafe_id,cafes.name,cafes.wifi,cafes.music,cafes.price_range,cafes.user_id,location.country,location.city,location.address,location.lat,location.lng;
