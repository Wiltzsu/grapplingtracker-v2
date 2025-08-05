import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { CalendarDaysIcon, SparklesIcon, FolderIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

export default function View({ stats }) {
    const options = [
        {
            name: 'Training sessions',
            route: 'trainingclasses.index',
            description: 'View all sessions',
            icon: <CalendarDaysIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        },
        {
            name: 'Techniques',
            route: 'techniques.index',
            description: 'View all techniques',
            icon: <SparklesIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        },
        {
            name: 'Positions',
            route: 'positions.index',
            description: 'View all positions',
            icon: <Squares2X2Icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        },
        {
            name: 'Categories',
            route: 'categories.index',
            description: 'View all categories',
            icon: <FolderIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-white">
                    View
                </h2>
            }
        >
            <Head title="View items" />

            <div className="py-6 sm:py-12 pr-2 pl-2 dark:bg-gray-700">
                <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                        {options.map((option) => (
                            <Link
                                key={option.name}
                                href={route(option.route)}
                                className="group flex flex-col p-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:-translate-y-1 transition-all duration-200"
                            >
                                <div className="flex items-center gap-5 mb-4">
                                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/50 rounded-xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 transition-colors duration-200">
                                        {option.icon}
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                                            {option.name}
                                        </span>
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

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 mt-10">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col items-center">
                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                {stats.categories}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Categories</span>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col items-center">
                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                {stats.training_classes}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Sessions</span>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col items-center">
                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                {stats.techniques}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Techniques</span>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col items-center">
                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                {stats.positions}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Positions</span>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
