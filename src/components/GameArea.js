import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import AuthService from "./AuthService";
import PlayersList from "./PlayersList";



export default class GameArea extends React.Component{
    constructor(props){
        super(props);
        this.state={
            gameId : '',
            players : [],
            Auth : new AuthService()
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

    handleSketch = (p) => {
        const isCreator = this.state.Auth.getProfile().email === this.props.partyInfo.creator;
        sketch(p, this.props.webSocket, isCreator);
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    wordTest = () => {
        this.props.webSocket.emit('answeredWord', this.state.wordTest)
    };

    render() {
        if (this.props.isPlaying === true){
                return(
                    <div className="container">
                        <div className="row mt-2">
                            <div className="col-md-9" id="sketch">
                                <div className="card text-white bg-danger mt-2" id="sketchCard">
                                    <h5 className="card-header">Drawer : {this.props.creator}</h5>
                                    <div className="card-body">
                                        <P5Wrapper sketch={this.handleSketch}/>
                                    </div>
                                </div>
                                <div className="card text-white bg-warning mt-2">
                                    <div className="card-body">
                                        <form>
                                            <div className="input-group">
                                                <input type="text"  className="form-control" name="wordTest" value={this.handleChange}/>
                                                <span className="input-group-btn">
                                            <button className="btn btn-success" type="submit" onClick={this.wordTest}>Enter</button>
                                            </span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card text-white bg-primary h-100 mt-2" id="sketchCard">
                                    <h5 className="card-header">Players</h5>
                                    <div className="card-body">
                                        <PlayersList players={this.props.partyInfo.players} />
                                        <button className="btn btn-danger" onClick={this.leaveParty} type="submit">Leave</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
        }
        else{
            return <div></div>;
        }
    }

    componentDidMount() {

    }
}