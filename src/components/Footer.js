import React from 'react';
import Typography from '@material-ui/core/Typography';

const Footer = ()=>{
    return(
        <div id="Footer">
            <div className="nav-wrap">
                <Typography
                    id="popup-message"
                    variant="body1" 
                    style={{color: 'white'}}
                >
                    &copy; Shelton Wilson 2019
                </Typography>
            </div>
        </div>
    );
};

export default Footer;