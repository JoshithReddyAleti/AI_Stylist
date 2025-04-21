import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeartIcon,
  ShareIcon,
  LightBulbIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BookmarkIcon,
  ArrowPathIcon,
  TagIcon,
  ShoppingBagIcon,
  StarIcon,
  SwatchIcon
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  StarIcon as StarIconSolid
} from '@heroicons/react/24/solid';
import { useTheme } from '../context/ThemeContext';

// Sample outfit recommendations
const sampleRecommendations = [
  {
    id: '1',
    title: 'Business Meeting Attire',
    description: 'Professional look with a modern twist',
    items: [
      { name: 'Navy Blazer', category: 'Top', price: '$120', brand: 'Modern Tailor' },
      { name: 'Blue Button-Down Shirt', category: 'Top', price: '$45', brand: 'Oxford' },
      { name: 'Dark blue/Gray Slim-Fit Pants', category: 'Bottom', price: '$65', brand: 'Slate' },
      { name: 'Brown Leather Shoes', category: 'Footwear', price: '$95', brand: 'Clarks' },
      { name: 'Silver Watch', category: 'Accessory', price: '$150', brand: 'Timex' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1623880840102-7df0a9f3545b?ixlib=rb-4.0.3&crop=entropy&cs=tinysrgb&w=700&h=700&fit=crop',
    reasoning: 'This outfit projects professionalism while maintaining a modern silhouette. The navy blazer adds authority while the slim-fit pants keep the look contemporary.',
    occasion: 'Business',
    weather: 'Indoor',
    rating: 4.8,
    colors: ['Navy', 'White', 'Gray', 'Brown', 'Silver'],
    style: 'Professional',
    totalPrice: '$475'
  },
  {
    id: '2',
    title: 'Weekend Casual',
    description: 'Relaxed yet stylish for your day off',
    items: [
      { name: 'Denim Jacket', category: 'Top', price: '$85', brand: 'Levi\'s' },
      { name: 'Light Blue T-shirt', category: 'Top', price: '$25', brand: 'Basics' },
      { name: 'Black Jeans', category: 'Bottom', price: '$60', brand: 'Denim Co' },
      { name: 'White Sneakers', category: 'Footwear', price: '$70', brand: 'Converse' },
      { name: 'Minimal Watch', category: 'Accessory', price: '$95', brand: 'MVMT' }
    ],
    imageUrl: 'https://media.istockphoto.com/id/1298813178/photo/young-man-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=f4kiiVYhbzfAjNrALcDfjKStlJThv00LqFI3oIECFEo=',
    reasoning: 'This combination offers comfort without sacrificing style. The denim jacket adds a layer of interest to the classic white tee and jeans combo.',
    occasion: 'Casual',
    weather: 'Mild',
    rating: 4.5,
    colors: ['Blue', 'White', 'Black'],
    style: 'Casual',
    totalPrice: '$335'
  },
  {
    id: '3',
    title: 'Evening Event',
    description: 'Sophisticated look for dinner or cocktails',
    items: [
      { name: 'Black Blazer', category: 'Top', price: '$130', brand: 'Hugo' },
      { name: 'Dark Blue Dress Shirt', category: 'Top', price: '$55', brand: 'Brooks' },
      { name: 'Black Dress Pants', category: 'Bottom', price: '$75', brand: 'Calvin Klein' },
      { name: 'Black Leather Shoes', category: 'Footwear', price: '$110', brand: 'Kenneth Cole' },
      { name: 'Silver Cufflinks', category: 'Accessory', price: '$40', brand: 'Tie Bar' }
    ],
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661326280617-ba5f611d1746?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEV2ZW5pbmclMjBFdmVudCUyMGJsYWNrJTIwYmxhemVyfGVufDB8fDB8fHww',
    reasoning: 'This ensemble strikes the perfect balance between formal and approachable. The dark blue shirt adds a touch of color to an otherwise monochromatic palette.',
    occasion: 'Evening',
    weather: 'Indoor',
    rating: 4.7,
    colors: ['Black', 'Dark Blue', 'Silver'],
    style: 'Formal',
    totalPrice: '$410'
  },
  {
    id: '4',
    title: 'Summer Outing',
    description: 'Light and breathable for warm days',
    items: [
      { name: 'Linen Shirt', category: 'Top', price: '$50', brand: 'J.Crew' },
      { name: 'Chino Shorts', category: 'Bottom', price: '$45', brand: 'Gap' },
      { name: 'Leather Sandals', category: 'Footwear', price: '$65', brand: 'Birkenstock' },
      { name: 'Straw Hat', category: 'Accessory', price: '$30', brand: 'Sunwear' },
      { name: 'Sunglasses', category: 'Accessory', price: '$120', brand: 'Ray-Ban' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1707765642745-32051c67fb6c?ixlib=rb-4.0.3&crop=entropy&cs=tinysrgb&w=700&h=700&fit=crop',
    reasoning: 'This outfit is designed for hot weather with breathable fabrics. The linen shirt and chino shorts combination is classic for summer, while the accessories provide sun protection.',
    occasion: 'Casual',
    weather: 'Hot',
    rating: 4.6,
    colors: ['Beige', 'Tan', 'Brown'],
    style: 'Resort',
    totalPrice: '$310'
  }
];

export default function OutfitRecommendation() {
  const { darkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReasoning, setShowReasoning] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [saved, setSaved] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [activeTab, setActiveTab] = useState('items');

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
  };

  const currentOutfit = sampleRecommendations[currentIndex];

  // Simulate loading new recommendations
  const refreshRecommendations = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentIndex(0);
      setShowReasoning(false);
      setActiveTab('items');
      setShowColorPalette(false);
      setIsLoading(false);
    }, 800);
  };

  // Navigate to next outfit
  const nextOutfit = () => {
    console.log('Next button clicked, currentIndex:', currentIndex);
    setIsLoading(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % sampleRecommendations.length;
      console.log('New index:', newIndex);
      return newIndex;
    });
    setShowReasoning(false);
    setActiveTab('items');
    setShowColorPalette(false);
    setIsLoading(false);
  };

  // Navigate to previous outfit
  const prevOutfit = () => {
    console.log('Previous button clicked, currentIndex:', currentIndex);
    setIsLoading(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + sampleRecommendations.length) % sampleRecommendations.length;
      console.log('New index:', newIndex);
      return newIndex;
    });
    setShowReasoning(false);
    setActiveTab('items');
    setShowColorPalette(false);
    setIsLoading(false);
  };

  // Toggle favorite status
  const toggleFavorite = (outfitId) => {
    setFavorites((prev) =>
      prev.includes(outfitId)
        ? prev.filter((id) => id !== outfitId)
        : [...prev, outfitId]
    );
  };

  // Toggle saved status
  const toggleSaved = (outfitId) => {
    setSaved((prev) =>
      prev.includes(outfitId)
        ? prev.filter((id) => id !== outfitId)
        : [...prev, outfitId]
    );
  };

  // Rate an outfit
  const rateOutfit = (outfitId, rating) => {
    setUserRatings((prev) => ({
      ...prev,
      [outfitId]: rating
    }));
  };

  // Get user rating or default rating
  const getOutfitRating = (outfitId) => {
    return userRatings[outfitId] || 0;
  };

  // Status checks
  const isFavorite = favorites.includes(currentOutfit.id);
  const isSaved = saved.includes(currentOutfit.id);
  const userRating = getOutfitRating(currentOutfit.id);

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-playfair">
          AI Outfit Recommendations
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={refreshRecommendations}
          className="btn-ghost flex items-center"
          disabled={isLoading}
        >
          <motion.div
            animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: 'linear' }}
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" />
          </motion.div>
          <span>Refresh</span>
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-96"
          >
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-navy-200 dark:bg-navy-700 h-16 w-16 flex items-center justify-center">
                <SwatchIcon className="h-8 w-8 text-navy-400 dark:text-navy-500" />
              </div>
              <div className="mt-4 text-navy-600 dark:text-navy-300 font-medium">Finding your perfect outfit...</div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={currentOutfit.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="backdrop-blur-lg bg-white/60 dark:bg-navy-900/70 rounded-3xl shadow-2xl border border-white/30 dark:border-navy-700/60 overflow-hidden flex flex-col md:flex-row md:items-stretch transition-all"
          >
            {/* Outfit Image with Overlay */}
            <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto flex-shrink-0 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/40 to-transparent z-10 opacity-50 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent opacity-0 group-hover:opacity-30 transition-all duration-700 z-10"></div>
              <img
                src={currentOutfit.imageUrl}
                alt={currentOutfit.title}
                onError={(e) => (e.target.src = 'https://via.placeholder.com/700x700?text=Outfit+Image')}
                className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none transition-all transform group-hover:scale-105 duration-1000 filter group-hover:brightness-110"
              />

              {/* Style badge */}
              <div className="absolute top-4 left-4 z-20 transform transition-transform duration-300 group-hover:scale-105">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg hover:shadow-primary-500/30 transition-all"
                >
                  <span className="text-white font-bold">{currentOutfit.style}</span>
                </motion.button>
              </div>

              {/* Navigation arrows */}
              <div className="flex absolute inset-y-0 left-0 right-0 justify-between items-center px-2 z-20">
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevOutfit}
                  className="p-2 rounded-full bg-white/80 text-navy-800 hover:bg-white shadow-md pointer-events-auto"
                  disabled={isLoading}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextOutfit}
                  className="p-2 rounded-full bg-white/80 text-navy-800 hover:bg-white shadow-md pointer-events-auto"
                  disabled={isLoading}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Action buttons */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 z-30">
                <div className="backdrop-blur-lg bg-white/40 dark:bg-navy-800/60 border border-white/30 dark:border-navy-700/60 shadow-xl rounded-2xl flex flex-row md:flex-col p-2 md:p-3 space-x-2 md:space-x-0 md:space-y-3 transition-all">
                  <motion.button
                    whileHover={{ scale: 1.15, boxShadow: '0 4px 24px 0 rgba(80,120,255,0.25)' }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => toggleFavorite(currentOutfit.id)}
                    className={`w-12 h-12 flex items-center justify-center rounded-full shadow-md border border-white/40 dark:border-navy-700 bg-white/80 dark:bg-navy-800/80 text-navy-600 dark:text-navy-100 hover:bg-opacity-90 hover:shadow-primary-400/40 transition-all ${isFavorite ? 'bg-red-500 text-white' : ''}`}
                    title="Favorite"
                  >
                    {isFavorite ? (
                      <HeartIconSolid className="h-5 w-5" />
                    ) : (
                      <HeartIcon className="h-5 w-5" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.15, boxShadow: '0 4px 24px 0 rgba(80,120,255,0.25)' }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => toggleSaved(currentOutfit.id)}
                    className={`w-12 h-12 flex items-center justify-center rounded-full shadow-md border border-white/40 dark:border-navy-700 bg-white/80 dark:bg-navy-800/80 text-navy-600 dark:text-navy-100 hover:bg-opacity-90 hover:shadow-primary-400/40 transition-all ${isSaved ? 'bg-primary-500 text-white' : ''}`}
                    title="Save"
                  >
                    {isSaved ? (
                      <BookmarkIconSolid className="h-5 w-5" />
                    ) : (
                      <BookmarkIcon className="h-5 w-5" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.15, boxShadow: '0 4px 24px 0 rgba(80,120,255,0.25)' }}
                    whileTap={{ scale: 0.93 }}
                    className="w-12 h-12 flex items-center justify-center rounded-full shadow-md border border-white/40 dark:border-navy-700 bg-white/80 dark:bg-navy-800/80 text-navy-600 dark:text-navy-100 hover:bg-opacity-90 hover:shadow-primary-400/40 transition-all"
                    title="Share"
                  >
                    <ShareIcon className="h-5 w-5" />
                  </motion.button>
                </div>

                {/* Price tag */}
                <div className="absolute bottom-50 left-250 z-20 md:left--10">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/90 dark:bg-navy-800/90 px-4 py-2 rounded-full shadow-md flex items-center border border-white/40 dark:border-navy-700"
                  >
                    <TagIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <span className="font-bold text-navy-800 dark:text-white text-lg">{currentOutfit.totalPrice}</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Outfit Details */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-navy-900 dark:text-white font-playfair">
                    {currentOutfit.title}
                  </h3>
                  <p className="text-navy-600 dark:text-navy-300 mt-1 font-inter">
                    {currentOutfit.description}
                  </p>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <span className="inline-block px-2.5 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs font-medium rounded-full mb-1">
                    {currentOutfit.occasion}
                  </span>
                  <span className="inline-block px-2.5 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-300 text-xs font-medium rounded-full">
                    {currentOutfit.weather}
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star, i) => (
                    <motion.button
                      key={star}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.3 } }}
                      whileHover={{ scale: 1.3, y: -3, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => rateOutfit(currentOutfit.id, star)}
                      className="focus:outline-none transition-transform mx-0.5"
                    >
                      {userRating >= star ? (
                        <StarIconSolid className="h-6 w-6 text-yellow-500 filter drop-shadow-md" />
                      ) : (
                        <StarIcon className="h-6 w-6 text-yellow-400/70 hover:text-yellow-500 transition-colors" />
                      )}
                    </motion.button>
                  ))}
                </div>
                <div className="ml-2 text-sm text-navy-500 dark:text-navy-400">
                  {userRating > 0 ? 'Your rating' : 'Rate this outfit'} | AI Rating: {currentOutfit.rating}
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-6">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('items')}
                    className={`pb-3 px-3 font-medium text-sm transition-all rounded-t-lg ${activeTab === 'items' ? 'text-primary-600 dark:text-primary-400 font-semibold' : 'text-navy-500 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-200'}`}
                  >
                    Items
                  </button>
                  <button
                    onClick={() => setActiveTab('colors')}
                    className={`pb-3 px-3 font-medium text-sm transition-all rounded-t-lg ${activeTab === 'colors' ? 'text-primary-600 dark:text-primary-400 font-semibold' : 'text-navy-500 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-200'}`}
                  >
                    Colors
                  </button>
                  <button
                    onClick={() => setActiveTab('reasoning')}
                    className={`pb-3 px-3 font-medium text-sm transition-all rounded-t-lg ${activeTab === 'reasoning' ? 'text-primary-600 dark:text-primary-400 font-semibold' : 'text-navy-500 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-200'}`}
                  >
                    AI Reasoning
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="mt-4">
                <AnimatePresence mode="wait">
                  {activeTab === 'items' && (
                    <motion.div
                      key="items"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul className="space-y-3">
                        {currentOutfit.items.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex justify-between items-center p-2 hover:bg-navy-50 dark:hover:bg-navy-800/50 rounded-md transition-colors"
                          >
                            <div>
                              <div className="text-navy-800 dark:text-navy-100 font-medium">{item.name}</div>
                              <div className="text-navy-500 dark:text-navy-400 text-xs">{item.brand}</div>
                            </div>
                            <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                              <span className="text-navy-800 dark:text-navy-200 font-medium mr-3">{item.price}</span>
                              <span className="badge badge-secondary text-xs">{item.category}</span>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                      <div className="mt-4 flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -3, boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)' }}
                          whileTap={{ scale: 0.97 }}
                          className="bg-gradient-to-r from-primary-500 to-indigo-500 text-white font-semibold px-7 py-3.5 rounded-full shadow-xl flex items-center text-base hover:from-primary-600 hover:to-indigo-600 transition-all border border-white/20"
                          title="Shop This Look"
                        >
                          <ShoppingBagIcon className="h-5 w-5 mr-2" />
                          Shop This Look
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === 'colors' && (
                    <motion.div
                      key="colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mb-4">
                        <div className="text-navy-700 dark:text-navy-300 mb-2">Color Palette</div>
                        <div className="flex flex-wrap gap-3 justify-center">
                          {currentOutfit.colors.map((color, index) => (
                            <motion.div
                              key={index}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="relative group"
                            >
                              <motion.div
                                whileHover={{ scale: 1.2, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="h-10 w-10 rounded-full shadow-lg border-2 border-white dark:border-navy-700 cursor-pointer ring-2 ring-primary-200 dark:ring-primary-700 transition-all duration-300"
                                style={{ backgroundColor: color.toLowerCase() }}
                              ></motion.div>
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                whileHover={{ opacity: 1, y: 0, scale: 1 }}
                                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-navy-800/90 backdrop-blur-sm text-white text-xs py-1.5 px-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-40 border border-white/10"
                              >
                                {color}
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-navy-700 dark:text-navy-300 mb-2">Style Notes</div>
                        <p className="text-navy-600 dark:text-navy-400 text-sm">
                          This color palette creates a {currentOutfit.style.toLowerCase()} look that works well for {currentOutfit.occasion.toLowerCase()} occasions.
                          The dominant colors complement each other and create a cohesive appearance.
                        </p>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === 'reasoning' && (
                    <motion.div
                      key="reasoning"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 bg-primary-50 dark:bg-navy-700/50 rounded-md"
                    >
                      <div className="flex items-start">
                        <LightBulbIcon className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-navy-800 dark:text-navy-200 font-medium mb-1">AI Style Analysis</div>
                          <p className="text-navy-700 dark:text-navy-300 text-sm">
                            {currentOutfit.reasoning}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}