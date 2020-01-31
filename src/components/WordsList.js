import React from 'react'
import AuthService from "./AuthService";

export default class PlayersList extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor (props) {
    super(props)
    this.state = {
      newWord: ''
    }
  }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    deleteWord = (wordId) =>{
        const url = "deleteword/" + wordId;
        const Auth = new AuthService();
        const reqOptions = {
            method : 'get'
        };
        Auth.fetch(url, reqOptions)
            .then( response => {
                console.log(response);
                document.location.reload();
            })
    }

    sendNewWord = (event) => {
        event.preventDefault();
        const url = "newword/";
        const Auth = new AuthService();
        const newWord = this.state.newWord
        console.log(newWord)
        const reqOptions = {
            method : 'POST',
            body : JSON.stringify({newWord})
        };
        Auth.fetch(url, reqOptions)
            .then( response => {
                console.log(response);
                document.location.reload();
            })
    }

  render () {
    const wordsList = this.props.words.map((item, index) => {
      return (<tr key={index}>
        <th scope="row" className="col-md-2">{index}</th>
        <td className="col-md-6">{item.word}</td>
        <td className="col-md-4">
          <button className="btn btn-danger" type="button" onClick={() => this.deleteWord(item._id)}>Delete</button>
        </td>
      </tr>)
    })
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Word</th>
            <th scope="col">
                <form>
              <div className="input-group">
                <input type="text" className="form-control" name="newWord" onChange={this.handleChange} value={this.state.newWord}/>
                <span className="input-group-btn">
                  <button className="btn btn-success" type="submit" onClick={this.sendNewWord}>Enter</button>
                </span>
              </div>
                </form>
            </th>
          </tr>
        </thead>
        <tbody>
          {wordsList}
        </tbody>
      </table>
    )
  }
}
