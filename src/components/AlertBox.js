import React from 'react';

export default class AlertBox extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="alert alert-danger mt-2" role="alert">
                <p> {this.props.message}</p>
            </div>
        );
    }
}