import React from 'react';
import Modal from 'react-modal';

// required for assistive technologies
Modal.setAppElement('#root');

const PlayerDetailModal =
    ({modalIsOpen, modalCloseHandler, modalData}) => {
        const { first_name, last_name, age, position, average_position_age_diff,
             league, team, photo_url} = modalData;

        const customStyle={
            content : {
                backgroundColor       : '#D4EE9F',
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };

        function renderStat(label, statistic) {
            return (
                <div style={styles.statistic}>
                    <div style={styles.statLabel}>{label}:</div>
                    <div style={styles.statContent}>{statistic || "Not Available"}</div>
                </div>

            )
        }

        return (
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={modalCloseHandler}
                style={customStyle}
                contentLabel="Example Modal"
            >
                <div style={{alignItems: "center"}}>
                <h2>{first_name} {last_name}</h2>
                <div>
                    <img alt="Player Headshot" src={photo_url}/>
                </div>
                </div>
                <div>
                    {renderStat("Age", age)}
                    {renderStat("Difference in Age", average_position_age_diff)}
                    {renderStat("League", league)}
                    {renderStat("Team", team)}
                    {renderStat("Position", position)}
                </div>
                <div style={{alignItems: "center"}}>
                    <button style={styles.closeButton} onClick={modalCloseHandler}>Close</button>
                </div>
            </Modal>
        );
    };

const styles={
    statistic: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px"
    },
    statLabel: {
        fontWeight: "800",
    },
    statContent: {},
    closeButton:{
        alignItems: "center",
        fontWeight: "600",
        backgroundColor: "green",
        color: "white",
        marginTop: "10px"
    }
}

export default PlayerDetailModal;