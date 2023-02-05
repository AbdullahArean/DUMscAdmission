
CREATE TABLE notice (
  notice_id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) NOT NULL,
  notice_body varchar2(1500),
  notice_file_path varchar2(100),
  notice_date_time timestamp(0)
);


CREATE TABLE users (
  u_id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) NOT NULL,
  u_mail varchar2(50) NOT NULL,
  u_phone varchar2(10),
  username varchar2(15) NOT NULL,
  password varchar2(100) NOT NULL,
  verified NUMBER(1,0) DEFAULT 0,
  role_id number(10) NOT NULL,
  u_picpath varchar2(100)
);

CREATE TABLE application (
  app_id varchar2(15) PRIMARY KEY NOT NULL,
  u_id varchar2(15) NOT NULL,
  name varchar2(100) NOT NULL,
  f_name varchar2(100) NOT NULL,
  m_name varchar2(100) NOT NULL,
  dob date NOT NULL,
  a_picpath varchar2(100) NOT NULL,
  a_sigpath varchar2(100) NOT NULL,
  a_phone varchar2(15) NOT NULL,
  a_mail varchar2(50) NOT NULL
);


CREATE TABLE ssc (
  app_id varchar2(15) PRIMARY KEY NOT NULL,
  ssc_roll varchar2(15) NOT NULL,
  ssc_reg varchar2(15) NOT NULL,
  ssc_type varchar2(50) NOT NULL,
  ssc_board varchar2(100) NOT NULL,
  ssc_year number(4) NOT NULL,
  ssc_transcript_path varchar2(15) NOT NULL,
  ssc_result varchar2(50) NOT NULL
);


CREATE TABLE hsc (
  app_id varchar2(15) NOT NULL,
  hsc_roll varchar2(15) NOT NULL,
  hsc_reg varchar2(15) NOT NULL,
  hsc_type varchar2(50) NOT NULL,
  hsc_board varchar2(100) NOT NULL,
  hsc_year number(4) NOT NULL,
  hsc_transcript_path varchar2(100),
  hsc_result varchar2(50) NOT NULL
);


CREATE TABLE undergraduate (
  app_id varchar2(15) PRIMARY KEY NOT NULL,
  ug_institution varchar2(15) NOT NULL,
  ug_type varchar2(50) NOT NULL,
  ug_cgpa varchar2(100) NOT NULL,
  ug_pass_year number(4) NOT NULL,
  ug_transcript_path varchar2(100),
  ssc_result varchar2(50) NOT NULL
);


CREATE TABLE role (
  role_id number(10) PRIMARY KEY NOT NULL,
  role_name varchar2(15) NOT NULL
);

CREATE TABLE permission (
  permission_id number(10) PRIMARY KEY NOT NULL,
  permission_name varchar2(15) NOT NULL
);

CREATE TABLE role_permission (
  role_permission_id number(10) PRIMARY KEY NOT NULL,
  role_id number(10) NOT NULL,
  permission_id number(10) NOT NULL
);




ALTER TABLE application ADD FOREIGN KEY (u_id) REFERENCES user (u_id);

ALTER TABLE ssc ADD FOREIGN KEY (app_id) REFERENCES application (app_id);

ALTER TABLE hsc ADD FOREIGN KEY (app_id) REFERENCES application (app_id);

ALTER TABLE undergraduate ADD FOREIGN KEY (app_id) REFERENCES application (app_id);

ALTER TABLE user ADD FOREIGN KEY (role_id) REFERENCES role (role_id);

ALTER TABLE role_permission ADD FOREIGN KEY (role_id) REFERENCES role (role_id);

ALTER TABLE role_permission ADD FOREIGN KEY (permission_id) REFERENCES permission (permission_id);

INSERT INTO "SYS"."ROLE" (ROLE_ID, ROLE_NAME) VALUES ('1', 'system')
INSERT INTO "SYS"."ROLE" (ROLE_ID, ROLE_NAME) VALUES ('2', 'admin')
INSERT INTO "SYS"."ROLE" (ROLE_ID, ROLE_NAME) VALUES ('3', 'student')


INSERT INTO "SYS"."PERMISSION" (PERMISSION_ID, PERMISSION_NAME) VALUES ('1', 'viewApplication');
INSERT INTO "SYS"."PERMISSION" (PERMISSION_ID, PERMISSION_NAME) VALUES ('2', 'createApplication');
INSERT INTO "SYS"."PERMISSION" (PERMISSION_ID, PERMISSION_NAME) VALUES ('3', 'updateApplication');
INSERT INTO "SYS"."PERMISSION" (PERMISSION_ID, PERMISSION_NAME) VALUES ('4', 'deleteApplication');


INSERT INTO "SYS"."ROLE_PERMISSION" (ROLE_PERMISSION_ID, ROLE_ID, PERMISSION_ID) VALUES ('1', '3', '2')
INSERT INTO "SYS"."ROLE_PERMISSION" (ROLE_PERMISSION_ID, ROLE_ID, PERMISSION_ID) VALUES ('2', '2', '1')
INSERT INTO "SYS"."ROLE_PERMISSION" (ROLE_PERMISSION_ID, ROLE_ID, PERMISSION_ID) VALUES ('3', '2', '3')
INSERT INTO "SYS"."ROLE_PERMISSION" (ROLE_PERMISSION_ID, ROLE_ID, PERMISSION_ID) VALUES ('4', '2', '4')

