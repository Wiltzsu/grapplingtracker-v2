// Core Inertia and Layout imports
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

// UI Components
import CancelIcon from '@/../../resources/svg/cancel.svg';
import Dropdown from '@/Components/Dropdown';
import ConfirmationPopup from '@/Components/ConfirmationPopup';
import SuccessPopup from '@/Components/SuccessPopup';

/**
 * Index Component - Displays and manages the categories list
 *
 * @param {Array} categories - Array of category object from the backend
 *
 * {{ categories }} is a prop from CategoryController's index method.
 */
export default function Index({ categories }) {
    // State management for delete confirmation and success popups
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    // Handler function for category deletion
    const confirmDelete = (category) => {
        setCategoryToDelete(category);              // Sets the category to delete based on id
        setShowConfirmation(true);                  // Shows the confirmation popup
    };

    // Executes the delete operation via Inertia router
    const handleDelete = () => {
        router.delete(route('categories.destroy', categoryToDelete.category_id), {
            onSuccess: () => {
                setShowConfirmation(false);         // Closes the confirmation popup
                setCategoryToDelete(null);          // Resets the category to delete to null
                setShowSuccessPopup(true);          // Shows success popup on successful delete
            },
        });
    };

    // Cancels the delete operation
    const cancelDelete = () => {
        setShowConfirmation(false);                 // Hides the confirmation popup
        setCategoryToDelete(null);                  // Clears the category that was going to be deleted
    };

    // Called after successful deletion and when the user closes the success popup
    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);                 // Hides the success popup
        router.visit(route('categories.index'));    // Refreshes the page to show updated category list
    };

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
                    <span className="text-red-900">|</span>
                    <span>Category</span>
                    <img
                        src={CancelIcon}
                        alt="Cancel"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => window.history.back()}
                    />
                </div>
            }
        >
            <Head title="Categories" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 mt-5 flex justify-between items-center">
                                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                    Categories
                                </h2>
                                <Link
                                    href={route('categories.create')}
                                    className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                >
                                    Add New Category
                                </Link>
                            </div>

                            {categories && categories.length > 0 ? (
                                <div className="mt-6 divide-y">
                                    <div class="grid grid-cols-6 w-full gap-4 mb-4">
                                        <h2 className="text-lg font-semibold col-span-2">
                                            Name
                                        </h2>
                                        <h2 className="text-lg font-semibold col-span-4">
                                            Description
                                        </h2>
                                    </div>

                                    {categories.map((category) => (
                                        <div
                                            key={category.category_id}
                                            className="flex justify-between items-center py-4"
                                        >
                                            <div className="grid grid-cols-6 w-full gap-4 relative">
                                                <h3 className="text-lg font-semibold col-span-2">
                                                    {category.category_name}
                                                </h3>
                                                <p className="text-gray-600 col-span-3">
                                                    {category.category_description}
                                                </p>
                                                <div className="flex justify-end">
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <button>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                </svg>
                                                            </button>
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Content>
                                                            <Link
                                                                href={route('categories.edit', category.category_id)}
                                                                className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
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
                                                            >
                                                                Delete
                                                            </Dropdown.Link>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center mt-6">
                                    No categories found. Create one to get started.
                                </p>
                            )}
                        </div>
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
        </AuthenticatedLayout>
    );
}
