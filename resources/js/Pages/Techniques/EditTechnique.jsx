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
export default function EditTechnique({ technique, categories, positions, training_classes }) {
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
                        className="text-gray-600 hover:text-gray-900"
                    >
                        View
                    </Link>
                    <span className="text-purple-900">|</span>
                    <Link
                        href={route('techniques.index')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Technique
                    </Link>
                    <span className="text-purple-900">|</span>
                    <span>Edit {data.technique_name}</span>
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

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 mt-5 flex justify-center">
                                <div className="w-[600px]">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                        Edit {data.technique_name}
                                    </h2>
                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        <div>
                                            <InputLabel htmlFor="technique_name" value="Technique name" />
                                            <TextInput
                                                id="technique_name"
                                                type="text"
                                                name="technique_name"
                                                value={data.technique_name}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('technique_name', e.target.value)}
                                            />
                                            <InputError message={errors.technique_name} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="technique_description" value={<>Technique description <span className="text-red-500">*</span></>} />
                                            <TextInput
                                                id="technique_description"
                                                type="text"
                                                name="technique_description"
                                                value={data.technique_description}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('technique_description', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.technique_description} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="category_id" value={<>Category <span className="text-red-500">*</span></>} />
                                            <select
                                                id="category_id"
                                                name="category_id"
                                                value={data.category_id}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-opacity-50 rounded-md shadow-sm"
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
                                            <InputLabel htmlFor="position_id" value={<>Position <span className="text-red-500">*</span></>} />
                                            <select
                                                id="position_id"
                                                name="position_id"
                                                value={data.position_id}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-opacity-50 rounded-md shadow-sm"
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
                                            <InputLabel htmlFor="class_id" value={<>Class <span className="text-red-500">*</span></>} />
                                            <select
                                                id="class_id"
                                                name="class_id"
                                                value={data.class_id}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-opacity-50 rounded-md shadow-sm"
                                                onChange={(e) => setData('class_id', e.target.value)}
                                                required
                                            >
                                                <option value="">Select a training class</option>
                                                {training_classes && training_classes.map((training_class) => (
                                                    <option key={training_class.class_id} value={training_class.class_id}>
                                                        {`${training_class.location} - ${dayjs(training_class.class_date).format('DD/MM/YYYY')} - ${training_class.instructor || 'No instructor'}`}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError message={errors.class_id} className="mt-2" />
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
