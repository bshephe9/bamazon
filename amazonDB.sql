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
  product VARCHAR(35) NOT NULL,
  -- Makes a string column called "department name" which cannot contain null --
  department VARCHAR(35) NOT NULL,
  -- Makes a numberic column called "price" to represent the cost to the customer 
  price VARCHAR(30),
  -- How much of each item is available in the store -- 
  quantity VARCHAR(30),
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantitiy) 
VALUES ("addidas", "shoes", 60, 75); 

INSERT INTO products (product_name, department_name, price, stock_quantitiy)
VALUES ("iPhone", "technology", 300, 100); 

INSERT INTO products (product_name, department_name, price, stock_quantitiy)
VALUES ("keurig", "household", 100, 75); 

INSERT INTO products (product_name, department_name, price, stock_quantitiy) 
VALUES ("levis", "clothing", 95, 125); 

INSERT INTO products (product_name, department_name, price, stock_quantitiy)
VALUES ("couch", "household", 1000, 10); 

INSERT INTO products (product_name, department_name, price, stock_quantitiy)
VALUES ("curtains", "household", 100, 125); 

INSERT INTO products (product_name, department_name, price, stock_quantitiy) 
VALUES ("supergas", "shoes", 60, 100); 

INSERT INTO products (product_name, department_name, price, stock_quantitiy)
VALUES ("iPad", "technology", 250, 100); 

INSERT INTO products (product_name, department_name, price, stock_quantitiy) 
VALUES ("sweater", "clothing", 35, 125); 

INSERT INTO products (product_name, department_name, price, stock_quantitiy)
VALUES ("blanket", "household", 25, 90); 

INSERT INTO products (product_name, department_name, price, stock_quantitiy) 
VALUES ("tv", "technology", 50, 25); 

INSERT INTO products (product_name, department_name, price, stock_quantitiy) 
VALUES ("jacket", "clothing", 60, 10); 