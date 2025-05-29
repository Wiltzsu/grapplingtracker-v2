import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import GuestHeader from '@/Components/GuestHeader';

export default function TermsOfService() {
    return (
        <>
        <GuestHeader showExtraNav={true} />

            <Head title="Terms of Service" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-4xl pt-36 mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                        <div className="px-6 py-8 sm:p-10">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                                Terms of Service
                            </h1>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                                Last updated: May 2025
                            </p>

                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Welcome to Grappling Tracker. By creating an account or using our services, you agree to the following Terms of Service. Please read them carefully.
                                </p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    1. Who We Are
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Grappling Tracker is a training log and analytics platform designed for grapplers. The app is operated from Finland and is available globally.
                                </p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    2. Account Registration
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    To use Grappling Tracker, you must create an account using an email address and password or social login. By registering, you agree to:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                                    <li>Provide accurate and up-to-date information</li>
                                    <li>Keep your login credentials secure</li>
                                    <li>Not engage in any activity that is abusive, offensive, or unlawful within the app</li>
                                </ul>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    3. Acceptable Use
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">You agree not to:</p>
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                                    <li>Upload or share content that is offensive, discriminatory, or illegal</li>
                                    <li>Attempt to interfere with or access the app's backend systems</li>
                                    <li>Scrape, reproduce, or redistribute app content without permission</li>
                                </ul>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Violation of these terms may result in moderation of your content. In serious or repeated cases, we reserve the right to terminate your user account without prior notice.                                </p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    4. Subscriptions and Payment
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">Grappling Tracker is currently in beta testing and free to use.</p>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">Once the app is launched publicly:</p>
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                                    <li>A 30-day free trial will be offered</li>
                                    <li>After the trial, users can choose between monthly or yearly subscriptions</li>
                                    <li>Stripe will be used to securely process payments</li>
                                    <li>No refunds will be issued once a payment is processed</li>
                                </ul>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">Prices and terms are subject to change with notice.</p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    5. User Data & Ownership
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">You retain the right to delete your account and associated data at any time.</p>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    However, by using the app, you grant us the right to store, process, and analyze your training data to deliver core functionality. The training data is owned and managed by Grappling Tracker and stored securely in the European Union.
                                </p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    6. Account Termination and Data Deletion
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    While we do not terminate accounts automatically for ToS violations, we reserve the right to remove or moderate any content that violates these terms.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    You may delete your account and all associated data via the settings panel at any time. This process is irreversible.
                                </p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    7. Service Availability
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Grappling Tracker is offered as-is without any guarantees of uptime, availability, or continued maintenance. We cannot guarantee that the app will be supported long term.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">You use the app at your own risk.</p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    8. Liability Disclaimer
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">Grappling Tracker is not responsible for:</p>
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                                    <li>Inaccurate, lost, or corrupted data</li>
                                    <li>Downtime, errors, or bugs</li>
                                    <li>Any loss or injury resulting from app use</li>
                                </ul>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">We offer no warranties, expressed or implied, for any part of the service.</p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    9. Governing Law
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    These Terms are governed by the laws of Finland. Any disputes will be handled under Finnish jurisdiction.
                                </p>

                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                                    10. Contact
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    For questions about these terms, please contact us at:<br />
                                    support@grapplingtracker.com
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