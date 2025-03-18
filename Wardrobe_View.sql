-- Wardrobe View

-- 

USE CSC_4710_Project;

CREATE VIEW `Wardrobe_View`
AS
SELECT idUser, Owns_Personal_Wardrobe.idClothing_Item, Title, ImageURL, Category, Color, Brand, Type_Of, Description
FROM Owns_Personal_Wardrobe, Clothing_Item
WHERE Owns_Personal_Wardrobe.idClothing_Item = Clothing_Item.idClothing_Item;