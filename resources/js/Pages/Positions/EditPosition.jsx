import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

// UI Components
import CancelIcon from '@/../../resources/svg/cancel.svg';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SuccessPopup from '@/Components/SuccessPopup';
import PageHeader from '@/Components/PageHeader';

/**
 * Method to edit position.
 *
 * {{ position }} is a prop from PositionController's edit method.
 */
export default function EditPosition({ position }) {
    const { pageHeader } = usePage().props;
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
                <PageHeader
                    backRoute={pageHeader.backRoute}
                    backLabel={pageHeader.backLabel}
                    sectionRoute={pageHeader.sectionRoute}
                    sectionLabel={pageHeader.sectionLabel}
                />
            }
        >
            <Head title="Edit position" />

            <div className="py-6 sm:py-12 pl-2 pr-2">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">

                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Edit position
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Update your grappling position details and description.
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
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Position Details</h3>
                            </div>
                        </div>

                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">

                                {/* Position Information Section */}
                                <div className="space-y-6">
                                    {/* Position name field */}
                                    <div>
                                        <InputLabel htmlFor="position_name" value={<>Position name <span className="text-red-500">*</span></>} className="dark:text-white" />
                                        <TextInput
                                            id="position_name"
                                            type="text"
                                            name="position_name"
                                            value={data.position_name}
                                            className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600"
                                            placeholder="e.g., Guard, Mount, Side Control"
                                            onChange={(e) => setData('position_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.position_name} className="mt-2" />
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Choose a clear, descriptive name for this position.
                                        </p>
                                    </div>

                                    {/* Position description field */}
                                    <div>
                                        <InputLabel htmlFor="position_description" value="Description" className="dark:text-white" />
                                        <textarea
                                            id="position_description"
                                            name="position_description"
                                            value={data.position_description ?? ''}
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            rows={4}
                                            placeholder="Describe this position, common techniques from here, or any notes that would be helpful..."
                                            onChange={(e) => setData('position_description', e.target.value)}
                                        />
                                        <InputError message={errors.position_description} className="mt-2" />
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Optional: Add details about this position to help with technique organization.
                                        </p>
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
                                            onClick={() => router.visit(route('positions.index'))}
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
                                                    Update position
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
                message="Position updated successfully!"
            />
        </AuthenticatedLayout>
    );
}
