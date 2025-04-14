import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Tab } from '@headlessui/react';
import { useState, useEffect } from 'react';

export default function Stats() {
    const [stats, setStats] = useState({
        week: null,
        month: null,
        sixMonths: null,
        year: null
    });

    const periods = [
        { name: '1 Week', key: 'week' },
        { name: '1 Month', key: 'month' },
        { name: '6 Months', key: 'sixMonths' },
        { name: '1 Year', key: 'year' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    View stats
                </h2>
            }
        >
            <Head title="View stats" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <Tab.Group>
                                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                                    {periods.map((period) => (
                                        <Tab
                                            key={period.key}
                                            className={({ selected }) =>
                                                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                                                    selected
                                                        ? 'bg-white text-blue-700 shadow'
                                                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'
                                                }`
                                            }
                                        >
                                            {period.name}
                                        </Tab>
                                    ))}
                                </Tab.List>
                                <Tab.Panels className="mt-4">
                                    {periods.map((period) => (
                                        <Tab.Panel
                                            key={period.key}
                                            className="rounded-xl bg-white p-3"
                                        >
                                            <StatsContent period={period.key} />
                                        </Tab.Panel>
                                    ))}
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatsContent({ period }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        // Here you would fetch your stats data
        // Example: fetch(`/api/stats/${period}`)
        setLoading(false);
        setData({ /* your stats data */ });
    }, [period]);

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Add your stats cards/content here */}
            <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold">Total Expenses</h3>
                <h3 className="text-lg font-semibold">% more than last week/month/year</h3>
                <p className="text-2xl font-bold text-blue-600">$0.00</p>
            </div>
            {/* Add more stat cards as needed */}
        </div>
    );
}
