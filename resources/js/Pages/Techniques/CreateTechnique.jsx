// Core Inertia and Layout imports
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import dayjs from 'dayjs';

// UI components
import CancelIcon from '@/../../resources/svg/cancel.svg';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SuccessPopup from '@/Components/SuccessPopup';

export default function Create({ categories, training_classes, positions }) {
    // State to manage form submit success popup visibility
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
        technique_name: '',
        technique_description: '',
        category_id: '',
        position_id: '',
        class_id: ''
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
        console.log('Form data being submitted:', data);
        post(route('techniques.store'), {
            onSuccess: () => {
                reset();
                setShowSuccessPopup(true);
            },
            onError: (errors) => {
                console.log('Submission errors:', errors);
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

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('add')}
                        className="text-gray-600 hover:text-gray-900 dark:text-white"
                    >
                        Add
                    </Link>
                    <span className="text-red-900 dark:text-gray-400">|</span>
                    <span className="dark:text-white">Technique</span>
                    <img
                        src={CancelIcon}
                        alt="Cancel"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => window.history.back()}
                    />
                </div>
            }
        >
            <Head title="Add technique" />

            <div className="py-6 sm:py-12 pl-2 pr-2 dark:bg-gray-700">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200 rounded-t-lg bg-gray-50 px-6 py-4 dark:bg-gray-900 dark:border-gray-500">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add technique</h3>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-b-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 flex justify-center">
                                <div className="w-[600px]">
                                    {/* Technique creation form */}
                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        {/* Technique name field */}
                                        <div>
                                            <InputLabel htmlFor="technique_name" value={<>Name <span className="text-red-500">*</span></>} className="dark:text-white" />
                                            <TextInput
                                                id="technique_name"
                                                type="text"
                                                name="technique_name"
                                                value={data.technique_name}
                                                className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
                                                isFocused={true}
                                                onChange={(e) => setData('technique_name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.technique_name} className="mt-2" />
                                        </div>

                                        {/* Technique description field */}
                                        <div>
                                            <InputLabel htmlFor="technique_description" value="Description" className="dark:text-white" />
                                            <textarea
                                                id="technique_description"
                                                name="technique_description"
                                                value={data.technique_description}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"
                                                rows={4}
                                                onChange={(e) => setData('technique_description', e.target.value)}
                                            />
                                            <InputError message={errors.technique_description} className="mt-2" />
                                        </div>

                                        {/* Category selection field */}
                                        <div>
                                            <InputLabel htmlFor="category_id" value={<>Category <span className="text-red-500">*</span></>} className="dark:text-white" />
                                            <select
                                                id="category_id"
                                                name="category_id"
                                                value={data.category_id}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-opacity-50 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                onChange={(e) => setData('category_id', e.target.value)}
                                                required
                                            >
                                                <option value="">Select a category</option>
                                                {categories && categories.length > 0 ? (
                                                    categories.map((category) => (
                                                        <option key={category.category_id} value={category.category_id}>
                                                            {category.category_name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="">No categories available</option>
                                                )}
                                            </select>
                                            <InputError message={errors.category_id} className="mt-2" />
                                        </div>

                                        {/* Position selection field */}
                                        <div>
                                            <InputLabel htmlFor="position_id" value={<>Position <span className="text-red-500">*</span></>} className="dark:text-white" />
                                            <select
                                                id="position_id"
                                                name="position_id"
                                                value={data.position_id}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-opacity-50 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                onChange={(e) => setData('position_id', e.target.value)}
                                                required
                                            >
                                                <option value="">Select a position</option>
                                                {positions && positions.length > 0 ? (
                                                    positions.map((position) => (
                                                        <option key={position.position_id} value={position.position_id}>
                                                            {position.position_name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="">No positions available</option>
                                                )}
                                            </select>
                                            <InputError message={errors.position_id} className="mt-2" />
                                        </div>

                                        {/* Training class selection field */}
                                        <div>
                                            <InputLabel htmlFor="class_id" value={<>Class <span className="text-red-500">*</span></>} className="dark:text-white" />
                                            <select
                                                id="class_id"
                                                name="class_id"
                                                value={data.class_id}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-opacity-50 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                onChange={(e) => setData('class_id', e.target.value)}
                                                required
                                            >
                                                <option value="">Select a training class</option>
                                                {training_classes && training_classes.length > 0 ? (
                                                    training_classes.map((training_class) => (
                                                        <option key={training_class.class_id} value={training_class.class_id}>
                                                            {`${dayjs(training_class.class_date).format('DD/MM/YYYY')} - ${training_class.location || 'No location'} - ${training_class.instructor || 'No instructor'}`}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="">No training classes available</option>
                                                )}
                                            </select>
                                            <InputError message={errors.class_id} className="mt-2" />
                                        </div>

                                        {/* Submit button */}
                                        <div className="flex items-center gap-4">
                                            <PrimaryButton disabled={processing}>Save Technique</PrimaryButton>
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
                message="Technique added successfully!"
            />
        </AuthenticatedLayout>
    );
}
