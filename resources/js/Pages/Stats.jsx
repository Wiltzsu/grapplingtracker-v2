import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import NoData from '@/Components/NoData';
import InfoCircle from '@/../../resources/svg/icons8-info.svg';
import dayjs from 'dayjs';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function Stats({ auth,
                                totalClasses,
                                totalRollingRounds,
                                totalRoundDuration,
                                totalClassDuration,
                                averageRoundDuration,
                                averageClassDuration,
                                sparringRelativeToTraining,
                                trainingFrequency,
                                positionsRelative,
                            }) {
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
                    Statistics and data
                </h2>
            }
        >
            <Head title="Training Statistics" />

            <div className="py-6 sm:py-12 pr-2 pl-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Date Range Selector */}
                    <div className="mb-6">
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Time period pills */}
                            <button
                                onClick={() => handleDateRangeChange('month')}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                                    dateRange === 'month'
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Last Month
                            </button>
                            <button
                                onClick={() => handleDateRangeChange('6months')}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                                    dateRange === '6months'
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Last 6 Months
                            </button>
                            <button
                                onClick={() => handleDateRangeChange('year')}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                                    dateRange === 'year'
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Last Year
                            </button>
                            <button
                                onClick={() => handleDateRangeChange('all')}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                                    dateRange === 'all'
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                All Time
                            </button>
                            <button
                                onClick={() => handleDateRangeChange('custom')}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                                    dateRange === 'custom'
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Custom Range
                            </button>
                        </div>

                        {/* Custom date range inputs */}
                        {showCustomDates && (
                            <div className="mt-4 flex flex-wrap items-end gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Start Date</label>
                                    <input
                                        type="date"
                                        value={customStartDate}
                                        onChange={(e) => setCustomStartDate(e.target.value)}
                                        className="mt-1 rounded-lg border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">End Date</label>
                                    <input
                                        type="date"
                                        value={customEndDate}
                                        onChange={(e) => setCustomEndDate(e.target.value)}
                                        className="mt-1 rounded-lg border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>
                                <button
                                    onClick={handleCustomDateSubmit}
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Apply Range
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Training Overview Card */}
                        <div className="overflow-hidden bg-white shadow-sm rounded-lg">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                                <h3 className="text-lg font-medium text-gray-900">Training Overview</h3>
                            </div>
                            <div className="p-6">
                                <div className="grid gap-4">
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <p className="text-sm text-gray-500">Total Classes</p>
                                        <p className="text-2xl text-gray-900">{totalClasses}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <p className="text-sm text-gray-500">Total Training Time</p>
                                        <p className="text-2xl text-gray-900">{formatDuration(totalClassDuration)}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <p className="text-sm text-gray-500">Average Class Duration</p>
                                        <p className="text-2xl text-gray-900">{formatDuration(averageClassDuration)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sparring Stats Card */}
                        <div className="overflow-hidden bg-white shadow-sm rounded-lg">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                                <h3 className="text-lg font-medium text-gray-900">Sparring Statistics</h3>
                            </div>
                            <div className="p-6">
                                <div className="grid gap-4">
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <p className="text-sm text-gray-500">Total Rounds</p>
                                        <p className="text-2xl text-gray-900">{totalRollingRounds}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <p className="text-sm text-gray-500">Total Sparring Time</p>
                                        <p className="text-2xl text-gray-900">{formatDuration(totalRoundDuration)}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <p className="text-sm text-gray-500">Avg Round Duration</p>
                                            <p className="text-2xl text-gray-900">{formatDuration(averageRoundDuration)}</p>
                                        </div>
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <p className="text-sm text-gray-500">Sparring Ratio</p>
                                            <p className="text-2xl text-gray-900">{sparringRelativeToTraining}%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Training Frequency Chart */}
                    <div className="overflow-hidden bg-white shadow-sm rounded-lg mt-6">
                        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-medium text-gray-900">Training Frequency</h3>
                                <img
                                    src={InfoCircle}
                                    alt="Info"
                                    className="h-5 w-5"
                                />
                            </div>

                        </div>
                        <div className="p-6">
                            {trainingFrequency && trainingFrequency.length > 0 ? (
                                <Line
                                    data={{
                                        labels: trainingFrequency.map(item => dayjs(item.month).format('MMM YYYY')),
                                        datasets: [
                                            {
                                                label: 'Classes per Month',
                                                data: trainingFrequency.map(item => item.count),
                                                borderColor: 'rgb(79, 70, 229)',
                                                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                                                tension: 0.1,
                                                fill: true,
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'top',
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    title: (context) => {
                                                        return dayjs(trainingFrequency[context[0].dataIndex].month).format('MMMM YYYY');
                                                    }
                                                }
                                            }
                                        },
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                ticks: {
                                                    stepSize: 1
                                                }
                                            }
                                        }
                                    }}
                                    height={300}
                                />
                            ) : (
                                    <NoData message="No data available"
                                    secondaryMessage="Add classes to display training frequency"/>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        {/* Sparring vs Training Chart */}
                        <div className="overflow-hidden bg-white shadow-sm rounded-lg">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                                <h3 className="text-lg font-medium text-gray-900">Training Distribution</h3>
                            </div>
                            <div className="p-6">
                                {sparringRelativeToTraining && sparringRelativeToTraining > 0 ? (
                                    <Pie
                                        data={{
                                            labels: ['Sparring', 'Other Training'],
                                            datasets: [
                                                {
                                                    data: [sparringRelativeToTraining, 100 - sparringRelativeToTraining],
                                                    backgroundColor: [
                                                        'rgb(79, 70, 229)',
                                                        'rgb(199, 210, 254)',
                                                    ],
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                        }}
                                        height={300}
                                    />
                                ) : (
                                    <NoData message="No data available"
                                            secondaryMessage="Add classes and sparring statistics to display training distribution"
                                    />
                                )}

                            </div>
                        </div>
                        {/* Positions Distribution Chart */}
                        <div className="overflow-hidden bg-white shadow-sm rounded-lg">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                                <h3 className="text-lg font-medium text-gray-900">Positions Distribution</h3>
                            </div>
                            <div className="p-6">
                                {positionsRelative && positionsRelative.length > 0 ? (
                                    <Pie
                                        data={{
                                            labels: positionsRelative.map(item => item.position_name),
                                            datasets: [
                                                {
                                                    data: positionsRelative.map(item => item.count),
                                                    backgroundColor: [
                                                        'rgb(79, 70, 229)',  // Indigo
                                                        'rgb(59, 130, 246)', // Blue
                                                        'rgb(16, 185, 129)', // Green
                                                        'rgb(245, 158, 11)', // Orange
                                                        'rgb(239, 68, 68)',  // Red
                                                        'rgb(139, 92, 246)', // Purple
                                                        'rgb(236, 72, 153)', // Pink
                                                        'rgb(14, 165, 233)', // Light Blue
                                                        'rgb(168, 85, 247)', // Purple
                                                        'rgb(251, 146, 60)'  // Light Orange
                                                    ],
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    position: 'right',
                                                },
                                                tooltip: {
                                                    callbacks: {
                                                        label: (context) => {
                                                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                                            const percentage = ((context.raw / total) * 100).toFixed(1);
                                                            return `${context.label}: ${context.raw} (${percentage}%)`;
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                        height={300}
                                    />
                                ) : (
                                    <NoData message="No position data available"
                                            secondaryMessage="Add some techniques to your training sessions to see position statistics"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
