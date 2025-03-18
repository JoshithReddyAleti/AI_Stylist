-- Creation of procedure that adds clothing item to user's personal wardrobe

CREATE PROCEDURE add_to_personal_wardrobe(
	IN current_idUser INT, 
	IN clothing_item_title VARCHAR(45),
    IN fashion_category VARCHAR(45), 
    IN clothing_item_color VARCHAR(15),
    IN clothing_item_brand VARCHAR(15),
    IN clothing_item_type_of VARCHAR(30)
    IN clothing_item_image_url TEXT DEFAULT NULL,
    

)
BEGIN

END;