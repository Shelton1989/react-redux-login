import React, { Component } from 'react';
import { connect } from 'react-redux';

//Actions
import {
    rememberMe, 
    dontRememberMe, 
    updateUsername,
} from './actions/authenticate-actions';

//CSS
import './App.css';
import './App.scss';

//Components
import LandingNav from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Notification from './components/Notification';

//Application
class App extends Component {
    //Bindings
    handleUsername = this.handleUsername.bind(this);
    handleChange = this.handleChange.bind(this);
    //Methods for session
    handleUsername(e) {
        let username = e.target.value;
        this.props.onUpdateUsername(username);
    };
    handleChange(e){
        if(e.target.checked){
            this.props.onUserRemeber();
        } else {
            this.props.onUserDontRemember();
        };
    };
    render() {
        return (
            <div className="App-wrapper">
                <LandingNav />
                <Login 
                    handleUsername={this.handleUsername}
                    handleChange={this.handleChange}
                />
                <Notification />
                <Footer />
            </div>
        );
    };
};

const mapStateToProps = state =>({
    username: state.username,
    remember: state.remember,
});

const mapActionsToProps = {
    onUserRemeber: rememberMe,
    onUserDontRemember: dontRememberMe,
    onUpdateUsername: updateUsername,
};

export default connect(
        mapStateToProps, 
        mapActionsToProps
    )(App);