import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import GuestHeader from '@/Components/GuestHeader';

export default function Policy() {
    return (
        <>
        <GuestHeader showExtraNav={true} />

            <Head title="Privacy Policy" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-4xl pt-36 mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                        <div className="px-6 py-8 sm:p-10">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                                Privacy Policy
                            </h1>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                                Last updated: May 2025
                            </p>

                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our grappling tracker application.
                                </p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    1. Who We Are
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    This app is operated from Finland and complies with the General Data Protection Regulation (GDPR). We are committed to safeguarding your personal information.
                                </p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    2. Data We Collect
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    We collect the following information from users:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                                    <li>Email address</li>
                                    <li>Name</li>
                                    <li>User-submitted training data (e.g. grappling logs, notes)</li>
                                </ul>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Payment information (e.g. credit card details) is handled securely by Stripe, our third-party payment processor. We do not store payment information on our servers.
                                </p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    3. How We Collect Data
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    You provide your information by:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                                    <li>Creating an account via email/password or social login (OAuth)</li>
                                    <li>Entering training-related data into the app</li>
                                    <li>Completing transactions via Stripe</li>
                                </ul>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    4. Why We Collect Your Data
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    We collect and use your information to:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                                    <li>Create and manage your account</li>
                                    <li>Process subscription payments</li>
                                    <li>Provide core features of the app</li>
                                    <li>Send necessary transactional emails</li>
                                </ul>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    We do not send marketing or promotional emails.
                                </p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    5. Where Your Data Is Stored
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    All user data is securely stored on servers hosted by Hetzner in the European Union.
                                </p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    6. Sharing of Data
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    We do not share your personal data with any third parties except Stripe (for secure payment processing).
                                </p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    7. Account Deletion & Data Removal
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    You may delete your account and all associated data at any time via your account settings. This will permanently remove your information from our system.
                                </p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    8. Children's Privacy
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Our app is intended for use by adults. We do not knowingly collect personal information from individuals under the age of 13.
                                </p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    9. Your Rights (EU & U.S. Residents)
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    EU Users (GDPR) have the right to:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                                    <li>Access their data</li>
                                    <li>Correct inaccuracies</li>
                                    <li>Request deletion</li>
                                    <li>Object to or restrict processing</li>
                                </ul>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    U.S. Users (depending on your state) may have similar rights under laws such as the California Consumer Privacy Act (CCPA).
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    To exercise your rights or ask questions, contact us at{' '}
                                    <a href="mailto:support@grapplingtracker.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                        support@grapplingtracker.com
                                    </a>
                                </p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    10. Changes to This Policy
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    We may update this policy as needed. Users will be notified of significant changes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}