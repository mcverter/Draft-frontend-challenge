import React, {Component} from 'react';
import loading from '../images/loading.gif';
import PlayerPageHeader from '../components/PlayerPageHeader';
import PlayerListItem from '../components/PlayerListItem';
import PlayerDetailModal from '../components/PlayerDetailsModal';

class PlayerListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            filter: '',
            modalIsOpen: false,
            league: ''
        };

        this.showPlayerDetails = this.showPlayerDetails.bind(this);
        this.modalCloseHandler = this.modalCloseHandler.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.loadLeague = this.loadLeague.bind(this);
    }

    /* Callback for League buttons */
    loadLeague(league){
        this.setState({league: 'FETCHING', players: [], filter: ''});
        fetch('https://playdraft.herokuapp.com/api/v1/players?league=' + league)
            .then(response => response.json())
            .then(data=>{
                this.setState({
                    players : data.players,
                    league: league
                });
            })
            .catch((error)=> {
                console.log(error);
            })
    }

    /* Callback for player filter input */
    handleFilterChange(event) {
        this.setState({filter: event.target.value});
    }

    /* Applies current filter to fetched player list */
    getFilteredPlayers() {
        const {players, filter} = this.state;
        if (players.length < 1 || filter.length < 1) {
            return players;
        } else {
            return players.filter(player=>{
                return (player.first_name + " " + player.last_name).toLowerCase()
                    .indexOf(filter.toLowerCase()) > -1;
            })
        }
    }

    /* Show grid of players */
    renderPlayerGrid() {
        const league = this.state.league;
        if (league === "FETCHING") {
            return (
                <img src={loading} alt="Loading Page" />
            )
        } else if (league !== '') {
            const displayedPlayers = this.getFilteredPlayers();
            return (
                <div style={styles.pageBody}>
                    <div style={styles.filterDiv}> Filter By Name:
                        <input type="text" value={this.state.filter} onChange={this.handleFilterChange}/>
                    </div>
                    <div style={styles.playersListContainer}>
                        {displayedPlayers.map(player => (
                            <PlayerListItem key={player.id}
                                            clickHandler={this.showPlayerDetails} {...player} />))}
                    </div>
                </div>
            )
        }
    }

    /* Callback for "Show Full Details" button */
    showPlayerDetails(id) {
        fetch('https://playdraft.herokuapp.com/api/v1/players/' + id)
            .then(response=>response.json())
            .then(data=>{
                this.setState({
                    modalIsOpen: true,
                    modalData: data.player
                });
            })
    }

    /* Callback for closing modal popup */
    modalCloseHandler() {
        this.setState({modalIsOpen: false})
    }

    render() {
        return (
            <div>
                <PlayerPageHeader clickHandler={this.loadLeague}/>
                <div>
                        {this.renderPlayerGrid()}
                </div>
                {this.state.modalIsOpen &&
                <PlayerDetailModal modalIsOpen={this.state.modalIsOpen}
                                   modalData={this.state.modalData}
                                   modalCloseHandler={this.modalCloseHandler}
                />}
            </div>
        )
    }
}

const styles = {
    pageBody: {
      backgroundColor: "#FFFFCC",
        padding: "20px"
    },
    filterDiv: {
      margin: "20px",
      padding: "10px",
      fontSize: "150%",
      fontWeight: "600"
    },
    playersListContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    }
};

export default PlayerListPage;