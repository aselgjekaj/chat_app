import React, { Component,  useState} from 'react'
import PropTypes from 'prop-types'
import './MessageList.css'
import Message from '../Message/Message'

class MessageList extends Component {

  
//Per te pa listen e mesazheve qe vijne ne fillim qe i bie te jene empty
  /* componentDidMount()
  {
    console.log("Mesazhet: " + this.props.messageList)
  } */
  //Per te pa mesazhet e ndryshuara pas update
      /* componentDidUpdate = () => {
        //Mrapa kalimit te props
        console.log("Messages jane: " + this.props.messageList)
      } */


    
    render() {
      return (
        
        <div className="MessageList" ref={(node) => (this.node = node)}>
        {this.props.messageList.map((message,i) => (

          <Message key={i} user_auth = {this.props.Auth_user} idMessage={message.id} messageView={message} />
        ))}
      </div>
      )
  }
}
  
  export default MessageList