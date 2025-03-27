-- RESTRICTING Gender Fields
USE CSC_4710_Project;

-- User Table
ALTER TABLE `User`
MODIFY COLUMN `Gender` ENUM('M', 'F'
);

-- Clothing_Item
ALTER TABLE `Clothing_Item`
MODIFY COLUMN `TargetGender` ENUM('M', 'F'
);
