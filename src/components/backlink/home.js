import React from 'react'
import {
    Link
  } from "react-router-dom";

export default function GoHomeLink({message,cssclass}) {
    return (
        <Link to={'/'} className={`go-home-link ${cssclass}`}> {message !== undefined ? message : 'Go Home'}</Link>
        )
}
