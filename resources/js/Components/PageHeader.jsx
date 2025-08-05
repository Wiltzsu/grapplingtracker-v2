import { Link, router, usePage } from '@inertiajs/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function PageHeader({
    backRoute,
    backLabel,
    sectionRoute,
    sectionLabel,
    childRoute,
    childLabel,
    cancelRoute,
}) {
    const path = window.location.pathname;
    const { props } = usePage();

    return (
        <nav className="flex items-center gap-3 rounded-lg select-none">
            <Link
                href={backRoute}
                className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200"
            >
                {backLabel}
            </Link>

            <span className="text-gray-400">»</span>

            <span className="text-gray-600 hover:text-indigo-800 transition-colors duration-200 dark:text-white dark:transition-colors dark:duration-200 dark:hover:text-indigo-700">
                {sectionLabel}
            </span>
        </nav>
    );
}
