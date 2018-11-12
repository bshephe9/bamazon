-- Drop the database if it already exists -- 
DROP DATABASE IF EXISTS bamazon_db;

-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within amazon_db --
CREATE TABLE products ( 
-- Creates a numeric column called "id" which will automatically increment its default value as new items are added --
  id INTEGER NOT NULL AUTO_INCREMENT,
  -- Makes a string column called "product name" which cannot contain null --
  product_name VARCHAR(35) NOT NULL,
  -- Makes a string column called "department name" which cannot contain null --
  department_name VARCHAR(35) NOT NULL,
  -- Makes a numberic column called "price" to represent the cost to the customer 
  price VARCHAR(30),
  -- How much of each item is available in the store -- 
  quantity VARCHAR(30),
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (id)
);

-- What was inserted to terminal to create product rows --
INSERT INTO products (product_name, department_name, price, quantity) 
VALUES ("addidas", "shoes", 60, 75); 

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("iPhone", "technology", 300, 100); 

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("keurig", "household", 100, 75); 

INSERT INTO products (product_name, department_name, price, quantity) 
VALUES ("levis", "clothing", 95, 125); 

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("couch", "household", 1000, 10); 

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("curtains", "household", 100, 125); 

INSERT INTO products (product_name, department_name, price, quantity) 
VALUES ("supergas", "shoes", 60, 100); 

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("iPad", "technology", 250, 100); 

INSERT INTO products (product_name, department_name, price, quantity) 
VALUES ("sweater", "clothing", 35, 125); 

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("blanket", "household", 25, 90); 

INSERT INTO products (product_name, department_name, price, quantity) 
VALUES ("tv", "technology", 50, 25); 

INSERT INTO products (product_name, department_name, price, quantity) 
VALUES ("jacket", "clothing", 60, 10);