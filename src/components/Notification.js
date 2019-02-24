import React, {Component} from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {
    closeNotification,
} from '../actions/authenticate-actions';

//Constants

class Notification extends Component {
    handleClick = async ()=>{
        if(this.props.auth.authenticated) {
            alert(
                `The dashboard has packed a case and moved to Mars with Elon. 
                Rather refresh the browser and try some other users.`
            );
        } else {
            await this.props.onCloseNotification();
            this.props.handleNotify();
        };
    };
    render(){
        let {notification, attempt} = this.props;
        return(
            <div id="popup-wrapper" className="hidden">
                <div id="information-popup" className="pop-up">
                    <Typography
                        id="popup-title"
                        variant="h3" 
                        style={{
                            textAlign: 'center', 
                            marginBottom: '2rem'
                        }}
                    >
                        {notification.response}
                    </Typography>
                    {
                        attempt.cooldown !== 0 ? 
                        <Typography
                            id="popup-message"
                            variant="body1" 
                        >
                            {notification.message} Please wait {attempt.cooldown} Seconds. Then try again.
                        </Typography>
                        :
                        <Typography
                            id="popup-message"
                            variant="body1" 
                        >
                            {notification.message}
                        </Typography>
                    }
                    <Button 
                        id='popup-action'
                        variant='contained'
                        color='primary'
                        style={{width:'100%', marginTop: '2rem'}}
                        onClick={this.handleClick}
                        disabled={attempt.cooldown!==0?true:false}
                    >CONTINUE</Button>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state =>({
    auth: state.auth,
    attempt: state.attempt,
    notification: state.notification,
    notify: state.notify
});

const mapActionsToProps = {
    onCloseNotification: closeNotification,
};

export default connect(
    mapStateToProps, 
    mapActionsToProps
)(Notification);