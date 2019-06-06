DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

CREATE TABLE bamazon.products (
id int not null auto_increment,
product_name VARCHAR(225),
department_name VARCHAR(100),
price DECIMAL (10,2),
stock_quantity INTEGER,
PRIMARY KEY (id)
);

INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity)
VALUES ("The Count Of Monte Cristo", "books" , 12.99, 15),
("War and Peace", "books" , 34.17, 25),
("The Picture of Dorian Gray", "books" , 15, 3),
("Nike Air Max 90 ", "shoes" , 120, 3),
("Nike Air Max 270", "shoes" , 159, 4),
("Nike Air Huarache", "shoes" , 210, 2),
("Monster Hunter World: Iceborne", "games" , 59.99, 50),
("A Plague Tale: Innocence", "games" , 20, 16),
("Sekiro™: Shadows Die Twice", "games" , 32, 39);

