
CREATE TABLE subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,

    title VARCHAR(255) NOT NULL,
    description TEXT,

    class_level_id INT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (class_level_id) REFERENCES class_levels(id)
);

CREATE TABLE subject_lessons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,

    subject_id INT NOT NULL,

    content_type ENUM("lecture", "video", "video-quiz", "quiz") NOT NULL,

    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);


CREATE TABLE questions(
    id INT PRIMARY KEY AUTO_INCREMENT,
    subject_lesson_id INT NOT NULL,
    question_text TEXT NOT NULL,

    FOREIGN KEY (subject_lesson_id) REFERENCES subject_lessons(id)
);

CREATE TABLE answers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT NOT NULL,
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN
);


CREATE TABLE assignments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    subject_id INT NOT NULL,

    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);



--  TODO: grado ug mga submissions
CREATE TABLE assignment_submissions ();
