import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import dayjs from 'dayjs';

// UI Components
import CancelIcon from '@/../../resources/svg/cancel.svg';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SuccessPopup from '@/Components/SuccessPopup';
import PageHeader from '@/Components/PageHeader';

/**
 * Method to edit technique.
 *
 * {{ technique }} is a prop from TechniqueController's edit method.
 */
export default function EditTechnique({ technique, categories, positions, training_classes, from }) {
    const { pageHeader } = usePage().props;
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    // Initialize form with existing technique data
    const { data, setData, put, processing, errors } = useForm({
        technique_name: technique.technique_name,
        technique_description: technique.technique_description,
        category_id: technique.category_id,
        position_id: technique.position_id,
        class_id: technique.class_id
    });

    const { url } = usePage();

    const submit = (e) => {
        e.preventDefault();
        put(route('techniques.update', technique.technique_id), {
            onSuccess: () => {
                setShowSuccessPopup(true);
            },
            onError: (errors) => {
                console.log('Submission errors:', errors);
            }
        });
    };

    const closePopup = () => {
        setShowSuccessPopup(false);

        // Get the 'from' parameter from the URL to decide where user came from
        if (from === 'trainingclasses') {
            window.location = route('trainingclasses.index');
        } else {
            window.location = route('techniques.index');
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    backRoute={pageHeader.backRoute}
                    backLabel={pageHeader.backLabel}
                    sectionRoute={pageHeader.sectionRoute}
                    sectionLabel={pageHeader.sectionLabel}
                />
            }
        >
            <Head title="Edit technique" />

            <div className="py-6 sm:py-12 pl-2 pr-2">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">

                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Edit technique
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Update your technique details, classification, and session association.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                                    <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Technique Details</h3>
                            </div>
                        </div>

                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">

                                {/* Basic Information Section */}
                                <div className="space-y-6">
                                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                                        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Basic Information</h4>

                                        {/* Technique name field */}
                                        <div className="mb-6">
                                            <InputLabel htmlFor="technique_name" value={<>Technique name <span className="text-red-500">*</span></>} className="dark:text-white" />
                                            <TextInput
                                                id="technique_name"
                                                type="text"
                                                name="technique_name"
                                                value={data.technique_name}
                                                className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
                                                placeholder="e.g., Triangle Choke, Armbar, Kimura"
                                                onChange={(e) => setData('technique_name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.technique_name} className="mt-2" />
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                Choose a clear, descriptive name for this technique.
                                            </p>
                                        </div>

                                        {/* Technique description field */}
                                        <div>
                                            <InputLabel htmlFor="technique_description" value="Description" className="dark:text-white" />
                                            <textarea
                                                id="technique_description"
                                                name="technique_description"
                                                value={data.technique_description ?? ''}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                rows={4}
                                                placeholder="Describe the technique, key details, setup, or any notes that would be helpful..."
                                                onChange={(e) => setData('technique_description', e.target.value)}
                                            />
                                            <InputError message={errors.technique_description} className="mt-2" />
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                Optional: Add details about the technique to help with learning and reference.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Classification Section */}
                                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                                        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Classification</h4>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                    {categories && categories.map((category) => (
                                                        <option key={category.category_id} value={category.category_id}>
                                                            {category.category_name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <InputError message={errors.category_id} className="mt-2" />
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    Choose the category this technique belongs to.
                                                </p>
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
                                                    {positions && positions.map((position) => (
                                                        <option key={position.position_id} value={position.position_id}>
                                                            {position.position_name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <InputError message={errors.position_id} className="mt-2" />
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    Choose the position this technique is performed from.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Session Association Section */}
                                    <div>
                                        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Session Association</h4>

                                        {/* Session selection field */}
                                        <div>
                                            <InputLabel htmlFor="class_id" value={<>Training session</>} className="dark:text-white" />
                                            <select
                                                id="class_id"
                                                name="class_id"
                                                value={data.class_id}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-opacity-50 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                onChange={(e) => setData('class_id', e.target.value)}
                                            >
                                                <option value="">Select a session</option>
                                                {training_classes && training_classes.map((training_class) => (
                                                    <option key={training_class.class_id} value={training_class.class_id}>
                                                        {`${dayjs(training_class.class_date).format('DD/MM/YYYY')} - ${training_class.location || 'No location'} - ${training_class.instructor || 'No instructor'}`}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError message={errors.class_id} className="mt-2" />
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                Choose the training session this technique was practiced in.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Section */}
                                <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        All fields marked with <span className="text-red-500">*</span> are required
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={() => window.history.back()}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            Cancel
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
                                                    Updating...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Update technique
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

            <SuccessPopup
                isVisible={showSuccessPopup}
                onClose={closePopup}
                message="Technique updated successfully!"
            />
        </AuthenticatedLayout>
    );
}
