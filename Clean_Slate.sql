-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Get all table names and create DROP TABLE statements
SET @schema = 'CSC_4710_Project';
SET @tables = NULL;

-- Get all tables in the schema
SELECT GROUP_CONCAT('`', table_name, '`') 
INTO @tables 
FROM information_schema.tables 
WHERE table_schema = @schema;

-- Prepare the dynamic SQL statement to drop all tables
SET @drop_tables = CONCAT('DROP TABLE IF EXISTS ', @tables);

-- Execute the statement if tables exist
PREPARE stmt FROM @drop_tables;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;