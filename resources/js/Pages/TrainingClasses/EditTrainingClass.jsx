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
 * Method to edit training class.
 *
 * {{ training_class }} is a prop from TrainingClasscontroller's edit method.
 */
export default function EditTrainingClass({ training_class, categories, positions, instructors, locations }) {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    // Initialize form with existing training class data
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
        console.log('Form data being submitted:', data);
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
                    <span className="dark:text-white">Training Class</span>
                    <img
                        src={CancelIcon}
                        alt="Cancel"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => window.history.back()}
                    />
                </div>
            }
        >
            <Head title="Edit training class" />

            <div className="py-6 sm:py-12 pl-2 pr-2 dark:bg-gray-700">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200 rounded-t-lg bg-gray-50 px-6 py-4 dark:bg-gray-900 dark:border-gray-500">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Edit training class</h3>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-b-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 flex justify-center">
                                <div className="w-[600px]">
                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        <div>
                                            <InputLabel htmlFor="instructor" value={<>Instructor <span className="text-red-500">*</span></>} className="dark:text-white" />
                                            <select
                                                id="instructor"
                                                name="instructor"
                                                value={data.instructor}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-opacity-50 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                onChange={(e) => setData('instructor', e.target.value)}
                                                required
                                            >
                                                <option value="">Select an instructor</option>
                                                {instructors && instructors.map((instructor) => (
                                                    <option key={instructor} value={instructor}>
                                                        {instructor}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError message={errors.instructor} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="location" value={<>Location <span className="text-red-500">*</span></>} className="dark:text-white" />
                                            <select
                                                id="location"
                                                name="location"
                                                value={data.location}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-opacity-50 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                onChange={(e) => setData('location', e.target.value)}
                                                required
                                            >
                                                <option value="">Select a location</option>
                                                {locations && locations.map((location) => (
                                                    <option key={location} value={location}>
                                                        {location}
                                                    </option>
                                                ))}
                                            </select>
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
                                            <InputLabel htmlFor="class_description" value="Session description" className="dark:text-white" />
                                            <TextInput
                                                id="class_description"
                                                type="text"
                                                name="class_description"
                                                value={data.class_description}
                                                className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
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

                                        <div>
                                            <InputLabel htmlFor="rounds" value={<>Rounds <span className="text-red-500">*</span></>} className="dark:text-white" />
                                            <TextInput
                                                id="rounds"
                                                type="number"
                                                name="rounds"
                                                value={data.rounds}
                                                className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
                                                onChange={(e) => setData('rounds', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.rounds} className="mt-2" />
                                        </div>

                                        <div>
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

                                        <div>
                                            <InputLabel htmlFor="session_notes" value="Session notes" className="dark:text-white" />
                                            <textarea
                                                id="session_notes"
                                                name="session_notes"
                                                value={data.session_notes}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"
                                                rows={4}
                                                onChange={(e) => setData('session_notes', e.target.value)}
                                            />
                                            <InputError message={errors.session_notes} className="mt-2" />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <PrimaryButton disabled={processing}>Update Training Class</PrimaryButton>
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
                message="Training class updated successfully!"
            />
        </AuthenticatedLayout>
    );
}
