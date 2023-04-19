import React from 'react'
import parseHtml from 'html-react-parser'

export default function ThereIsAnError({message,cssclass,tag}) {
    if (message === undefined) message = 'There is an error. Please try again.'
    if (tag === undefined) tag = 'article'
    if (cssclass === undefined) cssclass = ' '
    return (
        <>
        {
           parseHtml(`<${tag} class="there-is-an-error ${cssclass}"> <i class="heady icon-user-cry"></i> ${message}</${tag}>`)
        }
        </>
        )
}