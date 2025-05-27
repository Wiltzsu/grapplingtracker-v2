import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import dayjs from 'dayjs';

// UI Components
import CancelIcon from '@/../../resources/svg/cancel.svg';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SuccessPopup from '@/Components/SuccessPopup';
import { DynamicList } from '@/Components/DynamicList';

/**
 * Method to edit session.
 *
 * {{ training_class }} is a prop from TrainingClasscontroller's edit method.
 */
export default function EditTrainingClass({ training_class, categories, positions, instructors, locations }) {
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
                <div className="flex items-center gap-4">
                    <Link
                        href={route('view')}
                        className="text-gray-600 hover:text-gray-900 dark:text-white"
                    >
                        View
                    </Link>
                    <span className="text-red-900 dark:text-gray-400">|</span>
                    <span className="dark:text-white">Session</span>
                    <img
                        src={CancelIcon}
                        alt="Cancel"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => window.history.back()}
                    />
                </div>
            }
        >
            <Head title="Edit session" />

            <div className="py-6 sm:py-12 pl-2 pr-2 dark:bg-gray-700">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200 rounded-t-lg bg-gray-50 px-6 py-4 dark:bg-gray-900 dark:border-gray-500">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Edit session</h3>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-b-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 flex justify-center">
                                <div className="w-[600px]">
                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        <div>
                                            <InputLabel htmlFor="instructor" value={<>Instructor</>} className="dark:text-white" />
                                            <TextInput
                                                id="instructor"
                                                name="instructor"
                                                value={data.instructor}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-opacity-50 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                onChange={(e) => setData('instructor', e.target.value)}
                                            >
                                            </TextInput>
                                            <InputError message={errors.instructor} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="location" value={<>Location</>} className="dark:text-white" />
                                            <TextInput
                                                id="location"
                                                name="location"
                                                value={data.location}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-opacity-50 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                onChange={(e) => setData('location', e.target.value)}
                                            >
                                            </TextInput>
                                            <InputError message={errors.location} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="class_date" value={<>Class date <span className="text-red-500">*</span></>} className="dark:text-white" />
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

                                        <div>
                                            <InputLabel htmlFor="class_description" value="Session notes" className="dark:text-white" />
                                            <textarea
                                                id="class_description"
                                                type="text"
                                                name="class_description"
                                                value={data.class_description}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                rows={4}
                                                onChange={(e) => setData('class_description', e.target.value)}
                                            />
                                            <InputError message={errors.class_description} className="mt-2" />
                                        </div>

                                        <DynamicList
                                            // Pass the data to the DynamicList component
                                            categories={categories}
                                            positions={positions}
                                            initialTechniques={training_class.techniques}
                                            onTechniquesChange={(techniques) => setData('techniques', techniques)}
                                            isEdit={true}
                                        />

                                        <div>
                                            <InputLabel htmlFor="class_duration" value={<>Class duration (minutes) <span className="text-red-500">*</span></>} className="dark:text-white" />
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

                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <InputLabel htmlFor="rounds" value={<>Rounds</>} className="dark:text-white" />
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
                                                <InputLabel htmlFor="round_duration" value="Round duration" className="dark:text-white" />
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

                                        <div className="flex items-center gap-4">
                                            <PrimaryButton disabled={processing}>Update session</PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
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
