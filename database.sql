/* JUST COPY PASTE IN MYSQL BENCH*/

/*DATABASE CREATION*/
show databases;
create database KeyVaultX;
use keyvaultx;

show tables;

/*MAIN TABLE CREATION*/

create table admin
(
admin_id int primary key,
admin_name varchar(255),
admin_department varchar(255),
admin_position varchar(255),
email varchar(255),
password varchar(255),
admin_phno bigint
);

create table faculty
(
faculty_id int primary key,
faculty_name varchar(255),
faculty_department varchar(255),
faculty_position varchar(255),
email varchar(255),
password varchar(255),
faculty_phno bigint
);

create table student
(
student_id int primary key,
student_name varchar(255),
student_department varchar(255),
student_section varchar(255),
email varchar(255),
password varchar(255),
student_phno bigint
);

create table contactus
(
reg_no int,
name varchar(255),
email varchar(255),
message varchar(255)
);

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


create table allkey
(
id int primary key,
name varchar(255),
department varchar(255),
position int
);



/*MAIN TABLE VALUE INSERTION*/

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

insert into student values
(
2247242,
'Ashitha Jerry',
'MCA',
'B',
'ashitha.jerry@mca.christuniversity.in',
'ashitha',
9830729259
);