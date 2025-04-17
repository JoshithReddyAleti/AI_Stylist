import React from 'react';
import { UserCircleIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-navy-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-navy-700 flex flex-col items-center">
        <UserCircleIcon className="h-20 w-20 text-navy-400 dark:text-navy-200 mb-4" />
        <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">My Profile</h2>
        <p className="text-navy-600 dark:text-navy-300 mb-6">Welcome to your profile page. Here you can view and edit your personal information.</p>
        <div className="w-full space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-700 dark:text-navy-200">Name</label>
            <input className="mt-1 block w-full rounded-md border-gray-300 dark:border-navy-700 bg-gray-50 dark:bg-navy-900 text-navy-900 dark:text-white shadow-sm focus:ring-primary-500 focus:border-primary-500" type="text" value="Jane Doe" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 dark:text-navy-200">Email</label>
            <input className="mt-1 block w-full rounded-md border-gray-300 dark:border-navy-700 bg-gray-50 dark:bg-navy-900 text-navy-900 dark:text-white shadow-sm focus:ring-primary-500 focus:border-primary-500" type="email" value="jane.doe@email.com" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 dark:text-navy-200">Style Preference</label>
            <input className="mt-1 block w-full rounded-md border-gray-300 dark:border-navy-700 bg-gray-50 dark:bg-navy-900 text-navy-900 dark:text-white shadow-sm focus:ring-primary-500 focus:border-primary-500" type="text" value="Casual Chic" readOnly />
          </div>
        </div>
        <button className="mt-8 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"><PencilIcon className="h-5 w-5 mr-2" />Edit Profile</button>
      </div>
    </div>
  );
}
