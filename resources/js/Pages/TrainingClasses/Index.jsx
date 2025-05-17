// Core Inertia and Layout imports
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

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
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [trainingClassToDelete, setTrainingClassToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [perPage, setPerPage] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('perPage') || '15', 10);
    });
    const [search, setSearch] = useState('');

    const { flash } = usePage().props;

    // Handler function for training class deletion
    const confirmDelete = (training_class) => {
        setTrainingClassToDelete(training_class);
        setShowConfirmation(true);
    };

    /**
     * Handler function for when user confirms deletion
     */
    const handleDelete = () => {
        // Send DELETE request to the server using Inertia router
        // route('trainingclasses.destroy', id) generates the URL like /trainingclasses/1
        router.delete(route('trainingclasses.destroy', trainingClassToDelete.class_id), {
            preserveScroll: true, // Maintain scroll position after request
            onSuccess: (page) => {
                // Hide the confirmation popup
                setShowConfirmation(false);
                // Clear the class that was being deleted from state
                setTrainingClassToDelete(null);

                // Check if there's an error message in the response
                if (page.props.flash && page.props.flash.error) {
                    // If there's an error, store it and show error popup
                    setErrorMessage(page.props.flash.error);
                    setShowErrorPopup(true);
                } else {
                    // If successful, show success popup
                    setShowSuccessPopup(true);
                }
            },
            // If the request fails (network error, etc)
            onError: (errors) => {
                // Hide the confirmation popup
                setShowConfirmation(false);
                // Clear the class that was being deleted
                setTrainingClassToDelete(null);
                // Show error popup
                setShowErrorPopup(true);
            }
        });
    };

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (hours === 0) {
            return `${minutes} minutes`;
        }

        if (remainingMinutes === 0) {
            return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
        }

        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${remainingMinutes} ${remainingMinutes === 1 ? 'minute' : 'minutes'}`;
    }

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
        setShowErrorPopup(false);
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
                    <span>Session</span>
                    <img
                        src={CancelIcon}
                        alt="Cancel"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => window.history.back()}
                    />
                </div>
            }
        >
            <Head title="Sessions" />

            <div className="py-0 sm:py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pr-2 pl-2">
                    <div className="mb-5 mt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 pl-3 sm:pl-0">
                            Sessions
                        </h2>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        router.get(
                                            route('trainingclasses.index'),
                                            { search: e.target.value, perPage },
                                            { preserveState: true, preserveScroll: true }
                                        );
                                    }}
                                    placeholder="Search sessions..."
                                    className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <Link
                                href={route('trainingclasses.create')}
                                className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2
                                text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
                                focus:ring-offset-2"
                            >
                                Add new session
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {training_classes.data && training_classes.data.length > 0 ? (
                            training_classes.data.map((training_class) => (
                                <div
                                    key={training_class.class_id}
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
                                                {training_class.location}
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

                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-500">Instructor</span>
                                            <span className="text-sm font-medium text-gray-900">{training_class.instructor}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-500">Date</span>
                                            <span className="text-sm font-medium text-gray-900">{training_class.class_date}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-500">Duration</span>
                                            <span className="text-sm font-medium text-gray-900">{formatDuration(training_class.class_duration)}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-500">Rounds</span>
                                            {training_class.rounds && training_class.rounds > 0 ? (
                                                <span className="text-sm font-medium text-gray-900">{training_class.rounds} × {training_class.round_duration}</span>

                                            ) : (
                                                <span className="text-sm text-gray-500">No rounds added</span>
                                            )}
                                        </div>

                                        <div className="col-span-2 mt-2">
                                            <span className="text-sm text-gray-500">Techniques</span>
                                            <div className="mt-1">
                                                {training_class.techniques && training_class.techniques.length > 0 ? (
                                                    <ul className="text-sm font-medium text-gray-900">
                                                        {training_class.techniques.map((technique) => (
                                                            <li key={technique.technique_id} className="mb-1">
                                                                <Link
                                                                    href={route('techniques.edit', technique.technique_id, {from: 'trainingclasses'})}
                                                                    className="text-indigo-600 hover:text-indigo-800"
                                                                >
                                                                    {technique.technique_name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <span className="text-sm text-gray-500">No techniques added</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <span className="text-sm text-gray-500">Session notes</span>
                                        <p className="text-sm text-gray-900 mt-1">
                                            <span className="text-sm text-gray-500">{training_class.class_description || 'No notes provided'}</span>
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-white rounded-lg">
                                <p className="text-gray-500">No sessions found. Create one to get started.</p>
                            </div>
                        )}
                    </div>

                    {/* Per page */}
                    <div className="flex justify-end pt-3">
                        <div className="relative">
                            <select
                                value={perPage}
                                className="w-full sm:w-auto appearance-none bg-white pl-3 pr-10 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(e) => {
                                    setPerPage(e.target.value);
                                    router.get(
                                        route('trainingclasses.index', { perPage: e.target.value }),
                                        {},
                                        { preserveScroll: true }
                                    );
                                }}
                            >
                                <option value="15">15 per page</option>
                                <option value="30">30 per page</option>
                                <option value="50">50 per page</option>
                                <option value="100">100 per page</option>
                            </select>
                        </div>
                    </div>

                    {/* Simple pagination links */}
                    <div className="mt-6 flex flex-wrap justify-center gap-2 mb-5">
                        {training_classes.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url}
                                className={`px-3 py-1 text-sm rounded ${
                                    link.active
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                preserveScroll
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
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
                onClose={closeErrorPopup}
                message={errorMessage || "An error occurred while deleting the class"}
            />

        </AuthenticatedLayout>
    )
}
