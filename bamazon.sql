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
VALUES ("Laptop", "Electronics", 999, 100), 
       ("Camera", "Electronics", 255, 77),
       ("Tide", "Detergent", 15, 400),
       ("Vega", "Protein", 30, 24),
       ("Cetaphil", "Lotion", 12, 222),
       ("Desk", "Furniture", 135, 12),
       ("Sheet", "Bedding", 20, 100),
       ("Reeses", "Candy", 5, 200),
       ("Sunglasses", "Fashion", 77, 50),
       ("Shirt", "Clothing", 29, 200)
       ;