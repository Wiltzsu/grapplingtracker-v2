import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Footer from '@/Components/Footer';
import DarkModeToggle from '@/Components/DarkModeToggle';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
                        <div className="bg-indigo-600">
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
            <nav className="border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-white" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                { /* Dashboard nav link */ }
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                                { /* Add new entry nav link */ }
                                <NavLink
                                    href={route('add')}
                                    active={route().current('add')}
                                >
                                    Add
                                </NavLink>
                                { /* View entries nav link */ }
                                <NavLink
                                    href={route('view')}
                                    active={route().current('view')}
                                >
                                    View
                                </NavLink>
                                { /* View stats nav link */ }
                                <NavLink
                                    href={route('stats')}
                                    active={route().current('stats')}
                                >
                                    Stats
                                </NavLink>
                                { /* View chirps */ }
                                <NavLink href={route('chirps.index')} active={route().current('chirps.index')}>
                                    Notes
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="flex relative ms-3">
                            <DarkModeToggle />

                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-gray-500 dark:text-gray-300 transition duration-150 ease-in-out hover:text-gray-700 dark:hover:text-white focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 dark:text-gray-300 transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 dark:hover:text-white focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-500 dark:focus:text-white focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('add')}
                            active={route().current('add')}
                        >
                            Add
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('view')}
                            active={route().current('view')}
                        >
                            View
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('stats')}
                            active={route().current('stats')}
                        >
                            Stats
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('chirps.index')}
                            active={route().current('chirps.index')}
                        >
                            Notes
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700">
                        <div className="px-4 py-4 bg-gray-50 dark:bg-gray-800">
                            <div className="text-base font-medium text-gray-800 dark:text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                {user.email}
                            </div>
                        </div>

                        <div className="space-y-1 px-2 pb-3 pt-2">
                            <ResponsiveNavLink
                                href={route('profile.edit')}
                                className="hover:bg-indigo-50 dark:hover:bg-indigo-900 dark:text-gray-300"
                            >
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="w-full text-left hover:bg-red-50 dark:hover:bg-red-900 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="flex-grow dark:bg-gray-700">{children}</main>
            <Footer />

        </div>
    );
}
