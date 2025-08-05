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
        category_name: '',
        category_description: ''
    });

    /**
     * Form submission handler
     */
    const submit = (e) => {
        // Prevents default form submission (full page reload).
        e.preventDefault();

        post(route('categories.store'), {
            onSuccess: (page) => {
                // Only reset and show popup if there are NO validation errors.
                if ( !page.props.errors || Object.keys(page.props.errors).length === 0) {
                    // Clear the form fields.
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
     * Hides the success popup and redirects user back to .
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
            <Head title="Add category" />

            <div className="py-6 sm:py-12 pl-2 pr-2 dark:bg-gray-700">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200 rounded-t-lg bg-gray-50 px-6 py-4 dark:bg-gray-900 dark:border-gray-500">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add category</h3>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-b-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 flex justify-center">
                                <div className="w-[600px]">
                                    {/* Category creation form */}
                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        {/* Category name field */}
                                        <div>
                                            <InputLabel htmlFor="category_name" value={<>Category name <span className="text-red-500">*</span></>} className="dark:text-white" />
                                            <TextInput
                                                id="category_name"
                                                type="text"
                                                name="category_name"
                                                value={data.category_name}
                                                className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
                                                isFocused={true}
                                                onChange={(e) => setData('category_name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.category_name} className="mt-2" />
                                        </div>

                                        {/* Category description field */}
                                        <div>
                                            <InputLabel htmlFor="category_description" value="Description" className="dark:text-white" />
                                            <textarea
                                                id="category_description"
                                                name="category_description"
                                                value={data.category_description}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"
                                                rows={4}
                                                onChange={(e) => setData('category_description', e.target.value)}
                                            />
                                            <InputError message={errors.category_description} className="mt-2" />
                                        </div>

                                        {/* Submit button */}
                                        <div className="flex items-center gap-4">
                                            <PrimaryButton disabled={processing}>Save Category</PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
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
                message="Category added successfully!"
            />
        </AuthenticatedLayout>
    );
}
