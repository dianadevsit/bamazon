DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 555, 100), 
       ("Smart Phone", "Electronics", 800, 77),
       ("Charmin", "Toilet Paper", 15, 400),
       ("Pre-workout", "Fitness", 30, 24),
       ("Coconut Body Lotion", "Beauty", 12, 222),
       ("Chair", "Furniture", 135, 12),
       ("Pillow", "Bedding", 20, 100),
       ("Hershey's", "Candy", 5, 200),
       ("Skirt", "Fashion", 77, 50),
       ("Shirt", "Clothing", 29, 200)
       ;