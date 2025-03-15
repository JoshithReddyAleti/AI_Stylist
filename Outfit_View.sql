-- Outfit View

USE CSC_4710_Project;

SELECT *
FROM Outfit LEFT JOIN Clothing_Item AS CI_Top
ON Top = CI_Top.idClothing_Item 
LEFT JOIN Clothing_Item AS CI_Bottom ON Bottom = CI_Bottom.idClothing_Item
WHERE Top IS NOT NULL;