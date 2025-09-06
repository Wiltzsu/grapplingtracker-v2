import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
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
    const [dateRange, setDateRange] = useState('year');
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');
    const [showCustomDates, setShowCustomDates] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Listen for dark mode changes
    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        // Check initial state
        checkDarkMode();

        // Create a mutation observer to watch for class changes on document.documentElement
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    checkDarkMode();
                }
            });
        });

        // Start observing
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Cleanup
        return () => observer.disconnect();
    }, []);

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

    const getChartColors = () => {
        return {
            textColor: isDarkMode ? 'white' : 'black',
            gridColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        };
    };

    const generateLegend = (labels, colors) => {
        return labels.map((label, index) => ({
            text: label,
            fillStyle: colors[index],
            strokeStyle: colors[index],
            lineWidth: 0,
            hidden: false,
            index: index
        }));
    };

    const chartColors = getChartColors();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-lg font-semibold leading-tight text-gray-800 dark:text-white">
                    Statistics and data
                </h2>
            }
        >
            <Head title="Training Statistics" />

            <div className="py-6 sm:py-12 pr-2 pl-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Your training insights
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Track your progress and analyze your training patterns over time.
                        </p>
                    </div>

                    {/* Date Range Selector with better styling */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                Time period
                            </h2>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {dateRange === 'custom' && customStartDate && customEndDate
                                    ? `${new Date(customStartDate).toLocaleDateString()} - ${new Date(customEndDate).toLocaleDateString()}`
                                    : dateRange === 'all'
                                        ? 'All time data'
                                        : `Showing ${dateRange === 'month' ? 'past month' : dateRange === '6months' ? 'past 6 months' : 'past year'} data`
                                }
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {/* Time period pills */}
                            <button
                                onClick={() => handleDateRangeChange('month')}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors dark:bg-gray-900 ${
                                    dateRange === 'month'
                                    ? 'bg-indigo-100 text-indigo-700 dark:text-indigo-300 dark:bg-gray-900'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:text-white'
                                }`}
                            >
                                Past month
                            </button>
                            <button
                                onClick={() => handleDateRangeChange('6months')}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors dark:bg-gray-900 ${
                                    dateRange === '6months'
                                    ? 'bg-indigo-100 text-indigo-700 dark:text-indigo-300 dark:bg-gray-900'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:text-white'
                                }`}
                            >
                                Past 6 months
                            </button>
                            <button
                                onClick={() => handleDateRangeChange('year')}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors dark:bg-gray-900 ${
                                    dateRange === 'year'
                                    ? 'bg-indigo-100 text-indigo-700 dark:text-indigo-300 dark:bg-gray-900'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:text-white'
                                }`}
                            >
                                Past year
                            </button>
                            <button
                                onClick={() => handleDateRangeChange('all')}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors dark:bg-gray-900 ${
                                    dateRange === 'all'
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:text-white'
                                }`}
                            >
                                All time
                            </button>
                            <button
                                onClick={() => handleDateRangeChange('custom')}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors dark:bg-gray-900 ${
                                    dateRange === 'custom'
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:text-white'
                                }`}
                            >
                                Custom range
                            </button>
                        </div>

                        {/* Enhanced Custom Date Range */}
                        {showCustomDates && (
                            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                                    Select custom date range
                                </h3>
                                <div className="flex flex-wrap items-end gap-4">
                                    <div className="flex-1 min-w-[200px]">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        value={customStartDate}
                                        onChange={(e) => setCustomStartDate(e.target.value)}
                                            className="w-full rounded-lg border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    />
                                </div>
                                    <div className="flex-1 min-w-[200px]">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        value={customEndDate}
                                        onChange={(e) => setCustomEndDate(e.target.value)}
                                            className="w-full rounded-lg border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    />
                                </div>
                                <button
                                    onClick={handleCustomDateSubmit}
                                        disabled={!customStartDate || !customEndDate}
                                        className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Apply Range
                                </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Enhanced Stats Grid with better visual design */}
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                        {/* Training Overview Card */}
                        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Training Overview</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid gap-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total sessions</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalClasses}</p>
                                        </div>
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                    </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total training time</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatDuration(totalClassDuration)}</p>
                                        </div>
                                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average class duration</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatDuration(averageClassDuration)}</p>
                                </div>
                                        <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sparring Stats Card */}
                        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                                        <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sparring Statistics</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid gap-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total rounds</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalRollingRounds}</p>
                                        </div>
                                        <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                                            <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total sparring time</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatDuration(totalRoundDuration)}</p>
                                        </div>
                                        <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                                            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg round duration</p>
                                                <p className="text-xl font-bold text-gray-900 dark:text-white">{formatDuration(averageRoundDuration)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sparring ratio</p>
                                                <p className="text-xl font-bold text-gray-900 dark:text-white">{sparringRelativeToTraining}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Charts Section */}
                    <div className="space-y-6">
                        {/* Training Frequency Chart */}
                        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                                        <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Training Frequency</h3>
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
                                                    borderColor: 'rgb(99, 102, 241)',
                                                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                                    tension: 0.4,
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
                                                    labels: {
                                                        color: chartColors.textColor,
                                                        usePointStyle: true,
                                                        pointStyle: 'circle',
                                                        padding: 20
                                                    }
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
                                                        stepSize: 1,
                                                        color: chartColors.textColor
                                                    },
                                                    grid: {
                                                        color: chartColors.gridColor
                                                    }
                                                },
                                                x: {
                                                    ticks: {
                                                        color: chartColors.textColor
                                                    },
                                                    grid: {
                                                        color: chartColors.gridColor
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

                        {/* Charts Grid */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Sparring vs Training Chart */}
                            <div className="overflow-hidden bg-white shadow-sm rounded-lg dark:bg-gray-800">
                                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:bg-gray-900 dark:border-gray-500">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Training Distribution</h3>
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
                                                plugins: {
                                                    legend: {
                                                        position: 'right',
                                                        labels: {
                                                            color: chartColors.textColor,
                                                            usePointStyle: true,
                                                            pointStyle: 'circle',
                                                            padding: 20
                                                        }
                                                    }
                                                }
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
                            <div className="overflow-hidden bg-white shadow-sm rounded-lg dark:bg-gray-800">
                                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:bg-gray-900 dark:border-gray-500">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Positions Distribution</h3>
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
                                                        labels: {
                                                            color: chartColors.textColor,
                                                            usePointStyle: true,
                                                            pointStyle: 'circle',
                                                            padding: 20
                                                        }
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
            </div>
        </AuthenticatedLayout>
    );
}
