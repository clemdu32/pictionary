import React from 'react';

export default class PlayersList extends React.Component{

    constructor(props){
        super(props);
    }


    render() {
        const playersList = this.props.players.map((item,index) => {
            return(<p key={index}> {item.player}  {item.score}</p>)});
        return(<div>{playersList}</div>);
    }
}