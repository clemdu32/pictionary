import React from 'react';
import AuthService from "../components/AuthService";
import NavBar from '../components/NavBar';

export default class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const Auth = new AuthService();
        if (Auth.loggedIn()) {
            if(Auth.isAdmin()) {
                return (
                    <div>
                        <NavBar pseudo={Auth.getProfile().pseudo} isAdmin={true}/>
                        <p>Welcome in the administrator area</p>
                    </div>
                )
            }
            else{
                window.location.href = "/game";
            }
        } else {
            window.location.href = "/";
        }
    }
}