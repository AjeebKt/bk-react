import React from 'react';
import './nav.scss';
import logo from '../logo.svg'
import Logout from '../Logout/Logout';

import { Redirect, Route, NavLink } from 'react-router-dom';
const AuthRoute = ({ component: Component, authed, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            authed
                ?
                <div className="admin-outer">
                    <ul className="nav-box">
                        <li><img src={logo} className="logo" alt="logo" /></li>
                        <li><NavLink activeClassName='is-active' to="/addpost">Add Post</NavLink></li>
                        <li><NavLink activeClassName='is-active' to="/listposts">List Posts</NavLink></li>
                        <li className="logout"><NavLink to="/"><Logout /></NavLink></li>
                    </ul>
                    {/* <Component {...props} className="fadeIn animated" /> */}
                    <Component {...props} />
                </div>

                : <Redirect to="/" />
        )}
    />
);

export default AuthRoute;
