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
    // State to manage form submit success popup visibility (true = shown, false = hidden)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    /**
     * useForm is an Inertia hook that manages form state
     *
     * - data:          contains form field values
     * - setData:       function to update form fields
     * - post:          function to submit the form
     * - processing:    boolean indicating if form is being submitted
     * - errors:        validation errors from the server
     * - reset:         function to clear form fields
     */
    const { data, setData, post, processing, errors, reset } = useForm({
        position_name: '',
        position_description: ''
    });

    /**
     * Form submission handler
     *
     * 1. Prevents default form submission (full page reload)
     * 2. Posts data to the categories.store route
     * 3. On success:
     *      - Clears form fields
     *      - Shows success popup
     */
    const submit = (e) => {
        e.preventDefault();
        post(route('positions.store'), {
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
                <div className="flex items-center gap-4">
                <Link
                    href={route('add')}
                    className="text-gray-600 hover:text-gray-900"
                >
                    Add
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
            <Head title="Add position" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 mt-5 flex justify-center">
                                <div className="w-[600px]">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                        Position
                                    </h2>

                                    {/* Position creation form */}
                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        {/* Position name field */}
                                        <div>
                                            <InputLabel htmlFor="position_name" value="Position name" />
                                            <TextInput
                                                id="position_name"
                                                type="text"
                                                name="position_category"
                                                value={data.position_name}
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={(e) => setData('position_name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.position_name} className="mt-2" />
                                        </div>

                                        {/* Position description field */}
                                        <div>
                                            <InputLabel htmlFor="position_description" value="Description (optional)" />
                                            <TextInput
                                                id="position_description"
                                                type="text"
                                                name="position_description"
                                                value={data.position_description}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('position_description', e.target.value)}
                                            />
                                            <InputError message={errors.position_description} className="mt-2" />
                                        </div>

                                        {/* Submit button */}
                                        <div className="flex items-center gap-4">
                                            <PrimaryButton disabled={processing}>Save Position</PrimaryButton>
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
                - message: String - Success message to display to the user
            */}
            <SuccessPopup
                isVisible={showSuccessPopup}
                onClose={closePopup}
                message="Position added succesfully!"
            />
        </AuthenticatedLayout>
    );
}
