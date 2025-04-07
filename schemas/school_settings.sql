CREATE TABLE school_profile (
    id INT PRIMARY KEY AUTO_INCREMENT,
    school_name VARCHAR(255) NOT NULL,
    school_address TEXT,
    school_id VARCHAR(100),
    school_logo VARCHAR(255)
);

CREATE TABLE school_years (
    id INT PRIMARY KEY AUTO_INCREMENT,

    year_from INT,
    year_to INT,
    
    is_current BOOLEAN DEFAULT FALSE,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE student_grade_levels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    student_id INT NOT NULL,
    school_year_id INT NOT NULL,

    grade_level_id INT NOT NULL,
    grade_section_id INT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (school_year_id) REFERENCES school_years(id),
    FOREIGN KEY (grade_level_id) REFERENCES grade_levels(id),
    FOREIGN KEY (grade_section_id) REFERENCES grade_sections(id)
);


CREATE TABLE grade_levels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    grade_level INT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE grade_sections (
    id INT PRIMARY KEY AUTO_INCREMENT,

    grade_level_id INT NOT NULL,
    section_name VARCHAR(50) NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (grade_level_id) REFERENCES grade_levels(id)
);