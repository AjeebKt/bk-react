import React, { Component } from 'react'
import './listposts.scss';
import noImage from '../images/no_image.jpg';
import { withRouter } from 'react-router-dom'

class ListPosts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      postData: [],
    };
  }

  componentDidMount() {
    this.listItems();
  }

  listItems = () => {
    let url = 'http://192.168.0.128:3500/dashboard/view';
    const token = localStorage.getItem('sessionTocken');

    fetch(url, {
      method: "GET",
      mode: "cors", // no-cors, cors, *same-origin
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        'Authorization': token,
        // "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then(response => {
      this.checkStatus(response);
      return response.json()
    })
      .then((data) => {
        // let currentList = data.list.filter(d => d.deleted === false);
        this.setState({
          postData: data.list
        });
      }).catch(err => err);
  }

  checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    console.log('--aa--bb--vv--')
    if (response.status === 401) {
      // window.localStorage.clear('jwt');
      // window.location = '/session';
      localStorage.removeItem('sessionTocken');
      this.props.history.push('/');
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  editItem = (param) => {
    console.log('---- param ----');
    console.log(param.image);
    let editable = this.state.postData.filter(d => d._id === param);
    localStorage.setItem('editable', JSON.stringify(editable))
    console.log(editable);
    this.props.history.push('/editpost');
  }
  deleteItem = (param) => {
    const token = localStorage.getItem('sessionTocken');
    const URL = 'http://192.168.0.128:3500/dashboard/delete/';
    if (window.confirm("Are you want to Delete this ?")) {
      fetch(URL + param, {
        method: "POST",
        headers: {
          'Authorization': token,
        },
      }).then(response => response.json())
        .then((data) => {
          this.listItems();
        }).catch(err => err);
    }
  }

  render() {
    return (
      <div className="body-style" >
        <div className="container">
          <h2 className="top-header">List Posts</h2>
          <ul className="list-posts row">
            {
              this.state.postData.map((list, index) => {
                return (
                  <li key={index} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="outer">
                      <div className="action">
                        <span className="icon fa fa-pencil" onClick={() => this.editItem(list._id)}></span>
                        <span className="icon fa fa-trash" onClick={() => this.deleteItem(list._id)}></span>
                      </div>
                      <img src={list.image !== '' ? list.image : noImage} alt="Post_Image" />
                      <div className="detail">
                        <h3>{list.heading}</h3>
                        <h4>{list.sub_heading}</h4>
                        <p>{list.contentOne}</p>
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(ListPosts);
