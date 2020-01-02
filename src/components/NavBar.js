import React from 'react';
import AuthService from './AuthService';

export default class NavBar extends React.Component{

    constructor(props){
        super(props);
        this.state={
            Auth : new AuthService()
        }
    }

    logOut = () => {
        this.state.Auth.logout();
        window.location.href = "/";
    };

    moveToDashboard = () => {
        window.location.href = "/dashboard";
    };


    render() {
            if (this.props.isAdmin){
                return (
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <a className="navbar-brand  mr-auto" href="#">Pictionnary</a>
                            <p className="navbar-brand mr-auto">{this.props.pseudo}</p>
                            <button className="btn btn-warning my-2 my-sm-0 " type="button" onClick={this.moveToDashboard}>Administration Panel</button>
                            <button className="btn btn-danger my-2 my-sm-0 " type="button" onClick={this.logOut}>Log out</button>
                        </nav>
                    </div>
                );
            }
            else{
                return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand  mr-auto" href="#">Pictionnary</a>
                        <p className="navbar-brand mr-auto">{this.props.pseudo}</p>
                        <button className="btn btn-danger my-2 my-sm-0 " type="button" onClick={this.logOut}>Log out</button>
                    </nav>
                </div>
                );
            }

    }
}