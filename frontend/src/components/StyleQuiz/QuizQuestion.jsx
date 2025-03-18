import { motion } from 'framer-motion';

export default function QuizQuestion({ question, onAnswer, selectedAnswer }) {
  if (!question) return null;
  
  const { id, text, options, imageUrl, type } = question;
  
  return (
    <div>
      <h2 className="text-xl font-bold text-navy-900 dark:text-white font-playfair mb-2">
        {text}
      </h2>
      
      {imageUrl && (
        <div className="mb-6 rounded-lg overflow-hidden">
          <img 
            src={imageUrl} 
            alt={text} 
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      
      <div className={`grid gap-4 ${type === 'image' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1'} mt-6`}>
        {options.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswer(id, option.id)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all ${
              selectedAnswer === option.id
                ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-50'
                : 'border-navy-200 dark:border-navy-600 hover:border-primary-300 dark:hover:border-primary-700'
            }`}
          >
            {type === 'image' ? (
              <div className="aspect-w-1 aspect-h-1">
                <img 
                  src={option.imageUrl} 
                  alt={option.text} 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity ${
                  selectedAnswer === option.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                }`}>
                  <span className="text-white font-medium">{option.text}</span>
                </div>
              </div>
            ) : (
              <div className={`p-4 text-left ${
                selectedAnswer === option.id
                  ? 'bg-primary-50 dark:bg-primary-900/20'
                  : 'bg-white dark:bg-navy-700 hover:bg-navy-50 dark:hover:bg-navy-600'
              }`}>
                <span className="text-navy-900 dark:text-white font-medium">
                  {option.text}
                </span>
                {option.description && (
                  <p className="mt-1 text-sm text-navy-500 dark:text-navy-300">
                    {option.description}
                  </p>
                )}
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
