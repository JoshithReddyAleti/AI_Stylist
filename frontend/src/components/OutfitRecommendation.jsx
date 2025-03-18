import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, ShareIcon, LightBulbIcon, ChevronLeftIcon, ChevronRightIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';

// Sample outfit recommendations
const sampleRecommendations = [
  {
    id: '1',
    title: 'Business Meeting Attire',
    description: 'Professional look with a modern twist',
    items: [
      { name: 'Navy Blazer', category: 'Top' },
      { name: 'White Button-Down Shirt', category: 'Top' },
      { name: 'Gray Slim-Fit Pants', category: 'Bottom' },
      { name: 'Brown Leather Shoes', category: 'Footwear' },
      { name: 'Silver Watch', category: 'Accessory' }
    ],
    imageUrl: 'https://via.placeholder.com/600x800?text=Business+Outfit',
    reasoning: 'This outfit projects professionalism while maintaining a modern silhouette. The navy blazer adds authority while the slim-fit pants keep the look contemporary.',
    occasion: 'Business',
    weather: 'Indoor',
  },
  {
    id: '2',
    title: 'Weekend Casual',
    description: 'Relaxed yet stylish for your day off',
    items: [
      { name: 'Denim Jacket', category: 'Top' },
      { name: 'White T-shirt', category: 'Top' },
      { name: 'Black Jeans', category: 'Bottom' },
      { name: 'White Sneakers', category: 'Footwear' },
      { name: 'Minimal Watch', category: 'Accessory' }
    ],
    imageUrl: 'https://via.placeholder.com/600x800?text=Casual+Outfit',
    reasoning: 'This combination offers comfort without sacrificing style. The denim jacket adds a layer of interest to the classic white tee and jeans combo.',
    occasion: 'Casual',
    weather: 'Mild',
  },
  {
    id: '3',
    title: 'Evening Event',
    description: 'Sophisticated look for dinner or cocktails',
    items: [
      { name: 'Black Blazer', category: 'Top' },
      { name: 'Dark Blue Dress Shirt', category: 'Top' },
      { name: 'Black Dress Pants', category: 'Bottom' },
      { name: 'Black Leather Shoes', category: 'Footwear' },
      { name: 'Silver Cufflinks', category: 'Accessory' }
    ],
    imageUrl: 'https://via.placeholder.com/600x800?text=Evening+Outfit',
    reasoning: 'This ensemble strikes the perfect balance between formal and approachable. The dark blue shirt adds a touch of color to an otherwise monochromatic palette.',
    occasion: 'Evening',
    weather: 'Indoor',
  }
];

export default function OutfitRecommendation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReasoning, setShowReasoning] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [saved, setSaved] = useState([]);
  
  const currentOutfit = sampleRecommendations[currentIndex];
  
  const nextOutfit = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sampleRecommendations.length);
    setShowReasoning(false);
  };
  
  const prevOutfit = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sampleRecommendations.length) % sampleRecommendations.length);
    setShowReasoning(false);
  };
  
  const toggleFavorite = (outfitId) => {
    setFavorites(prev => 
      prev.includes(outfitId) 
        ? prev.filter(id => id !== outfitId) 
        : [...prev, outfitId]
    );
  };
  
  const toggleSaved = (outfitId) => {
    setSaved(prev => 
      prev.includes(outfitId) 
        ? prev.filter(id => id !== outfitId) 
        : [...prev, outfitId]
    );
  };
  
  const isFavorite = favorites.includes(currentOutfit.id);
  const isSaved = saved.includes(currentOutfit.id);

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-playfair mb-6">
        AI Outfit Recommendations
      </h2>
      
      <div className="relative bg-white dark:bg-navy-800 rounded-lg shadow-xl overflow-hidden">
        {/* Outfit Image */}
        <div className="relative aspect-w-3 aspect-h-4 sm:aspect-w-16 sm:aspect-h-9 md:aspect-w-4 md:aspect-h-3">
          <img
            src={currentOutfit.imageUrl}
            alt={currentOutfit.title}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation arrows */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevOutfit}
              className="p-2 rounded-full bg-white/80 text-navy-800 hover:bg-white shadow-md"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextOutfit}
              className="p-2 rounded-full bg-white/80 text-navy-800 hover:bg-white shadow-md"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </motion.button>
          </div>
          
          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleFavorite(currentOutfit.id)}
              className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-navy-600 hover:text-red-500'}`}
            >
              {isFavorite ? (
                <HeartIconSolid className="h-5 w-5" />
              ) : (
                <HeartIcon className="h-5 w-5" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleSaved(currentOutfit.id)}
              className={`p-2 rounded-full ${isSaved ? 'bg-primary-500 text-white' : 'bg-white/80 text-navy-600 hover:text-primary-500'}`}
            >
              {isSaved ? (
                <BookmarkIconSolid className="h-5 w-5" />
              ) : (
                <BookmarkIcon className="h-5 w-5" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/80 text-navy-600 hover:text-primary-500"
            >
              <ShareIcon className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
        
        {/* Outfit Details */}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-navy-900 dark:text-white font-playfair">
                {currentOutfit.title}
              </h3>
              <p className="text-navy-600 dark:text-navy-300 mt-1 font-inter">
                {currentOutfit.description}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-200">
                {currentOutfit.occasion}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy-100 text-navy-800 dark:bg-navy-700 dark:text-navy-200 mt-1">
                {currentOutfit.weather}
              </span>
            </div>
          </div>
          
          {/* Outfit Items */}
          <div className="mt-4">
            <h4 className="text-sm font-medium text-navy-700 dark:text-navy-200 uppercase tracking-wider font-montserrat mb-2">
              Items
            </h4>
            <ul className="space-y-2">
              {currentOutfit.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span className="text-navy-800 dark:text-navy-100 font-inter">{item.name}</span>
                  <span className="text-navy-500 dark:text-navy-400 text-sm">{item.category}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* AI Reasoning */}
          <div className="mt-6">
            <button
              onClick={() => setShowReasoning(!showReasoning)}
              className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              <LightBulbIcon className="h-5 w-5 mr-1" />
              <span className="font-medium font-montserrat">
                {showReasoning ? 'Hide AI Explanation' : 'Explain This Choice'}
              </span>
            </button>
            
            {showReasoning && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 p-4 bg-primary-50 dark:bg-navy-700/50 rounded-md"
              >
                <p className="text-navy-700 dark:text-navy-200 font-inter">
                  {currentOutfit.reasoning}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
