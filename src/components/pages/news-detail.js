import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    Link,
    useParams
  } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Processing from '../processing';
import parseHtml from 'html-react-parser'

let fetchUri = process.env.REACT_APP_WP_HEADLESS_URI+'posts/?slug='

const NewsDetail = ()=> {

  const [isLoading,setLoading] = useState(true)
  const [newsDetail, setNewsDetail] = useState({})

  let {slug} = useParams()
  
  
  useEffect(()=>{
    if (slug) axios(fetchUri+slug)
    .then(res => {
        setNewsDetail(res.data[0])
        setLoading(false)
    })
  },[slug])
  
  return (
    
    <>
    { 
        !isLoading && <Helmet>
            <title> {`${newsDetail.title}`} | ReactApp</title>
            <meta name="description" content={`${newsDetail.excerpt}`} />
        </Helmet>
    }
    <section id='post-detail' className={`post-detail ${slug}`}>
        {
            isLoading && <Processing message='İçerik yükleniyor, lütfen bekleyin...' />
        }
        {
            !isLoading && 
            <>
            <h2>{parseHtml(newsDetail.title.rendered)}</h2>
            <p><img src={newsDetail.fimg_url} alt={newsDetail.title.rendered} /></p> 
            { 
              parseHtml(newsDetail.content.rendered)
            }
            </>
        }
        
        <p><Link to={-1}>Back to News</Link></p>
    </section>
    </>
    
  )
}

export default NewsDetail