import React from 'react';

const Statistic = ({label, stat}) => (
    <div style={styles.statistic}>
        <div style={styles.statLabel}>{label}:</div>
        <div>{stat || "Not Available"}</div>
    </div>
);

const styles = {
    statistic: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px"
    },
    statLabel: {
        fontWeight: "800",
    }
};

export default Statistic;



