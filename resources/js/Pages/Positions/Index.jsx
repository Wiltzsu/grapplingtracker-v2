// Core Inertia and Layout imports
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

// UI Components
import CancelIcon from '@/../../resources/svg/cancel.svg';
import Dropdown from '@/Components/Dropdown';
import ConfirmationPopup from '@/Components/ConfirmationPopup';
import SuccessPopup from '@/Components/SuccessPopup';
import ErrorPopup from '@/Components/ErrorPopup';

/**
 * Index Component - Displays and manages the positions list
 *
 * @param {Array} positions - Array of position object
 *
 * {{ positions }} is a prop from PositionController's index method
 */
export default function Index({ positions }) {
    // State management for delete confirmation and success popup
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup]     = useState(false);
    const [positionToDelete, setPositionToDelete] = useState(null);

    const { errors } = usePage().props;

    // Handler function for position deletion
    const confirmDelete = (position) => {
        setPositionToDelete(position);          // Sets the position to delete based on id
        setShowConfirmation(true);              // Shows the confirmation popup
    };

    // Executes the delete operation via the Inertia router
    const handleDelete = () => {
        router.delete(route('positions.destroy', positionToDelete.position_id), {
            onSuccess: (page) => {
                // Check if there are errors in the response
                if (page.props.errors && page.props.errors.error) {
                    setShowConfirmation(false);
                    setPositionToDelete(null);
                    setShowErrorPopup(true);
                } else {
                    setShowConfirmation(false);
                    setPositionToDelete(null);
                    setShowSuccessPopup(true);
                }
            },
            onError: () => {
                setShowConfirmation(false);
                setPositionToDelete(null);
                setShowErrorPopup(true);
            }
        });
    };

    // Cancels the delete operation
    const cancelDelete = () => {
        setShowConfirmation(false);                 // Hides the confirmation popup
        setCategoryToDelete(null);                  // Clears the position that was going to be deleted
    };

    // Called after successful deletion and when the user closes the success popup
    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);                 // Hides the success popup
        router.visit(route('positions.index'));     // Refreshes the page to show updated position list
    };

    // Called after showing user the error popup
    const closeErrorPopup = () => {
        setShowErrorPopup(false);                   // Hides the error popup
        router.visit(route('positions.edit'));      // Redirects user back to the edit view
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
                    <span>Position</span>
                    <img
                        src={CancelIcon}
                        alt="Cancel"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => window.history.back()}
                    />
                </div>
            }
        >
            <Head title="Positions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                                <div className="mb-8 mt-5 flex justify-between items-center">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                        Positions
                                    </h2>
                                    <Link
                                        href={route('positions.create')}
                                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                    >
                                        Add New Position
                                    </Link>
                                </div>

                            {positions && positions.length > 0 ? (
                                <div className="mt-6 divide-y">
                                    <div className="grid grid-cols-6 w-full gap-4 mb-4">
                                        <h2 className="text-lg font-semibold col-span-2">
                                            Name
                                        </h2>
                                        <h2 className="text-lg font-semibold col-span-4">
                                            Description
                                        </h2>
                                    </div>

                                    {positions.map((position) => (
                                        <div
                                            key={position.position_id}
                                            className="flex justify-between items-center py-4"
                                        >
                                            <div className="grid grid-cols-6 w-full gap-4 relative">
                                                <h3 className="text-lg font-semibold col-span-2">
                                                    {position.position_name}
                                                </h3>
                                                <p className="text-gray-600 col-span-3">
                                                    {position.position_description}
                                                </p>
                                                <div className="flex justify-end">
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
                                                                href={route('positions.edit', position.position_id)}
                                                                className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <Dropdown.Link
                                                                as="button"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    confirmDelete(position);
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
                                    No positions found. Create one to get started.
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
                message="Are you sure you want to delete this position? This action cannot be undone."
            />

            <SuccessPopup
                isVisible={showSuccessPopup}
                onClose={closeSuccessPopup}
                message="Position deleted successfully!"
            />

            <ErrorPopup
                isVisible={showErrorPopup}
                onClose={() => setShowErrorPopup(false)}
                message={errors?.error || "An error occurred while deleting the position"}
            />

        </AuthenticatedLayout>
    )
}
