-- RESTRICTING Seasons 
USE CSC_4710_Project;



-- Fashion_Trend
ALTER TABLE `Fashion_Trend`
MODIFY COLUMN `Season` ENUM('Spring','Summer','Fall', 'Winter'
);