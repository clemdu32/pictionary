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
                            <a className="navbar-brand  mr-auto" href="/game">Pictionnary</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">My history</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" onClick={this.moveToDashboard}>Administration Panel</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" onClick={this.logOut}>Log out</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                );
            }
            else{
                return (
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <a className="navbar-brand  mr-auto" href="#">Pictionnary</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">My history</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" onClick={this.logOut}>Log out</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                );
            }

    }
}