import { useState } from 'react';
import { motion } from 'framer-motion';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function WardrobeItem({ item, onDelete, onEdit }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="relative rounded-lg overflow-hidden shadow-md bg-white dark:bg-navy-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-w-1 aspect-h-1">
        <img
          src={item.imageUrl || 'https://via.placeholder.com/300'}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay with actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent flex flex-col justify-end p-3"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-white font-medium truncate font-playfair">{item.name}</h3>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEdit(item)}
                className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
              >
                <PencilIcon className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(item.id)}
                className="p-1.5 rounded-full bg-white/20 text-white hover:bg-red-500/80 transition-colors"
              >
                <TrashIcon className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.map((tag) => (
              <span 
                key={tag} 
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-500/70 text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
