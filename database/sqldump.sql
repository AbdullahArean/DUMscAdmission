DROP TABLE Users;
DROP TABLE role;
DROP TABLE Role;
DROP TABLE roles;
DROP TABLE Roles;
DROP TABLE Applications;


alter session set container=orclpdb;
ALTER DATABASE OPEN;
show con_name;


CREATE USER dumscdb IDENTIFIED BY "password";
GRANT ALL PRIVILEGES TO dumscdb;

SELECT * FROM dba_users WHERE username='DUMSCDB';
SELECT * FROM dba_users;

/* TABLES */

CREATE TABLE Roles (
    role_id NUMBER PRIMARY KEY,
    role_name varchar(50) NOT NULL
);

CREATE TABLE Permissions (
    permission_id NUMBER PRIMARY KEY,
    permission_name varchar(50) NOT NULL
);

CREATE TABLE Role_Permissions (
    role_permission_id NUMBER PRIMARY KEY,
    role_id NUMBER REFERENCES Roles(role_id),
    permission_id NUMBER REFERENCES Permissions(permission_id)
);


CREATE TABLE Universities (
    uni_id NUMBER(10) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    uni_name VARCHAR2(200) NOT NULL,
    uni_type VARCHAR2(100),
    uni_website VARCHAR2(200)
);

CREATE TABLE Subjects (
    sub_id NUMBER(10) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    sub_name VARCHAR2(200) NOT NULL
);

CREATE TABLE Undergrad_Type (
    ug_type_id NUMBER(10) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    ug_type_name VARCHAR2(200) NOT NULL
);



CREATE TABLE Users (
    u_id NUMBER(10) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    u_mail varchar2(200) NOT NULL UNIQUE,
    u_password varchar2(200) NOT NULL,
    u_phone varchar2(20),
    u_name varchar2(200),
    role_id NUMBER REFERENCES Roles(role_id),
    dept_id NUMBER(10) REFERENCES Department(dept_id),
    student_nation VARCHAR2(50),
    u_verified NUMBER(1) DEFAULT 0,
    student_profile NUMBER(1) DEFAULT 0,
    u_pic_path varchar2(200),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Department (
    dept_id NUMBER(10) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    dept_name varchar2(200) NOT NULL UNIQUE,
    dept_notice varchar2(2000),
    Fee NUMBER,
    application_start TIMESTAMP,
    application_end TIMESTAMP
);

CREATE TABLE Profile (
    u_id NUMBER(10) REFERENCES Users(u_id) NOT NULL UNIQUE,
    a_name varchar2(200),
    f_name varchar2(200),
    m_name varchar2(200),
    a_picpath varchar2(200),
    a_sigpath varchar2(200),
    a_dob date,
    a_phone varchar2(20),
    a_mail varchar2(200),
    
    ssc_roll VARCHAR2(20),
    ssc_reg VARCHAR2(20),
    ssc_board VARCHAR2(20),
    ssc_year NUMBER(10),
    ssc_transcript_path VARCHAR2(200),
    ssc_result NUMBER(10, 2),
    hsc_roll VARCHAR2(20),
    hsc_reg VARCHAR2(20),
    hsc_board VARCHAR2(20),
    hsc_year NUMBER(10),
    hsc_transcript_path VARCHAR2(200),
    hsc_result NUMBER(10, 2),
    
    ug_institution  NUMBER(10) REFERENCES Universities(uni_id),
    ug_subject NUMBER(10) REFERENCES Subjects(sub_id),
    ug_type VARCHAR2(100),
    ug_cgpa NUMBER(10, 2),
    ug_pass_year NUMBER(10),
    ug_transcript_path VARCHAR2(200),
    
    profile_state NUMBER(1) DEFAULT 0,
    
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE AdditionalProfileInfo (
    u_id NUMBER(10) REFERENCES Users(u_id) NOT NULL UNIQUE,
    edit_permission NUMBER(1) DEFAULT 0
);

CREATE TABLE ApplicantAdmit (
    u_id NUMBER(10) REFERENCES Users(u_id) NOT NULL UNIQUE,
    roll VARCHAR2(200) NOT NULL UNIQUE,
    seat_room NUMBER(10) REFERENCES SeatRoom(room_id) NOT NULL,
    admit_card VARCHAR2(200) NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE SeatRoom (
    room_id NUMBER(10) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    room_center varchar2(200) NOT NULL,
    room_title varchar2(200) NOT NULL,
    room_capacity NUMBER(10) NOT NULL,
    room_filled NUMBER(10) DEFAULT 0
);

/* Seat Room Data --------------------------------------- */
INSERT INTO SeatRoom (room_center, room_title, room_capacity, room_filled) VALUES ('CSE', '405', 40, 0);
INSERT INTO SeatRoom (room_center, room_title, room_capacity, room_filled) VALUES ('CSE', '412', 42, 0);
INSERT INTO SeatRoom (room_center, room_title, room_capacity, room_filled) VALUES ('CSE', '413', 42, 0);
INSERT INTO SeatRoom (room_center, room_title, room_capacity, room_filled) VALUES ('CSE', '420', 40, 0);
/* --------------------------------------- Seat Room Data */



CREATE TABLE PASSWORD_RESET (
    pr_id NUMBER(10) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    pr_code NUMBER(10) NOT NULL,
    pr_email varchar2(200) NOT NULL,
    pr_used NUMBER(1) DEFAULT 0,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


CREATE TABLE Application(
    app_id NUMBER(10) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    dept_id NUMBER REFERENCES Department(dept_id),
    u_id NUMBER REFERENCES Users(u_id),

    app_verified NUMBER(1) DEFAULT 0,
    app_admit NUMBER(1) DEFAULT 0,
    app_payment NUMBER(1) DEFAULT 0,

    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Payment(
    payment_id NUMBER(10) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    trx_id VARCHAR2(200),
    sessionkey varchar2(200),
    app_id REFERENCES Application(app_id),
    amount NUMBER(10, 2),
    status VARCHAR(50) DEFAULT 'Pending',
    details VARCHAR(200),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE VerificationCode (
    otp_id NUMBER(10) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    otp_for_user NUMBER(10) REFERENCES Users(u_id),
    otp_code NUMBER(10) NOT NULL,
    expire_at TIMESTAMP
);

CREATE TABLE NOTICE(
    notice_id NUMBER(10) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    notice_title VARCHAR2(2000),
    notice_body VARCHAR2(2000),
    notice_file_path VARCHAR2(2000),
    created_by NUMBER(10) REFERENCES Users(U_ID),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




/* DATA */

INSERT INTO "SYS"."ROLES" (ROLE_ID, ROLE_NAME) VALUES (1, 'system');
INSERT INTO "SYS"."ROLES" (ROLE_ID, ROLE_NAME) VALUES (2, 'admin');
INSERT INTO "SYS"."ROLES" (ROLE_ID, ROLE_NAME) VALUES (3, 'student');


INSERT INTO "SYS"."PERMISSIONS" (PERMISSION_ID, PERMISSION_NAME) VALUES (1, 'viewApplication');
INSERT INTO "SYS"."PERMISSIONS" (PERMISSION_ID, PERMISSION_NAME) VALUES (2, 'createApplication');
INSERT INTO "SYS"."PERMISSIONS" (PERMISSION_ID, PERMISSION_NAME) VALUES (3, 'updateApplication');
INSERT INTO "SYS"."PERMISSIONS" (PERMISSION_ID, PERMISSION_NAME) VALUES (4, 'deleteApplication');


INSERT INTO "SYS"."ROLE_PERMISSIONS" (ROLE_PERMISSION_ID, ROLE_ID, PERMISSION_ID) VALUES (1, 3, 2);
INSERT INTO "SYS"."ROLE_PERMISSIONS" (ROLE_PERMISSION_ID, ROLE_ID, PERMISSION_ID) VALUES (2, 2, 1);
INSERT INTO "SYS"."ROLE_PERMISSIONS" (ROLE_PERMISSION_ID, ROLE_ID, PERMISSION_ID) VALUES (3, 2, 3);
INSERT INTO "SYS"."ROLE_PERMISSIONS" (ROLE_PERMISSION_ID, ROLE_ID, PERMISSION_ID) VALUES (4, 2, 4);


/* DEPARTMENT */
INSERT INTO Department(dept_name, dept_notice, application_start, application_end) VALUES ('Computer Sciend And Engineering', 'Dhaka University Masters Admission Circular 2023-2024
Program: Computer Science and Engineering (CSE)


Admission Requirements:

Candidates must have a four-year Bachelors degree in Computer Science and Engineering (CSE) or a related field from a recognized university.
Candidates must have a minimum GPA of 3.00 (out of 4.00) or a First Class/Division in their Bachelors degree.
Candidates must pass the admission test with a minimum qualifying score.
Bachelors Degree Requirements:
To be eligible for admission to the CSE Masters program, candidates must have completed a Bachelors degree in one of the following fields:

Computer Science and Engineering
Computer Science
Information Technology
Electrical and Electronic Engineering (EEE) with a major or concentration in Computer Science
Telecommunication Engineering with a major or concentration in Computer Science
Mathematics, Physics or any other relevant field with a strong background in Computer Science and Mathematics.

Application Procedure:
Interested candidates can apply online through the Dhaka University website (www.du.ac.bd) during the application period. The application form must be filled out completely and accurately, and all required documents must be submitted with the application. The application fee can be paid online or in person at the designated bank branches.

Important Dates:
Application Deadline: March 31, 2023
Admission Test: May 14, 2023

For more information and detailed instructions, please refer to the official admission circular on the Dhaka University website.', '30-JAN-2023', '30-MAR-2023');



/* SUBJECTS */



INSERT INTO Subjects (sub_name) VALUES ('Computer Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Computer Science');
INSERT INTO Subjects (sub_name) VALUES ('Computer Science and Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Electrical and Electronics Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Electronic and Telecommunication Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Physics');
INSERT INTO Subjects (sub_name) VALUES ('Mathematics');
INSERT INTO Subjects (sub_name) VALUES ('Chemistry');
INSERT INTO Subjects (sub_name) VALUES ('Statistics');
INSERT INTO Subjects (sub_name) VALUES ('Applied Mathematics');
INSERT INTO Subjects (sub_name) VALUES ('Applied Chemistry and Chemistry');
INSERT INTO Subjects (sub_name) VALUES ('Nuclear engineering');
INSERT INTO Subjects (sub_name) VALUES ('Robotics and Mechanics Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Statistics Institute');
INSERT INTO Subjects (sub_name) VALUES ('Applied statistics');
INSERT INTO Subjects (sub_name) VALUES ('Software engineering');
INSERT INTO Subjects (sub_name) VALUES ('Architecture');
INSERT INTO Subjects (sub_name) VALUES ('Chemical Engineering & Polymer Science');
INSERT INTO Subjects (sub_name) VALUES ('Civil & Environmental Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Civil Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Water Resources Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Food Engineering & Tea Technology');
INSERT INTO Subjects (sub_name) VALUES ('Industrial & Production Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Mechanical Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Petroleum & Mining Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Chemical Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Urban and Regional Planning');
INSERT INTO Subjects (sub_name) VALUES ('Naval Architecture and Marine Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Biomedical Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Materials and Metallurgical Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Building Engineering and Construction Management');
INSERT INTO Subjects (sub_name) VALUES ('Electrical & Computer Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Glass and Ceramic Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Mechatronics Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Materials Science & Engineering');
INSERT INTO Subjects (sub_name) VALUES ('Chemical and Food Process Engineering');


/* Triggres */

CREATE or REPLACE
TRIGGER SYS.Update_User_Timestamp
BEFORE INSERT OR UPDATE ON SYS.Users
FOR EACH ROW
BEGIN
    :new.modified_on := SYSTIMESTAMP;
END;