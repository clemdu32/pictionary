import React from 'react';
import AuthService from "./AuthService";
import CreatorScreen from "./CreatorScreen";
import PlayerScreen from "./PlayerScreen";



export default class GameArea extends React.Component{
    constructor(props){
        super(props);
        this.state={
            partyInfo:{
                players:[],
                creator:'',
                phase:'',
                turn :1,
                words:[]
            },
            phase:'',
            Auth : new AuthService(),
        }
    };


    leaveParty = () => {
        let self = this;
        const reqOptions = {
            method : 'get'
        };
        this.state.Auth.fetch('user/leaveparty',reqOptions)
            .then(response => {
                self.setState({message: response.message});
                self.props.webSocket.emit('leaveParty');
                document.location.reload();
            })
    };

    wordTest = () => {
        this.props.webSocket.emit('answeredWord', this.state.wordTest)
    };

    render() {
        if (this.props.isPlaying === true){
                if (this.state.Auth.getProfile().email === this.state.partyInfo.creator){
                    return(<CreatorScreen creator={this.state.partyInfo.creator} players={this.state.partyInfo.players} webSocket={this.props.webSocket} phase={this.state.partyInfo.phase} words={this.state.partyInfo.words} turn={this.state.partyInfo.turn}/>)
                }
                else{
                    return(<PlayerScreen creator={this.state.partyInfo.creator} players={this.state.partyInfo.players} webSocket={this.props.webSocket} phase={this.state.partyInfo.phase} turn={this.state.partyInfo.turn}/>)
                }
        }
        else{
            return <div></div>;
        }
    }

    componentDidMount() {
        const self = this;
        this.props.webSocket.on('newPhase', function (data) {
            self.setState({phase: data});
        });
        this.props.webSocket.on('updatePartyInfo', function (data) {
            self.setState({partyInfo: data});
        });
        this.props.webSocket.on('partyDeleted', function () {
            document.location.reload();
        });

    }
}