import React from 'react';
import Modal from 'react-modal';
import Statistic from './Statistic';

// required for assistive technologies
Modal.setAppElement('#root');

const PlayerDetailModal =
    ({modalIsOpen, modalCloseHandler, modalData}) => {
        const { first_name, last_name, age, position, average_position_age_diff,
            league, team, photo_url} = modalData;

        return (
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={modalCloseHandler}
                style={styles.modalCustomStyle}
                contentLabel="Player Details"
            >
                <div style={styles.modalHeading}>
                    <div>
                        <h2>{first_name} {last_name}</h2>
                    </div>
                    <div>
                        <img alt="Player Headshot" src={photo_url}/>
                    </div>
                </div>
                <div>
                    <Statistic label="Age" stat={age} />
                    <Statistic label="Age Difference" stat={average_position_age_diff} />
                    <Statistic label="League" stat={league} />
                    <Statistic label="Team" stat={team} />
                    <Statistic label="Position" stat={position} />
                </div>
                <div style={styles.closeButtonContainer}>
                    <button style={styles.closeButton} onClick={modalCloseHandler}>Close</button>
                </div>
            </Modal>
        );
    };

const styles={
    modalCustomStyle: {
        content : {
            border: '1px black solid',
            backgroundColor: '#D4EE9F',
            overflow: "none",
            width: '350px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    },
    modalHeading: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column"

    },

    closeButtonContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    },
    closeButton:{
        fontWeight: "600",
        fontSize: "135%",
        padding: "10px",
        backgroundColor: "green",
        color: "white",
        marginTop: "10px"
    }
};

export default PlayerDetailModal;