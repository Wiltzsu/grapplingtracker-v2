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
 * Index Component - Displays and manages the training classes list
 *
 * @param {Array} training_classes - Array of training class object
 *
 * {{ training_classes }} is a prop from TrainingClassController's index method
 */
export default function Index({ training_classes }) {
    // State management for delete confirmation and success popup
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup]     = useState(false);
    const [trainingClassToDelete, setTrainingClassToDelete] = useState(null);

    const { errors } = usePage().props;

    // Handler function for training class deletion
    const confirmDelete = (training_class) => {
        setTrainingClassToDelete(training_class);    // Sets the training class to delete based on id
        setShowConfirmation(true);              // Shows the confirmation popup
    };

    // Executes the delete operation via the Inertia router
    const handleDelete = () => {
        router.delete(route('trainingclasses.destroy', trainingClassToDelete.class_id), {
            onSuccess: (page) => {
                // Check if there are errors in the response
                if (page.props.errors && page.props.errors.error) {
                    setShowConfirmation(false);
                    setTrainingClassToDelete(null);
                    setShowErrorPopup(true);
                } else {
                    setShowConfirmation(false);
                    setTrainingClassToDelete(null);
                    setShowSuccessPopup(true);
                }
            },
            onError: () => {
                setShowConfirmation(false);
                setTrainingClassToDelete(null);
                setShowErrorPopup(true);
            }
        });
    };

    // Cancels the delete operation
    const cancelDelete = () => {
        setShowConfirmation(false);                 // Hides the confirmation popup
        setTrainingClassToDelete(null);             // Clears the training class that was going to be deleted
    };

    // Called after successful deletion and when the user closes the success popup
    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);                         // Hides the success popup
        router.visit(route('trainingclasses.index'));       // Refreshes the page to show updated training class list
    };

    // Called after showing user the error popup
    const closeErrorPopup = () => {
        setShowErrorPopup(false);                           // Hides the error popup
        router.visit(route('trainingclasses.index'));       // Redirects user back to the edit view
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
                    <span>Training Class</span>
                    <img
                        src={CancelIcon}
                        alt="Cancel"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => window.history.back()}
                    />
                </div>
            }
        >
            <Head title="Training Classes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8 mt-5 flex justify-between items-center">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Classes
                        </h2>
                        <Link
                            href={route('trainingclasses.create')}
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                        >
                            Add New Training Class
                        </Link>
                    </div>

                    {training_classes && training_classes.length > 0 ? (
                        <div className="mt-6 space-y-4">
                            {training_classes.map((training_class) => (
                                <div
                                    key={training_class.class_id}
                                    className="rounded-lg border border-gray-200 p-4 shadow-sm bg-gray-50"
                                >
                                    <div className="flex justify-between items-start mb-4 ">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">Instructor</span>
                                                <span className="text-gray-900">{training_class.instructor}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">Description</span>
                                                <span className="text-gray-900">{training_class.class_description}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">Location</span>
                                                <span className="text-gray-900">{training_class.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">Date</span>
                                                <span className="text-gray-900">{training_class.class_date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">Duration</span>
                                                <span className="text-gray-900">{training_class.class_duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">Rounds</span>
                                                <span className="text-gray-900">{training_class.rounds}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">Round duration</span>
                                                <span className="text-gray-900">{training_class.round_duration}</span>
                                            </div>
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
                                                    href={route('trainingclasses.edit', training_class.class_id)}
                                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                                >
                                                    Edit
                                                </Link>
                                                <Dropdown.Link
                                                    as="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        confirmDelete(training_class);
                                                    }}
                                                >
                                                    Delete
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center mt-6">
                            No training classes found. Create one to get started.
                        </p>
                    )}
                </div>
            </div>

            <ConfirmationPopup
                isVisible={showConfirmation}
                onConfirm={handleDelete}
                onCancel={cancelDelete}
                message="Are you sure you want to delete this class? This action cannot be undone."
            />

            <SuccessPopup
                isVisible={showSuccessPopup}
                onClose={closeSuccessPopup}
                message="Class deleted successfully!"
            />

            <ErrorPopup
                isVisible={showErrorPopup}
                onClose={() => setShowErrorPopup(false)}
                message={errors?.error || "An error occurred while deleting the class"}
            />

        </AuthenticatedLayout>
    )
}
