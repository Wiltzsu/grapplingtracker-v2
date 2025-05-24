import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Dashboard({ recent_classes }) {
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
    ];

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
            <div className="pb-12 pr-2 pl-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg dark:bg-gray-800">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent sessions</h2>
                            {recent_classes.length > 0 ? (
                                <div className="space-y-4">
                                    {recent_classes.map((training_class) => (
                                        <div
                                            key={training_class.class_id}
                                            className="border rounded-lg p-4 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium dark:text-white">{training_class.location || 'No location'}</h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        {training_class.class_date} - {training_class.instructor || 'No instructor'}
                                                    </p>
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-white">
                                                    {training_class.class_duration} min
                                                </div>
                                            </div>
                                            {training_class.techniques?.length > 0 && (
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-600 dark:text-white">Techniques:</p>
                                                    <div className="flex flex-wrap gap-2 mt-1">
                                                        {training_class.techniques.map((technique) => (
                                                            <span
                                                                key={technique.technique_id}
                                                                className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded dark:bg-indigo-800 dark:text-indigo-100"
                                                            >
                                                                {technique.technique_name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">No recent training classes found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
