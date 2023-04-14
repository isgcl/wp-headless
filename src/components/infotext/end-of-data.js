import React from 'react'
import parseHtml from 'html-react-parser'

export default function EndOfData({message,cssclass,tag}) {
    if (message === undefined) message = 'Thats all! There is no more content.'
    if (tag === undefined) tag = 'article'
    return (
        <>
        {
           parseHtml(`<${tag} class="no-more-content ${cssclass}"> <i class="heady icon-info-circled"></i> ${message}</${tag}>`)
        }
        </>
        )
}