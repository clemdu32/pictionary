import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import AuthService from "./AuthService";
import PlayersList from "./PlayersList";
import AlertBox from "./AlertBox";



export default class CreatorScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: '',
            players: [],
            turnNumber: 0,
            webSocket: this.props.webSocket,
            Auth: new AuthService(),
            phase: 'Waiting for players...'
        }
    };


    leaveParty = () => {
        this.props.webSocket.emit('deleteParty');
        document.location.reload();
    };

    startParty = () => {
        let self = this;
        self.props.webSocket.emit('startParty');
    };

    handleSketch = (p) => {
        sketch(p, this.props.webSocket, true);
    };

    wordTest = (event) => {
        const self = this;
        event.preventDefault();
        this.props.webSocket.emit('wordTest', self.state.wordTest);
        this.setState({wordTest : ''});
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    render() {
        console.log(this.props.words)
        if (this.props.phase === "Waiting for new players...") {
            return (
                <div className="container">
                    <div className="row mt-2">
                        <div className="col">
                            <div className="card text-white bg-primary h-100 mt-2" id="sketchCard">
                                <h5 className="card-header">Players</h5>
                                <div className="card-body">
                                    <PlayersList players={this.props.players}/>
                                    <button className="btn btn-danger" onClick={this.leaveParty} type="submit">Leave</button>
                                    <button className="btn btn-success" onClick={this.startParty} type="submit">Let's play!!!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if (this.props.phase === "Party Finished") {
            return (
                <div className="container">
                    <div className="row mt-2">
                        <div className="col">
                            <div className="card text-white bg-primary h-100 mt-2" id="sketchCard">
                                <h5 className="card-header">Ranking : </h5>
                                <div className="card-body">
                                    <PlayersList players={this.props.players}/>
                                    <button className="btn btn-danger" onClick={this.leaveParty} type="submit">Leave</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if (this.props.phase === "Drawing...") {
            return (
                <div className="container">
                    <AlertBox message={this.state.message}/>
                    <div className="row mt-2">
                        <div className="col-md-9" id="sketch">
                            <div className="card text-white bg-danger mt-2" id="sketchCard">
                                <h5 className="card-header">Drawer : {this.props.creator}</h5>
                                <h5 className="card-header">Word : {this.props.words[this.state.turnNumber]}</h5>
                                <h5 className="card-header">Turn n° : {this.props.turn}</h5>
                                <div className="card-body">
                                    <P5Wrapper sketch={this.handleSketch}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-white bg-primary h-100 mt-2" id="sketchCard">
                                <h5 className="card-header">Players</h5>
                                <div className="card-body">
                                    <PlayersList players={this.props.players}/>
                                    <button className="btn btn-danger" onClick={this.leaveParty} type="submit">Leave
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(<div></div>);
        }
    }

    componentDidMount() {
        const self =this;
        this.props.webSocket.on("wordFound", function (data) {
            self.setState({message : "Word " + data.word + " found by " + data.founder})
        });
        this.props.webSocket.on("nextTurn", function (data) {
            self.setState({turnNumber : data, message: ''})
        });
    }
}