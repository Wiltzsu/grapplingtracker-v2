// Core Inertia and Layout imports
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
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
 * @param {Array} positions - Array of position objects from the backend
 *
 * {{ positions }} is a prop from PositionController's index method
 */
export default function Index({ positions }) {
    // State management for delete confirmation and success/error popups
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [positionToDelete, setPositionToDelete] = useState(null);

    // Handler function for position deletion
    const confirmDelete = (position) => {
        setPositionToDelete(position);
        setShowConfirmation(true);
    };

    // Executes the delete operation via Inertia router
    const handleDelete = () => {
        router.delete(route('positions.destroy', positionToDelete.position_id), {
            onSuccess: (page) => {
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
        setShowConfirmation(false);
        setPositionToDelete(null);
    };

    // Called after successful deletion and when the user closes the success popup
    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
        router.visit(route('positions.index'));
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

            <div className="py-0 sm:py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8 mt-5 flex justify-between items-center">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 pl-3 sm:pl-0">
                            Positions
                        </h2>
                        <Link
                            href={route('positions.create')}
                            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600
                            px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2
                            focus:ring-indigo-500 focus:ring-offset-2 mr-3 sm:mr-0"
                        >
                            Add New Position
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {positions && positions.length > 0 ? (
                            positions.map((position) => (
                                <div
                                    key={position.position_id}
                                    className="bg-white rounded-lg shadow-sm p-6 hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-indigo-100 rounded-lg">
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {position.position_name}
                                            </h3>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    </svg>
                                                </button>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Link
                                                    href={route('positions.edit', position.position_id)}
                                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100"
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
                                    <p className="text-sm text-gray-500">
                                        {position.position_description || 'No description provided'}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-white rounded-lg">
                                <p className="text-gray-500">No positions found. Create one to get started.</p>
                            </div>
                        )}
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
                message="Cannot delete position because it is being used by one or more techniques."
            />
        </AuthenticatedLayout>
    );
}
