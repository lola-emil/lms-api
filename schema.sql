CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    id_number VARCHAR(50),
    
    fname VARCHAR(100) NOT NULL,
    mname VARCHAR(100),
    lname VARCHAR(100) NOT NULL,
    picture VARCHAR(512),

    address VARCHAR(500),
    city VARCHAR(255),

    role_id INT,

    section INT NOT NULL,

    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,

    last_login DATETIME,


    suspended TINYINT(1) DEFAULT 0,
    deleted TINYINT(1) DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (role_id) REFERENCES user_roles(id),
    FOREIGN KEY (section_id) REFERENCES class_sectoins(id)
);


CREATE TABLE user_roles (
    id INT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(255) NOT NULL,
    description TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE user_role_permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_id INT NOT NULL,
    resource VARCHAR(50) NOT NULL,
    permissions JSON NOT NULL, -- Store permissions as a JSON array

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (role_id) REFERENCES user_roles(id)
);


CREATE TABLE class_level (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    level INT,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE class_sections (
    id INT PRIMARY KEY AUTO_INCREMENT,

    level_id INT NOT NULL,    
    section VARCHAR(100) NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (level_id) REFERENCES class_level(id)
);


CREATE TABLE teacher_subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacher_id INT NOT NULL, -- user_id
    subject_id INT NOT NULL,

    FOREIGN KEY (teacher_id) REFERENCES users(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

CREATE TABLE subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,

    title VARCHAR(255) NOT NULL,
    description TEXT,
    level_id INT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (level_id) REFERENCES class_level(id)
);

CREATE TABLE topics (
    id INT PRIMARY KEY AUTO_INCREMENT,

    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    subject_id INT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

CREATE TABLE topic_materials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    type ENUM("lecture", "video-quiz", "quiz"),

    topic_id INT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (topic_id) REFERENCES topics(id)
);

CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    question TEXT,
    type ("multiple-choice", "blanks"),

    material_id INT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (material_id) REFERENCES topic_materials(id)  
);

CREATE TABLE question_choices (
    id INT PRIMARY KEY AUTO_INCREMENT,

    answer VARCHAR(255) NOT NULL,
    is_correct TINYINT(1) DEFAULT 0,
    question_id INT NOT NULL,    
  
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (question_id) REFERENCES questions(id)
);