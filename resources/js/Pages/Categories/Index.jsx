// Core Inertia and Layout imports
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

// UI Components
import Dropdown from '@/Components/Dropdown';
import ConfirmationPopup from '@/Components/ConfirmationPopup';
import SuccessPopup from '@/Components/SuccessPopup';
import ErrorPopup from '@/Components/ErrorPopup';
import PageHeader from '@/Components/PageHeader';

/**
 * Index Component - Displays and manages the categories list
 *
 * @param {Array} categories - Array of category object from the backend
 *
 * {{ categories }} is a prop from CategoryController's index method.
 */
export default function Index({ categories }) {
    // State management for delete confirmation and success/error popups
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const { flash } = usePage().props;

    // Handler function for category deletion
    const confirmDelete = (category) => {
        setCategoryToDelete(category);
        setShowConfirmation(true);
    };

    // Executes the delete operation via Inertia router
    const handleDelete = () => {
        router.delete(route('categories.destroy', categoryToDelete.category_id), {
            preserveScroll: true,
            onSuccess: (page) => {
                setShowConfirmation(false);
                setCategoryToDelete(null);

                // Show error popup if there's a flash error, otherwise show success
                if (page.props.flash?.error) {
                    setErrorMessage(page.props.flash.error);
                    setShowErrorPopup(true);
                } else {
                    setShowSuccessPopup(true);
                }
            },
            onError: () => {
                setShowConfirmation(false);
                setCategoryToDelete(null);
                setShowErrorPopup(true);
            }
        });
    };

    // Cancels the delete operation
    const cancelDelete = () => {
        setShowConfirmation(false);
        setCategoryToDelete(null);
    };

    // Called after successful deletion and when the user closes the success popup
    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
        router.visit(route('categories.index'));
    };

    // Called when the user closes the error popup
    const closeErrorPopup = () => {
        setShowErrorPopup(false);
        setErrorMessage('');
    };

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    backRoute={route('view')}
                    backLabel="View"
                    sectionLabel="Categories"
                    cancelRoute={route('view')}
                />
            }
        >
            <Head title="Categories" />

            <div className="py-6 sm:py-12 pl-2 pr-2 dark:bg-gray-700">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-5 flex justify-between items-center">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-white pl-3 sm:pl-0">
                            Categories
                        </h2>
                        <Link
                            href={route('categories.create')}
                            className="inline-flex items-center rounded-md border border-transparent
                                    bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                                    mr-3 sm:mr-0 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                        >
                            Add new category
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                        {categories && categories.length > 0 ? (
                            categories.map((category) => (
                                <div
                                    key={category.category_id}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                {category.category_name}
                                            </h3>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    </svg>
                                                </button>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Link
                                                    href={route('categories.edit', category.category_id)}
                                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 dark:focus:bg-gray-700"
                                                >
                                                    Edit
                                                </Link>
                                                <Dropdown.Link
                                                    as="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        confirmDelete(category);
                                                    }}
                                                    className="text-red-600 dark:text-red-400 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 dark:focus:bg-gray-700"
                                                >
                                                    Delete
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {category.category_description || 'No description provided'}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                                <p className="text-gray-500 dark:text-gray-400">No categories found. Create one to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmationPopup
                isVisible={showConfirmation}
                onConfirm={handleDelete}
                onCancel={cancelDelete}
                message="Are you sure you want to delete this category? This action cannot be undone."
            />

            <SuccessPopup
                isVisible={showSuccessPopup}
                onClose={closeSuccessPopup}
                message="Category deleted successfully!"
            />

            <ErrorPopup
                isVisible={showErrorPopup}
                onClose={closeErrorPopup}
                message={errorMessage || "An error occurred while deleting the category."}
            />
        </AuthenticatedLayout>
    );
}
