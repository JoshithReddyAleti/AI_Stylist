import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDropzone } from 'react-dropzone';
import Masonry from 'react-masonry-css';
import WardrobeItem from './WardrobeItem';
import { PlusIcon } from '@heroicons/react/24/outline';

// Sample wardrobe data
const initialItems = [
  { id: '1', name: 'Blue Denim Jacket', category: 'Tops', tags: ['Casual', 'Denim'], imageUrl: 'https://via.placeholder.com/300?text=Jacket' },
  { id: '2', name: 'Black Jeans', category: 'Bottoms', tags: ['Casual', 'Denim'], imageUrl: 'https://via.placeholder.com/300?text=Jeans' },
  { id: '3', name: 'White Sneakers', category: 'Footwear', tags: ['Casual', 'Sports'], imageUrl: 'https://via.placeholder.com/300?text=Sneakers' },
  { id: '4', name: 'Gold Watch', category: 'Accessories', tags: ['Formal', 'Luxury'], imageUrl: 'https://via.placeholder.com/300?text=Watch' },
  { id: '5', name: 'Navy Blazer', category: 'Tops', tags: ['Formal', 'Business'], imageUrl: 'https://via.placeholder.com/300?text=Blazer' },
  { id: '6', name: 'Floral Dress', category: 'Dresses', tags: ['Casual', 'Summer'], imageUrl: 'https://via.placeholder.com/300?text=Dress' },
];

const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Footwear', 'Accessories'];

export default function Wardrobe() {
  const [items, setItems] = useState(initialItems);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Filter items by category
  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  // Handle drag and drop
  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);
    
    setItems(reorderedItems);
  };

  // Handle file drop for new items
  const onDrop = useCallback(acceptedFiles => {
    // Here you would normally upload the files to your server
    // For demo purposes, we'll just create new items with local URLs
    const newItems = acceptedFiles.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      name: file.name.split('.')[0],
      category: 'Tops', // Default category
      tags: ['New'],
      imageUrl: URL.createObjectURL(file)
    }));
    
    setItems(prev => [...prev, ...newItems]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    }
  });

  // Handle item deletion
  const handleDeleteItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  // Handle item editing
  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsAddModalOpen(true);
  };

  // Breakpoints for masonry layout
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <div className="py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-playfair mb-4 sm:mb-0">
          My Wardrobe
        </h2>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-navy-800 text-white'
                  : 'bg-navy-100 text-navy-800 hover:bg-navy-200 dark:bg-navy-700 dark:text-navy-100 dark:hover:bg-navy-600'
              }`}
            >
              {category}
            </button>
          ))}
          <button
            className="p-1.5 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors"
            onClick={() => {
              setEditingItem(null);
              setIsAddModalOpen(true);
            }}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Dropzone for adding new items */}
      <div 
        {...getRootProps()} 
        className={`mb-8 border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
          isDragActive 
            ? 'border-primary-500 bg-primary-50 dark:bg-navy-800/50' 
            : 'border-navy-200 hover:border-primary-400 dark:border-navy-600 dark:hover:border-primary-500'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-navy-600 dark:text-navy-200 font-inter">
          {isDragActive
            ? "Drop your clothing items here..."
            : "Drag 'n' drop some images of your clothes, or click to select files"}
        </p>
      </div>

      {/* Wardrobe items grid */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="wardrobe" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex w-auto -ml-4"
                columnClassName="pl-4 bg-clip-padding"
              >
                <AnimatePresence>
                  {filteredItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-4"
                        >
                          <WardrobeItem 
                            item={item} 
                            onDelete={handleDeleteItem} 
                            onEdit={handleEditItem} 
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </AnimatePresence>
              </Masonry>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add/Edit Modal (simplified) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-navy-900/50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white dark:bg-navy-800 rounded-lg p-6 max-w-md w-full shadow-xl"
          >
            <h3 className="text-xl font-bold text-navy-900 dark:text-white font-playfair mb-4">
              {editingItem ? 'Edit Item' : 'Add New Item'}
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
                  {editingItem ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
