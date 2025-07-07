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
 * @param {Array} techniques - Array of technique objects from the backend
 *
 * {{ techniques }} is a prop from TechniqueController's index method
 */
export default function Index({ techniques }) {
    // State management for delete confirmation and success/error popups
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [techniqueToDelete, setTechniqueToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [search, setSearch] = useState('');

    const { flash } = usePage().props;

    // Handler function for technique deletion
    const confirmDelete = (technique) => {
        setTechniqueToDelete(technique);
        setShowConfirmation(true);
    };

    // Executes the delete operation via Inertia router
    const handleDelete = () => {
        router.delete(route('techniques.destroy', techniqueToDelete.technique_id), {
            preserveScroll: true,
            onSuccess: (page) => {
                setShowConfirmation(false);
                setTechniqueToDelete(null);

                if (page.props.flash && page.props.flash.error) {
                    setErrorMessage(page.props.flash.error);
                    setShowErrorPopup(true);
                } else {
                    setShowSuccessPopup(true);
                }
            },
            onError: (errors) => {
                setShowConfirmation(false);
                setTechniqueToDelete(null);
                setShowErrorPopup(true);
            }
        });
    };

    // Cancels the delete operation
    const cancelDelete = () => {
        setShowConfirmation(false);
        setTechniqueToDelete(null);
    };

    // Called after successful deletion and when the user closes the success popup
    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
        router.visit(route('techniques.index'));
    };

    // Called when the user closes the error popup
    const closeErrorPopup = () => {
        setShowErrorPopup(false);
        setErrorMessage('');
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('view')}
                        className="text-gray-600 hover:text-gray-900 dark:text-white"
                    >
                        View
                    </Link>
                    <span className="text-red-900 dark:text-gray-400">|</span>
                    <span className="dark:text-white">Techniques</span>
                    <img
                        src={CancelIcon}
                        alt="Cancel"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => router.visit(route('view'))}
                    />
                </div>
            }
        >
            <Head title="Techniques" />

            <div className="py-6 sm:py-12 pl-2 pr-2 dark:bg-gray-700">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-5 flex justify-between items-center">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-white pl-3 sm:pl-0">
                            Techniques
                        </h2>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                        <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        router.get(
                                            route('techniques.index'),
                                            { search: e.target.value },
                                            { preserveState: true, preserveScroll: true }
                                        );
                                    }}
                                    placeholder="Search techniques..."
                                    className="w-full sm:w-64 px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                        <Link
                            href={route('techniques.create')}
                            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600
                            px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2
                            focus:ring-indigo-500 focus:ring-offset-2 mr-3 sm:mr-0 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                        >
                            Add New Technique
                        </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                        {techniques && techniques.length > 0 ? (
                            techniques.map((technique) => (
                                <div
                                    key={technique.technique_id}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                {technique.technique_name}
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
                                                    href={route('techniques.edit', technique.technique_id)}
                                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 dark:focus:bg-gray-700"
                                                >
                                                    Edit
                                                </Link>
                                                <Dropdown.Link
                                                    as="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        confirmDelete(technique);
                                                    }}
                                                    className="text-red-600 dark:text-red-400 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 dark:focus:bg-gray-700"
                                                >
                                                    Delete
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-pre-line">
                                        {technique.technique_description || 'No description provided'}
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {technique.position_name && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                {technique.position_name}
                                            </span>
                                        )}
                                        {technique.category_name && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                {technique.category_name}
                                            </span>
                                        )}
                                        {technique.location && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-purple-900 dark:text-green-200">
                                                {technique.location}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                                <p className="text-gray-500 dark:text-gray-400">No techniques found. Create one to get started.</p>
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
                onClose={closeErrorPopup}
                message={errorMessage || "An error occurred while deleting the technique."}
            />
        </AuthenticatedLayout>
    );
}
