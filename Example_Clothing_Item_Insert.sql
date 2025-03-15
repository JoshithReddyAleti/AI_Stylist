USE CSC_4710_Project;

-- Example of Inserting a article of clothing into the Clothing_Item Table
-- Note: You can only insert other attributes as well like ImageURL, Description; If Brand is not filled in, then it is default 'Generic'
-- INSERT INTO Clothing_Item (
-- Title,
-- Category, 
-- Color,
-- Brand,
-- Type_Of,
-- TargetGender)
-- VALUES (
-- 'Mens Nike T-Shirt',
-- 'Sports',
-- 'White',
-- 'Nike',
-- 'IsTop',
-- 'M');

SELECT * 
FROM Clothing_Item CI LEFT JOIN IsTop IT ON CI.idClothing_Item = IT.Clothing_Item_idClothing_Item;

-- Example of what happens if you don't follow 
-- the Supported Type of constraint that restricts input value to 
-- TypeOf IN ('IsTop', 'IsBottom', 'IsDress', 'IsCoat', 'IsHeadwear', 'IsFootWear', 'IsOther')
-- under the Type_of field
-- This should fail!

INSERT INTO Clothing_Item (
Title,
Category, 
Color,
Brand,
Type_Of,
TargetGender)
VALUES (
'Mens Nike Pants',
'Sports',
'White',
'Nike',
'IsWhatever', #This IS NOT A SUPPORTED input and WILL NEVER BE!!
'M');