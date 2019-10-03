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
VALUES ("Phones", "Electronics", 1000, 200),
       ("Foundation", "Makeup", 15, 300),
       ("Notepad", "Office Supplies", 5, 100),
       ("Cat food", "Pet", 45, 200),
       ("Pillows", "Home", 20, 500),
       ("Jackets", "Outerwear", 250, 100),
       ("Chairs", "Electronics", 1000, 200),
       ("Almond Milk", "Groceries", 10, 200),
       ("Energy Bar", "Fitness", 10, 250),
       ("Chair", "Furniture", 50, 300),
     ;