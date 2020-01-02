import React from 'react';
import '../App.css';
import './style/signin.css';
import AuthService from './AuthService';
import logo from '../images/logo.png';


export default class ConnectionForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleFormSubmit = (e) => {
        const Auth = new AuthService();
        e.preventDefault();
        Auth.login(this.state.email, this.state.pwd)
            .then(res =>{
                window.location.href = "/game";
            })
            .catch(err =>{
                alert(err);
            })
    };

    render() {
        return (
            <form onSubmit={this.handleFormSubmit} className="form-signin">
                <img className="mb-4" src={logo} alt="" width="300"/>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" name="email" className="form-control" placeholder="Email address"
                       onChange={this.handleChange} required autoFocus/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" name="pwd" className="form-control" placeholder="Password"
                       onChange={this.handleChange} required/>
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy; Janvier 2020</p>
            </form>
        );
    }
}