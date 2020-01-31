import React from 'react';
import './style/signup.css';
import logo from '../images/logo.png';


export default class ApplicationForm extends React.Component{
    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };


    handleSubmit = (event) => {
        const reqOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method : 'post',
            body : JSON.stringify({
                email : this.state.email,
                pwd : this.state.pwd,
                pwdConfirmation : this.state.pwdConfirmation,
                pseudo : this.state.pseudo
            })

        };
        fetch('http://localhost:3001/registration',reqOptions)
            .then(function(response) {
                return response.json();
            }).then(function (response) {
            console.log(response);
        }).then(this.props.isDisplayed(true));
        event.preventDefault();
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-signin" >
                <img className="mb-4" src={logo} alt="" width="300"/>
                <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
                    <label htmlFor="inputEmail">Enter your Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" name="email" onChange={this.handleChange}  required  autoFocus/>
                    <label htmlFor="inputEmail">Enter your Pseudo</label>
                    <input type="text" id="inputPseudo" className="form-control" placeholder="Pseudo" name="pseudo" onChange={this.handleChange}  required  autoFocus/>
                    <label htmlFor="inputPassword">Enter your Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" name="pwd" onChange={this.handleChange}  required/>
                    <label htmlFor="inputPassword">Re Enter your Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" name="pwdConfirmation"  onChange={this.handleChange}  required/>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
                    <p className="mt-5 mb-3 text-muted">&copy; Janvier 2020</p>
            </form>
        );
    }
}