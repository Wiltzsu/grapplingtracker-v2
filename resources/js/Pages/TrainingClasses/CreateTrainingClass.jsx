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
    // Helper function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

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
        instructor: '',
        location: '',
        class_date: getTodayDate(),
        class_description: '',
        class_duration: '',
        rounds: '',
        round_duration: '',
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
        post(route('trainingclasses.store'), {
            onSuccess: () => {
                reset();                    // Inertias built-in function for the useForm hook to reset fields
                setShowSuccessPopup(true);  // Trigger the SuccessPopup on form submission
            },
        });
    };

    /**
     * Popup close handler
     *
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
                    <span>Class</span>
                    <img
                        src={CancelIcon}
                        alt="Cancel"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => window.history.back()}
                    />
                </div>
            }
        >
            <Head title="Add training class" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 mt-5 flex justify-center">
                                <div className="w-[600px]">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                        Training class
                                    </h2>

                                    {/* Training class creation form */}
                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        {/* Training class instructor field */}
                                        <div>
                                            <InputLabel htmlFor="instructor" value="Instructor name" />
                                            <TextInput
                                                id="instructor"
                                                type="text"
                                                name="instructor"
                                                value={data.instructor}
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={(e) => setData('instructor', e.target.value)}
                                            />
                                            <InputError message={errors.instructor} className="mt-2" />
                                        </div>

                                        {/* Training class location */}
                                        <div>
                                            <InputLabel htmlFor="location" value={<>Location</>} />
                                            <TextInput
                                                id="location"
                                                type="text"
                                                name="location"
                                                value={data.location}
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={(e) => setData('location', e.target.value)}
                                            />
                                            <InputError message={errors.location} className="mt-2" />
                                        </div>

                                        {/* Training class date */}
                                        <div>
                                            <InputLabel htmlFor="class_date" value={<>Date <span className="text-red-500">*</span></>} />
                                            <TextInput
                                                id="class_date"
                                                type="date"
                                                name="class_date"
                                                value={data.class_date}
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={(e) => setData('class_date', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.class_date} className="mt-2" />
                                        </div>

                                        {/* Training class description */}
                                        <div>
                                            <InputLabel htmlFor="class_description" value="Description" />
                                            <textarea
                                                id="class_description"
                                                name="class_description"
                                                value={data.class_description}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                rows={4}
                                                onChange={(e) => setData('class_description', e.target.value)}
                                            />
                                            <InputError message={errors.class_description} className="mt-2" />
                                        </div>

                                        {/* Training class duration */}
                                        <div>
                                            <InputLabel htmlFor="class_duration" value={<>Class duration (minutes) <span className="text-red-500">*</span></>} />
                                            <TextInput
                                                id="class_duration"
                                                type="number"
                                                name="class_duration"
                                                value={data.class_duration}
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={(e) => setData('class_duration', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.class_duration} className="mt-2" />
                                        </div>

                                        {/* Training class round amount and duration*/}
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <InputLabel htmlFor="rounds" value="Rounds" />
                                                <TextInput
                                                    id="rounds"
                                                    type="number"
                                                    name="rounds"
                                                    value={data.rounds}
                                                    className="mt-1 block w-full"
                                                    isFocused={true}
                                                    onChange={(e) => setData('rounds', e.target.value)}
                                                />
                                                <InputError message={errors.rounds} className="mt-2" />
                                            </div>

                                            <div className="flex-1">
                                                <InputLabel htmlFor="round_duration" value="Round duration (minutes)" />
                                                <TextInput
                                                    id="round_duration"
                                                    type="number"
                                                    name="round_duration"
                                                    value={data.round_duration}
                                                    className="mt-1 block w-full"
                                                    isFocused={true}
                                                    onChange={(e) => setData('round_duration', e.target.value)}
                                                />
                                                <InputError message={errors.round_duration} className="mt-2" />
                                            </div>
                                        </div>

                                        {/* Training class round duration */}
                                        <div>

                                        </div>

                                        {/* Submit button */}
                                        <div className="flex items-center gap-4">
                                            <PrimaryButton disabled={processing}>Save training class</PrimaryButton>
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
                message="Training class added succesfully!"
            />
        </AuthenticatedLayout>
    );
}
