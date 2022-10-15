DB info:-
DB: mySql
tables:

// contains all the countries name userd as a dropdown
CREATE TABLE country  ( 
	id     	int(255) AUTO_INCREMENT NOT NULL,
	country	varchar(100) NOT NULL,
	PRIMARY KEY(id) USING BTREE
)

//user table 
CREATE TABLE user  ( 
	id        	int(255) AUTO_INCREMENT NOT NULL,
	name      	varchar(45) NOT NULL,
	email     	varchar(60) NOT NULL,
	DOB       	date NOT NULL,
	photo     	varchar(45) NULL DEFAULT '''NULL''',
	country_id	int(255) NOT NULL,
	isActive  	int(11) NOT NULL DEFAULT '1',
	PRIMARY KEY(id) USING BTREE
)
