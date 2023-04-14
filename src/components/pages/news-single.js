import React, {useContext, useState} from 'react'
import moment from 'moment'
import parseHtml from 'html-react-parser'
import NewsPopupFetch from './news-popup-fetch';
import Processing from '../processing';
import WPContext from '../../context/WPContext';

import {
    Link
  } from "react-router-dom";
import LazyLoad from 'react-lazyload';

const NewsSingle = ({id,date,title,excerpt,excerpt_title,fimg_url,slug,ind}) => {

  const {isMobile} = useContext(WPContext)

  const [isPopupCall,setPopupCall] = useState(false) 

  return (
    <>
    <article className='news-item' style={{animationDelay:(ind*100)+'ms'}}>
        <h3 id={`post-${id}`}> {excerpt_title ?  parseHtml(excerpt_title) : parseHtml(title)} </h3>
        <picture>
            <LazyLoad height={120}>
                <img src={fimg_url} alt={title} title={title} />
            </LazyLoad>
        </picture>
        {
          !isMobile && <button title='Quick View' type='button' className='go-news-popup on-desktop' onClick={()=>setPopupCall(true)}> <i className='heady icon-eye'></i> Show in Popup</button>
        }
        <p className='post-date in-grid'> <i className='heady icon-calendar'></i> <time>{moment(date).format('DD MMMM, YYYY')}</time></p>
        
        {parseHtml(excerpt)}
        
        {
          isMobile ? <button type='button' className='go-news-popup on-mobile' onClick={()=>setPopupCall(true)}> <i className='heady icon-newspaper'></i> Show in Popup</button> : <Link className='stick' to={`/${slug}`}>{title}</Link>
        }
        
        {
          isPopupCall && <Processing message='Loading please wait...' />
        }
        { 
          isPopupCall && <NewsPopupFetch setPopupCall={setPopupCall} slug={slug} /> 
        }
    </article>
    
    </>
  )
}
export default NewsSingle