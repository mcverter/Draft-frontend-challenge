import React, {Component} from 'react';
import PlayerListItem from '../components/PlayerListItem';
import PlayerDetailModal from '../components/PlayerDetailsModal'

class PlayerListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            filter: '',
            modalIsOpen: false,
            league: ''
        }

        this.showPlayerDetails = this.showPlayerDetails.bind(this);
        this.modalCloseHandler = this.modalCloseHandler.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

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

    handleFilterChange(event) {
        this.setState({filter: event.target.value});
    }

    modalCloseHandler() {
        this.setState({modalIsOpen: false})
    }

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

    loadLeague(league){
        this.setState({league: '', players: [], filter: ''});
        fetch('https://playdraft.herokuapp.com/api/v1/players?league='+ league)
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

    render() {
        const displayedPlayers = this.getFilteredPlayers();
        return (
            <div>
                <div style={styles.pageHeading}>
                    <h1> Select a League: </h1>
                    <div style={styles.leagueButtonContainer}>
                        <div><button style={styles.leagueButton} onClick={()=>this.loadLeague("NHL")}>NHL</button></div>
                        <div><button style={styles.leagueButton} onClick={()=>this.loadLeague("NFL")}>NFL</button></div>
                        <div><button style={styles.leagueButton} onClick={()=>this.loadLeague("MLB")}>MLB</button></div>
                        <div><button style={styles.leagueButton} onClick={()=>this.loadLeague("NBA")}>NBA</button></div>
                    </div>
                </div>
                <div>
                    {
                        displayedPlayers.length < 1 ?
                            <div> No player information is available </div> :
                            <div style={styles.pageBody}>
                                <div style={styles.filterDiv}> Filter By Name:
                                    <input type="text" value={this.state.filter} onChange={this.handleFilterChange} />
                                </div>
                                <div style={styles.playersListContainer}>
                                    {displayedPlayers.map(player=>(
                                        <PlayerListItem key={player.id}
                                                        clickHandler={this.showPlayerDetails} {... player} />))}

                                </div>
                            </div>
                    }
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

    pageBody: {
      backgroundColor: "#FFFFCC",
        padding: "20px"
    },
    filterDiv: {
      margin: "20px",
      padding: "10px",
      fontSize: "200%",
      fontWeight: "600"
    },
    playersListContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    }

};


export default PlayerListing;