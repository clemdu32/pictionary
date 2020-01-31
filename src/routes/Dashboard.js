import React from 'react'
import AuthService from '../components/AuthService'
import NavBar from '../components/NavBar'
import WordsList from '../components/WordsList'

export default class Dashboard extends React.Component {
  constructor (props) {
      super(props)
      this.state = {
          words: []
      }
  }

      handleDisplayWords = () => {
          let self = this;
          const Auth = new AuthService();
          const reqOptions = {
              method: 'get'
          };
          Auth.fetch('words', reqOptions)
              .then(response => {
                  console.log(response);
                  return response;
              })
              .then(response => {
                  self.setState({words: response.words});
              });
      };

      render()
      {
          const Auth = new AuthService()
          if (Auth.loggedIn()) {
              if (Auth.isAdmin()) {
                  return (
                      <div>
                          <NavBar pseudo={Auth.getProfile().pseudo} isAdmin={true}/>
                          <div className="container">
                              <div className="container">
                            <WordsList words={this.state.words}/>
                              </div>
                          </div>
                      </div>
                  )
              } else {
                  window.location.href = '/game'
              }
          } else {
              window.location.href = '/'
          }
      }

      componentDidMount() {
          this.handleDisplayWords();
      }
}

