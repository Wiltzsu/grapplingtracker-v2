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

/**
 * Method to edit training class.
 *
 * {{ training_class }} is a prop from TrainingClasscontroller's edit method.
 */
export default function EditTrainingClass({ training_class }) {
    console.log('Training Class Data:', training_class);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    // Initialize form with existing training class data
    const { data, setData, put, processing, errors } = useForm({
        instructor: training_class.instructor,
        location: training_class.location,
        class_date: training_class.class_date,
        class_description: training_class.class_description,
        class_duration: training_class.class_duration,
        rounds: training_class.rounds,
        round_duration: training_class.round_duration,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('trainingclasses.update', training_class.class_id), {
            onSuccess: () => {
                setShowSuccessPopup(true);
            },
        });
    };

    const closePopup = () => {
        setShowSuccessPopup(false);
        window.location = route('trainingclasses.index');
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('view')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        View
                    </Link>
                    <span className="text-purple-900">|</span>
                    <Link
                        href={route('trainingclasses.index')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Class
                    </Link>
                    <span className="text-purple-900">|</span>
                    <span>Edit {data.class_description}</span>
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

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 mt-5 flex justify-center">
                                <div className="w-[600px]">
                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        <div>
                                            <InputLabel htmlFor="instructor" value="Instructor name" />
                                            <TextInput
                                                id="instructor"
                                                type="text"
                                                name="instructor"
                                                value={data.instructor}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('instructor', e.target.value)}
                                            />
                                            <InputError message={errors.instructor} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="location" value={<>Location <span className="text-red-500">*</span></>} />
                                            <TextInput
                                                id="location"
                                                type="text"
                                                name="location"
                                                value={data.location}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('location', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.location} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="class_date" value={<>Date <span className="text-red-500">*</span></>} />
                                            <TextInput
                                                id="class_date"
                                                type="date"
                                                name="class_date"
                                                value={data.class_date}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('class_date', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.class_date} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="class_description" value="Description" />
                                            <TextInput
                                                id="class_description"
                                                type="text"
                                                name="class_description"
                                                value={data.class_description}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('class_description', e.target.value)}
                                            />
                                            <InputError message={errors.class_description} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="class_duration" value={<>Class duration (minutes) <span className="text-red-500">*</span></>} />
                                            <TextInput
                                                id="class_duration"
                                                type="number"
                                                name="class_duration"
                                                value={data.class_duration}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('class_duration', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.class_duration} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="rounds" value="Rounds" />
                                            <TextInput
                                                id="rounds"
                                                type="number"
                                                name="rounds"
                                                value={data.rounds}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('rounds', e.target.value)}
                                            />
                                            <InputError message={errors.rounds} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="round_duration" value="Round duration" />
                                            <TextInput
                                                id="round_duration"
                                                type="number"
                                                name="round_duration"
                                                value={data.round_duration}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('round_duration', e.target.value)}
                                            />
                                            <InputError message={errors.round_duration} className="mt-2" />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <PrimaryButton disabled={processing}>Update Class</PrimaryButton>
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
