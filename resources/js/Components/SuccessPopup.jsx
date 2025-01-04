/**
 * SuccessPopup component
 * A reusable popup component for displaying success messages
 *
 * @param {Object} props
 * @param {boolean} props.isVisible - Controls popup visibility
 * @param {Function} props.onClose - Callback function when popup is closed
 * @param {string} props.message - Message to display in the popup
 */

import React from 'react';
import CheckCircle from '@/../../resources/svg/check-circle.svg';

export default function SuccessPopup({ isVisible, onClose, message }) {
    // Only render if isVisible is true
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                {/* Close button (X) in top right */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Success message */}
                <div className="mt-4 mb-6 text-center">
                    <img
                        src={CheckCircle}
                        alt="Success"
                        className="mx-auto h-12 w-12 text-green-500"
                    />
                    <p className="mt-4 text-lg font-semibold text-gray-700">{message}</p>
                </div>

                {/* OK button */}
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="w-32 bg-[#7408CF] text-white px-4 py-2 rounded hover:bg-[#6007ac] focus:outline-none focus:ring-2 focus:ring-[#7408CF] focus:ring-opacity-50"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}
