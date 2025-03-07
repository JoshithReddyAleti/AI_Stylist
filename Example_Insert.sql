USE CSC_4710_Project;
-- Example of adding a User into DB
-- NOTE: AUTO-INCREMENT IS SET for UserID, so NO need to input value for that field!
INSERT INTO User (FirstName, LastName, UserName, Password, Gender, Age, StylePerference)
VALUES ('John', 
'Doe',
'jdoe', 
'password123',
'M', 
18, 
'Formal');

SELECT *
FROM User;


