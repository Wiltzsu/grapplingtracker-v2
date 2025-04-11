import { Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import GuestHeader from '@/Components/GuestHeader';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <GuestHeader showExtraNav={true} />
            <div className="flex-grow flex flex-col items-center pt-36 pb-16 sm:pt-36 sm:pb-16 bg-gray-50">
                <div className="w-full sm:max-w-md px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}
