import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class EditPost extends Component {
  state = {
    heading: '',
    sub_heading: '',
    link: '',
    type: '',
    contentOne: '',
    contentTwo: '',
    contentThree: '',
    image: '',
    imageFile: '',
    editImage: '',
    id: ''
  }

  componentDidMount() {
    let editableData = localStorage.getItem('editable');
    editableData = JSON.parse(editableData);
    // console.log(editableData);
    this.ploteValues(editableData[0]);
  }

  ploteValues = (data) => {
    console.log(data);

    this.setState({
      heading: data.heading,
      sub_heading: data.sub_heading,
      link: data.link,
      type: data.type,
      contentOne: data.contentOne,
      contentTwo: data.contentTwo,
      contentThree: data.contentThree,
      image: data.image,
      id: data._id
    })

  }

  handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }
  handleFileInput = (e) => {
    console.log(e);
    const value = e.target.value;
    const file = e.target.files[0];
    this.setState({
      editImage: value,
      imageFile: file
    })
  }

  // handleSubmit = async (e) => {
  handleSubmit = (e) => {
    let url = 'http://192.168.0.128:3500/dashboard/edit/' + this.state.id;
    const token = localStorage.getItem('sessionTocken');
    let formData = new FormData();
    formData.append('heading', this.state.heading);
    formData.append('sub_heading', this.state.sub_heading);
    formData.append('link', this.state.link);
    formData.append('type', this.state.type);
    formData.append('content1', this.state.content1);
    formData.append('content2', this.state.content2);
    formData.append('content3', this.state.content3);
    formData.append('image', this.state.imageFile);
    fetch(url, {
      method: 'POST', // 
      body: formData, // 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': token,
      }
    }).then(res => res.json())
      .then(resp => {
        if (resp.success) {
          alert('Added..');
          this.setState({
            heading: '',
            sub_heading: '',
            link: '',
            type: '',
            content1: '',
            content2: '',
            content3: '',
            image: '',
            imageFile: ''
          });
          localStorage.removeItem('editable');
          this.props.history.push('/listposts');
        }
      })
      .catch(error => console.error('Error:', error));
  }
  render() {
    return (
      <div className="body-style">
        <div className="container">
          <h2 className="top-header">Edit Post</h2>
          <form className="form-box">
            <div className="row">
              <div className="col-12 col-xs-12 col-md-6 form-group">
                <label htmlFor="heading">Heading</label>
                <input type="text" className="form-control" placeholder="Enter Heading" name="heading" id="heading" onChange={this.handlechange} value={this.state.heading} />
              </div>
              <div className="col-12 col-xs-12 col-md-6 form-group">
                <label htmlFor="sub_heading">Sub heading</label>
                <input type="text" className="form-control" placeholder="Enter Sub heading" name="sub_heading" id="sub_heading" onChange={this.handlechange} value={this.state.sub_heading} />
              </div>
              <div className="col-12 col-xs-12 col-md-6 form-group">
                <label htmlFor="link">Link</label>
                <input type="text" className="form-control" placeholder="Enter Link" name="link" id="link" onChange={this.handlechange} value={this.state.link} />
              </div>
              <div className="col-12 col-xs-12 col-md-6 form-group">
                <label htmlFor="type">Type</label>
                <select className="custom-select" name="type" id="type" onChange={this.handlechange} value={this.state.type}>
                  {/* <option selected value="">Select..</option> */}
                  <option value="post">Post</option>
                  <option value="portfolio">Portfolio</option>
                </select>
                {/* <input type="text" className="form-control" placeholder="Enter Password" name="type" id="type" onChange={this.handlechange} value={this.state.password} /> */}
              </div>
              <div className="col-12 col-xs-12 col-md-6 form-group">
                <label htmlFor="contentOne">Content 1</label>
                <textarea className="form-control" placeholder="Enter Content One" name="contentOne" id="contentOne" onChange={this.handlechange} value={this.state.content1} rows="3"></textarea>
              </div>
              <div className="col-12 col-xs-12 col-md-6 form-group">
                <label htmlFor="contentTwo">Content 2</label>
                <textarea className="form-control" placeholder="Enter Content Two" name="contentTwo" id="contentTwo" onChange={this.handlechange} value={this.state.contentTwo} rows="3"></textarea>
              </div>
              <div className="col-12 col-xs-12 col-md-6 form-group">
                <label htmlFor="contentThree">Content 3</label>
                <textarea className="form-control" placeholder="Enter Content Three" name="contentThree" id="contentThree" onChange={this.handlechange} value={this.state.contentThree} rows="3"></textarea>
              </div>
              <div className="col-12 col-xs-12 form-group">
                <label>Image</label>
                <div className="custom-file">
                  <img src={this.state.image} alt="post-img" />
                  <input type="file" className="custom-file-input" name="image" id="image" onChange={this.handleFileInput} value={this.state.editImage} />
                  <label className="custom-file-label" htmlFor="image">Choose file</label>
                </div>
                {/* <input type="text" className="form-control" placeholder="Enter Password" name="image" id="image" onChange={this.handlechange} value={this.state.password} /> */}
              </div>
              <div className="col-12 col-xs-12 submit-box">
                <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(EditPost);
