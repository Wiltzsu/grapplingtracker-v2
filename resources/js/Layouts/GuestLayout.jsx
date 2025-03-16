import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/" className="text-xl font-bold text-gray-900">
                    Grappling Tracker
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
