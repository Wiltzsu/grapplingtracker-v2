// Core Inertia and Layout imports
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

// UI Components
import CancelIcon from '@/../../resources/svg/cancel.svg';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SuccessPopup from '@/Components/SuccessPopup';
import { DynamicList } from '@/Components/DynamicList';

export default function Create({ categories, positions }) {
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
        techniques: []
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
                reset();
                setShowSuccessPopup(true);
            },
            onError: (errors) => {
                // Log to Laravel
                axios.post(route('log.error'), {
                    errors: errors,
                    formData: data,
                    component: 'CreateTrainingClass'
                });

                // Errors are still handled by InputError components
            }
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

    const handleTechniquesChange = (techniques) => {
        setData('techniques', techniques);
    };

    /**
     * Handles redirection back to the previous page depending on where user came from.
     */
    const { url } = usePage();
    const handleBack = () => {
        if (url.includes('/dashboard')) {
            router.visit(route('dashboard'));
        } else {
            window.history.back();
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('dashboard')}
                        className="text-gray-600 hover:text-gray-900 dark:text-white"
                    >
                        Dashboard
                    </Link>
                    <span className="text-red-900 dark:text-gray-400">|</span>
                    <span className="dark:text-white">Session</span>
                    <img
                        src={CancelIcon}
                        alt="Cancel"
                        className="h-5 w-5 cursor-pointer"
                        onClick={handleBack}
                    />
                </div>
            }
        >
            <Head title="Add session" />

            <div className="py-6 sm:py-12 pr-2 pl-2 dark:bg-gray-700">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200 rounded-t-lg bg-gray-50 px-6 py-4 dark:bg-gray-900 dark:border-gray-500">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add session</h3>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-b-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 flex justify-center">
                                <div className="w-[600px]">
                                    {/* Session creation form */}
                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        {/* Session instructor field */}
                                        <div>
                                            <InputLabel htmlFor="instructor" value="Instructor name" className="dark:text-white" />
                                            <TextInput
                                                id="instructor"
                                                type="text"
                                                name="instructor"
                                                value={data.instructor}
                                                className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
                                                isFocused={true}
                                                onChange={(e) => setData('instructor', e.target.value)}
                                            />
                                            <InputError message={errors.instructor} className="mt-2" />
                                        </div>

                                        {/* Session location */}
                                        <div>
                                            <InputLabel htmlFor="location" value={<>Location</>} className="dark:text-white" />
                                            <TextInput
                                                id="location"
                                                type="text"
                                                name="location"
                                                value={data.location}
                                                className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
                                                onChange={(e) => setData('location', e.target.value)}
                                            />
                                            <InputError message={errors.location} className="mt-2" />
                                        </div>

                                        {/* Session date */}
                                        <div>
                                            <InputLabel htmlFor="class_date" value={<>Date <span className="text-red-500">*</span></>} className="dark:text-white" />
                                            <TextInput
                                                id="class_date"
                                                type="date"
                                                name="class_date"
                                                value={data.class_date}
                                                className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
                                                onChange={(e) => setData('class_date', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.class_date} className="mt-2" />
                                        </div>

                                        {/* Session description */}
                                        <div>
                                            <InputLabel htmlFor="class_description" value="Session notes" className="dark:text-white"/>
                                            <textarea
                                                id="class_description"
                                                name="class_description"
                                                value={data.class_description}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                rows={4}
                                                onChange={(e) => setData('class_description', e.target.value)}
                                            />
                                            <InputError message={errors.class_description} className="mt-2" />
                                        </div>

                                        <DynamicList
                                            categories={categories}
                                            positions={positions}
                                            onTechniquesChange={handleTechniquesChange}
                                            isEdit={false}
                                        />

                                        {/* Session duration */}
                                        <div>
                                            <InputLabel htmlFor="class_duration" value={<>Session duration (min.) <span className="text-red-500">*</span></>} className="dark:text-white" />
                                            <TextInput
                                                id="class_duration"
                                                type="number"
                                                name="class_duration"
                                                value={data.class_duration}
                                                className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
                                                onChange={(e) => setData('class_duration', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.class_duration} className="mt-2" />
                                        </div>

                                        {/* Session round amount and duration*/}
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <InputLabel htmlFor="rounds" value="Rounds" className="dark:text-white"/>
                                                <TextInput
                                                    id="rounds"
                                                    type="number"
                                                    name="rounds"
                                                    value={data.rounds}
                                                    className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
                                                    onChange={(e) => setData('rounds', e.target.value)}
                                                />
                                                <InputError message={errors.rounds} className="mt-2" />
                                            </div>

                                            <div className="flex-1">
                                                <InputLabel htmlFor="round_duration" value="Round duration (min.)" className="dark:text-white"/>
                                                <TextInput
                                                    id="round_duration"
                                                    type="number"
                                                    name="round_duration"
                                                    value={data.round_duration}
                                                    className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
                                                    onChange={(e) => setData('round_duration', e.target.value)}
                                                />
                                                <InputError message={errors.round_duration} className="mt-2" />
                                            </div>
                                        </div>

                                        {/* Submit button */}
                                        <div className="flex items-center gap-4">
                                            <PrimaryButton disabled={processing}>Save session</PrimaryButton>
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
                message="Session added succesfully!"
            />
        </AuthenticatedLayout>
    );
}
