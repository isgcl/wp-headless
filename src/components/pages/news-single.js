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



const NewsSingle = ({id,date,title,excerpt,excerpt_title,fimg_url,slug,ind,comment_count,quickviewmode}) => {

  if (quickviewmode === undefined) quickviewmode = true

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
          !isMobile && quickviewmode && <button title='Quick View' type='button' className='go-news-popup on-desktop' onClick={()=>setPopupCall(true)}> <i className='heady icon-eye'></i> Show in Popup</button>
        }
        <p className='post-meta'>
          <span className='post-date in-grid'> <i className='heady icon-calendar'></i> <time>{moment(date).format('DD MMMM YYYY, HH:MM')}</time></span>
          {
            comment_count > 0 && <span className='comment-count'><i className='heady icon-comment-empty'></i> {comment_count}</span>
          }
        </p>
        
        
        {parseHtml(excerpt)}
        
        {
          ( isMobile && quickviewmode ) ? <><button type='button' className='go-news-popup on-mobile' onClick={()=>setPopupCall(true)}> <i className='heady icon-newspaper'></i> Show in Popup</button> <Link className='hide-on-mobile' to={`/${slug}`}>{title}</Link> </>: <Link className='stick' to={`/${slug}`}>{title}</Link>
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