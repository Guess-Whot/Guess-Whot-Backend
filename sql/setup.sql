-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS characters cascade;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR NOT NULL,
  password_hash VARCHAR NOT NULL
);

CREATE TABLE characters (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    url VARCHAR
);

Insert Into characters (name, url) Values
('Leela','https://i.imgur.com/rgLAr87.jpg'),
('Bender','https://i.imgur.com/XU4Njll.jpg'),
('Fry','https://i.imgur.com/dHaY0Zv.jpg'),
('Zoidberg','https://i.imgur.com/rSemi6o.jpg'),
('Professor Farnsworth','https://i.imgur.com/HnjUv6G.jpg'),
('Zapp Brannigan','https://i.imgur.com/DKBr8Js.jpg'),
('Kif Kroker','https://i.imgur.com/pYScOm0.jpg'),
('Hermes Conrad','https://i.imgur.com/H5BPk9w.jpg'),
('Nibbler','https://i.imgur.com/jvS1uJU.jpg'),
('Mom','https://i.imgur.com/KcQWT7f.jpg'),
('The Robot Devil','https://i.imgur.com/8fhVJjC.jpg'),
('Morbo','https://i.imgur.com/qoqmeh9.jpg'),
('Scruffy','https://i.imgur.com/zEDu2fT.jpg'),
('Amy','https://i.imgur.com/chse2TX.jpg'),
('Calculon','https://i.imgur.com/Q9wcrkr.jpg'),
('Linda','https://i.imgur.com/zG6B3TS.jpg'),
('Roberto','https://i.imgur.com/mfDj2xy.jpg'),
('Hyper-Chicken','https://i.imgur.com/Smctl7c.jpg'),
('Hypnotoad','https://i.imgur.com/SixpHUR.gifv'),
('Seymour','https://i.imgur.com/YfwBNF6.jpg'),
('Ndnd','https://i.imgur.com/6mEUDzR.jpg'),
('Lurrr','https://i.imgur.com/zy7eJd6.jpg'),
('Robot Santa','https://i.imgur.com/U8VpF15.jpg'),
('Tinny Tim','https://i.imgur.com/tY0r9hV.jpg');