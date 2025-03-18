-- Event_View
-- View for personal events coming up for each user

CREATE VIEW `Event_View` AS
SELECT idUser, Scheduled.idEvent, Location, Date, Description, Dresscode
FROM Scheduled, Event
WHERE Scheduled.idEvent = Event.idEvent;