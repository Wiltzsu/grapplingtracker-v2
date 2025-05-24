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
 * Method to edit position.
 *
 * {{ position }} is a prop from PositionController's edit method.
 */
export default function EditPosition({ position }) {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        position_name: position.position_name,
        position_description: position.position_description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        console.log('Form data being submitted:', data);
        put(route('positions.update', position.position_id), {
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
        window.location = route('positions.index');
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
                    <span className="dark:text-white">Position</span>
                    <img
                        src={CancelIcon}
                        alt="Cancel"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => window.history.back()}
                    />
                </div>
            }
        >
            <Head title="Edit position" />

            <div className="py-6 sm:py-12 pl-2 pr-2 dark:bg-gray-700">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200 rounded-t-lg bg-gray-50 px-6 py-4 dark:bg-gray-900 dark:border-gray-500">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Edit position</h3>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-b-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 flex justify-center">
                                <div className="w-[600px]">
                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        <div>
                                            <InputLabel htmlFor="position_name" value={<>Position name <span className="text-red-500">*</span></>} className="dark:text-white" />
                                            <TextInput
                                                id="position_name"
                                                type="text"
                                                name="position_name"
                                                value={data.position_name}
                                                className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
                                                onChange={(e) => setData('position_name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.position_name} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="position_description" value="Description" className="dark:text-white" />
                                            <textarea
                                                id="position_description"
                                                name="position_description"
                                                value={data.position_description}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                rows={4}
                                                onChange={(e) => setData('position_description', e.target.value)}
                                            />
                                            <InputError message={errors.position_description} className="mt-2" />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <PrimaryButton disabled={processing}>Update Position</PrimaryButton>
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
                message="Position updated successfully!"
            />
        </AuthenticatedLayout>
    );
}
