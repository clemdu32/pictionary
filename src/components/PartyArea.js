import React from 'react';
import AuthService from './AuthService';

export default class PartyArea extends React.Component{
    constructor(props){
        super(props);
        this.state = {partiesList :[],
            message : ''
        };
    };

    handleNewParty = () => {
        let self = this;
        const Auth = new AuthService();
        const reqOptions = {
            method : 'post',
            body : JSON.stringify({
                numberOfTurn:'10'
            })
        };
        Auth.fetch('newparty',reqOptions)
            .then(response =>{
                self.setState({message: response.message});
                document.location.reload();
            });
    };

    handleDisplayParties = () =>{
        let self = this;
        const Auth = new AuthService();
        const reqOptions = {
            method : 'get'
        };
        Auth.fetch('parties', reqOptions)
            .then( response => {
                console.log(response);
                return response;
            })
            .then(response =>self.setState({partiesList: response.parties}));
    };


    handleJoinParty = (partyId) =>{
        const url = "user/joinparty/" + partyId;
        const Auth = new AuthService();
        const self = this;
        const reqOptions = {
            method : 'get'
        };
        Auth.fetch(url, reqOptions)
            .then( response => {
                console.log(response);
                document.location.reload();
            })
            .then(response =>self.setState({partiesList: response.parties}));
    };

    render() {
        if (this.props.isPlaying === false) {
            const partiesList = this.state.partiesList.map((item,index) => {
                return(<tr key={index}>
                    <th scope="row">{item.start}</th>
                    <td>{item.creator}</td>
                    <td>{item.numberOfTurn}</td>
                    <td>{item.players.length}</td>
                    <td>
                        <button className="btn btn-primary" type="button" onClick={() => this.handleJoinParty(item._id)}>Join!!!</button>
                    </td>
                </tr>)
            });
            return(
                <div className="container">
                    <div className="container">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Creator</th>
                                <th scope="col">Number of turn</th>
                                <th scope="col">Number of player</th>
                                <th scope="col"><button className="btn btn-success my-2 my-sm-0 " type="button" onClick={this.handleNewParty}>+ New Party</button><button className="btn btn-primary my-2 my-sm-0 " type="button" onClick={this.handleDisplayParties}>Refresh</button></th>
                            </tr>
                            </thead>
                            <tbody>
                            {partiesList}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        else{
            return <div></div>
        }
    }

    componentDidMount() {
        this.handleDisplayParties();
        console.log(this.props.isPlaying);
    }
}