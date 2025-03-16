import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function Welcome({ auth, canLogin, canRegister }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gray-900">
                {/* Navigation */}
                <nav className="fixed top-0 w-full bg-gray-800/50 backdrop-blur-sm z-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex-shrink-0">
                                <Link href="/" className="text-xl font-bold text-white">
                                    Grappling Tracker
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-300 hover:text-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                Track Your Grappling Journey
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                Record techniques, track progress, and analyze your training. The ultimate companion for Brazilian Jiu-Jitsu and grappling practitioners.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                {!auth.user && (
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Get Started
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-gray-800 py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-3">
                            <div className="px-6 lg:px-8">
                                <h3 className="text-xl font-semibold text-white">Track Techniques</h3>
                                <p className="mt-4 text-gray-300">Record and organize your techniques by position and category.</p>
                            </div>
                            <div className="px-6 lg:px-8">
                                <h3 className="text-xl font-semibold text-white">Log Classes</h3>
                                <p className="mt-4 text-gray-300">Keep a detailed log of your training sessions and progress.</p>
                            </div>
                            <div className="px-6 lg:px-8">
                                <h3 className="text-xl font-semibold text-white">Analyze Progress</h3>
                                <p className="mt-4 text-gray-300">Visualize your development and identify areas for improvement.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
