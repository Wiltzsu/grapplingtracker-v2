import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';

export default function Dashboard({ recent_classes, recentActivity }) {
    const options = [
        {
            name: 'Add session',
            route: 'trainingclasses.create',
            description: 'Add a new session',
            icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
        },
        {
            name: 'Add technique',
            route: 'techniques.create',
            description: 'Add a new technique',
            icon: 'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z'
        },
        {
            name: 'Add position',
            route: 'positions.create',
            description: 'Add a new position',
            icon: 'M5.25 4.5h13.5M5.25 9h13.5m-13.5 4.5h13.5M5.25 19.5h13.5'
        },
        {
            name: 'Add category',
            route: 'categories.create',
            description: 'Add a new category',
            icon: 'M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122'
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
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-white">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6 sm:py-12 pr-2 pl-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                        {options.map((option) => (
                            <Link
                                key={option.name}
                                href={route(option.route)}
                                className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-2 bg-indigo-100 rounded-lg dark:bg-indigo-900">
                                        <svg
                                            className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d={option.icon}
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                                        {option.name}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {option.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Classes Section */}
            <div className="pb-8 pr-2 pl-2">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Recent Activity Section */}
                    <div className="">
                        <h3 className="text-lg font-semibold dark:text-white mb-4">Recent Activity</h3>
                        {allActivities.length > 0 ? (
                            <ul className="space-y-3">
                                {allActivities.map((activity, index) => (
                                    <li
                                        key={`${activity.type}-${index}`}
                                        className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow flex justify-between items-center"
                                    >
                                        <span className="text-gray-700 dark:text-gray-200">
                                            {activity.message}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">No recent activity found.</p>
                        )}
                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}
