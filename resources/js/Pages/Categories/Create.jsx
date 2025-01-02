import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Create() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add New Category
                </h2>
            }
        >
            <Head title="Add Category" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 mt-5">
                                <div className="flex items-center gap-4">
                                    <Link
                                        href={route('add')}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        Add
                                    </Link>
                                    <span className="text-gray-600">|</span>
                                    <span>Category</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
