CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isActive VARCHAR(1) DEFAULT 'Y',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    isActive VARCHAR(1) DEFAULT 'Y',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample seed data
INSERT INTO employees (name, email, department, role, salary) VALUES
('Anita Rao', 'anita.rao@example.com', 'ENG', 'FE_DEV', 55000.00),
('Vikram Shah', 'vikram.shah@example.com', 'ENG', 'BE_DEV', 60000.00),
('Priya Nair', 'priya.nair@example.com', 'HR', 'HR_EXEC', 50000.00);
