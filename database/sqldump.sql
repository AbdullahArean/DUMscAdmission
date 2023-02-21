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
    student_nation VARCHAR2(50),
    u_verified NUMBER(1) DEFAULT 0,
    u_pic_path varchar2(200),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Department (
    dept_id NUMBER(10) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    dept_name varchar2(200) NOT NULL UNIQUE,
    dept_notice varchar2(2000),
    application_start TIMESTAMP,
    application_end TIMESTAMP
);

CREATE TABLE Profile (
    
    u_id NUMBER(10) REFERENCES Users(u_id),
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

/* Triggres */

CREATE or REPLACE
TRIGGER SYS.Update_User_Timestamp
BEFORE INSERT OR UPDATE ON SYS.Users
FOR EACH ROW
BEGIN
    :new.modified_on := SYSTIMESTAMP;
END;