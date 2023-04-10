import React from 'react'

function Processing(props) {
  let {message,cssclass} = props
  return (
    <div className={`processing-message ${cssclass!== undefined ? cssclass : ''}`}> {message !== undefined ? message : 'Loading, please wait...'}</div>
  )
}

export default Processing