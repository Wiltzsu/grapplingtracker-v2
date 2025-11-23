import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import dayjs from 'dayjs';

// UI Components
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SuccessPopup from '@/Components/SuccessPopup';
import { DynamicList } from '@/Components/DynamicList';
import PageHeader from '@/Components/PageHeader';

/**
 * Method to edit session.
 *
 * {{ training_class }} is a prop from TrainingClasscontroller's edit method.
 */
export default function EditTrainingClass({ training_class, categories, positions, instructors, locations }) {
    const { pageHeader } = usePage().props;
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    // Initialize form with existing session data
    const { data, setData, put, processing, errors } = useForm({
        instructor: training_class.instructor,
        location: training_class.location,
        class_date: dayjs(training_class.class_date).format('YYYY-MM-DD'),
        class_description: training_class.class_description,
        class_duration: training_class.class_duration,
        rounds: training_class.rounds,
        round_duration: training_class.round_duration,
        techniques: training_class.techniques || [],
        session_notes: training_class.session_notes
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('trainingclasses.update', training_class.class_id), {
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
        window.location = route('trainingclasses.index');
    };

    const handleTechniquesChange = (techniques) => {
        setData('techniques', techniques);
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
            <Head title="Edit session" />

            <div className="py-6 sm:py-12 pl-2 pr-2">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">

                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Edit training session
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Update your training session details, techniques practiced, and sparring rounds.
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
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Session Details</h3>
                            </div>
                        </div>

                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">

                                {/* Basic Information Section */}
                                <div className="space-y-6">
                                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                                        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Basic Information</h4>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Instructor */}
                                            <div>
                                                <InputLabel htmlFor="instructor" value="Instructor name" className="dark:text-white" />
                                                <TextInput
                                                    id="instructor"
                                                    name="instructor"
                                                    value={data.instructor}
                                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-opacity-50 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    placeholder="Who led the session?"
                                                    onChange={(e) => setData('instructor', e.target.value)}
                                                />
                                                <InputError message={errors.instructor} className="mt-2" />
                                            </div>

                                            {/* Location */}
                                            <div>
                                                <InputLabel htmlFor="location" value="Location" className="dark:text-white" />
                                                <TextInput
                                                    id="location"
                                                    name="location"
                                                    value={data.location}
                                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-opacity-50 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    placeholder="Where did you train?"
                                                    onChange={(e) => setData('location', e.target.value)}
                                                />
                                                <InputError message={errors.location} className="mt-2" />
                                            </div>
                                        </div>

                                        {/* Date */}
                                        <div className="mt-6">
                                            <InputLabel htmlFor="class_date" value={<>Session date <span className="text-red-500">*</span></>} className="dark:text-white" />
                                            <TextInput
                                                id="class_date"
                                                type="date"
                                                name="class_date"
                                                value={data.class_date}
                                                className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
                                                onChange={(e) => setData('class_date', e.target.value)}
                                            />
                                            <InputError message={errors.class_date} className="mt-2" />
                                        </div>
                                    </div>

                                    {/* Session Details Section */}
                                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                                        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Session Details</h4>

                                        {/* Duration */}
                                        <div className="mb-6">
                                            <InputLabel htmlFor="class_duration" value={<>Session duration (minutes) <span className="text-red-500">*</span></>} className="dark:text-white" />
                                            <div className="mt-1 relative">
                                                <TextInput
                                                    id="class_duration"
                                                    type="number"
                                                    name="class_duration"
                                                    value={data.class_duration}
                                                    className="block w-full dark:bg-gray-700 dark:border-gray-600 pr-12"
                                                    placeholder="90"
                                                    onChange={(e) => setData('class_duration', e.target.value)}
                                                />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                    <span className="text-gray-500 dark:text-gray-400 text-sm">min</span>
                                                </div>
                                            </div>
                                            <InputError message={errors.class_duration} className="mt-2" />
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <InputLabel htmlFor="class_description" value="Session notes" className="dark:text-white" />
                                            <textarea
                                                id="class_description"
                                                type="text"
                                                name="class_description"
                                                value={data.class_description ?? ''}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                rows={4}
                                                placeholder="What did you work on? Any key takeaways or notes from the session?"
                                                onChange={(e) => setData('class_description', e.target.value)}
                                            />
                                            <InputError message={errors.class_description} className="mt-2" />
                                        </div>
                                    </div>

                                    {/* Sparring Section */}
                                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                                        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Sparring Information (Optional)</h4>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Rounds */}
                                            <div>
                                                <InputLabel htmlFor="rounds" value="Number of rounds" className="dark:text-white" />
                                                <TextInput
                                                    id="rounds"
                                                    type="number"
                                                    name="rounds"
                                                    value={data.rounds}
                                                    className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
                                                    placeholder="5"
                                                    onChange={(e) => setData('rounds', e.target.value)}
                                                />
                                                <InputError message={errors.rounds} className="mt-2" />
                                            </div>

                                            {/* Round Duration */}
                                            <div>
                                                <InputLabel htmlFor="round_duration" value="Round duration (minutes)" className="dark:text-white" />
                                                <div className="mt-1 relative">
                                                    <TextInput
                                                        id="round_duration"
                                                        type="number"
                                                        name="round_duration"
                                                        value={data.round_duration}
                                                        className="block w-full dark:bg-gray-700 dark:border-gray-600 pr-12"
                                                        placeholder="5"
                                                        onChange={(e) => setData('round_duration', e.target.value)}
                                                    />
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                        <span className="text-gray-500 dark:text-gray-400 text-sm">min</span>
                                                    </div>
                                                </div>
                                                <InputError message={errors.round_duration} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Techniques Section */}
                                    <div>
                                        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Techniques Practiced</h4>
                                        <DynamicList
                                            // Pass the data to the DynamicList component
                                            categories={categories}
                                            positions={positions}
                                            initialTechniques={training_class.techniques}
                                            onTechniquesChange={(techniques) => setData('techniques', techniques)}
                                            isEdit={true}
                                        />
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
                                            onClick={() => router.visit(route('trainingclasses.index'))}
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
                                                    Update session
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
                message="Session updated successfully!"
            />
        </AuthenticatedLayout>
    );
}
