
CREATE TABLE user_roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(255)
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,

    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,

    last_login DATETIME,

    user_role_id INT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_role_id) REFERENCES user_roles(id)
);

CREATE TABLE user_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR(255) NOT NULL,
    mname VARCHAR(255),
    lname VARCHAR(255) NOT NULL,

    home_address TEXT,
    contact_no VARCHAR(50),

    user_id INT NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id)
);
