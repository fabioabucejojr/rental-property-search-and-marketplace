CREATE DATABASE kmshradb;

CREATE TABLE users (
  user_id uuid DEFAULT gen_random_uuid(),
  first_name VARCHAR(255) NOT NULL,
  middle_name VARCHAR(255) NULL,
  last_name VARCHAR(255) NOT NULL,
  bdate DATE NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_type VARCHAR(50) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE (user_email)
);

CREATE TABLE unit_renters (
  unit_renters_id  SERIAL NOT NULL,
  unit_id integer NOT NULL,
  user_id uuid NOT NULL,
  check_in_date DATE NOT NULL,
  check_in_time TIME NOT NULL,
  check_out_date DATE NOT NULL,
  check_out_time TIME NOT NULL,
  entry_time TIMESTAMP NOT NULL,
  PRIMARY KEY (unit_renters_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE rental_unit (
  unit_id SERIAL NOT NULL,
  unit_renters_id integer NOT NULL,
  user_id uuid NOT NULL,
  unit_number VARCHAR(100) NOT NULL,
  rental_type VARCHAR(100) NOT NULL,
  amenities VARCHAR(255) NOT NULL,
  PRIMARY KEY (unit_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE transactions (
  transactions_id SERIAL NOT NULL,
  rental_unit_id integer NOT NULL,
  billing_type_id integer NOT NULL,
  payment_id integer NOT NULL,
  due_date DATE NOT NULL,
  amount Numeric(12,2) NOT NULL,
  PRIMARY KEY (transactions_id)
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE billing (
  billing_id SERIAL NOT NULL,
  user_id uuid NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  billing_type VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (billing_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE payments (
  payment_id SERIAL NOT NULL,
  transaction_date DATE NOT NULL,
  transaction_time TIMESTAMP NOT NULL,
  user_id uuid NOT NULL,
  PRIMARY KEY (payment_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE properties (
  prop_id INTEGER NOT NULL, 
  user_id INTEGER NOT NULL,
  property_type varchar(50) NOT NULL,
  location varchar(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  size DECIMAL(10,2) NOT NULL,
  amenities varchar(200) NOT NULL,
  availability BOOLEAN NOT NULL,
  date_listed TIMESTAMP WITH TIME ZONE NOT NULL,
  rooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  flooring varchar(50) NOT NULL,
  images varchar(500) NOT NULL,
  age INTEGER NOT NULL,
  latitude DECIMAL(10,6) NOT NULL,
  longitude DECIMAL(10,6) NOT NULL,
  cookie_data varchar(500) NOT NULL,
  PRIMARY KEY (prop_id),
  CONSTRAINT FK_properties.user_id
    FOREIGN KEY (user_id)
      REFERENCES users(user_id)
);
INSERT INTO users VALUES ('1','Birk","Lanston","3/27/2000", "blanston0@deliciousdays.com", "35UwWfeUMv7","nurse","user");
