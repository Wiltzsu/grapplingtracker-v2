import { Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import GuestHeader from '@/Components/GuestHeader';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <GuestHeader showExtraNav={true} />
            <div className="flex-grow flex flex-col items-center pt-36 pb-16 sm:pt-48 sm:pb-24 bg-gray-50 dark:bg-gray-900">
                <div className="w-full sm:max-w-md px-6 py-4 bg-white dark:bg-gray-800 sm:shadow-md overflow-hidden sm:rounded-lg border border-gray-200 dark:border-gray-700">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}
