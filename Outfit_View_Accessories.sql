-- View with Outfit and ONLY Accessories
#Creates a view of an outfit's accessories and ONLY it's accessories

CREATE VIEW `Outfit_Accessories_View` AS
SELECT idOutfit, id_User, Title, ImageURL
FROM Outfit
INNER JOIN With_Accessory ON Outfit.idOutfit = With_Accessory.Parent_Outfit_ID
LEFT JOIN Clothing_Item ON Clothing_Item.idClothing_Item = With_Accessory.Accessory;

