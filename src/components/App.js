import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import S from '../styles/App.module.scss'
import '../styles/main.scss'

import LoginScreen from './LoginScreen'
import Toolbar from './Toolbar'
import Navigation from './Navigation'
import Page from './Page'

import { TestContext } from '../contexts'
import Main from './Main';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true,
      cartCount: 0,
      incrementCart: this.incrementCart,
      navigationOpened: false,
      toggleNavigation: this.toggleNavigation
    }
  }

  incrementCart = () => {
    this.setState({cartCount: this.state.cartCount + 1});
  }

  handleLogin = () => {
    this.setState({loggedIn: true});
  }

  toggleNavigation = () => {
    this.setState({navigationOpened: !this.state.navigationOpened});
  }

  render() {
    const { Provider } = TestContext;

    return (
      <Provider value={this.state}>
        {!this.state.loggedIn ? <LoginScreen loginCallback={this.handleLogin} /> :
        <Router>
          <Toolbar />
          <Navigation />

          <div className={S.content}>
            <Switch>
              <Route path="/" exact component={Main} />
              {/* <Route path="/cart/" render={() => <Page text="Twój wózek:" />} /> */}
              {/* <Route path="/dupa/" render={() => <Page text="NIEEEE!!!" />} /> */}
            </Switch>
          </div>
        </Router>
        }
      </Provider>
    );
  }
}

export default App;
