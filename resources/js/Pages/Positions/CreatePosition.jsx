// Core Inertia and Layout imports
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

// UI Components
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SuccessPopup from '@/Components/SuccessPopup';
import PageHeader from '@/Components/PageHeader';

export default function Create() {
    const { pageHeader } = usePage().props;

    // State to manage success popup visibility (true = shown, false = hidden)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    /**
     * useForm is an Inertia hook that manages form state
     *
     * data:          contains form field values
     * setData:       function to update form fields
     * post:          function to submit the form
     * processing:    boolean indicating if form is being submitted
     * errors:        validation errors from the server
     * reset:         function to clear form fields
     */
    const { data, setData, post, processing, errors, reset } = useForm({
        position_name: '',
        position_description: ''
    });

    /**
     * Form submission handler.
     */
    const submit = (e) => {
        // Prevents default form submission (full page reload).
        e.preventDefault();

        post(route('positions.store'), {
            onSuccess: (page) => {
                // Only reset and show popup if there are NO validation errors.
                if (!page.props.errors || Object.keys(page.props.errors).length === 0) {
                    // Clear form fields.
                    reset();
                    setShowSuccessPopup(true);
                }
            },
            onError: () => {
                setErrorMessage("A network or server error occurred. Please try again.");
                setShowErrorPopup(true);
            }
        });
    };

    /**
     * Popup close handler.
     * Hides the success popup and redirects user back to dashboard.
     */
    const closePopup = () => {
        setShowSuccessPopup(false);
        window.location = route('dashboard');
    };

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    backRoute={pageHeader.backRoute}
                    backLabel={pageHeader.backLabel}
                    sectionRoute={pageHeader.sectionRoute}
                    sectionLabel={pageHeader.sectionLabel}
                    childRoute={pageHeader.childRoute}
                    childLabel={pageHeader.childLabel}
                    cancelRoute={pageHeader.cancelRoute}
                />
            }
        >
            <Head title="Add position" />

            <div className="py-6 sm:py-12 pl-2 pr-2">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">

                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Add position
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Create a new grappling position to organize your techniques and training.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                                    <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Position Details</h3>
                            </div>
                        </div>

                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">

                                {/* Position Information Section */}
                                <div className="space-y-6">
                                    {/* Position name field */}
                                    <div>
                                        <InputLabel htmlFor="position_name" value={<>Position name <span className="text-red-500">*</span></>} className="dark:text-white" />
                                        <TextInput
                                            id="position_name"
                                            type="text"
                                            name="position_name"
                                            value={data.position_name}
                                            className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
                                            isFocused={true}
                                            onChange={(e) => setData('position_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.position_name} className="mt-2" />
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Choose a clear, descriptive name for this position. Positions are for example mount, half-guard, 50-50.
                                        </p>
                                    </div>

                                    {/* Position description field */}
                                    <div>
                                        <InputLabel htmlFor="position_description" value="Description" className="dark:text-white" />
                                        <textarea
                                            id="position_description"
                                            name="position_description"
                                            value={data.position_description}
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            rows={4}
                                            onChange={(e) => setData('position_description', e.target.value)}
                                        />
                                        <InputError message={errors.position_description} className="mt-2" />
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Optional: Add details about this position to help with technique organization.
                                        </p>
                                    </div>
                                </div>

                                {/* Submit Section */}
                                <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        All fields marked with <span className="text-red-500">*</span> are required
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={() => reset()}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            Clear form
                                        </button>
                                        <PrimaryButton
                                            disabled={processing}
                                            className="flex items-center gap-2"
                                        >
                                            {processing ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Save position
                                                </>
                                            )}
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/*
                SuccessPopup component with props:
                - isVisible: boolean - Controls whether the popup is shown or hidden
                - onClose: function - Handler that hides the popup and redirects to add-page
                - message: string - Success message to display to the user
            */}
            <SuccessPopup
                isVisible={showSuccessPopup}
                onClose={closePopup}
                message="Position added successfully!"
            />
        </AuthenticatedLayout>
    );
}
