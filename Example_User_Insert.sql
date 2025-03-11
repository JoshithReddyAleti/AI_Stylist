USE CSC_4710_Project;
-- Example of adding a User into DB
-- NOTE: AUTO-INCREMENT IS SET for UserID, so NO need to input value for that field!
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

-- UPDATING User Info
UPDATE User 

SELECT *
FROM User;


-- DELETING FROM User



