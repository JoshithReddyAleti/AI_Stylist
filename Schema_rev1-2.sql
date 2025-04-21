-- PostgreSQL Schema for CSC_4710_Project
-- Converted from MySQL

-- -----------------------------------------------------
-- Schema CSC_4710_Project
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS "CSC_4710_Project";

-- Switch to the schema
SET search_path TO "CSC_4710_Project";

-- -----------------------------------------------------
-- Table "User"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "User" (
  "idUser" SERIAL PRIMARY KEY,
  "FirstName" VARCHAR(45) NOT NULL,
  "LastName" VARCHAR(45) NOT NULL,
  "UserName" VARCHAR(45) NOT NULL,
  "Email" VARCHAR(100) NOT NULL UNIQUE,
  "Password" VARCHAR(255) NOT NULL,
  "Gender" CHAR(1) NOT NULL,
  "Age" INT NOT NULL,
  "StylePerference" VARCHAR(15) NOT NULL,
  "Body_Type" VARCHAR(15) NULL,
  "Location" TEXT NULL
);

COMMENT ON COLUMN "User"."Age" IS 'Char Set M-Male F-Female';

-- -----------------------------------------------------
-- Table "Clothing_Item"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "Clothing_Item" (
  "idClothing_Item" SERIAL PRIMARY KEY,
  "Title" VARCHAR(45) NOT NULL,
  "ImageURL" TEXT NULL,
  "Category" VARCHAR(45) NULL,
  "Color" VARCHAR(15) NOT NULL,
  "Brand" VARCHAR(45) NOT NULL DEFAULT 'Generic',
  "Type_Of" VARCHAR(30) NOT NULL,
  "Description" TEXT NULL,
  "TargetGender" CHAR(1) NULL
);

COMMENT ON COLUMN "Clothing_Item"."ImageURL" IS 'Probably can change Datatype to BLOB to allow for direct insertion of image or can leave as TEXT to access thru set directory or file location';
COMMENT ON COLUMN "Clothing_Item"."Brand" IS 'Also can share same data as Fashion_Trend.Designer_name';
COMMENT ON COLUMN "Clothing_Item"."Type_Of" IS 'Specifies what part of the body it covers';

-- -----------------------------------------------------
-- Table "Event"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "Event" (
  "idEvent" SERIAL PRIMARY KEY,
  "Location" TEXT NULL,
  "Date" TIMESTAMP NOT NULL,
  "Description" TEXT NULL,
  "Dresscode" VARCHAR(45) NULL
);

-- -----------------------------------------------------
-- Table "Fashion_Trend"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "Fashion_Trend" (
  "idFashion_Trend" SERIAL PRIMARY KEY,
  "Source_URL" TEXT NOT NULL,
  "Season" VARCHAR(10) NULL,
  "Style_Primary" VARCHAR(45) NOT NULL,
  "Style_Secondary" VARCHAR(45) NULL,
  "Style_Tertiary" VARCHAR(45) NULL,
  "Designer_Name_Primary" VARCHAR(45) NOT NULL DEFAULT 'Generic',
  "Designer_Name_Secondary" VARCHAR(45) NULL,
  "Designer_Name_Tertiary" VARCHAR(45) NULL,
  "Color_Primary" VARCHAR(45) NOT NULL DEFAULT 'Generic',
  "Color_Secondary" VARCHAR(45) NULL,
  "Color_Tertiary" VARCHAR(45) NULL
);

-- -----------------------------------------------------
-- Table "Owns_Personal_Wardrobe"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "Owns_Personal_Wardrobe" (
  "idUser" INT NOT NULL,
  "idClothing_Item" INT NOT NULL,
  PRIMARY KEY ("idUser", "idClothing_Item"),
  CONSTRAINT "fk_User_has_Clothing_Item_User"
    FOREIGN KEY ("idUser")
    REFERENCES "User" ("idUser")
    ON DELETE CASCADE,
  CONSTRAINT "fk_User_has_Clothing_Item_Clothing_Item1"
    FOREIGN KEY ("idClothing_Item")
    REFERENCES "Clothing_Item" ("idClothing_Item")
);

CREATE INDEX "fk_User_has_Clothing_Item_Clothing_Item1_idx" ON "Owns_Personal_Wardrobe" ("idClothing_Item");

COMMENT ON COLUMN "Owns_Personal_Wardrobe"."idUser" IS 'Note: Decided to have a many-to-many Identifying relationship to better illustrate a digital wardrobe';

-- -----------------------------------------------------
-- Table "Scheduled"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "Scheduled" (
  "idUser" INT NOT NULL,
  "idEvent" INT NOT NULL,
  PRIMARY KEY ("idUser", "idEvent"),
  CONSTRAINT "fk_User_has_Event_User1"
    FOREIGN KEY ("idUser")
    REFERENCES "User" ("idUser")
    ON DELETE CASCADE,
  CONSTRAINT "fk_User_has_Event_Event1"
    FOREIGN KEY ("idEvent")
    REFERENCES "Event" ("idEvent")
);

CREATE INDEX "fk_User_has_Event_Event1_idx" ON "Scheduled" ("idEvent");

-- -----------------------------------------------------
-- Table "Weather_Conditions"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "Weather_Conditions" (
  "idWeather_Conditions" SERIAL PRIMARY KEY,
  "Humidty" DECIMAL(2,1) NOT NULL,
  "Date" DATE NOT NULL,
  "Temperature_High" SMALLINT NOT NULL,
  "Temperature_Low" SMALLINT NOT NULL,
  "Location" TEXT NOT NULL,
  "Preciptation" SMALLINT NULL
);

COMMENT ON COLUMN "Weather_Conditions"."Temperature_High" IS 'Highest Temp of that day';
COMMENT ON COLUMN "Weather_Conditions"."Temperature_Low" IS 'Lowest Temp of that Day';

-- -----------------------------------------------------
-- Table "Outfit"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "Outfit" (
  "idOutfit" SERIAL PRIMARY KEY,
  "id_User" INT NULL,
  "Top" INT NULL,
  "Bottom" INT NULL,
  "Shoes" INT NULL,
  "Hat" INT NULL,
  "Coat" INT NULL,
  "Description" TEXT NULL,
  "Style" VARCHAR(45) NULL,
  CONSTRAINT "fk_Outfit_User1"
    FOREIGN KEY ("id_User")
    REFERENCES "User" ("idUser")
    ON DELETE CASCADE,
  CONSTRAINT "fk_Top"
    FOREIGN KEY ("Top")
    REFERENCES "Clothing_Item" ("idClothing_Item"),
  CONSTRAINT "fk_Bottom"
    FOREIGN KEY ("Bottom")
    REFERENCES "Clothing_Item" ("idClothing_Item"),
  CONSTRAINT "fk_Shoes"
    FOREIGN KEY ("Shoes")
    REFERENCES "Clothing_Item" ("idClothing_Item"),
  CONSTRAINT "fk_Coat"
    FOREIGN KEY ("Coat")
    REFERENCES "Clothing_Item" ("idClothing_Item"),
  CONSTRAINT "fk_Hat"
    FOREIGN KEY ("Hat")
    REFERENCES "Clothing_Item" ("idClothing_Item")
);

CREATE INDEX "fk_Outfit_User1_idx" ON "Outfit" ("id_User");
CREATE INDEX "fk_Top_idx" ON "Outfit" ("Top");
CREATE INDEX "fk_Bottom_idx" ON "Outfit" ("Bottom");
CREATE INDEX "fk_Shoes_idx" ON "Outfit" ("Shoes");
CREATE INDEX "fk_Coat_idx" ON "Outfit" ("Coat");
CREATE INDEX "fk_Hat_idx" ON "Outfit" ("Hat");

COMMENT ON COLUMN "Outfit"."id_User" IS 'Default is NULL for temporary unassignment at run time';
COMMENT ON COLUMN "Outfit"."Style" IS 'Will be used to match best user';

-- -----------------------------------------------------
-- Table "Favorited_Outfits"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "Favorited_Outfits" (
  "idOutfit" INT NOT NULL,
  "idUser" INT NOT NULL,
  PRIMARY KEY ("idOutfit", "idUser"),
  CONSTRAINT "fk_Outfit_has_User_Outfit1"
    FOREIGN KEY ("idOutfit")
    REFERENCES "Outfit" ("idOutfit"),
  CONSTRAINT "fk_Outfit_has_User_User1"
    FOREIGN KEY ("idUser")
    REFERENCES "User" ("idUser")
    ON DELETE CASCADE
);

CREATE INDEX "fk_Outfit_has_User_User1_idx" ON "Favorited_Outfits" ("idUser");

-- -----------------------------------------------------
-- Table "IsTop"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "IsTop" (
  "idClothing_Item" INT PRIMARY KEY,
  "SleeveType" CHAR(15) DEFAULT 'Regular',
  CONSTRAINT "fk_IsShirt_Clothing_Item1"
    FOREIGN KEY ("idClothing_Item")
    REFERENCES "Clothing_Item" ("idClothing_Item")
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table "IsBottom"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "IsBottom" (
  "idClothing_Item" INT PRIMARY KEY,
  "LengthCoverage" VARCHAR(15) NULL,
  "Fit" VARCHAR(15) NULL,
  CONSTRAINT "fk_IsBottom_Clothing_Item1"
    FOREIGN KEY ("idClothing_Item")
    REFERENCES "Clothing_Item" ("idClothing_Item")
    ON UPDATE CASCADE
);

COMMENT ON COLUMN "IsBottom"."Fit" IS 'Refers to tightness to body; ie. Slim jeans, tights, baggy';

-- -----------------------------------------------------
-- Table "IsFootWear"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "IsFootWear" (
  "idClothing_Item" INT PRIMARY KEY,
  "WalkingType" VARCHAR(15) DEFAULT 'Walking',
  CONSTRAINT "fk_IsFootWear_Clothing_Item1"
    FOREIGN KEY ("idClothing_Item")
    REFERENCES "Clothing_Item" ("idClothing_Item")
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table "IsCoat"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "IsCoat" (
  "idClothing_Item" INT PRIMARY KEY,
  "IsWaterResistant" SMALLINT DEFAULT 0,
  "Heaviness" CHAR(10) NULL,
  CONSTRAINT "fk_IsCoat_Clothing_Item1"
    FOREIGN KEY ("idClothing_Item")
    REFERENCES "Clothing_Item" ("idClothing_Item")
    ON UPDATE CASCADE
);

COMMENT ON COLUMN "IsCoat"."Heaviness" IS 'Referring to how much warm/protection from elements';

-- -----------------------------------------------------
-- Table "IsDress"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "IsDress" (
  "idClothing_Item" INT PRIMARY KEY,
  "Formality" VARCHAR(15) NULL,
  CONSTRAINT "fk_IsDress_Clothing_Item1"
    FOREIGN KEY ("idClothing_Item")
    REFERENCES "Clothing_Item" ("idClothing_Item")
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table "IsHeadwear"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "IsHeadwear" (
  "idClothing_Item" INT PRIMARY KEY,
  "Heaviness" CHAR(10) NULL,
  CONSTRAINT "fk_IsHeadwear_Clothing_Item1"
    FOREIGN KEY ("idClothing_Item")
    REFERENCES "Clothing_Item" ("idClothing_Item")
);

-- -----------------------------------------------------
-- Table "With_Accessory"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "With_Accessory" (
  "Parent_Outfit_ID" INT PRIMARY KEY,
  "Accessory" INT NOT NULL,
  CONSTRAINT "fk_With_Accessory_Outfit1"
    FOREIGN KEY ("Parent_Outfit_ID")
    REFERENCES "Outfit" ("idOutfit"),
  CONSTRAINT "fk_With_Accessory_Clothing_Item1"
    FOREIGN KEY ("Accessory")
    REFERENCES "Clothing_Item" ("idClothing_Item")
);

CREATE INDEX "fk_With_Accessory_Clothing_Item1_idx" ON "With_Accessory" ("Accessory");

COMMENT ON COLUMN "With_Accessory"."Accessory" IS 'Must be categorized as ''Isother'' from the Clothing_Item';

-- -----------------------------------------------------
-- Trigger for IsDress
-- -----------------------------------------------------
CREATE OR REPLACE FUNCTION update_target_gender()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE "Clothing_Item"
    SET "TargetGender" = 'F'
    WHERE "idClothing_Item" = NEW."idClothing_Item";
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "IsDress_AFTER_INSERT"
AFTER INSERT ON "IsDress"
FOR EACH ROW
EXECUTE FUNCTION update_target_gender();


















-- 1. Insert Records
-- Insert a new user
INSERT INTO "CSC_4710_Project"."User" (
    "FirstName", "LastName", "UserName", "Email", "Password", 
    "Gender", "Age", "StylePerference", "Body_Type", "Location"
) VALUES (
    'Jane', 'Doe', 'jane_doe', 'jane.doe@email.com', 
    'hashed_password_123', 'F', 25, 'Casual', 'Athletic', 'New York'
);

-- Insert a clothing item (shirt)
INSERT INTO "CSC_4710_Project"."Clothing_Item" (
    "Title", "ImageURL", "Category", "Color", "Brand", 
    "Type_Of", "Description", "TargetGender"
) VALUES (
    'Cotton T-Shirt', 'http://example.com/tshirt.jpg', 'Top', 'Blue', 
    'Generic', 'Shirt', 'Comfortable cotton t-shirt', 'M'
) RETURNING "idClothing_Item";

-- Insert into IsTop for the shirt
INSERT INTO "CSC_4710_Project"."IsTop" (
    "idClothing_Item", "SleeveType"
) VALUES (
    (SELECT currval(pg_get_serial_sequence('"CSC_4710_Project"."Clothing_Item"', 'idClothing_Item'))), 
    'Short'
);

-- Insert an outfit
INSERT INTO "CSC_4710_Project"."Outfit" (
    "id_User", "Top", "Bottom", "Shoes", "Description", "Style"
) VALUES (
    (SELECT "idUser" FROM "CSC_4710_Project"."User" WHERE "Email" = 'jane.doe@email.com'),
    (SELECT "idClothing_Item" FROM "CSC_4710_Project"."Clothing_Item" WHERE "Title" = 'Cotton T-Shirt'),
    NULL, NULL, 'Casual daily outfit', 'Casual'
);

-- 2. Search Database and List Results
-- Simple search for clothing items by category
SELECT "Title", "Brand", "Color", "Type_Of"
FROM "CSC_4710_Project"."Clothing_Item"
WHERE "Category" = 'Top'
ORDER BY "Title";

-- Search outfits for a specific user with clothing details
SELECT o."idOutfit", o."Description", o."Style", 
       c1."Title" AS "TopTitle", c2."Title" AS "BottomTitle"
FROM "CSC_4710_Project"."Outfit" o
LEFT JOIN "CSC_4710_Project"."Clothing_Item" c1 ON o."Top" = c1."idClothing_Item"
LEFT JOIN "CSC_4710_Project"."Clothing_Item" c2 ON o."Bottom" = c2."idClothing_Item"
WHERE o."id_User" = (
    SELECT "idUser" FROM "CSC_4710_Project"."User" WHERE "Email" = 'jane.doe@email.com'
);

-- 3. Interesting Queries
-- Query 1: Join multiple tables to find outfits suitable for an event's dress code
SELECT DISTINCT u."UserName", o."idOutfit", o."Style", e."Dresscode", e."Description" AS "EventDescription"
FROM "CSC_4710_Project"."User" u
JOIN "CSC_4710_Project"."Scheduled" s ON u."idUser" = s."idUser"
JOIN "CSC_4710_Project"."Event" e ON s."idEvent" = e."idEvent"
JOIN "CSC_4710_Project"."Outfit" o ON u."idUser" = o."id_User"
WHERE e."Dresscode" = o."Style"
ORDER BY o."idOutfit";

-- Query 2: Aggregate query to count clothing items by brand and category
SELECT "Brand", "Category", COUNT(*) AS "ItemCount"
FROM "CSC_4710_Project"."Clothing_Item"
GROUP BY "Brand", "Category"
HAVING COUNT(*) > 1
ORDER BY "ItemCount" DESC;

-- Query 3: Find popular colors in fashion trends for current season
SELECT "Color_Primary", COUNT(*) AS "TrendCount"
FROM "CSC_4710_Project"."Fashion_Trend"
WHERE "Season" = 'Fall'
GROUP BY "Color_Primary"
ORDER BY "TrendCount" DESC
LIMIT 5;

-- 4. Update Records
-- Update user style preference
UPDATE "CSC_4710_Project"."User"
SET "StylePerference" = 'Formal'
WHERE "Email" = 'jane.doe@email.com';

-- Update clothing item color
UPDATE "CSC_4710_Project"."Clothing_Item"
SET "Color" = 'Navy Blue'
WHERE "Title" = 'Cotton T-Shirt'
AND "idClothing_Item" IN (
    SELECT "idClothing_Item" 
    FROM "CSC_4710_Project"."IsTop"
    WHERE "SleeveType" = 'Short'
);

-- 5. Delete Records
-- Delete an outfit
DELETE FROM "CSC_4710_Project"."Outfit"
WHERE "idOutfit" = (
    SELECT "idOutfit" 
    FROM "CSC_4710_Project"."Outfit" 
    WHERE "Description" = 'Casual daily outfit' 
    LIMIT 1
);

-- Delete a clothing item (will cascade to related tables)
DELETE FROM "CSC_4710_Project"."Clothing_Item"
WHERE "Title" = 'Cotton T-Shirt';

-- Advanced Function 1: Recommend Outfits Based on Weather and Event
CREATE OR REPLACE FUNCTION "CSC_4710_Project"."recommend_outfits"(
    p_user_id INT,
    p_event_id INT,
    p_date DATE
) RETURNS TABLE (
    outfit_id INT,
    outfit_description TEXT,
    style VARCHAR,
    weather_suitability_score DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        o."idOutfit",
        o."Description",
        o."Style",
        CASE 
            WHEN c."IsWaterResistant" = 1 AND w."Preciptation" > 50 THEN 0.9
            WHEN w."Temperature_High" > 75 AND t."SleeveType" = 'Short' THEN 0.8
            WHEN w."Temperature_Low" < 50 AND c."Heaviness" = 'Heavy' THEN 0.85
            ELSE 0.5
        END AS weather_suitability_score
    FROM "CSC_4710_Project"."Outfit" o
    LEFT JOIN "CSC_4710_Project"."IsTop" t ON o."Top" = t."idClothing_Item"
    LEFT JOIN "CSC_4710_Project"."IsCoat" c ON o."Coat" = c."idClothing_Item"
    JOIN "CSC_4710_Project"."Event" e ON e."idEvent" = p_event_id
    JOIN "CSC_4710_Project"."Weather_Conditions" w ON w."Date" = p_date 
        AND w."Location" = e."Location"
    WHERE o."id_User" = p_user_id
        AND o."Style" = e."Dresscode"
    ORDER BY weather_suitability_score DESC
    LIMIT 3;
END;
$$ LANGUAGE plpgsql;

-- Example usage of recommend_outfits
SELECT * FROM "CSC_4710_Project"."recommend_outfits"(
    (SELECT "idUser" FROM "CSC_4710_Project"."User" WHERE "Email" = 'jane.doe@email.com'),
    (SELECT "idEvent" FROM "CSC_4710_Project"."Event" WHERE "Description" = 'Formal Gala'),
    '2025-04-20'
);

-- Advanced Function 2: Style Compatibility Score
CREATE OR REPLACE FUNCTION "CSC_4710_Project"."calculate_style_compatibility"(
    p_outfit_id INT
) RETURNS DECIMAL AS $$
DECLARE
    style_score DECIMAL := 0;
    trend_count INT;
    outfit_style VARCHAR;
    primary_color VARCHAR;
BEGIN
    -- Get outfit style and primary color
    SELECT o."Style", c."Color"
    INTO outfit_style, primary_color
    FROM "CSC_4710_Project"."Outfit" o
    JOIN "CSC_4710_Project"."Clothing_Item" c ON o."Top" = c."idClothing_Item"
    WHERE o."idOutfit" = p_outfit_id;

    -- Count matching trends
    SELECT COUNT(*)
    INTO trend_count
    FROM "CSC_4710_Project"."Fashion_Trend"
    WHERE "Style_Primary" = outfit_style
    OR "Color_Primary" = primary_color;

    -- Calculate score (0-1 scale)
    style_score := LEAST(trend_count::DECIMAL / 10, 1.0);

    -- Adjust score based on secondary style matches
    IF EXISTS (
        SELECT 1
        FROM "CSC_4710_Project"."Fashion_Trend"
        WHERE "Style_Secondary" = outfit_style
    ) THEN
        style_score := style_score * 1.2;
    END IF;

    RETURN LEAST(style_score, 1.0);
END;
$$ LANGUAGE plpgsql;

-- Example usage of calculate_style_compatibility
SELECT "idOutfit", "Description",
       "CSC_4710_Project"."calculate_style_compatibility"("idOutfit") AS compatibility_score
FROM "CSC_4710_Project"."Outfit"
WHERE "id_User" = (
    SELECT "idUser" FROM "CSC_4710_Project"."User" WHERE "Email" = 'jane.doe@email.com'
);

-- Create index to optimize outfit recommendation queries
CREATE INDEX idx_weather_conditions_date_location 
ON "CSC_4710_Project"."Weather_Conditions" ("Date", "Location");

CREATE INDEX idx_outfit_style 
ON "CSC_4710_Project"."Outfit" ("Style");
