import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
import ProgressBar from './ProgressBar';
import { quizQuestions, styleProfiles } from './quizData';

export default function StyleQuiz() {
  console.log('StyleQuiz component rendered');
  console.log('quizQuestions:', quizQuestions);
  console.log('styleProfiles:', styleProfiles);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [styleResult, setStyleResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Calculate progress percentage
  const progress = Math.round((currentQuestionIndex / quizQuestions.length) * 100);

  // Handle answer selection
  const handleAnswer = (questionId, answerId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
    
    // Move to next question or complete quiz
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeQuiz();
    }
  };

  // Handle previous question navigation
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate style profile based on answers
  const completeQuiz = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const styleScores = calculateStyleScores();
      const topStyle = Object.entries(styleScores).sort((a, b) => b[1] - a[1])[0][0];
      setStyleResult(styleProfiles[topStyle]);
      setQuizCompleted(true);
      setLoading(false);
    }, 1500);
  };

  // Calculate scores for each style based on answers
  const calculateStyleScores = () => {
    const scores = {
      classic: 0,
      casual: 0,
      bohemian: 0,
      minimalist: 0,
      streetwear: 0,
      romantic: 0,
      athleisure: 0,
      preppy: 0
    };

    // Map each answer to style points
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = quizQuestions.find(q => q.id === questionId);
      if (question) {
        const answer = question.options.find(o => o.id === answerId);
        if (answer && answer.stylePoints) {
          Object.entries(answer.stylePoints).forEach(([style, points]) => {
            scores[style] += points;
          });
        }
      }
    });

    return scores;
  };

  // Restart the quiz
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuizCompleted(false);
    setStyleResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-navy-900 dark:text-white font-playfair mb-4">
          Discover Your Personal Style
        </h1>
        <p className="text-lg text-navy-600 dark:text-navy-300 font-inter">
          Answer a few questions to find your unique fashion personality
        </p>
      </div>

      {!quizCompleted ? (
        <div className="bg-white dark:bg-navy-800 rounded-xl shadow-lg overflow-hidden">
          <ProgressBar progress={progress} />
          
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QuizQuestion
                  question={quizQuestions[currentQuestionIndex]}
                  onAnswer={handleAnswer}
                  selectedAnswer={answers[quizQuestions[currentQuestionIndex].id]}
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentQuestionIndex === 0
                    ? 'text-navy-400 dark:text-navy-600 cursor-not-allowed'
                    : 'text-navy-700 dark:text-navy-200 hover:bg-navy-100 dark:hover:bg-navy-700'
                }`}
              >
                Previous
              </button>
              
              <div className="text-sm text-navy-500 dark:text-navy-400 self-center">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </div>
              
              {currentQuestionIndex === quizQuestions.length - 1 && !answers[quizQuestions[currentQuestionIndex].id] && (
                <button
                  type="button"
                  onClick={completeQuiz}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  Complete Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-navy-600 dark:text-navy-300">Analyzing your style profile...</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <QuizResult result={styleResult} onRestartQuiz={handleRestartQuiz} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
