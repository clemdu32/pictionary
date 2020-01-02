import React from 'react';

export default class AlertBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: this.props.message
        }
    }


    render() {
        return (
            <div className="alert alert-success" role="alert">
                <p> {this.state.message}</p>
            </div>
        );
    }
}