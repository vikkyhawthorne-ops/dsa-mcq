import React from 'react';
import { Achievement } from '../store/primitives/UserEngagement';

interface BadgeDetailsProps {
    badge: Achievement;
    imageSource: any;
}

const BadgeDetails: React.FC<BadgeDetailsProps> = ({ badge, imageSource }) => {
    return (
        <div style={styles.container}>
            <span style={styles.dateText}>Unlocked on {new Date().toLocaleDateString()}</span>
            <h2 style={styles.title}>Badge Unlocked!</h2>
            {imageSource ? (
                <img src={imageSource?.uri || imageSource} style={styles.badgeIcon} alt={badge.name} />
            ) : (
                <div style={styles.badgeIconPlaceholder}>★</div>
            )}
            <h3 style={styles.badgeName}>{badge.name}</h3>
            <p style={styles.description}>{badge.description}</p>
            {!badge.achieved && (
                <p style={styles.criteria}>How to unlock: {badge.unlockCriteria}</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'system-ui, sans-serif',
    },
    dateText: {
        color: 'gray',
        marginBottom: '10px',
        fontSize: '14px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#212121',
    },
    badgeIcon: {
        width: '150px',
        height: '150px',
        marginBottom: '20px',
        objectFit: 'contain' as const,
    },
    badgeIconPlaceholder: {
        width: '150px',
        height: '150px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
        backgroundColor: '#f0f0f0',
        borderRadius: '50%',
        color: '#FF7A3C',
    },
    badgeName: {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#212121',
    },
    description: {
        textAlign: 'center' as const,
        color: 'gray',
        marginBottom: '20px',
        fontSize: '16px',
        maxWidth: '300px',
    },
    criteria: {
        textAlign: 'center' as const,
        color: 'green',
        fontWeight: 'bold',
        fontSize: '14px',
    }
};

export default BadgeDetails;
