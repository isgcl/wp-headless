import React from 'react'
import {
    Link
  } from "react-router-dom";

export default function GoBackLink({message,cssclass,href}) {
    return (
        <Link to={href !== undefined ? href : -1} className={`go-back-link ${cssclass}`}> {message !== undefined ? message : 'Go Back'}</Link>
        )
}
