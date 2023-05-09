import React, { useEffect, useState } from 'react'
import NewsSingle from './news-single';
import Processing from '../processing';
import ThereIsAnError from '../infotext/an-error';
import axios from 'axios';

const RelatedNews = ({cats,exclude}) => {
   
   const [isLoading,setIsLoading] = useState(true);
   const [errorLoading,setErrorLoading] = useState(false)
   const [news,setNews] = useState([])

   const noAuth = {
    headers : {
        Authorization : null
    }
  }

   const getRelatedPosts = async ()=>{
    await axios.get(process.env.REACT_APP_WP_HEADLESS_URI+'posts/?exclude[0]='+exclude+'&cat='+cats,noAuth)
    .then(res => {
        if (res.data.length > 0) {
            setNews(res.data)
        } 
    }).catch(error => {
      console.error(error)
      setErrorLoading(true)
    }).finally( res =>{
        setIsLoading(false)
    }) 
  }
   
   useEffect(()=>{
      if (cats) getRelatedPosts()
      // eslint-disable-next-line
   },[cats])


  return (
    <>
        {
        isLoading ? 
        <Processing message='Loading...' />
        :      
            <div className='category-selection related'>
                <h2><span><em>May be you interest</em></span></h2>
            <section id="related-posts" className="grid-article grid-news grid-catposts related">
            {news.map((item,ind)=> <NewsSingle key={item.id} ind={ind} id={item.id} title={item.title.rendered} slug={item.slug} excerpt={item.excerpt.rendered} excerpt_title={item.excerpt_title} fimg_url={item.fimg_url} comment_count={item.comment_count} date={item.date} /> )}
            </section>
            </div>
        }

        {
            errorLoading &&
            <ThereIsAnError message='An error occured. Please refresh.' cssclass='error' />
        }
    </>
  )
}

export default RelatedNews