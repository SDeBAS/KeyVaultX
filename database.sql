show databases;
create database KeyVaultX;
use keyvaultx;

show tables;
#TABLE CREATIONS 

drop table all_keys;

create table admin
(
admin_id int primary key,
admin_name varchar(255),
admin_department varchar(255),
admin_position varchar(255),
admin_email varchar(255),
admin_password varchar(255),
admin_phno bigint
);

drop table admin;

delimiter //
Create Trigger after_insert_admin  
AFTER INSERT ON admin FOR EACH ROW  
BEGIN  
INSERT INTO rfidperm VALUES (new.admin_id, 3,CURDATE(), CURTIME());  
END //  

alter table admin rename column admin_email to email;
alter table admin rename column admin_password to password;
insert into admin values
(
2247214,
'Debanjan Basu',
'MCA',
'Developer',
'debanjan.basu@mca.christuniversity.in',
'debanjan',
9830729259
);


select * from admin;
select admin_email,admin_password from admin;

create table faculty
(
faculty_id int primary key,
faculty_name varchar(255),
faculty_department varchar(255),
faculty_position varchar(255),
faculty_email varchar(255),
faculty_password varchar(255),
faculty_phno bigint
);

drop table faculty;

delimiter //
Create Trigger after_insert_faculty
AFTER INSERT ON faculty FOR EACH ROW  
BEGIN  
INSERT INTO rfidperm VALUES (new.faculty_id, 2,CURDATE(), CURTIME());  
END //  

alter table faculty rename column faculty_email to email;
alter table faculty rename column faculty_password to password;

insert into faculty values
(
2247238,
'Yogisha K',
'Computer Science',
'Teaching',
'yogisha.k@mca.christuniversity.in',
'yogisha',
9830729259
);
delete from faculty where faculty_id=635;
select * from faculty;
select student_email,student_password from student;

create table student
(
student_id int primary key,
student_name varchar(255),
student_department varchar(255),
student_section varchar(255),
student_email varchar(255),
v_password varchar(255),
student_phno bigint
);
drop table student;

delimiter //
Create Trigger after_insert_student
AFTER INSERT ON student FOR EACH ROW  
BEGIN  
INSERT INTO rfidperm VALUES (new.student_id, 1,CURDATE(), CURTIME());  
END //  

alter table student rename column student_email to email;
alter table student rename column student_password to password;


insert into student values
(
2247128,
'Sagnik Mukhopadhyay',
'MCA',
'A',
'sagnik.mukhopadhyay@mca.christuniversity.in',
'sagnik',
9830729259
);
delete from student where student_id=2247214;

alter table student
rename column v_password to student_password; 
select * from student;
select student_email,student_password from student;


create table contactus
(
reg_no int,
name varchar(255),
email varchar(255),
message varchar(255)
);
select * from contactus;
delete * from contactus;

create table request
(
id int primary key,
user_type varchar(255),
name varchar(255),
department varchar(255),
section varchar(255),
email varchar(255),
password varchar(255),
phno bigint
);
select * from request;

alter table request rename column section to position;

drop table request;


create table allkey
(
id int primary key,
name varchar(255),
department varchar(255),
position int
);

create table rfidperm
(
id int,
lvl int,
userdate date,
usertime time
);
drop table rfidperm;
select * from rfidperm;