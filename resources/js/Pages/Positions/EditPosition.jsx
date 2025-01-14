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
 * {{ position }} is a prop from CategoryController's edit method.
 */
export default function EditPosition({ position }) {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        position_name: position.position_name,
        position_description: position.position_description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('positions.update', position.position_id), {
            onSuccess: () => {
                setShowSuccessPopup(true);
            },
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
                        className="text-gray-600 hover:text-gray-900"
                    >
                        View
                    </Link>
                    <span className="text-purple-900">|</span>
                    <Link
                        href={route('positions.index')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Position
                    </Link>
                    <span className="text-purple-900">|</span>
                    <span>Edit {data.position_name}</span>
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

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 mt-5 flex justify-center">
                                <div className="w-[600px]">
                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        <div>
                                            <InputLabel htmlFor="position_name" value={<>Position name <span className="text-red-500">*</span></>} />
                                            <TextInput
                                                id="position_name"
                                                type="text"
                                                name="position_name"
                                                value={data.position_name}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('position_name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.position_name} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="position_description" value="Description" />
                                            <TextInput
                                                id="position_description"
                                                type="text"
                                                name="position_description"
                                                value={data.position_description}
                                                className="mt-1 block w-full"
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
