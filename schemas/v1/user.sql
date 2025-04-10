CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,

    last_login DATETIME,

    suspended TINYINT DEFAULT 0,
    deleted TINYINT DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    lrn VARCHAR(20) UNIQUE,
    
    fname VARCHAR(100) NOT NULL,
    mname VARCHAR(100),
    lname VARCHAR(100) NOT NULL,

    address VARCHAR(500),

    FOREIGN KEY (user_id) REFERENCES users(id)
);
