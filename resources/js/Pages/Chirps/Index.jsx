import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Chirp from '@/Components/Chirp';
import { useForm, Head } from '@inertiajs/react';
import { PlusIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function Index({ auth, chirps }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('chirps.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-lg font-semibold leading-tight text-gray-800 dark:text-white">
                    Notes
                </h2>
            }
        >
            <Head title="Notes" />

            <div className="max-w-4xl mx-auto pl-2 pr-2 py-6 sm:py-12 lg:p-8">

                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Your training notes
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Capture insights, techniques, and thoughts from your training sessions.
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <DocumentTextIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total notes</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{chirps.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Latest note</p>
                                <p className="text-sm text-gray-900 dark:text-white">
                                    {chirps.length > 0 ? new Date(chirps[0].created_at).toLocaleDateString() : 'No notes yet'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average length</p>
                                <p className="text-sm text-gray-900 dark:text-white">
                                    {chirps.length > 0
                                        ? Math.round(chirps.reduce((acc, chirp) => acc + chirp.message.length, 0) / chirps.length) + ' chars'
                                        : '0 chars'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create Note Form */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Add new note
                        </h3>
                        <form onSubmit={submit}>
                            <div className="relative">
                                <textarea
                                    value={data.message}
                                    placeholder="What did you learn today? Any techniques to remember? Training insights..."
                                    className={`block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-200 ${
                                        isExpanded ? 'h-32' : 'h-20'
                                    }`}
                                    onChange={e => setData('message', e.target.value)}
                                    onFocus={() => setIsExpanded(true)}
                                    onBlur={() => !data.message && setIsExpanded(false)}
                                />
                                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                                    {data.message.length}/1000
                                </div>
                            </div>
                            <InputError message={errors.message} className="mt-2" />
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        reset();
                                        setIsExpanded(false);
                                    }}
                                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                                >
                                    Clear
                                </button>
                                <PrimaryButton
                                    className="flex items-center gap-2"
                                    disabled={processing || !data.message.trim()}
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    {processing ? 'Adding...' : 'Add Note'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Notes List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            Your notes ({chirps.length})
                        </h3>
                        {chirps.length > 0 && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Most recent first
                            </div>
                        )}
                    </div>

                    {chirps.length > 0 ? (
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg divide-y divide-gray-100 dark:divide-gray-700">
                            {chirps.map(chirp =>
                                <Chirp key={chirp.id} chirp={chirp} />
                            )}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center border border-gray-100 dark:border-gray-700">
                            <div className="text-gray-400 dark:text-gray-500 mb-4">
                                <DocumentTextIcon className="w-16 h-16 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No notes yet
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Start capturing your training insights and techniques.
                            </p>
                            <button
                                onClick={() => document.querySelector('textarea').focus()}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                            >
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Write your first note
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
