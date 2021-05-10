import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Message.css'
import { MDBIcon } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import firebase from 'firebase'
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';

class Message extends Component {


  constructor()
  {
    super()
    this.state = {
      show: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.textInput = React.createRef();
  }


  handleSave(id)
  {
    let messageId = id
    console.log("Item: " + messageId)
    let time = new Date().toLocaleTimeString();
    const messagesRef = firebase.database().ref(`/Messages/${messageId}`);
    const vlera_text = this.textInput.current.value;
    console.log("Text: " + vlera_text)
    try{
  
      messagesRef.set({
        body: vlera_text,
        time: time,
        user: this.props.user_auth.photoURL,
      });
      this.setState({
        show: false,
      })
    }
    catch(error)
    {
      console.log("Error: " + error)
    }
  }

  handleClose()
  {
    this.setState({
      show: false,
    })
  }
  handleShow()
  {
    this.setState({
      show: true,
    })
  }

  //Per te pa se ca vlerash merren 
    /* componentDidMount()
    {
      console.log("User data: " + this.props)
      console.log("user image: " + this.props.messageView.user)
      console.log("User time: " + this.props.messageView.time)
      console.log("User text: " + this.props.messageView.body)
      console.log("User user: " + this.props.user_auth)

    } */

removeMessage(id)
{
  let messageId = id
  console.log("Item: " + messageId)
  const messagesRef = firebase.database().ref(`/Messages/${messageId}`);
  try{

    messagesRef.remove();
  }
  catch(error)
  {
    console.log("Error")
  }
}

updateMessage(id)
{
  this.setState({show : true})
  
}

    render() {
      const classes = classNames('Message', {
        log: !this.props.messageView.user,
      })
  
      return (
        <div className="chatWindow">
         <div className={classes}> 

          {
          this.props.messageView.user && (
            <span className="author"><img  className="image" src={this.props.messageView.user} />:</span>
          )}
          {this.props.messageView.body}
          {this.props.user_auth.photoURL == this.props.messageView.user ?
          <span>
          <MDBIcon onClick= {() => this.removeMessage(this.props.idMessage)} icon="trash-alt" />
          <MDBIcon onClick= {() => this.updateMessage(this.props.idMessage)} icon="edit" />
          </span>
          :
          null
          }
          
          <br></br>
          {this.props.messageView.time}
          <br></br>
          <br></br>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Text</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h4>Data: </h4>
         <input className="block-example border border-dark" placeholder="New Value..." type="text" ref={this.textInput}></input>
        <hr />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => this.handleSave(this.props.idMessage)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
          </div>
        </div>
      )
    }
  }

export default Message