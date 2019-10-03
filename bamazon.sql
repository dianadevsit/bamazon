DROP DATABASE IS EXISTS bamazon;
CREATE DATABASE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(10, 2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (iten_id
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Phones", "Electronics", 1000, 200),
       ("Foundation", "Makeup", 15, 300),
       ("Notepad", "Office Supplies", 5, 100),
       ("Phones", "Electronics", 1000, 200),
       ("Phones", "Electronics", 1000, 200),
       ("Phones", "Electronics", 1000, 200),
       ("Phones", "Electronics", 1000, 200),
       ("Phones", "Electronics", 1000, 200),
       ("Phones", "Electronics", 1000, 200),
       ("Phones", "Electronics", 1000, 200),
     ;