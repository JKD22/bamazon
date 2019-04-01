DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

drop table if exists products;

CREATE TABLE products (
item_id  INTEGER NOT NULL PRIMARY KEY,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER(11) NOT NULL
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1,'Product 1', 'Department A', 19.99, 20),(2,'Product 2', 'Department A', 64.99, 50),
       (3,'Product 3', 'Department A', 24.99, 50),(4,'Product 4', 'Department A', 59.99, 80),
       (5,'Product 5', 'Department A', 29.99, 20),(6,'Product 6', 'Department A', 54.99, 20),
       (7,'Product 7', 'Department A', 34.99, 50),(8,'Product 8', 'Department A', 49.99, 50),
       (9,'Product 9', 'Department A', 39.99, 80),(10,'Product 10', 'Department A', 44.99, 20);

SELECT * FROM products;