import React from 'react';
import AuthService from "../components/AuthService";
import NavBar from '../components/NavBar';
import GameArea from "../components/GameArea";
import PartyArea from "../components/PartyArea";
import io from 'socket.io-client';


export default class Game extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            Auth : new AuthService(),
            isPlaying : false,
            webSocket: io('http://localhost:3001/')
        };
    }

    handleUserStatus = () => {
        const loggedIn = this.state.Auth.loggedIn();
        const isAdmin = this.state.Auth.isAdmin();
        this.setState({
            isAdmin,
            loggedIn
        })
    };

    userGameStatus = () => {
        let self = this;
        const reqOptions = {
            method : 'get'
        };
        this.state.Auth.fetch('user/gamestatus',reqOptions)
            .then(response => {
                self.setState({isPlaying: response.isPlaying, playersList: response.playersList, creator: response.creator, partyId: response.partyId})
            });
    };


    render() {
        if (this.state.Auth.loggedIn()) {
            return (
                <div>
                    <NavBar pseudo={this.state.Auth.getProfile().email} isAdmin={this.state.Auth.isAdmin()}/>
                    <GameArea isPlaying={this.state.isPlaying} partyId={this.state.partyId} creator={this.state.creator} playersList={this.state.playersList} webSocket={this.state.webSocket}/>
                    <PartyArea isPlaying={this.state.isPlaying} webSocket={this.state.webSocket}/>
                </div>
            )
        } else {
            window.location.href = "/";
        }
    }

    componentDidMount() {
        const self = this;
        self.userGameStatus();
        self.state.webSocket.on('newPlayer', function () {
            self.userGameStatus();
        })
    }
}