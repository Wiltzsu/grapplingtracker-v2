import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { Link } from '@inertiajs/react';

export default function View() {
    const options = [
        {
            name: 'Category',
            route: 'categories.index',
            description: 'View all categories',
            icon: 'M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6z'
        },
        {
            name: 'Class',
            route: 'trainingclasses.index',
            description: 'View all training classes',
            icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'
        },
        {
            name: 'Technique',
            route: 'techniques.index',
            description: 'View all techniques',
            icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
        },
        {
            name: 'Position',
            route: 'positions.index',
            description: 'View all positions',
            icon: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15'
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('view')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        View
                    </Link>
                </div>
            }
        >
            <Head title="View items" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8 mt-5">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            View items
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {options.map((option) => (
                            <Link
                                key={option.name}
                                href={route(option.route)}
                                className="flex flex-col p-6 bg-white rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <svg
                                            className="w-6 h-6 text-indigo-600"
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
                                    <span className="text-lg font-medium text-gray-900">
                                        {option.name}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">
                                    {option.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
