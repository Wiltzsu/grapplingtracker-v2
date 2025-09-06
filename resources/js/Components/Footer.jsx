import { Link } from '@inertiajs/react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-700 mt-auto dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1">
                        <div className="flex items-center mb-4">
                            <img
                                src="/grapplingtracker-01.svg"
                                alt="Grappling Tracker Logo"
                                className="h-20 w-20 mr-3"
                            />
                            <Link href="/" className="text-white text-xl font-bold">
                                Grappling Tracker
                            </Link>
                        </div>
                        <p className="text-gray-300 text-sm">
                            Track your progress, log your training, and improve your grappling journey.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href={route('dashboard')} className="text-gray-300 hover:text-white transition">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href={route('stats')} className="text-gray-300 hover:text-white transition">
                                    Statistics
                                </Link>
                            </li>
                            <li>
                                <Link href={route('chirps.index')} className="text-gray-300 hover:text-white transition">
                                    Notes
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="col-span-1">
                        <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/policy" className="text-gray-300 hover:text-white transition">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/terms-of-service" className="text-gray-300 hover:text-white transition">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-300 text-sm">
                            © {currentYear} Grappling Tracker. All rights reserved.
                        </p>
                        <p className="text-gray-300 text-sm mt-2 md:mt-0">
                            Made with ❤️ for the grappling community
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
