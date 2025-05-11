// Core Inertia and Layout imports
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

// UI Components
import CancelIcon from '@/../../resources/svg/cancel.svg';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SuccessPopup from '@/Components/SuccessPopup';

export default function Create() {
    // State to manage success popup visibility (true = shown, false = hidden)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    /**
     * useForm is an Inertia hook that manages form state
     * - data:          contains form field values
     * - setData:       function to update form fields
     * - post:          function to submit the form
     * - processing:    boolean indicating if form is being submitted
     * - errors:        validation errors from the server
     * - reset:         function to clear form fields
     */
    const { data, setData, post, processing, errors, reset } = useForm({
        category_name: '',
        category_description: ''
    });

    /**
     * Form submission handler
     * 1. Prevents default form submission (full page reload)
     * 2. Posts data to the categories.store route
     * 3. On success:
     *      - Clears form fields
     *      - Shows success popup
     */
    const submit = (e) => {
        e.preventDefault();
        post(route('categories.store'), {
            onSuccess: () => {
                reset();                    // Inertias built-in function for the useForm hook to reset fields
                setShowSuccessPopup(true);  // Trigger the SuccessPopup on form submission
            },
        });
    };

    /**
     * Popup close handler
     * 1. Hides the success popup
     * 2. Redirects user back to the add page
     */
    const closePopup = () => {
        setShowSuccessPopup(false);
        window.location = route('add');
    };

    return (
        <AuthenticatedLayout
            header={
                // Navigation breadcrumb
                <div className="flex items-center gap-4">
                <Link
                    href={route('add')}
                    className="text-gray-600 hover:text-gray-900"
                >
                    Add
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
            <Head title="Add category" />

            <div className="py-6 sm:py-12 pl-2 pr-2">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-5 mt-5 flex justify-center">
                                <div className="w-[600px]">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                        Add category
                                    </h2>

                                    {/* Category creation form
                                        - Sends the data to the CategoryController
                                    */}
                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        {/* Category name field */}
                                        <div>
                                            <InputLabel htmlFor="category_name" value={<>Category name <span className="text-red-500">*</span></>} />
                                            <TextInput
                                                id="category_name"
                                                type="text"
                                                name="category_name"
                                                value={data.category_name}
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={(e) => setData('category_name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.category_name} className="mt-2" />
                                        </div>

                                        {/* Category description field */}
                                        <div>
                                            <InputLabel htmlFor="category_description" value="Description" />
                                            <TextInput
                                                id="category_description"
                                                type="text"
                                                name="category_description"
                                                value={data.category_description}
                                                className="mt-1 block w-full"
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
