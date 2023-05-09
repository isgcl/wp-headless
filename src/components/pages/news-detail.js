import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import {
    Link,
    useParams
  } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Processing from '../processing';
import parseHtml from 'html-react-parser'
import ShareMe from '../tool/share';
import WPContext from '../../context/WPContext';
import moment from 'moment'
import Comments from './comments';
import RelatedNews from './related-news';

let fetchUri = process.env.REACT_APP_WP_HEADLESS_URI+'posts/?slug='

const NewsDetail = ()=> {


  const {isSharePopupActive,setSharePopupActive,setNewsPopupOpen,isStartPointHome} = useContext(WPContext)

  const [isLoading,setLoading] = useState(true)
  const [newsDetail, setNewsDetail] = useState({})
  const [isCommentsOpen,setIsCommentsOpen] = useState(false)
  

  let {slug} = useParams()

  
  useEffect(()=>{
    setNewsPopupOpen(false)
    if (slug) axios(fetchUri+slug)
    .then(res => {
        setNewsDetail(res.data[0])
        setLoading(false)
        //console.log('newsDetail.categories',newsDetail.categories.join(','))
    })
    scrollToRoot()
    setIsCommentsOpen(false)
    // eslint-disable-next-line
  },[slug])

  const scrollToRoot = (offset)=>{
      document.body.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
      });
  }
 
  
  return (
    
    <>
    { 
        !isLoading && <Helmet>
            <title> {`${newsDetail.title.rendered}`} | ReactApp</title>
            <meta name="description" content={`${newsDetail.excerpt}`} />
            <meta property="og:title" content={`${newsDetail.title.rendered}`} />
            <meta property="og:description" content={`${newsDetail.excerpt}`} />
            <meta property="og:image" content={newsDetail.fimg_url} />
        </Helmet>
    }
    <section id='post-detail' className={`post-detail ${slug} id-${newsDetail.id}`}>
        {
            isLoading && <Processing message='Loading please wait...' />
        }
        {
            !isLoading && 
            <>
            <div className='post-header'>
              <Link className='go-back' to={ isStartPointHome ? -1 : '/news'}><i className='heady icon-left-big'></i> Back</Link>
              <h1 className='post-title'>{parseHtml(newsDetail.title.rendered)}</h1>
              <div className='share-action' onClick={()=>setSharePopupActive(!isSharePopupActive)}> Share: <i className='heady icon-paper-plane' title='Share this article'></i></div>
            </div>
            
            <picture className='post-image'><img src={newsDetail.fimg_url} alt={newsDetail.title.rendered} /></picture> 
            <div className='post-detail-meta'>
              <p className='post-date in-grid'> <i className='heady icon-calendar'></i> <time>{moment(newsDetail.date).format('DD MMMM, YYYY')}</time></p>
              <p className='post-comments'><button title='Open comments' type='button' onClick={()=> setIsCommentsOpen(true)}><i className='heady icon-comment-empty'></i> Comments ({newsDetail.comment_count}) </button></p>
            </div>
          
            { // news detail text parser
              parseHtml(newsDetail.content.rendered)
            }
            {
              isCommentsOpen && <Comments id={newsDetail.id} count={newsDetail.comment_count} />
            }

            <ShareMe isSharePopupActive={isSharePopupActive} setSharePopupActive={setSharePopupActive} title={parseHtml(newsDetail.title.rendered)} url={window.location.href} />
            <RelatedNews cats={newsDetail.categories.join(',')} exclude={newsDetail.id} />
            </>
        }
        
        
    </section>
    </>
    
  )
}

export default NewsDetail