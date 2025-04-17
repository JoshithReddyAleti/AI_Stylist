import { motion } from 'framer-motion';

export default function ProgressBar({ progress }) {
  return (
    <div className="w-full h-2 bg-navy-100 dark:bg-navy-700">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
        className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
      />
    </div>
  );
}
