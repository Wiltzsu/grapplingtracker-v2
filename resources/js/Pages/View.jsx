import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function View() {
    const [isOpen, setIsOpen] = useState(false);

    // These routes lead to their respective controller's create-method
    const options = [
        { name: 'Category', route: 'categories.index' },
        { name: 'Class', route: 'trainingclasses.index' },
        { name: 'Technique', route: 'techniques.index' },
        { name: 'Position', route: 'positions.index' },
    ];

    return (
        <AuthenticatedLayout
            // Navigation breadcrumb
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

                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 mt-5 flex justify-center">
                                <div className="w-[600px]">
                                    <div className="relative mt-6">
                                        <button
                                            onClick={() => setIsOpen(!isOpen)}
                                            className="inline-flex w-48 justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Select what to view
                                            <svg
                                                className="-mr-1 ml-2 h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>

                                        {isOpen && (
                                            <div className="absolute z-10 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div className="py-1" role="menu">
                                                    {options.map((option) => (
                                                        <Link
                                                            key={option.name}
                                                            href={route(option.route)}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                            role="menuitem"
                                                        >
                                                            {option.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-8 mt-16">
                                        <p className="text-lg text-gray-600">
                                            Select the topic you want to view.
                                        </p>
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
