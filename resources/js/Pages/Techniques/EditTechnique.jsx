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

/**
 * Method to edit technique.
 *
 * {{ technique }} is a prop from TechniqueController's edit method.
 */
export default function EditTechnique({ technique, categories, positions, training_classes, from }) {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    // Initialize form with existing technique data
    const { data, setData, put, processing, errors } = useForm({
        technique_name: technique.technique_name,
        technique_description: technique.technique_description,
        category_id: technique.category_id,
        position_id: technique.position_id,
        class_id: technique.class_id
    });

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
                <div className="flex items-center gap-4">
                    <Link
                        href={route('view')}
                        className="text-gray-600 hover:text-gray-900 dark:text-white"
                    >
                        View
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
            <Head title="Edit technique" />

            <div className="py-6 sm:py-12 pl-2 pr-2 dark:bg-gray-700">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200 rounded-t-lg bg-gray-50 px-6 py-4 dark:bg-gray-900 dark:border-gray-500">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Edit technique</h3>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-b-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 flex justify-center">
                                <div className="w-[600px]">
                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        <div>
                                            <InputLabel htmlFor="technique_name" value={<>Technique name <span className="text-red-500">*</span></>} className="dark:text-white" />
                                            <TextInput
                                                id="technique_name"
                                                type="text"
                                                name="technique_name"
                                                value={data.technique_name}
                                                className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
                                                onChange={(e) => setData('technique_name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.technique_name} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="technique_description" value={<>Technique description <span className="text-red-500">*</span></>} className="dark:text-white" />
                                            <textarea
                                                id="technique_description"
                                                name="technique_description"
                                                value={data.technique_description}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                rows={4}
                                                onChange={(e) => setData('technique_description', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.technique_description} className="mt-2" />
                                        </div>

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
                                        </div>

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
                                        </div>

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
                                                <option value="">Select a session</option>
                                                {training_classes && training_classes.map((training_class) => (
                                                    <option key={training_class.class_id} value={training_class.class_id}>
                                                        {`${training_class.location} - ${dayjs(training_class.class_date).format('DD/MM/YYYY')} - ${training_class.instructor || 'No instructor'}`}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError message={errors.class_id} className="mt-2" />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <PrimaryButton disabled={processing}>Update Technique</PrimaryButton>
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
                message="Technique updated successfully!"
            />
        </AuthenticatedLayout>
    );
}
