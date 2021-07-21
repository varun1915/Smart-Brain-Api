import React, { Component } from 'react'

import './App.css';
import Background from './Background';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/SignIn/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const initialState = {
  input: '',
  imageURL: '',
  box: [],
  route: 'signin',
  signedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

export default class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = [...data.outputs[0].data.regions];
    return clarifaiFace;
  }
  
  handleOnRouteChange = (route) => {
    if(route === 'signout')
      this.setState(initialState)
    else if(route === 'home')
      this.setState({signedIn: true})

    this.setState({route: route});
  }
 
  displayFaceBox = (Boxes) => {
    const image = document.querySelector("#inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    this.setState({box: []});
    Boxes.forEach(box => {
      this.setState({
        box: [...this.state.box, {
          leftCol: (box.region_info.bounding_box.left_col * width) + image.offsetLeft,
          topRow: (box.region_info.bounding_box.top_row * height) + image.offsetTop,
          rightCol: (width - (box.region_info.bounding_box.right_col * width)) + image.offsetLeft,
          bottomRow: -(((box.region_info.bounding_box.bottom_row * height) - (box.region_info.bounding_box.top_row * height)) - ((height - (box.region_info.bounding_box.top_row * height)) - window.scrollY))
        }]
      })
    })
    console.log(this.state.box);
  }
 
  handleOnInputChange = (event) => {    
    this.setState({input: event.target.value})
  }

  handleOnSubmit = () => {
    this.setState({imageURL: this.state.input})
    fetch('http://localhost:8000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then( response => {
      if(response){
        fetch('http://localhost:8000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState({user: {
            ...this.state.user,
            entries: count
          }})
          // this.setState(Object.assign(this.state.user, {entries: count}))
        }) 
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch( err => console.log(err) )
  }

  render() {
    if(this.state.route === 'signin' || this.state.route === 'signout'){
      return (
        <div>
          <Background/>
          <Navigation onRouteChange={this.handleOnRouteChange} signedIn={this.state.signedIn}/>
          <Signin onRouteChange={this.handleOnRouteChange} loadUser={this.loadUser}/>
        </div>
      )
    }else if(this.state.route === 'register'){
      return (
        <div>
          <Background/>
          <Navigation onRouteChange={this.handleOnRouteChange} signedIn={this.state.signedIn}/>
          <Register onRouteChange={this.handleOnRouteChange} loadUser={this.loadUser}/>
        </div>
      )
    }else{
      return(
        <div>
          <Background/>
          <Navigation onRouteChange={this.handleOnRouteChange} signedIn={this.state.signedIn}/>
          <Logo/> 
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.handleOnInputChange} onButtonSubmit={this.handleOnSubmit}/>
          <FaceRecognition boxes={this.state.box} imageURL={this.state.imageURL}/>
        </div>
      )
    }
  }
}
