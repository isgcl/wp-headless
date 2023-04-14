import React from 'react'
import parseHtml from 'html-react-parser'
import { Link } from 'react-router-dom'

 const SlickSingle = ({title,content,href,externalhref,imguri}) => {

 href = href.replace(process.env.REACT_APP_WP_HEADLESS_BASE_URI,'') 
  
    const isExternalLink = externalhref

  return (
    <>
        <picture>
            <img src={imguri} alt={parseHtml(title)} />
        </picture>
        <div className='desc'>
            <h2>{parseHtml(title)}</h2> 
            <div className='text'>{parseHtml(content)}</div>
        </div>
        {
            isExternalLink ? <a href={externalhref} className='stick' target='_blank' rel='noopener noreferrer'>Harici link var</a> :  <Link className='stick' to={href}>{title}</Link>
        }
       
    </>
  )
}

export default SlickSingle