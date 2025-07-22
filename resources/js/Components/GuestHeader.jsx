import { Link } from '@inertiajs/react';
import DarkModeToggle from '@/Components/DarkModeToggle';

export default function GuestHeader({ auth, showExtraNav = true }) {
    return (
        <nav className={`w-full z-50 ${showExtraNav ? 'fixed top-0' : ''}`}>
            <div className="bg-indigo-600 dark:bg-indigo-900">
                <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
                    <div className="text-center text-sm font-medium text-white">
                        <span className="inline-flex items-center gap-x-2">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                            </svg>
                            Beta Version - Currently in active development
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
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
                                            <Link
                                                href={route('register')}
                                                className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-all shadow-md hover:shadow-lg"
                                            >
                                                Register
                                            </Link>
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