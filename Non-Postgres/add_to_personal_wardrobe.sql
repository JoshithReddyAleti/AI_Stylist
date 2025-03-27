CREATE PROCEDURE add_to_personal_wardrobe(
    IN current_idUser INT,
    IN clothing_item_title VARCHAR(45),
    IN fashion_category VARCHAR(45), 
    IN clothing_item_color VARCHAR(15),
    IN clothing_item_type_of VARCHAR(30),
    IN clothing_item_brand VARCHAR(15),  /* Remove DEFAULT here */
    IN clothing_item_image_url TEXT,     /* Remove DEFAULT here */
    IN clothing_item_description MEDIUMTEXT, /* Remove DEFAULT here */
    IN clothing_item_target_gender VARCHAR(1) /* Remove DEFAULT here */
)
BEGIN
	IF clothing_item_brand IS NULL THEN
		SET clothing_item_brand = 'Generic';
	END IF;
    
    
END;