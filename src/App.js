import React, { Component } from 'react';
import M from 'materialize-css';

//Styles
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import './App.scss';

//Components
import LandingNav from './components/Landingnav';
import Footer from './components/LandingFooter';
import Login from './components/Login';
import Notification from './components/Notification';

// Counter for debounce
let LoginAttemptCounter = 1;

// Mock database
const userDatabase = {
  user1: {
      username: 'ROBERT',
      password: 'Stormsend'
  },
  user2: {
      username: 'NED',
      password: 'Winterfell'
  },
  user3: {
      username: 'TYWIN',
      password: 'CasterlyRock'
  },
  user4: {
      username: 'JON',
      password: 'Eyrie'
  },
};

// Mock API call with delay
async function apiCall(time=1500) {
  await new Promise(resolve => setTimeout(resolve, time));
};
const database = async ()=>{
  let data = userDatabase;
  await apiCall();
  return data;
};

//Application
class App extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    usernameValid: false,
    passwordValid: false,
    remember: false,
    authenticated: false,
    attempt: 0,
    cooldown: 0,
    response: '',
    message: '',
    buttonText: 'OKAY',
    responseColor: 'green',
  };
  //Bindings
  handlePassword = this.handlePassword.bind(this);
  handleUsername = this.handleUsername.bind(this);
  handleChange = this.handleChange.bind(this);
  //Initialize materialize JavaScript
  componentDidMount(){
    M.AutoInit();
  };
  //Debounce brute force hacking
  debounce = async ()=>{
      this.setState({
          cooldown: 30,
      });
      let timer = setInterval(()=>{
          let cooldown = this.state.cooldown - 1;
          this.setState({
              cooldown: cooldown
          });
      },1000);
      await new Promise(resolve=>setTimeout(resolve, 30000));
      clearInterval(timer);
      return 0
  };
   //Set inputs for authentication and session
  handlePassword(e) {
      this.setState({
          passwordInput: e.target.value,
      });
  };
  handleUsername(e) {
      this.setState({
          usernameInput: e.target.value,
      });
  };
  handleChange(e){
      if(e.target.checked){
          this.setState({
              remember: true,
          });
      } else {
          this.setState({
            remember: false,
          });
      };
  };
  /*  1) Form handles multiple login attempts and debounces after 3 failed attempts.
      2) Handles muliple cases like no username and password provided, username provided with no password and vice versa.
      3) Sets the responses and messages for the pop up notification.
      4) Finally, if authenticated, then a pop up notifies the user.
  */
  handleSubmit = async (e)=>{
      e.preventDefault();
      let data = await database();
      for(let key in data){
          if ((this.state.passwordInput === data[key].password) && (this.state.usernameInput === data[key].username)){
              this.setState({
                  passwordValid: true,
                  usernameValid: true,
              });
          };
      };
      if (LoginAttemptCounter <= 1) {
          if (this.state.usernameValid && this.state.passwordValid && (this.state.cooldown === 0)) {
              this.setState({
                  authenticated: true,
                  response: 'Success',
                  message: 'You have successfully signed in. Please click below to continue.',
                  buttonText: 'WHAT NOW??',
                  responseColor: 'green'
              });
              document.getElementById('popup-wrapper').classList.add("visible");
              document.getElementById('popup-wrapper').classList.remove("hidden");
          } else if ((this.state.usernameInput === '') && (this.state.passwordInput === '')) {
              this.setState({
                  response: 'Hey!',
                  message: 'You have to enter some stuff to validate. Please click below to try again.',
                  responseColor: 'orange'
              });
              document.getElementById('popup-wrapper').classList.add("visible");
              document.getElementById('popup-wrapper').classList.remove("hidden");
          } else if ((this.state.usernameInput !== '') && (this.state.passwordInput === '')) {
              this.setState({
                  response: 'Sorry',
                  message: 'We didn\'t catch that. Please enter a password and let\'s try again.',
                  responseColor: 'orange'
              });
              document.getElementById('popup-wrapper').classList.add("visible");
              document.getElementById('popup-wrapper').classList.remove("hidden");
          } else if ((this.state.usernameInput === '') && (this.state.passwordInput !== '')) {
              this.setState({
                  response: 'Sorry',
                  message: 'Please enter a username so we know who to validate.',
                  responseColor: 'orange'
              });
              document.getElementById('popup-wrapper').classList.add("visible");
              document.getElementById('popup-wrapper').classList.remove("hidden");
          } else {
              LoginAttemptCounter += 1;
              this.setState({
                  response: 'Oops!',
                  message: 'We are having some trouble verifying you. Please try again.',
                  responseColor: 'red'
              });
              document.getElementById('popup-wrapper').classList.add("visible");
              document.getElementById('popup-wrapper').classList.remove("hidden");
          };
      } else if (LoginAttemptCounter === 2) {
          console.log(LoginAttemptCounter)
          if (this.state.usernameValid && this.state.passwordValid && (this.state.cooldown === 0)) {
              this.setState({
                  authenticated: true,
                  response: 'Success',
                  message: 'You have successfully signed in. Please click below to continue.',
                  buttonText: 'WHAT NOW??',
                  responseColor: 'green'
              });
              document.getElementById('popup-wrapper').classList.add("visible");
              document.getElementById('popup-wrapper').classList.remove("hidden");
          } else if ((this.state.usernameInput === '') && (this.state.passwordInput === '')) {
              this.setState({
                  response: 'Hey!',
                  message: 'You have to enter some stuff to validate. Please click below to try again.',
                  responseColor: 'orange'
              });
              document.getElementById('popup-wrapper').classList.add("visible");
              document.getElementById('popup-wrapper').classList.remove("hidden");
          } else if ((this.state.usernameInput !== '') && (this.state.passwordInput === '')) {
              this.setState({
                  response: 'Sorry',
                  message: 'We didn\'t catch that. Please enter a password and let\'s try again.',
                  responseColor: 'orange'
              });
              document.getElementById('popup-wrapper').classList.add("visible");
              document.getElementById('popup-wrapper').classList.remove("hidden");
          } else if ((this.state.usernameInput === '') && (this.state.passwordInput !== '')) {
              this.setState({
                  response: 'Sorry',
                  message: 'Please enter a username so we know who to validate.',
                  responseColor: 'orange'
              });
              document.getElementById('popup-wrapper').classList.add("visible");
              document.getElementById('popup-wrapper').classList.remove("hidden");
          } else {
              LoginAttemptCounter += 1;
              this.setState({
                  response: 'Something is wrong.',
                  message: 'Are you trying to log in with incorrect details? Let\'s try again.',
                  responseColor: 'orange'
              });
              document.getElementById('popup-wrapper').classList.add("visible");
              document.getElementById('popup-wrapper').classList.remove("hidden");
          };
      } else if (LoginAttemptCounter === 3) {
          console.log(LoginAttemptCounter)
          if (this.state.usernameValid && this.state.passwordValid && (this.state.cooldown === 0)) {
              this.setState({
                  authenticated: true,
                  response: 'Success',
                  message: 'You have successfully signed in. Please click below to continue.',
                  buttonText: 'WHAT NOW??',
                  responseColor: 'green'
              });
              document.getElementById('popup-wrapper').classList.add("visible");
              document.getElementById('popup-wrapper').classList.remove("hidden");
          } else if ((this.state.usernameInput === '') && (this.state.passwordInput === '')) {
              this.setState({
                  response: 'Hey!',
                  message: 'You have to enter some stuff to validate. Please click below to try again.',
                  responseColor: 'orange'
              });
              document.getElementById('popup-wrapper').classList.add("visible");
              document.getElementById('popup-wrapper').classList.remove("hidden");
          } else if ((this.state.usernameInput !== '') && (this.state.passwordInput === '')) {
              this.setState({
                  response: 'Sorry',
                  message: 'We didn\'t catch that. Please enter a password and let\'s try again.',
                  responseColor: 'orange'
              });
              document.getElementById('popup-wrapper').classList.add("visible");
              document.getElementById('popup-wrapper').classList.remove("hidden");
          } else if ((this.state.usernameInput === '') && (this.state.passwordInput !== '')) {
              this.setState({
                  response: 'Sorry',
                  message: 'Please enter a username so we know who to validate.',
                  responseColor: 'red'
              });
              document.getElementById('popup-wrapper').classList.add("visible");
              document.getElementById('popup-wrapper').classList.remove("hidden");
          } else {
              LoginAttemptCounter += 1;
              this.setState({
                  response: 'Woah! Slow down',
                  message: 'You have one more try remaining before we lock you down for 30 seconds.',
                  responseColor: 'red'
              });
              document.getElementById('popup-wrapper').classList.add("visible");
              document.getElementById('popup-wrapper').classList.remove("hidden");
          };
      } else {
          document.getElementById('popup-wrapper').classList.add("visible");
          document.getElementById('popup-wrapper').classList.remove("hidden");
          document.getElementById('popup-action').disabled = true;
          this.setState({
              response: 'Locked',
              message: `You have been locked out. Please wait ${this.state.cooldown} seconds before trying again.`,
              buttonText: 'Please Wait...',
              responseColor: 'red'
          });
          let countdown = await this.debounce();
          this.setState({
              cooldown: countdown,
              buttonText: 'TRY AGAIN'
          });
          console.log(countdown, LoginAttemptCounter)
          LoginAttemptCounter = 0;
          document.getElementById('popup-action').disabled = false;
      };
  };
  //Render method with nested child components and passed state to props.
  render() {
    return (
      <div className="App-wrapper">
        <LandingNav />
        <Login 
          handleSubmit={this.handleSubmit}
          handleUsername={this.handleUsername}
          handlePassword={this.handlePassword}
          handleChange={this.handleChange}
        />
        <Notification 
          response={this.state.response}
          message={this.state.message}
          authenticated={this.state.authenticated}
          buttonText={this.state.buttonText}
          responseColor={this.state.responseColor}
        />
        <Footer />
      </div>
    );
  };
};

export default App;
