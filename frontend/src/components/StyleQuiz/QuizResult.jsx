import { motion } from 'framer-motion';

export default function QuizResult({ result, onRestartQuiz }) {
  if (!result) return null;
  
  const { style, title, description, characteristics, celebrities, imageUrl, recommendations } = result;
  
  return (
    <div className="bg-white dark:bg-navy-800 rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary-500 to-primary-600">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover mix-blend-overlay opacity-60"
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
          <h2 className="text-3xl font-bold font-playfair mb-2">Your Style Profile</h2>
          <h3 className="text-4xl font-bold font-playfair">{title}</h3>
        </div>
      </div>
      
      <div className="p-6 md:p-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-navy-700 dark:text-navy-200 mb-6 font-inter">
            {description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold text-navy-900 dark:text-white mb-3 font-montserrat">
                Key Characteristics
              </h4>
              <ul className="space-y-2">
                {characteristics.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mr-2 text-xs">
                      ✓
                    </span>
                    <span className="text-navy-700 dark:text-navy-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-navy-900 dark:text-white mb-3 font-montserrat">
                Style Icons
              </h4>
              <ul className="space-y-2">
                {celebrities.map((celeb, index) => (
                  <li key={index} className="text-navy-700 dark:text-navy-200">
                    {celeb}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mb-8">
            <h4 className="text-lg font-bold text-navy-900 dark:text-white mb-3 font-montserrat">
              Recommendations for You
            </h4>
            <div className="bg-navy-50 dark:bg-navy-700/50 rounded-lg p-4">
              <ul className="space-y-3">
                {recommendations.map((rec, index) => (
                  <li key={index} className="text-navy-700 dark:text-navy-200">
                    <span className="font-medium text-primary-600 dark:text-primary-400">{rec.category}:</span> {rec.items.join(', ')}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestartQuiz}
              className="px-6 py-3 bg-white dark:bg-navy-700 text-navy-700 dark:text-navy-200 border border-navy-300 dark:border-navy-600 rounded-md hover:bg-navy-50 dark:hover:bg-navy-600 transition-colors"
            >
              Retake Quiz
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Apply to My Profile
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
