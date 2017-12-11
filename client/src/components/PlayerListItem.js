import React from 'react';

const PlayerListItem =
    ({id, first_name, last_name, league, team, photo_url, clickHandler}) => (
        <div style={styles.playerContainer}>
            <div className="pictureDiv">
                <div>
                    <img alt="Player Headshot" src={photo_url} />
                </div>
                <div style={styles.playerName}>
                    <span>{first_name}</span> <span>{last_name}</span>
                </div>
            </div>
            <div className="statisticsDiv">
                <div style={styles.statsHeader}> Statistics </div>
                <div> League: {league}</div>
                <div> Team: {team}</div>
                <div>
                    <button style={styles.infoButton}
                            onClick={()=>clickHandler(id)}>
                        Show Full Information
                    </button>
                </div>
            </div>
        </div>
    );

const styles = {
    playerContainer : {
        display: "flex",
        flexDirection: "row",
        alignItems: "top",
        justifyContent: "space-around",
        padding: "10px",
        border: "1px solid black",
        margin: "10px",
        width: "400px",
        height: "250px"
    },
    playerName: {
        marginTop: "20px",
        fontWeight: "600",
        fontSize: "150%"
    },
    statsHeader: {
        marginBottom: "20px",
        fontWeight: "600",
        fontSize: "150%"
    },
    infoButton: {
        marginTop: "20px",
        fontWeight: "600",
        backgroundColor: "#2E882E",
        color: "white"
    }
}

export default PlayerListItem;