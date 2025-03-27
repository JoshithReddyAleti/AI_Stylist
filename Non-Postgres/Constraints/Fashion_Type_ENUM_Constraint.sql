-- RESTRICTING Fashion types 
USE CSC_4710_Project;

-- CREATE TYPE fashion_type AS ENUM(
--     'Casual', 
--     'Formal', 
--     'Streetwear', 
--     'Bohemian', 
--     'Business',
--     'Vintage', 
--     'Athleisure', 
--     'Punk', 
--     'Gothic', 
--     'Preppy',
--     'Minimalist', 
--     'Avant-Garde', 
--     'Chic', 
--     'Grunge'
-- );

-- User Table
ALTER TABLE `User`
MODIFY COLUMN `StylePerference` ENUM(
    'Casual', 
    'Formal', 
    'Streetwear', 
    'Bohemian', 
    'Business',
    'Vintage', 
    'Athleisure', 
    'Punk', 
    'Gothic', 
    'Preppy',
    'Minimalist', 
    'Avant-Garde', 
    'Chic', 
    'Grunge'
);


-- Event Table
ALTER TABLE `Event`
MODIFY COLUMN `DressCode` ENUM(
    'Casual', 
    'Formal', 
    'Streetwear', 
    'Bohemian', 
    'Business',
    'Vintage', 
    'Athleisure', 
    'Punk', 
    'Gothic', 
    'Preppy',
    'Minimalist', 
    'Avant-Garde', 
    'Chic', 
    'Grunge'
);

-- Clothing_Item Table
ALTER TABLE `Clothing_Item`
MODIFY COLUMN `Category` ENUM(
    'Casual', 
    'Formal', 
    'Streetwear', 
    'Bohemian', 
    'Business',
    'Vintage', 
    'Athleisure', 
    'Punk', 
    'Gothic', 
    'Preppy',
    'Minimalist', 
    'Avant-Garde', 
    'Chic', 
    'Grunge'
) NOT NULL;

-- Fashion_Trend
ALTER TABLE `Fashion_Trend`
MODIFY COLUMN `Style_Primary` ENUM(
    'Casual', 
    'Formal', 
    'Streetwear', 
    'Bohemian', 
    'Business',
    'Vintage', 
    'Athleisure', 
    'Punk', 
    'Gothic', 
    'Preppy',
    'Minimalist', 
    'Avant-Garde', 
    'Chic', 
    'Grunge'
),
MODIFY COLUMN `Style_Secondary`ENUM(
    'Casual', 
    'Formal', 
    'Streetwear', 
    'Bohemian', 
    'Business',
    'Vintage', 
    'Athleisure', 
    'Punk', 
    'Gothic', 
    'Preppy',
    'Minimalist', 
    'Avant-Garde', 
    'Chic', 
    'Grunge'
),
MODIFY COLUMN`Style_Tertiary` ENUM(
    'Casual', 
    'Formal', 
    'Streetwear', 
    'Bohemian', 
    'Business',
    'Vintage', 
    'Athleisure', 
    'Punk', 
    'Gothic', 
    'Preppy',
    'Minimalist', 
    'Avant-Garde', 
    'Chic', 
    'Grunge'
);
