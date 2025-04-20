
CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_text TEXT NOT NULL,
    subject_id INT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

CREATE TABLE subject_materials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,

    teacher_subject_id INT NOT NULL,

    subject_topic_id INT NOT NULL,

    file_url TEXT,

    material_type ENUM("lesson", "quiz", "video-quiz"),

    material_order INT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (teacher_subject_id) REFERENCES teacher_subjects(id),
    FOREIGN KEY (subject_topic_id) REFERENCES subject_topics(id)
);

CREATE TABLE quiz_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quiz_id INT NOT NULL,
    question_id INT NOT NULL,

    question_order INT,

    FOREIGN KEY (quiz_id) REFERENCES subject_materials(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE TABLE answers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    answer_text TEXT NOT NULL,
    question_id INT NOT NULL,

    is_correct BOOLEAN DEFAULT 0,


    FOREIGN KEY (question_id) REFERENCES questions(id)
);


CREATE TABLE quiz_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,

    quiz_id INT NOT NULL,
    student_id INT NOT NULL,

    expires_at DATETIME,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

CREATE TABLE student_answers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quiz_session_id INT NOT NULL,
    question_id INT NOT NULL,
    answer_id INT,

    FOREIGN KEY (quiz_session_id) REFERENCES quiz_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (answer_id) REFERENCES answers(id)
);

