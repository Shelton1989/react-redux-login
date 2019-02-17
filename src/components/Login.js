import React, {Component} from 'react';

//Images
import logo from '../img/iconcolor.png';

const LoginForm = (props)=>{
    return(
        <form id="login-form" onSubmit={props.handleSubmit}>
            <div className="input-field col s6">
                <input id="username" type="text" className="validate" autoComplete="username" onBlur={props.handleUsername}/>
                <label htmlFor="username">Username</label>
            </div>
            <div className="input-field col s6">
                <input id="password" type="password" className="validate" autoComplete="password" onBlur={props.handlePassword}/>
                <label htmlFor="password">Password</label>
            </div>
            <p>
                <label>
                    <input type="checkbox" onChange={props.handleChange}/>
                    <span>Remember me?</span>
                </label>
            </p>
            <p className="login-form-text">Forgot your login details? <a href="http://localhost:3000">Click here</a></p>
            <button className="btn button-color" style={{width: '100%', marginTop: '2rem'}} type="submit">LOGIN</button>
        </form>
    )
}

class Login extends Component {
    render(props){
        return(
            <div id="Login">
                <div className="logo-wrapper"><img className="form-logo" src={logo} alt=""/></div>
                <LoginForm 
                    handleSubmit={this.props.handleSubmit}
                    handleUsername={this.props.handleUsername}
                    handlePassword={this.props.handlePassword}
                    handleChange={this.props.handleChange}
                />
            </div>
        )
    }
}

export default Login;