import { Link } from '@inertiajs/react';
import DarkModeToggle from '@/Components/DarkModeToggle';

export default function GuestHeader({ auth, showExtraNav = true }) {
    return (
        <nav className={`w-full z-50 ${showExtraNav ? 'fixed top-0' : ''}`}>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                Grappling Tracker
                            </Link>
                        </div>
                        {showExtraNav && (
                            <div className="flex items-center space-x-4">
                                <DarkModeToggle />
                                {auth?.user ? (
                                    <div>
                                        <Link
                                            href={route('dashboard')}
                                            className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-all shadow-md hover:shadow-lg"
                                        >
                                            Dashboard
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <Link
                                                href={route('login')}
                                                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                            >
                                                Log in
                                            </Link>
                                        </div>
                                        <div>
                                            {/* <Link
                                                href={route('register')}
                                                className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-all shadow-md hover:shadow-lg"
                                            >
                                                Register
                                            </Link> */}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
