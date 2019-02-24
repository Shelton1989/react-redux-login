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
    handleNotify = async ()=>{
        let wrapper = document.getElementById('popup-wrapper');
        let n = document.getElementById('information-popup');
        if (this.props.notify.visible){
            let opacity = 0;
            wrapper.classList.remove('hidden');
            wrapper.classList.add('visible');
            let x = setInterval(()=>{
                opacity = opacity+0.1;
                n.style.opacity = opacity;
            },10);
            await new Promise(resolve=>setTimeout(resolve,100));
            clearInterval(x);
            n.style.opacity = 1;
        } else {
            let opacity = n.style.opacity;
            wrapper.classList.remove('visible');
            let x = setInterval(()=>{
                opacity = opacity-0.1;
                n.style.opacity = opacity;
            },10);
            await new Promise(resolve=>setTimeout(resolve,100));
            clearTimeout(x);
            wrapper.classList.add('hidden');
            n.style.opacity = 0;
        };
    };
    render() {
        return (
            <div className="App-wrapper">
                <LandingNav />
                <Login 
                    handleUsername={this.handleUsername}
                    handleChange={this.handleChange}
                    handleNotify={this.handleNotify}
                />
                <Notification 
                    handleNotify={this.handleNotify}
                />
                <Footer />
            </div>
        );
    };
};

const mapStateToProps = state =>({
    username: state.username,
    remember: state.remember,
    notify: state.notify,
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