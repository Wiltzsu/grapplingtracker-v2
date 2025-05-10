// Core Inertia and Layout imports
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
/**
 * Head: a component used to manage the document head (similar to HTML's <head> section)
 * Link: A component that provides client-side navigation between pages
 * router: A utility object that provides programmatic navigation methods
 * usePage: A React hook that gives access to the current user's props and other Inertia-specific data
 */
import { Head, Link, router, usePage } from '@inertiajs/react';
// useState: Fundamental React hook that allows you to add state management to functional components
import { useState } from 'react';

// UI Components
import CancelIcon from '@/../../resources/svg/cancel.svg';
import Dropdown from '@/Components/Dropdown';
import ConfirmationPopup from '@/Components/ConfirmationPopup';
import SuccessPopup from '@/Components/SuccessPopup';
import ErrorPopup from '@/Components/ErrorPopup';

/**
 * Index Component - Displays and manages the techniques list
 *
 * @param {Array} techniques - Array of technique objects
 *
 * {{ techniques }} is a prop from TechniqueController's index method
 */
export default function Index({ techniques }) {
    /**
     * State management for delete confirmation and success popup
     * https://react.dev/reference/react/useState
     */
    const [showConfirmation, setShowConfirmation]   = useState(false);
    const [showSuccessPopup, setShowSuccessPopup]   = useState(false);
    const [showErrorPopup, setShowErrorPopup]       = useState(false);
    const [techniqueToDelete, setTechniqueToDelete] = useState(null);
    const [errorMessage, setErrorMessage]           = useState('');

    /**
     * Collects the errors and makes them accessible
     * https://inertiajs.com/validation#error-handling
     */
    const { flash } = usePage().props;

    // Handler function for technique deletion
    const confirmDelete = (technique) => {
        setTechniqueToDelete(technique); // Sets the technique to delete based on id
        setShowConfirmation(true);       // Shows the confirmation popup
    }

    /**
     * Handler function for when user confirms deletion
     */
    const handleDelete = () => {
        /**
         * Sends a DELETE request to the server using the Inertia router
         * Generates the route URL like /techniques/1
         */
        router.delete(route('techniques.destroy', techniqueToDelete.technique_id), {
            preserveScroll: true, // Maintains scroll technique after request
            onSuccess: (page) => {
                // Clear states
                setShowConfirmation(false); // Hides the confirmation dialog
                setTechniqueToDelete(null); // Clears the technique that was being deleted from the state

                // Check if there are errors in the response
                if (flash?.error) {
                    setErrorMessage(flash.error);
                    setShowErrorPopup(true);
                } else {
                    setShowSuccessPopup(true); // Show success popup instead of just hiding confirmation
                }
            },
            onError: () => {
                setShowConfirmation(false);
                setTechniqueToDelete(null);
                setShowErrorPopup(true);
            }
        });
    };

    /**
     * Cancels the delete operation by resetting the confirmation dialog state
     * and clearing the selected technique from memory.
     */
    const cancelDelete = () => {
        setShowConfirmation(false);
        setTechniqueToDelete(null);
    };

    /**
     * Called after successful deletion and when the user closes the popup.
     * Hides the success message and performs a full page refresh to
     * ensure the techniques list is up-to-date.
     */
    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
        router.visit(route('techniques.index'));
    }
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
                    <span>Technique</span>
                    <img
                        src={CancelIcon}
                        alt="Cancel"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => window.history.back()}
                    />
                </div>
            }
        >
            <Head title="Techniques" />

            <div className="py-0 sm:py-6 pr-2 pl-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8 mt-5 flex justify-between items-center">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 pl-3 sm:pl-0">
                            Techniques
                        </h2>
                        <Link
                            href={route('techniques.create')}
                            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2
                            text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
                            focus:ring-offset-2 mr-3 mr:sm-0"
                        >
                            Add New Technique
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {techniques && techniques.length > 0 ? (
                            techniques.map((techniques) => (
                                <div
                                    key={techniques.technique_id}
                                    className="bg-white rounded-lg shadow-sm p-6 hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-2 bg-indigo-100 rounded-lg">
                                                <svg
                                                    className="w-6 h-6 text-indigo-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {techniques.technique_name}
                                            </h3>
                                        </div>
                                        <Dropdown className="z-[9999]">
                                            <Dropdown.Trigger>
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    </svg>
                                                </button>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Link
                                                    href={route('techniques.edit', techniques.technique_id)}
                                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                                >
                                                    Edit
                                                </Link>
                                                <Dropdown.Link
                                                    as="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        confirmDelete(techniques);
                                                    }}
                                                >
                                                    Delete
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 mt-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-500">Location</span>
                                            <span className="text-sm font-medium text-gray-900">{techniques.location}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-500">Description</span>
                                            <span className="text-sm font-medium text-gray-900">{techniques.technique_description}</span>
                                        </div>
                                        <div class="grid grid-cols-2 gap-3 mt-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-500">Category</span>
                                                <span className="text-sm font-medium text-gray-900">{techniques.category_name}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-500">Class</span>
                                                <span className="text-sm font-medium text-gray-900">{techniques.location}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-500">Position</span>
                                                <span className="text-sm font-medium text-gray-900">{techniques.position_name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-white rounded-lg">
                                <p className="text-gray-500">No techniques found. Create one to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmationPopup
                isVisible={showConfirmation}
                onConfirm={handleDelete}
                onCancel={cancelDelete}
                message="Are you sure you want to delete this technique? This action cannot be undone."
            />

            <SuccessPopup
                isVisible={showSuccessPopup}
                onClose={closeSuccessPopup}
                message="Technique deleted successfully!"
            />

            <ErrorPopup
                isVisible={showErrorPopup}
                onClose={() => setShowErrorPopup(false)}
                message={errorMessage || "An error occurred while deleting the technique"}
            />

        </AuthenticatedLayout>
    )
}
