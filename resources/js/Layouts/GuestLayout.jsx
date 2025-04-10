import { Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import GuestHeader from '@/Components/GuestHeader';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <GuestHeader />
            <div className="flex-grow flex flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}
