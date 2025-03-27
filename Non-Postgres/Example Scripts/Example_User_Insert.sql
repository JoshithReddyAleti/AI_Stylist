USE CSC_4710_Project;



#WARNING, READ THIS!!!: THIS SECTION WILL DELETE ALL PREEXISTING USERS IN THE USER TABLE!!!
-- DELETE From User; #Simply clears ALL existing users
-- ALTER TABLE User AUTO_INCREMENT = 1; #Resets the auto-increment to one for the PK

-- Example of adding a User into DB
-- NOTE: AUTO-INCREMENT IS SET for idUser, so NO need to input value for that field!
-- Follow schema for limitations on what datatypes and sizes are allowed for User CRUD ops


INSERT INTO User (
FirstName, 
LastName, 
UserName, 
Password, 
Gender, 
Age, 
StylePerference)

VALUES ('John', 
'Doe',
'jdoe', 
'password123',
'M', 
18, 
'Formal');

SELECT *
FROM User;

-- UPDATING User Info by idUser
UPDATE User
SET StylePerference = 'Minimalist'
WHERE idUser = 1; #Should John Doe assuming they are the firstUser

SELECT *
FROM User;


-- DELETING FROM User based off idUser
DELETE FROM User
WHERE idUser = 1;

SELECT *
FROM User;


