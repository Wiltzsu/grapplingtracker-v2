import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status, isOAuthUser }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-6 sm:py-12 pr-2 pl-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow rounded-lg sm:p-8 dark:bg-gray-900">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {!isOAuthUser && (
                        <div className="bg-white p-4 shadow rounded-lg sm:p-8 dark:bg-gray-900">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    )}

                    <div className="bg-white p-4 shadow rounded-lg sm:p-8 dark:bg-gray-900">
                        <DeleteUserForm className="max-w-xl" isOAuthUser={isOAuthUser} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
