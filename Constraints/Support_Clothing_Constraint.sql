
SELECT COUNT(*)
INTO @constraint_exists
FROM information_schema.table_constraints
WHERE table_schema = DATABASE()
  AND table_name = 'Clothing_Item'
  AND constraint_name = 'Supported_Clothing_Type';

SET @query = IF(@constraint_exists = 0,
"ALTER TABLE CSC_4710_Project.Clothing_Item
ADD CONSTRAINT Supported_Clothing_Type 
CHECK (Type_Of IN ('IsTop', 'IsBottom', 'IsDress', 'IsCoat', 'IsHeadwear', 'IsFootWear', 'IsOther'))",
'SELECT "Constraint already exists"');


PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- SHOW CREATE TABLE Clothing_Item;
-- SELECT VERSION();
-- Query to show all types of constraints
-- SELECT 
--     CHECK_CLAUSE
-- FROM 
--     INFORMATION_SCHEMA.CHECK_CONSTRAINTS
-- WHERE
-- 	CONSTRAINT_SCHEMA = DATABASE();
-- WHERE 
--     CONSTRAINT_SCHEMA = DATABASE() -- Current database
--     AND TABLE_NAME = 'Clothing_Item';
    
-- USE CSC_4710_Project;

-- DESCRIBE Clothing_Item;