CREATE TABLE IF NOT EXISTS `students` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `surname` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `other_name` VARCHAR(255),
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `address` TEXT,
    `dob` DATE NOT NULL,
    `gender` ENUM("male", "female", "others") NOT NULL,
    `guardian_name` VARCHAR(255) NOT NULL,
    `guardian_phone` VARCHAR(255) NOT NULL,
    `guardian_email` VARCHAR(255) NOT NULL,
    `guardian_address` TEXT,
    `password` VARCHAR(255) NOT NULL,
    `photo` VARCHAR(255),
    `status` ENUM("active", "inactive") NOT NULL DEFAULT 'inactive',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `instructors` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `other_name` VARCHAR(255),
    `gender` ENUM("male", "female", "others") NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `address` TEXT,
    `phone` VARCHAR(255) NOT NULL,
    `dob` DATE NOT NULL,
    `employment_date` DATE NOT NULL,
    `photo` VARCHAR(255),
    `password` VARCHAR(255) NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'inactive',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `programmes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `tuition` DECIMAL(10, 2) NOT NULL,
    `session` ENUM("morning", "evening") NOT NULL DEFAULT 'morning',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `courses` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `duration` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `student_programmes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `student_id` INT NOT NULL,
    `programme_id` INT NOT NULL,
    FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`programme_id`) REFERENCES `programmes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS `programme_courses` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `programme_id` INT NOT NULL,
    `course_id` INT NOT NULL,
    FOREIGN KEY (`programme_id`) REFERENCES `programmes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `instructor_courses` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `instructor_id` INT NOT NULL,
    `course_id` INT NOT NULL,
    FOREIGN KEY (`instructor_id`) REFERENCES `instructors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `payments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `student_id` INT NOT NULL,
    `programme_id` INT NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `payment_date` DATE NOT NULL,
    `payment_method` ENUM("cash", "bank_transfer", "cheque", "other") NOT NULL,
    FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`programme_id`) REFERENCES `programmes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
