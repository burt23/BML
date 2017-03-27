DROP DATABASE IF EXISTS bml;

CREATE DATABASE bml;

USE bml;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR (50) NOT NULL,
  password VARCHAR (255) NOT NULL,
  salt VARCHAR (255) NULL,
  token VARCHAR (255) NULL,
  account_key VARCHAR (255) NULL,
  address VARCHAR (255) NULL,
  balance INT NULL
);

CREATE TABLE transactions (
  id INT NOT NULL AUTO_INCREMENT PRIMARY key,
  user_id INT NULL,
  song VARCHAR(200) NOT NULL,
  hash VARCHAR(255) NULL,
  license VARCHAR(255) NULL,
  price INT NOT NULL,
  time TIMESTAMP
);







/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
