import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import AuthService from "./AuthService";



export default class GameArea extends React.Component{
    constructor(props){
        super(props);
        this.state={
            gameId : '',
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
                document.location.reload();
            })
    };

    handleSketch = (p) => {
        const isCreator = this.state.Auth.getProfile().email === this.props.creator;
        sketch(p, this.props.webSocket, isCreator);
    };


    render() {
        if (this.props.isPlaying === true){
            const playersList = this.props.playersList.map((item,index) => {
                return(<p key={index}> {item} </p>)});
            return(
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-9" id="sketch">
                            <P5Wrapper sketch={this.handleSketch}/>
                        </div>
                        <div className="col-3">
                            <div className="min-vh-90">
                                List of players
                            </div>
                            <div className="min-vh-90">
                                {playersList}
                            </div>
                            <div className="h-5">
                                <button className="btn btn-danger" onClick={this.leaveParty} type="submit">Leave</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <form>
                                <div className="input-group">
                                    <input type="text" className="form-control"/>
                                    <span className="input-group-btn">
                                            <button className="btn btn-success" type="submit">Enter</button>
                                </span>
                                </div>
                            </form>
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
        console.log(this.props.partyId);
        this.props.webSocket.emit('join_party',this.props.partyId);
        this.setState({playersList : this.props.playersList});
    }
}