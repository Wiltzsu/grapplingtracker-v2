import React from 'react';

export const formatDuration = (minutes) => {
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

interface ActivityItem {
    category_name?: string;
    instructor?: string;
    technique_name?: string;
    position_name?: string;
}

export const formatActivityMessage = (item: ActivityItem, type:string): React.ReactElement | string => {
    switch(type) {
        case 'categories':
            return (
                <>
                    <span className="font-bold">Added new category:</span> {item.category_name}
                </>
            );
        case 'training_classes':
            return (
                <>
                    <span className="font-bold">Created new session:</span> {item.instructor ? `${item.instructor}'s session` : 'No instructor'}
                </>
            );
        case 'techniques':
            return (
                <>
                    <span className="font-bold">Added new technique:</span> {item.technique_name}
                </>
            );
        case 'positions':
            return (
                <>
                    <span className="font-bold">Added new position:</span> {item.position_name}
                </>
            );
        default:
            return '';
    };
}
