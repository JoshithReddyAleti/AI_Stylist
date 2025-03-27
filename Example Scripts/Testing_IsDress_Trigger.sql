-- Testing Dress Trigger

#General Outfit Table Insert
-- INSERT INTO Clothing_Item (Title, Category, Color, Type_Of)
-- VALUES (
-- "Womens Dress", "Formal","Black", "IsDress");

SELECT *
FROM Clothing_Item;

#Subclass Insert
-- INSERT INTO IsDress (idClothing_Item, Formality) VALUES ( 4,'Business'
-- );



SELECT *
FROM Clothing_Item 
WHERE TargetGender = 'F';