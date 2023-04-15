
/*STARTUP*/
show databases;
create database KeyVaultX;
use keyvaultx;
show tables;


/*USER TABLES ND TRIGGERS*/


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
INSERT INTO users VALUES (new.admin_id, new.admin_name,"ADMIN",new.admin_department,new.admin_email,new.admin_phno); 
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
UPDATE ADMIN SET ADMIN_PASSWORD="Debanjan@123" where Admin_password="Deb@123";
delete from admin where admin_id = 2247214;
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
INSERT INTO users VALUES (new.faculty_id, new.faculty_name,"FACULTY",new.faculty_department,new.faculty_email,new.faculty_phno); 
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
INSERT INTO users VALUES (new.student_id, new.student_name,"STUDENT",new.student_department,new.student_email,new.student_phno);  
END //  

alter table student rename column student_email to email;
alter table student rename column student_password to password;


insert into student values
(
2247242,
'Ashitha Jerry',
'MCA',
'B',
'ashitha.jerry@mca.christuniversity.in',
'ashitha',
9108084539
);

delete from student where student_id=2247214;

alter table student
rename column v_password to student_password; 
select * from student;
select student_email,student_password from student;

CREATE VIEW ProductsWithAttributesView AS
SELECT      
    products.Name as 'Products',
    atr1.Value As 'Number of wheels',
    atr2.Value As 'People',
    atr3.Value As 'Engine'
FROM Products AS products
LEFT JOIN Attributes AS atr1 ON atr1.ProductId = products.Id AND atr1.DefinitionId = 1
LEFT JOIN Attributes AS atr2 ON atr2.ProductId = products.Id AND atr2.DefinitionId = 2
LEFT JOIN Attributes AS atr3 ON atr3.ProductId = products.Id AND atr3.DefinitionId = 3

create view currentuser as
select 
admin.admin_id as "ID",
admin.admin_name as "Name",
admin.admin_email as "Email"
from admin as a
left join admin on admin.admin_id=a.admin_id
right join faculty on faculty.faculty_id=a.admin_id
right join student on student.student_id=a.admin_id;

drop view currentuser;
select * from currentuser;




create table users
(
id int primary key,
Name varchar(255),
user_type varchar(255),
department varchar(255),
email varchar(255),
phno bigint
);
drop table users;



/*CONTACT US*/

create table contactus
(
reg_no int,
name varchar(255),
email varchar(255),
message varchar(255)
);
select * from contactus;
delete * from contactus;

/*REGISTER NEW USERS / ACCNT REQUESTS*/


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

/*KEYS*/


create table allkey
(
id int primary key,
name varchar(255),
department varchar(255),
permission int
);
select * from allkey;
drop table allkey;


/*TRANSACTIONS*/


create table alltransactions
(
id int,
name varchar(255),
key_id int,
status varchar(255)
);
select * from alltransactions;
delete from alltransactions where id = 2247238 and status = "Returned";

create table keystaken
(
reg_no int primary key,
key_id int,
Time_taken varchar(255)
 );
 select * from keystaken;

drop table keystaken;

delimiter //
Create Trigger after_insert_keystaken
AFTER INSERT ON keystaken FOR EACH ROW  
BEGIN  

declare username varchar(255);
SELECT name INTO username FROM users WHERE id=new.reg_no;

if (select reg_no from keystaken where reg_no= new.reg_no) = new.reg_no
then
	INSERT INTO alltransactions VALUES(new.reg_no,username,new.key_id,"Not Returned");
elseif (select reg_no and key_id from keysreturned where reg_no= new.reg_no) = new.reg_no
then
	INSERT INTO alltransactions VALUES(new.reg_no,username, new.key_id,"Returned");
elseif (select reg_no and key_id from keysoverdue where reg_no= new.reg_no) = new.reg_no
then
	INSERT INTO alltransactions VALUES(new.reg_no,username, new.key_id,"Overdue");
end if;

END // 

insert into keystaken values
(
2247234,
13,
current_time()
);


create table keysreturned
(
reg_no int primary key,
key_id int,
Time_taken varchar(255),
duration time,
FOREIGN KEY (reg_no) REFERENCES keystaken(reg_no)
);
drop table keysreturned;

delimiter //
Create Trigger after_insert_keysreturned
AFTER INSERT ON keysreturned FOR EACH ROW  
BEGIN  

declare username varchar(255);
SELECT name INTO username FROM users WHERE id=new.reg_no;

INSERT INTO alltransactions VALUES(new.reg_no,username, new.key_id,"Returned");

END // 

insert into keysreturned values
(
2247234,
13,
current_time,
TIMEDIFF(Current_Time(),
   (Select Time_taken FROM keystaken WHERE reg_no=2247234))
);
Select TIMEDIFF(Current_Time(),
   (Select Time_taken FROM keystaken WHERE reg_no=2247234));

(SELECT CURRENT_TIME()- Time_taken FROM keystaken WHERE reg_no=2247234) as origianl_time;
Select CURRENT_TIME();

desc keysreturned;
delete from keysreturned where reg_no=2247238;
create table keysoverdue
(
reg_no int primary key,
key_id int,
Time_taken varchar(255),
duration time
);

/*RFID PERMISSIONS*/


create table rfidperm
(
id int primary key,
lvl int,
userdate date,
usertime time
);
drop table rfidperm;
select * from rfidperm;

drop table rfidperm;

/*ALERTS*/


create table alerts
(
id int primary key,
name varchar(255),
key_id int,
key_name varchar(255),
transaction_date date,
time_taken time,
duration time,
phno bigint,
message varchar(255)
);

create table vault
(
key_id int primary key not null,
time_taken time,
keys_left_present int,
foreign key (key_id) references allkey(id)
);

