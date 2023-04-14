import React from 'react'
import {
    Link
  } from "react-router-dom";
import parseHtml from 'html-react-parser';

export default function GoHomeLink({message,cssclass}) {
    return (
        <Link to={'/'} className={`go-home-link ${cssclass}`}> {message !== undefined ? parseHtml(message) : 'Go Home'}</Link>
        )
}
