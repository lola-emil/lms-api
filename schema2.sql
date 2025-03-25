CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    

    role_id INT,


    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,

    last_login DATETIME,

    suspended TINYINT(1) DEFAULT 0,
    deleted TINYINT(1) DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (role_id) REFERENCES user_roles(id)
);

CREATE TABLE user_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL, -- OWNER ID

    id_number VARCHAR(50),

    fname VARCHAR(100) NOT NULL,
    mname VARCHAR(100),
    lname VARCHAR(100) NOT NULL,
    picture VARCHAR(512),

    address VARCHAR(500),
    city VARCHAR(255),


    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE student_infos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,

    student_number VARCHAR(20) UNIQUE NOT NULL,

    lrn VARCHAR(20) UNIQUE NOT NULL,

    section_id INT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (section_id) REFERENCES grade_level_sections(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
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


CREATE TABLE school_years (
    id INT PRIMARY KEY AUTO_INCREMENT,

    year_from INT,
    year_to INT,

    is_current TINYINT(1) DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE grade_levels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    grade_level INT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE grade_level_sections (
    id INT PRIMARY KEY AUTO_INCREMENT,

    grade_level_id INT NOT NULL,
    section_name VARCHAR(50) NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (grade_level_id) REFERENCES grade_levels(id)
);

-- student level history
CREATE TABLE student_levels (
    id INT PRIMARY KEY AUTO_INCREMENT,

    grade_level_id INT NOT NULL,
    user_id INT NOT NULL, -- user id ni siya
    school_year_id INT NOT NULL,

    FOREIGN KEY (grade_level_id) REFERENCES grade_levels(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (school_year_id) REFERENCES school_years(id)
);


CREATE TABLE subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,

    title VARCHAR(255) NOT NULL,
    description TEXT,

    grade_level_id INT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (grade_level_id) REFERENCES grade_levels(id)
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
    topic_id INT NOT NULL,

    material_type ENUM("document", "lecture", "video", "video-quiz", "quiz") NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (topic_id) REFERENCES topics(id)
);

CREATE TABlE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,

    material_id INT NOT NULL,
    question_text TEXT NOT NULL,
    
    FOREIGN KEY (material_id) REFERENCES topic_materials(id)

);

CREATE TABLE question_answers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT NOT NULL,

    answer VARCHAR(255) NOT NULL,

    is_correct TINYINT(1) DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- For the activities given by the teacher
-- e.g. Assignments, or other activities
CREATE TABLE activities (
    id INT PRIMARY KEY AUTO_INCREMENT,

    title VARCHAR(255) NOT NULL,
    description TEXT,

    teacher_subject_id INT NOT NULL,
    created_by INT NOT NULL, -- teacher's user id

    deadline DATETIME NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (teacher_subject_id) REFERENCES teacher_subjects(id)
    
);

CREATE TABLE student_activity_submissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    activity_id INT NOT NULL,

    description TEXT,

    file VARCHAR(555), -- file uri attached

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (activity_id) REFERENCES activities (id)
);

CREATE TABLE student_submission_results (
    id INT PRIMARY KEY AUTO_INCREMENT,

    submission_id INT NOT NULL,

    grade DECIMAL(11,2) NOT NULL,

    feedback TEXT,

    created_by INT NOT NULL, -- teacher's user id

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (submission_id) REFERENCES student_activity_submissions(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);


CREATE TABLE student_answers (
    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,
    question_id INT NOT NULL,
    answer_id INT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (answer_id) REFERENCES question_answers(id)
);


CREATE TABLE teacher_subjects(
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    subject_id INT NOT NULL,
    user_id INT NOT NULL,
    section_id INT NOT NULL,
    school_year_id INT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (subject_id) REFERENCES subjects(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (section_id) REFERENCES grade_level_sections(id),
    FOREIGN KEY (school_year_id) REFERENCES school_years(id)
);


CREATE TABLE forums (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,

    created_by INT NOT NULL, -- user id nanaman

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (created_by) REFERENCES users(id) 
);

CREATE TABLE forum_comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    forum_id INT NOT NULL,
    user_id INT NOT NULL,

    comment_text TEXT NOT NULL,

    parent_comment_id INT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (forum_id) REFERENCES forums(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (parent_comment_id) REFERENCES forum_comments(id) ON DELETE CASCADE
);
