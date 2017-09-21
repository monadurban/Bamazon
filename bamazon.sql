DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(60) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Osprey Exos 48 Pack', 'Backpacks', 190.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Kelty Trekker 65 Pack', 'Backpacks', 179.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Gregory Jade 28 Pack', 'Backpacks', 140.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Yeti Tundra 65 Cooler', 'Camp Kitchen', 400.00, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Jetboil MiniMo Cooking System', 'Camp Kitchen', 135.00, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('GSI Outdoors Pinnacle Camper Cookset', 'Camp Kitchen', 140.00, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('The North Face Wawona 6 Tent', 'Tents', 399.00, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Marmot Limestone 6P Tent', 'Tents', 489.00, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Big Agnes Big House 6 Deluxe Tent', 'Tents', 400.00, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Caddis Rapid 6 Tent', 'Tents', 270.00, 35);

DELETE FROM products
WHERE item_id = 11;

SELECT * FROM products;