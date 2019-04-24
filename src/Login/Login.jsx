import React, { Component } from 'react';
import logo from '../logo.svg';
import './login.scss';
import { withRouter } from 'react-router-dom'

const maxWidth = {
  width: '120px',
  maxWidth: '100%'
}

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }
  handleSubmit = async (e) => {
    // e.preventDefault();
    const data = JSON.stringify(this.state);
    console.log(data);
    // const resData = await fetch('https://reqres.in/api/register', {
    const resData = await fetch('http://192.168.0.128:3500/login', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log('------------- res --------');
      let json = res.json();
      if (res.ok) {
        return json;
      }

      return json.then(err => {
        const errors = {
          error: err,
          status: res.status
        }
        throw errors
      });
    }).catch(err => err);

    console.log(resData);
    if (resData.success) {
      localStorage.setItem('sessionTocken', resData.token);
      this.props.history.push('/addpost');
    }
    // localStorage.setItem('isLogged', 'true');
    // this.props.history.push('/addpost');
    // this.isLogged = localStorage.getItem('isLogged');
  }
  render() {
    return (
      <div className="body-style dark">
        <header className="App-header">
          <img src={logo} className="app-logo" alt="logo" style={maxWidth} />
        </header>
        <h3 className="login-text">Login</h3>
        <form className="login-box">
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input type="text" className="inputer form-control" placeholder="Enter Name" name="username" id="username" onChange={this.handlechange} value={this.state.username} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="inputer form-control" placeholder="Enter Password" name="password" id="password" onChange={this.handlechange} value={this.state.password} />
          </div>
          <div className="submit-box">
            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
