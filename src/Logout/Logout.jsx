import React, { Component } from 'react'
import './logout.scss'
import { withRouter } from 'react-router-dom'

class Logout extends Component {
    logout = (e) => {
        localStorage.removeItem('sessionTocken');
        // localStorage.removeItem('isLogged');
        this.props.history.push('/');
    }
    render() {
        return (
            <button className="logout-button" onClick={this.logout}>
                <span className="power"></span> Logout
            </button>
        )
    }
}

export default withRouter(Logout);
