import React from 'react'
import parseHtml from 'html-react-parser'

const MessageBox = ({message,className})=> {
  
  className = className || ''
  message = message || 'Well done!'

  return (
    <div className={`message-box ${className}`}>
            <p><i className='heady icon-user-blink'></i> {parseHtml(message)}</p>
    </div>
  )
}
export default MessageBox
