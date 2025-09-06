import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function Dashboard({ recent_classes, recentActivity }) {
    const options = [
        {
            name: 'Add training session',
            route: 'trainingclasses.create',
            description: 'Add a new session',
            icon: <PlusIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        },
        {
            name: 'Add technique',
            route: 'techniques.create',
            description: 'Add a new technique',
            icon: <PlusIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        },
        {
            name: 'Add position',
            route: 'positions.create',
            from: 'dashboard',
            description: 'Add a new position',
            icon: <PlusIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        },
        {
            name: 'Add category',
            route: 'categories.create',
            description: 'Add a new category',
            icon: <PlusIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        },
    ];


    // Function to format the activity message
    const formatActivityMessage = (item, type) => {
        switch(type) {
            case 'categories':
                return (
                    <>
                        <span className="font-bold">Added new category:</span> {item.category_name}
                    </>
                );
            case 'training_classes':
                return (
                    <>
                        <span className="font-bold">Created new session:</span> {item.instructor ? `${item.instructor}'s session` : 'No instructor'}
                    </>
                );
            case 'techniques':
                return (
                    <>
                        <span className="font-bold">Added new technique:</span> {item.technique_name}
                    </>
                );
            case 'positions':
                return (
                    <>
                        <span className="font-bold">Added new position:</span> {item.position_name}
                    </>
                );
            default:
                return '';
        }
    };

    // Combine and sort all activities
    const allActivities = Object.entries(recentActivity).flatMap(([type, items]) =>
        items.map(item => ({
            message: formatActivityMessage(item, type),
            timestamp: new Date(item.created_at),
            type
        }))
    ).sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-lg font-semibold leading-tight text-gray-800 dark:text-white">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6 sm:py-12 pr-2 pl-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {/* Add a welcome section */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Welcome back!
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            What would you like to add to your training log today?
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

                    {/* Recent Activity Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Recent Activity
                        </h2>
                        {allActivities.length > 0 ? (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {allActivities.map((activity, index) => (
                                        <li
                                            key={`${activity.type}-${index}`}
                                            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className="text-gray-700 dark:text-gray-200 px-2">
                                                    {activity.message}
                                                </span>
                                                <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-center">
                                                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-100 dark:border-gray-700">
                                <div className="text-gray-400 dark:text-gray-500 mb-2">
                                    <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">No recent activity found.</p>
                                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Start adding content to see your activity here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
