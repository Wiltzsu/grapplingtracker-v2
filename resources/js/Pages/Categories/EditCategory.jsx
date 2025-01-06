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
 * Method to edit category.
 *
 * {{ category }} is a prop from CategoryController's edit method.
 */
export default function EditCategory({ category }) {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        category_name: category.category_name,
        category_description: category.category_description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('categories.update', category.category_id), {
            onSuccess: () => {
                setShowSuccessPopup(true);
            },
        });
    };

    const closePopup = () => {
        setShowSuccessPopup(false);
        window.location = route('categories.index');
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
                        href={route('categories.index')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Categories
                    </Link>
                    <span className="text-purple-900">|</span>
                    <span>Edit Category</span>
                    <img
                        src={CancelIcon}
                        alt="Cancel"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => window.history.back()}
                    />
                </div>
            }
        >
            <Head title="Edit category" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 mt-5 flex justify-center">
                                <div className="w-[600px]">
                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        <div>
                                            <InputLabel htmlFor="category_name" value={<>Category name <span className="text-red-500">*</span></>} />
                                            <TextInput
                                                id="category_name"
                                                type="text"
                                                name="category_name"
                                                value={data.category_name}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('category_name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.category_name} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="category_description" value="Description" />
                                            <TextInput
                                                id="category_description"
                                                type="text"
                                                name="category_description"
                                                value={data.category_description}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('category_description', e.target.value)}
                                            />
                                            <InputError message={errors.category_description} className="mt-2" />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <PrimaryButton disabled={processing}>Update Category</PrimaryButton>
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
                message="Category updated successfully!"
            />
        </AuthenticatedLayout>
    );
}
