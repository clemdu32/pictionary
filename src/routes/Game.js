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

    handlePlayerStatus = () =>{
        let self = this;
        const reqOptions = {
            method : 'get'
        };
        this.state.Auth.fetch('user/gamestatus',reqOptions)
            .then(response => {
                self.setState({partyId: response.partyId, isPlaying: response.isPlaying, partyInfo: response.party});
                console.log(this.state.party)
            })
    };


    render() {
        if (this.state.Auth.loggedIn()) {
            return (
                <div>
                    <NavBar pseudo={this.state.Auth.getProfile().email} isAdmin={this.state.Auth.isAdmin()}/>
                    <GameArea isPlaying={this.state.isPlaying} partyInfo={this.state.partyInfo} webSocket={this.state.webSocket}/>
                    <PartyArea isPlaying={this.state.isPlaying} webSocket={this.state.webSocket} />
                </div>
            )
        } else {
            window.location.href = "/";
        }
    }

    componentDidMount() {
        const self = this;
        this.handlePlayerStatus();
        console.log(this.state.partyId);
        self.state.webSocket.emit('playerConnected',{token: localStorage.getItem('token')});
        self.state.webSocket.on('updatePartyInfo', function () {
            self.handlePlayerStatus();
        });

    }
}