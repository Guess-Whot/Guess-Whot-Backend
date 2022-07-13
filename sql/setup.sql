-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS characters cascade;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL
);

CREATE TABLE characters (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    image VARCHAR
)

Insert Into characters (name, image) Values
('Leela','')
('Bender','')
('Fry','')
('Zoidberg','')
('Professor Farnsworth','')
('Zapp Brannigan','')
('Kif Kroker','')
('Hermes Conrad','')
('Nibbler','')
('Mom','')
('The Robot Devil','')
('Morbo','')
('Scruffy','')
('Amy ','')
('Calculon','')
('Linda','')
('Richard Nixon','')
('Roberto','')
('Abner Doubledeal','')
('Hyper-Chicken','')
('Elzar','')
('Hypnotoad','')
('Officer Smitty','')
('Officer URL','')
('Tinny Tim','')