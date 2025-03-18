import { motion } from 'framer-motion';
import { HeartIcon, ShareIcon } from '@heroicons/react/24/outline';

export default function OutfitCard({ outfit }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white dark:bg-navy-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative aspect-w-3 aspect-h-4">
        <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-navy-900/20 transition-colors z-10" />
        <img
          src={outfit.imageUrl || 'https://via.placeholder.com/300x400'}
          alt={outfit.name}
          className="w-full h-full object-center object-cover"
        />
        <div className="absolute top-4 right-4 flex space-x-2 z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-white/80 dark:bg-navy-800/80 text-navy-600 dark:text-navy-200 hover:text-primary-500 dark:hover:text-primary-400"
          >
            <HeartIcon className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-white/80 dark:bg-navy-800/80 text-navy-600 dark:text-navy-200 hover:text-primary-500 dark:hover:text-primary-400"
          >
            <ShareIcon className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-navy-900 dark:text-white font-playfair">
          {outfit.name || 'Stylish Outfit'}
        </h3>
        <p className="mt-1 text-sm text-navy-500 dark:text-navy-200 font-inter">
          {outfit.description || 'Perfect for any occasion'}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(outfit.tags || ['Casual', 'Summer']).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-navy-700 dark:text-primary-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
