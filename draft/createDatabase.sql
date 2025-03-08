CREATE TABLE customer (
  customer_name varchar(100) NOT NULL,
  cutomer_id int NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);