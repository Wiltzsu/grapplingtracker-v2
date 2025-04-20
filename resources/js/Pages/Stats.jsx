import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';

export default function Stats({ auth, totalClasses, totalRollingRounds, totalRoundDuration, totalClassDuration }) {
    const [dateRange, setDateRange] = useState('month');
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');
    const [showCustomDates, setShowCustomDates] = useState(false);

    const handleDateRangeChange = (value) => {
        setDateRange(value);
        if (value === 'custom') {
            setShowCustomDates(true);
            return;
        }
        setShowCustomDates(false);

        router.get(route('stats'), { range: value }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCustomDateSubmit = () => {
        if (customStartDate && customEndDate) {
            router.get(route('stats'), {
                range: 'custom',
                startDate: customStartDate,
                endDate: customEndDate
            }, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (hours === 0) {
            return `${minutes} minutes`;
        }

        if (remainingMinutes === 0) {
            return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
        }

        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${remainingMinutes} ${remainingMinutes === 1 ? 'minute' : 'minutes'}`;
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
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
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <select
                                    value={dateRange}
                                    onChange={(e) => handleDateRangeChange(e.target.value)}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="month">Last Month</option>
                                    <option value="6months">Last 6 Months</option>
                                    <option value="year">Last Year</option>
                                    <option value="all">All Time</option>
                                    <option value="custom">Custom Range</option>
                                </select>

                                {showCustomDates && (
                                    <div className="mt-4 flex items-end gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-700">Start Date</label>
                                            <input
                                                type="date"
                                                value={customStartDate}
                                                onChange={(e) => setCustomStartDate(e.target.value)}
                                                className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-700">End Date</label>
                                            <input
                                                type="date"
                                                value={customEndDate}
                                                onChange={(e) => setCustomEndDate(e.target.value)}
                                                className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                        <button
                                            onClick={handleCustomDateSubmit}
                                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                )}
                            </div>

                            <h3 className="text-lg font-semibold mb-4">Training Statistics</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold mb-4">Time based statistics</h4>
                                <p className="text-gray-700">
                                    Total classes: <span className="font-semibold">{totalClasses}</span>
                                </p>
                                <p className="text-gray-700 mb-4">
                                    Total class duration: <span className="font-semibold">{formatDuration(totalClassDuration)}</span>
                                </p>

                                <h4 className="text-lg font-semibold mb-4">Sparring statistics</h4>
                                <p className="text-gray-700">
                                    Total amount of rounds: <span className="font-semibold">{totalRollingRounds}</span>
                                </p>

                                <p className="text-gray-700">
                                    Total time sparring: <span className="font-semibold">{formatDuration(totalRoundDuration)}</span>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
