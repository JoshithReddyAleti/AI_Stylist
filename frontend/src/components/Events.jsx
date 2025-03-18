import { useState } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { format, addDays } from 'date-fns';
import { CalendarIcon, ClockIcon, PlusIcon } from '@heroicons/react/24/outline';
import { MapPinIcon } from '@heroicons/react/24/outline';

// Sample events data
const initialEvents = [
  { 
    id: '1', 
    title: 'Business Meeting', 
    date: addDays(new Date(), 2), 
    time: '10:00 AM', 
    location: 'Office', 
    outfit: 'Business Casual',
    description: 'Quarterly review with the team'
  },
  { 
    id: '2', 
    title: 'Dinner Party', 
    date: addDays(new Date(), 5), 
    time: '7:00 PM', 
    location: 'Riverfront Restaurant', 
    outfit: 'Cocktail Attire',
    description: 'Anniversary celebration with friends'
  },
  { 
    id: '3', 
    title: 'Job Interview', 
    date: addDays(new Date(), 7), 
    time: '2:00 PM', 
    location: 'Downtown', 
    outfit: 'Formal Business',
    description: 'Interview for senior position'
  },
];

export default function Events() {
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Filter events for the selected date
  const selectedDateEvents = events.filter(event => 
    event.date.getDate() === selectedDate.getDate() &&
    event.date.getMonth() === selectedDate.getMonth() &&
    event.date.getFullYear() === selectedDate.getFullYear()
  );

  // Handle adding a new event
  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsAddModalOpen(true);
  };

  // Handle editing an event
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsAddModalOpen(true);
  };

  // Handle deleting an event
  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-playfair">
          Upcoming Events
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddEvent}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Add Event
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-4">
            <Calendar 
              onChange={setSelectedDate} 
              value={selectedDate}
              className="w-full border-0 font-inter"
              tileClassName={({ date }) => {
                // Highlight dates with events
                const hasEvent = events.some(event => 
                  event.date.getDate() === date.getDate() &&
                  event.date.getMonth() === date.getMonth() &&
                  event.date.getFullYear() === date.getFullYear()
                );
                return hasEvent ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full' : null;
              }}
            />
          </div>
        </div>

        {/* Events list */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-navy-900 dark:text-white mb-4 font-montserrat">
              {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-navy-100 dark:border-navy-700 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-medium text-navy-900 dark:text-white font-playfair">
                        {event.title}
                      </h4>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="text-navy-500 hover:text-primary-600 dark:text-navy-300 dark:hover:text-primary-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-navy-500 hover:text-red-600 dark:text-navy-300 dark:hover:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-navy-600 dark:text-navy-200">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center text-navy-600 dark:text-navy-200">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm text-navy-600 dark:text-navy-300">
                        {event.description}
                      </p>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm font-medium text-navy-700 dark:text-navy-100">
                        Outfit: {event.outfit}
                      </span>
                      <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        Suggest Outfit
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 mx-auto text-navy-300 dark:text-navy-600" />
                <p className="mt-2 text-navy-500 dark:text-navy-400 font-inter">
                  No events scheduled for this day
                </p>
                <button
                  onClick={handleAddEvent}
                  className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Add Event
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Event Modal (simplified) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-navy-900/50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white dark:bg-navy-800 rounded-lg p-6 max-w-md w-full shadow-xl"
          >
            <h3 className="text-xl font-bold text-navy-900 dark:text-white font-playfair mb-4">
              {editingEvent ? 'Edit Event' : 'Add New Event'}
            </h3>
            <form className="space-y-4">
              {/* Form fields would go here */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-navy-300 rounded-md text-navy-700 hover:bg-navy-50 dark:border-navy-600 dark:text-navy-200 dark:hover:bg-navy-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  {editingEvent ? 'Save Changes' : 'Add Event'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
