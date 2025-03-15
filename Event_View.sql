-- Event_View

-- CREATE VIEW `Event_View`
SELECT *
FROM Scheduled, Event
WHERE Scheduled.idEvent = Event.idEvent;