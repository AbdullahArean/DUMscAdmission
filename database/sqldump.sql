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
    u_mail varchar2(200) NOT NULL,
    u_password varchar2(200) NOT NULL,
    u_phone varchar2(20),
    u_name varchar2(200),
    role_id NUMBER REFERENCES Roles(role_id),
    u_verified NUMBER(1) DEFAULT 0,
    u_pic_path varchar2(200),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Applications (
    app_id NUMBER(10) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    u_id NUMBER(10) REFERENCES Users(u_id),
    a_name varchar2(200),
    f_name varchar2(200),
    m_name varchar2(200),
    a_picpath varchar2(200),
    a_sigpath varchar2(200),
    a_dob date,
    a_phone varchar2(20),
    a_mail varchar2(200),
    app_status NUMBER(1) DEFAULT 0,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Hsc_Ssc (
    app_id NUMBER(10) PRIMARY KEY REFERENCES Applications(app_id),
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
    hsc_result NUMBER(10, 2)
);

CREATE TABLE Undergrad (
    app_id NUMBER(10) PRIMARY KEY REFERENCES Applications(app_id),
    ug_institution  NUMBER(10) REFERENCES Universities(uni_id),
    ug_subject NUMBER(10) REFERENCES Subjects(sub_id),
    ug_type VARCHAR2(100),
    ug_cgpa NUMBER(10, 2),
    ug_pass_year NUMBER(10),
    ug_transcript_path VARCHAR2(200)
);

CREATE TABLE Payment(
    payment_id NUMBER(10) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    trx_id VARCHAR2(200),
    app_id REFERENCES Applications(app_id),
    amount NUMBER(10, 2),
    status VARCHAR(50) DEFAULT 'Pending',
    details VARCHAR(200),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


/* Triggres */

CREATE or REPLACE
TRIGGER SYS.Update_User_Timestamp
BEFORE INSERT OR UPDATE ON SYS.Users
FOR EACH ROW
BEGIN
    :new.modified_on := SYSTIMESTAMP;
END;