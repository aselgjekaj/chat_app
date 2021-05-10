import './App.css';
import {Component, useState} from 'react'
import MessageList from '../src/Messages/MessageList'
import MessageForm from '../src/MessageForm/MessageForm'
import firebase, {getToken, onMessageListener ,auth, provider} from '../src/Firebase/firebase'
import { MDBContainer } from "mdbreact"
import "../src/Helper/Scrollbar.css"

const scrollContainerStyle = { width: "600px", maxHeight: "400px" };
class App extends Component{

  constructor() {
    super()
    this.state = {
      messages: [],
      user: null
    }

  }


  handleNewMessage = (text) => {
    
    let time = new Date().toLocaleTimeString();
    //console.log("Time: " + time)
    const messagesRef = firebase.database().ref('Messages');
    //console.log("User: " + this.state.user.photoURL)

    const messageInput = {
      body: text,
      user: this.state.user.photoURL,
      time: time
    }
    try
    {
      messagesRef.push(messageInput);
     
    }
    catch(error)
    {
      console.log("Errori on add new text: " + error)
    }
  }



  //Login Logout

 login = () =>
{
  auth.signInWithPopup(provider) 
  .then((result) => {
    const user = result.user;
    this.setState({
      user: user,
    })
  });
}
 logout = () =>
{
  auth.signOut()
    .then(() => {
      this.setState({
        user: null,
      })
    });
}

componentDidMount = () =>
{
  auth.onAuthStateChanged((user) => {
    if (user) {
      this.setState({
        user: user,
      })
    } 
  });

  const messagesRef = firebase.database().ref("Messages")
  messagesRef.on('value', (snapshot) =>
    {
    let messages = snapshot.val()
    let newMessages = []
    for(let message in messages)
    {
      newMessages.push(
        {
          id: message,
          body: messages[message].body,
          user: messages[message].user,
          time: messages[message].time
        }
      )
    }
    this.setState({
      messages: newMessages,
    })

    //console.log("Mesazhet ne fillim : " + this.state.messages)
    })
}

componentWillUnmount()
{

} 

  render() {
    return (
      <div className="App">
       
        <header>
        <div className='wrapper'>
              <h1>BOCHATBO</h1>

              {this.state.user ?        
              <button className='authenticate' onClick={this.logout}>Log Out</button>
              :
              <button className='authenticate' onClick={this.login}>Log In</button> 
              }
              </div>
              </header>
    
              <MDBContainer>
    {this.state.user 
    ?
    <div>
     <div className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle}>
        <MessageList Auth_user = {this.state.user} messageList = {this.state.messages} />
        </div>
        
        <MessageForm onMessageSend={this.handleNewMessage} />
        </div>
        :
        <div>
        User not logged in
         </div>
      }
      </MDBContainer>
      </div>
      
    )
  }
}

export default App;
