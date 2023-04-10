import React from 'react'
import moment from 'moment'
import parseHtml from 'html-react-parser'

import {
    Link
  } from "react-router-dom";
import LazyLoad from 'react-lazyload';

export default function NewsSingle({id,date,title,excerpt,excerpt_title,fimg_url,slug,ind}) {


  return (
    <article className='news-item' style={{animationDelay:(ind*100)+'ms'}}>
        <h3 id={`post-${id}`}> {excerpt_title ?  parseHtml(excerpt_title) : parseHtml(title)} </h3>
        <picture>
            <LazyLoad height={200}>
                <img src={fimg_url} alt={title} />
            </LazyLoad>
        </picture>
        <p><time>{moment(date).format('DD MMMM, YY')}</time></p>
        {parseHtml(excerpt)}
        <Link className='stick' to={`/${slug}`}>{title}</Link>
    </article>
  )
}
