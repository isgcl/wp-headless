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

let fetchUri = process.env.REACT_APP_WP_HEADLESS_URI+'pages/?slug='

const PageDetail = ()=> {

  const {isSharePopupActive,setSharePopupActive,isStartPointHome} = useContext(WPContext)

  const [isLoading,setLoading] = useState(true)
  const [pageDetail, setPageDetail] = useState({})
  

  let {slug} = useParams()
  
  
  useEffect(()=>{
    if (slug) axios(fetchUri+slug)
    .then(res => {
        setPageDetail(res.data[0])
        setLoading(false)
    })
    // eslint-disable-next-line
  },[slug])
  
  return (
    
    <>
    { 
        !isLoading && <Helmet>
            <title> {`${pageDetail.title.rendered}`} | ReactApp</title>
            <meta name="description" content={`${pageDetail.excerpt}`} />
            <meta property="og:title" content={`${pageDetail.title.rendered}`} />
            <meta property="og:description" content={`${pageDetail.excerpt}`} />
            <meta property="og:image" content={pageDetail.fimg_url} />
        </Helmet>
    }
    <section id='post-detail' className={`page-detail ${slug}`}>
        {
            isLoading && <Processing message='Loading please wait...' />
        }
        {
            !isLoading && 
            <>
            <div className='post-header page-header'>
              <Link className='go-back' to={ isStartPointHome ? -1 : '/'}><i className='heady icon-left-big'></i> Back</Link>
              <h1 className='post-title'>{parseHtml(pageDetail.title.rendered)}</h1>
              <div className='share-action' onClick={()=>setSharePopupActive(!isSharePopupActive)}> Share: <i className='heady icon-paper-plane' title='Share this article'></i></div>
            </div>
            
            <picture className='post-image'><img src={pageDetail.fimg_url} alt={pageDetail.title.rendered} /></picture> 
            <p className='post-date in-grid'> <i className='heady icon-calendar'></i> <time>{moment(pageDetail.date).format('DD MMMM, YYYY')}</time></p>

            { // news detail text parser
              parseHtml(pageDetail.content.rendered)
            }

            <ShareMe isSharePopupActive={isSharePopupActive} setSharePopupActive={setSharePopupActive} title={parseHtml(pageDetail.title.rendered)} url={window.location.href} />
            </>
        }
        
        
    </section>
    </>
    
  )
}

export default PageDetail