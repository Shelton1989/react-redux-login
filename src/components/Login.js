import React, {Component} from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

//Actions
import {
    loginAction, 
    logoutAction, 
    updateUsername,
    failedAttempt,
    successfulLogin,
    unsuccessfulLogin,
    showNotification,
    loading,
    loadingComplete,
} from '../actions/authenticate-actions';

//API
import database from '../database/ApiCall';

// Variables
let attempt = 1;
let countdown = 0;

const LoginForm = (props)=>{
    return(
        <form id="login-form" onSubmit={props.handleAuth}>
            <TextField 
                id="username"
                label="Username"
                type="text"
                name="username"
                autoComplete="username"
                variant="outlined"
                margin="normal"
                style={{width: '100%'}}
                onBlur={props.handleUsername}
            />
            <TextField 
                id="password"
                label="Password"
                type="password"
                name="password"
                autoComplete="password"
                variant="outlined"
                margin="normal"
                style={{width: '100%'}}
            />
            <Typography
                variant="body1"
            >
                <Checkbox 
                    color="primary"
                    onChange={props.handleChange}
                />
                Remember Me?
            </Typography>
            <Typography
                variant="body1"
            >
                Forgot your login details? 
                <Link 
                    href="./index.html">
                     Click here
                </Link>
            </Typography>
            <Button 
                id='button'
                variant='contained'
                color='primary'
                style={{width:'100%', marginTop: '2rem'}}
                type='submit'
                disabled={props.loading}
            >
            {props.loading?<CircularProgress size={24} color="primary" />:'LOGIN'}
            </Button>
        </form>
    );
};

class Login extends Component {
    //Debounce multiple attempts
    debounce = async ()=>{
        let {onLoginAttempt} = this.props;
        let cooldownTimer = 30;
        attempt = 0;
        let timer = setInterval(()=>{
            cooldownTimer = cooldownTimer - 1;
            onLoginAttempt(attempt, cooldownTimer);
        },1000);
        await new Promise(resolve=>setTimeout(resolve, 30000));
        clearInterval(timer);
        return 1;
    };
    // Handle authentication
    handleAuth = async (e)=>{
        let {
            onUserLogin, 
            onLoginAttempt, 
            onSuccessful, 
            onUnsuccessful, 
            username,
            onOpenNotification,
            handleNotify,
            onLoading,
            onLoadingDone
        } = this.props;
        e.preventDefault();
        onLoading();
        let data = await database();
        let passwordInput = document.getElementById('password').value;
        let usernameInput = document.getElementById('username').value;
        let authenticated = false;
        for(let key in data){
            if ((passwordInput === data[key].password)
            && (usernameInput === data[key].username)){
                authenticated = true;
            };
        };
        if (authenticated){
            const response = 'Success';
            const message = `Hi ${username.username}, You have successfully 
            signed in. Please click below to continue to your dashboard.`;
            onUserLogin();
            countdown = 0;
            onLoginAttempt(attempt, countdown);
            onSuccessful(response, message);
            onLoadingDone();
            onOpenNotification();
            handleNotify();
        }else if ((passwordInput === '') && (usernameInput === '')) {
            const response = 'Hey!';
            const message = `Please provide your log in details so we can 
            authenticate you.`;
            countdown = 0;
            onLoginAttempt(attempt, countdown);
            onUnsuccessful(response, message);
            onLoadingDone();
            onOpenNotification();
            handleNotify();
        } else if ((passwordInput === '') && (usernameInput !== '')) {
            const response = 'Sorry';
            const message = `You didn't provide your password so we can't 
            authenticate you. Please try again.`;
            countdown = 0;
            onLoginAttempt(attempt, countdown);
            onUnsuccessful(response, message);
            onLoadingDone();
            onOpenNotification();
            handleNotify();
        } else if ((passwordInput !== '') && (usernameInput === '')) {
            const response = 'Sorry';
            const message = `We need to put a name to the face. Please try 
            again.`;
            countdown = 0;
            onLoginAttempt(attempt, countdown);
            onUnsuccessful(response, message);
            onLoadingDone();
            onOpenNotification();
            handleNotify();
        } else if (attempt <= 3){
            if (attempt === 3){
                const response = 'Please slow down';
                const message = `You have one more try remaining before we 
                lock you down for 30 seconds. We take security very seriously.`;
                onUnsuccessful(response, message);
                onLoadingDone();
                onOpenNotification();
                handleNotify();
                onLoginAttempt(attempt, countdown);
                countdown = attempt * 10;
                attempt++;
            } else {
                const response = 'Oh No,';
                const message = `We are having some trouble authenticating you. 
                Please make sure your log in details are correct then try again.`;
                onUnsuccessful(response, message);
                onLoadingDone();
                onOpenNotification();
                handleNotify();
                onLoginAttempt(attempt, countdown);
                attempt++;
            };
        } else {
            onLoginAttempt(attempt, countdown);
            const response = 'Locked';
            let message = `You have been locked out.`;
            onUnsuccessful(response, message);
            onLoadingDone();
            onOpenNotification();
            handleNotify();
            countdown = 0;
            attempt = await this.debounce();
            onLoginAttempt(attempt, countdown);
            message = `Please try again. Remember that your details are case 
            sensitive.`;
            onUnsuccessful(response, message);
        };
    };
    //Bindings
    handleAuth = this.handleAuth.bind(this);

    render(){
        let {
            handleChange,
            handleUsername,
            loading,
        } = this.props;
        return(
            <div id="Login">
                <div className="logo-wrapper">
                    <div className="form-logo">
                        <a className="brand-logo " href="./index.html">
                            <span className="logo-placeholder">
                                LOGO
                            </span>
                        </a>
                    </div>
                </div>
                <LoginForm 
                    handleAuth={this.handleAuth}
                    handleChange={handleChange}
                    handleUsername={handleUsername}
                    loading={loading.loading}
                />
            </div>
        );
    };
};

const mapStateToProps = state =>({
    username: state.username,
    auth: state.auth,
    remember: state.remember,
    attempt: state.attempt,
    loading: state.loading,
});

const mapActionsToProps = {
    onUserLogin: loginAction,
    onUserLogout: logoutAction,
    onUpdateUsername: updateUsername,
    onLoginAttempt: failedAttempt,
    onSuccessful: successfulLogin,
    onUnsuccessful: unsuccessfulLogin,
    onOpenNotification: showNotification, 
    onLoading: loading,
    onLoadingDone: loadingComplete,
};

export default connect(
        mapStateToProps, 
        mapActionsToProps,
    )(Login);