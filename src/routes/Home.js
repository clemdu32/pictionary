import React from 'react';
import ApplicationForm from "../components/ApplicationForm";
import ConnectionForm from "../components/ConnectionForm";
import AlertBox from '../components/AlertBox';

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: true,
            button:'Register',
            message:'coucou'
        };
    }

    handleChange = () => {
        const isRegistered = !this.state.isRegistered;
        if (this.state.button==='Register'){
            this.setState({isRegistered : isRegistered,
                button:'Sign In'})
        }
        else{this.setState({isRegistered : isRegistered,
            button:'Sign Up'})}
    };

    handleChangeSending = (state) => {
        this.setState({isRegistered : state});
    };

    render() {

            if (this.state.isRegistered) {
                return(
                    <div>
                        <ConnectionForm/>
                        <p>You don't have an account? <button type="button" className="btn btn-primary" onClick={this.handleChange}>Register</button></p>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <ApplicationForm isDisplayed={(state) => this.handleChangeSending(state)}/>
                        <p>You <span
                            style={this.state.isRegistered ? {display: 'block'} : {display: 'none'}}>don't</span> have
                            an account? <button type="button" className="btn btn-primary"
                                                onClick={this.handleChange}>{this.state.button}</button></p>
                    </div>
                );
            }
        }
}