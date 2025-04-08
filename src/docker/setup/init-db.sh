
#!/bin/sh

# Start MariaDB
/usr/bin/mysqld_safe &

# Wait for MariaDB to start
sleep 5

# Create the database and tables
mysql -u root << EOF
CREATE DATABASE IF NOT EXISTS sqli_lab;
USE sqli_lab;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL
);

-- Insert sample users
INSERT INTO users (username, password, email, role) VALUES 
  ('admin', 'admin123', 'admin@example.com', 'admin'),
  ('user1', 'password1', 'user1@example.com', 'user'),
  ('user2', 'password2', 'user2@example.com', 'user'),
  ('user3', 'password3', 'user3@example.com', 'user'),
  ('user4', 'password4', 'user4@example.com', 'user');

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL
);

-- Insert sample products
INSERT INTO products (name, description, price, category) VALUES 
  ('Laptop', 'High-performance laptop', 999.99, 'electronics'),
  ('Smartphone', 'Latest smartphone model', 699.99, 'electronics'),
  ('Headphones', 'Noise-cancelling headphones', 199.99, 'electronics'),
  ('Desk', 'Modern office desk', 249.99, 'furniture'),
  ('Chair', 'Ergonomic office chair', 149.99, 'furniture'),
  ('T-shirt', 'Cotton t-shirt', 19.99, 'clothing'),
  ('Jeans', 'Denim jeans', 39.99, 'clothing'),
  ('Novel', 'Bestselling fiction novel', 14.99, 'books'),
  ('Cookbook', 'Gourmet recipes', 24.99, 'books');

EOF

# Keep the container running
tail -f /dev/null
