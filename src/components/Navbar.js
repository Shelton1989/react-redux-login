import React from 'react';
import Button from '@material-ui/core/Fab';
import UserIcon from '@material-ui/icons/Person';


const Navbar = ()=>{
    return(
        <div id="landingnav">
            <div className="nav-wrapper nav-wrap">
                <div className="logo">
                    <a className="brand-logo " href="./index.html">
                        <span className="logo-placeholder">
                            LOGO
                        </span>
                    </a>
                </div>
                <ul 
                    className='right hide-on-med-and-down' 
                    style={{
                        margin: '1rem', 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'flex-end'
                    }}
                >
                    <li>
                        <Button 
                            variant='extended'
                            color='primary'
                        >
                            <UserIcon/>
                            SIGN UP

                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;