import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { EyeIcon } from '@heroicons/react/24/outline';

export default function View({ stats }) {
    const options = [
        {
            name: 'View training sessions',
            route: 'trainingclasses.index',
            description: 'View all sessions',
            icon: <EyeIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        },
        {
            name: 'View techniques',
            route: 'techniques.index',
            description: 'View all techniques',
            icon: <EyeIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        },
        {
            name: 'View positions',
            route: 'positions.index',
            description: 'View all positions',
            icon: <EyeIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        },
        {
            name: 'View categories',
            route: 'categories.index',
            description: 'View all categories',
            icon: <EyeIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-lg font-semibold leading-tight text-gray-800 dark:text-white">
                    View
                </h2>
            }
        >
            <Head title="View items" />

            <div className="py-6 sm:py-12 pr-2 pl-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {/* Add a welcome section */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Welcome back!
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            What would you like to view in your training log today?
                        </p>
                    </div>

                    {/* Quick Actions Section */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            {options.map((option) => (
                                <Link
                                    key={option.name}
                                    href={route(option.route)}
                                    method="get"
                                    data={option.from ? { from: option.from } : {}}
                                    className="group flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 border border-gray-100 dark:border-gray-700"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="p-2 bg-indigo-100 rounded-lg dark:bg-indigo-900 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors duration-200">
                                            {option.icon}
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                                                {option.name}
                                            </span>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                {option.description}
                                            </p>
                                        </div>
                                        <svg
                                            className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="mt-8 mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Overview
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.categories}</p>
                                    </div>
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sessions</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.training_classes}</p>
                                    </div>
                                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                        <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Techniques</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.techniques}</p>
                                    </div>
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                        <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Positions</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.positions}</p>
                                    </div>
                                    <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                                        <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
