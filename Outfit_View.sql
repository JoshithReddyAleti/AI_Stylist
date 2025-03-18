-- Outfit View
#This view shows all pieces of an outfit to the frontend 


USE CSC_4710_Project;
CREATE VIEW `Outfit_View_No_Accessories` AS
SELECT idOutfit, id_User, 
	CI_Top.Title AS Top_Title, CI_Top.ImageURL AS Top_Image_URL, #Top
    CI_Bottom.Title AS Bottom_Title, CI_Bottom.ImageURL AS Bottom_Image_URL, #Bottom
    CI_Shoes.Title AS Shoes_Title, CI_Shoes.ImageURL AS Shoes_Image_URL, #Shoes
	CI_Hat.Title AS Hat_Title, CI_Hat.ImageURL AS Hat_Image_URL, #Hat
    CI_Coat.Title AS Coat_Title, CI_Coat.ImageURL AS Coat_Image_URL #Coat
FROM Outfit 
LEFT JOIN Clothing_Item AS CI_Top
	ON Top = CI_Top.idClothing_Item 
LEFT JOIN Clothing_Item AS CI_Bottom 
	ON Bottom = CI_Bottom.idClothing_Item
LEFT JOIN Clothing_Item AS CI_Shoes
	ON Shoes = CI_Shoes.idClothing_Item
LEFT JOIN Clothing_Item AS CI_Hat
	ON Hat = CI_Hat.idClothing_Item
LEFT JOIN Clothing_Item AS CI_Coat
	ON Coat = CI_Coat.idClothing_Item;

-- DESCRIBE Outfit;