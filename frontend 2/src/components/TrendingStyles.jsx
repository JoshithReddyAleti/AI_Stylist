import { motion } from 'framer-motion';
import { FireIcon, UserGroupIcon } from '@heroicons/react/24/solid';

// Sample trending styles data
const trendingStyles = [
  {
    id: '1',
    name: 'Monochromatic Minimalism',
    description: 'Clean lines and single color palettes dominate this sleek trend',
    popularity: 92,
    imageUrl: 'https://images.unsplash.com/photo-1744389479988-c0b85772263c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fE1vbm9jaHJvbWF0aWMlMjBNaW5pbWFsaXNtJTIwZHJlc3MlMjBtZW58ZW58MHx8MHx8fDA%3D',
    tags: ['Minimalist', 'Modern', 'Office']
  },
  {
    id: '2',
    name: 'Vintage Revival',
    description: '70s and 80s inspired looks with a modern twist',
    popularity: 87,
    imageUrl: 'https://media.istockphoto.com/id/1171322967/photo/portrait-of-handsome-gentleman-dressed-in-vintage-costume-holding-top-hat-in-stately-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=tMnxBC74o3NPircSThh-fmO7lsW3a5Mh_ZCeUAIRcnI=',
    tags: ['Retro', 'Casual', 'Statement']
  },
  {
    id: '3',
    name: 'Sustainable Chic',
    description: 'Eco-friendly fashion that doesn\'t compromise on style',
    popularity: 85,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1705170986282-7f10f6ec3989?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3VzdGFpbmFibGUlMjBDaGljJTIwZHJlc3MlMjBtZW58ZW58MHx8MHx8fDA%3D',
    tags: ['Eco-friendly', 'Casual', 'Versatile']
  }
];

// Sample style groups data
const styleGroups = [
  {
    id: '1',
    name: 'Modern Minimalists',
    members: 4528,
    description: 'Clean lines, neutral colors, and timeless pieces',
    matchPercentage: 92
  },
  {
    id: '2',
    name: 'Vintage Enthusiasts',
    members: 3217,
    description: 'Retro-inspired looks with contemporary elements',
    matchPercentage: 78
  },
  {
    id: '3',
    name: 'Sustainable Fashion Advocates',
    members: 2845,
    description: 'Eco-conscious style choices without sacrificing aesthetics',
    matchPercentage: 65
  }
];

export default function TrendingStyles() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-playfair mb-6">
        Fashion Insights
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Styles */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-5">
            <div className="flex items-center mb-4">
              <FireIcon className="h-5 w-5 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-montserrat">
                Trending Now
              </h3>
            </div>
            
            <div className="space-y-6">
              {trendingStyles.map((style) => (
                <motion.div
                  key={style.id}
                  whileHover={{ y: -5 }}
                  className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-navy-100 dark:border-navy-700 hover:shadow-md transition-shadow"
                >
                  <div className="sm:w-1/3">
                    <img
                      src={style.imageUrl}
                      alt={style.name}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                  <div className="sm:w-2/3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-medium text-navy-900 dark:text-white font-playfair">
                        {style.name}
                      </h4>
                      <div className="flex items-center bg-primary-100 dark:bg-primary-900/30 px-2 py-0.5 rounded-full">
                        <FireIcon className="h-3.5 w-3.5 text-primary-600 dark:text-primary-400 mr-1" />
                        <span className="text-xs font-medium text-primary-800 dark:text-primary-300">
                          {style.popularity}%
                        </span>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-navy-600 dark:text-navy-300 font-inter">
                      {style.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {style.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-navy-100 text-navy-800 dark:bg-navy-700 dark:text-navy-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Style Groups */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-5">
            <div className="flex items-center mb-4">
              <UserGroupIcon className="h-5 w-5 text-primary-500 mr-2" />
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-montserrat">
                Your Style Matches
              </h3>
            </div>
            
            <div className="space-y-4">
              {styleGroups.map((group) => (
                <motion.div
                  key={group.id}
                  whileHover={{ x: 5 }}
                  className="p-4 rounded-lg border border-navy-100 dark:border-navy-700 hover:border-primary-200 dark:hover:border-primary-700 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-navy-900 dark:text-white font-montserrat">
                      {group.name}
                    </h4>
                    <span className="text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-2 py-0.5 rounded-full">
                      {group.matchPercentage}% match
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-navy-600 dark:text-navy-300 font-inter">
                    {group.description}
                  </p>
                  <div className="mt-2 flex items-center text-xs text-navy-500 dark:text-navy-400">
                    <UserGroupIcon className="h-3.5 w-3.5 mr-1" />
                    <span>{group.members.toLocaleString()} members</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button className="mt-4 w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors font-medium font-montserrat text-sm">
              Explore More Style Groups
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
