import React from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function ConfirmationPopup({ isVisible, onConfirm, onCancel, message }) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                {/* Close button (X) in top right */}
                <button
                    onClick={onCancel}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Confirmation message */}
                <div className="mt-4 mb-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="mt-4 text-lg font-semibold text-gray-700">{message}</p>
                </div>

                {/* Action buttons */}
                <div className="flex justify-center gap-4">
                    <SecondaryButton onClick={onCancel}>
                        Cancel
                    </SecondaryButton>
                    <DangerButton onClick={onConfirm}>
                        Delete
                    </DangerButton>
                </div>
            </div>
        </div>
    );
}
