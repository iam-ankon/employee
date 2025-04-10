import React, { useState, useEffect } from 'react';

const TADGroups = () => {
    const [tadGroups, setTadGroups] = useState([]);

    // Fetch TAD groups from the API
    useEffect(() => {
        fetch('http://192.168.4.183:8000/api/employee/details/api/tad_groups/')
            .then(response => response.json())
            .then(data => setTadGroups(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div style={styles.outlookContainer}>
            <div style={styles.outlookHeader}>
                <h2>TAD Groups</h2>
            </div>
            <div style={styles.outlookBody}>
                {tadGroups.length > 0 ? (
                    <ul>
                        {tadGroups.map(group => (
                            <li key={group.id} style={styles.groupItem}>
                                <span>{group.company_name}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No TAD Groups available.</p>
                )}
            </div>
        </div>
    );
};

// Inline CSS styles
const styles = {
    outlookContainer: {
        width: '80%',
        margin: '20px auto',
        backgroundColor: '#f4f6f9',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif'
    },
    outlookHeader: {
        backgroundColor: '#0078d4',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
    },
    outlookBody: {
        padding: '20px'
    },
    groupItem: {
        backgroundColor: 'white',
        padding: '10px',
        margin: '5px 0',
        borderRadius: '5px',
        border: '1px solid #ddd',
        cursor: 'pointer'
    },
    groupItemHover: {
        backgroundColor: '#f1f1f1'
    }
};

export default TADGroups;
