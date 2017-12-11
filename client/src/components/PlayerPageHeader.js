import React from 'react';

const PlayerPageHeader = ({clickHandler}) => {
    function renderLeagueButton(league) {
        return (
            <div>
                <button style={styles.leagueButton}
                        onClick={() => clickHandler(league)}>
                    {league}
                </button>
            </div>
        )
    }

    return (
        <div style={styles.pageHeading}>
            <h1> Select a League: </h1>
            <div style={styles.leagueButtonContainer}>
                {renderLeagueButton("NHL")}
                {renderLeagueButton("NFL")}
                {renderLeagueButton("NBA")}
                {renderLeagueButton("MLB")}
            </div>
        </div>
    );
};

const styles = {
    pageHeading: {
        backgroundColor: "#A9C967",
        padding: "20px",
    },
    leagueButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
        margin: "auto"
    },
    leagueButton: {
        width: "100px",
        height: "50px",
        fontWeight: "600",
        backgroundColor: "#D4EE9F"
    },
};

export default PlayerPageHeader;



