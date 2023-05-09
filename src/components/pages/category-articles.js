import React, { useState, useEffect } from 'react'
import Processing from '../processing'
import axios from 'axios'
import NewsSingle from './news-single'
import InfiniteScroll from 'react-infinite-scroll-component';
import EndOfData from '../infotext/end-of-data';
import {
    useParams
  } from "react-router-dom";


const CategoryArticlesPageContent = ()=> {
  
  let {slug} = useParams()
  const [loading,setLoading] = useState(true)
  const [errorLoading,setErrorLoading] = useState(false)
  const [news,setNews] = useState([])
  const [hasMore,setHasMore] = useState(true)
  const [currentPageNo,setCurrentPageNo] = useState(1)
  
  const noAuth = {
    headers : {
        Authorization : null
    }
  }

  const getCategoryPosts = async ()=>{
    await axios.get(process.env.REACT_APP_WP_HEADLESS_URI+'posts/?page='+currentPageNo+'&category_slug='+slug,noAuth)
    .then(res => {
        if (res.data.length > 0) {
            setNews((prevdata)=>[...prevdata,...res.data])
            setCurrentPageNo((prev)=>prev+1)
        } else {
            setHasMore(false)
        }
    }).catch(error => {
      console.error(error)
      if (error.code === 'ERR_BAD_REQUEST') {
        setHasMore(false)
      } else {
        setErrorLoading(true)
      }
    }).finally( res =>{
        setLoading(false)
    }) 
  }


  useEffect(()=>{
   if(slug) getCategoryPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[slug])

  return (
    <>
    {
        loading ? <Processing message={'Loading...'} />  :
        
        <section id='news' className='category-articles'>
            <InfiniteScroll
            dataLength={news.length}
            next={getCategoryPosts}
            hasMore={hasMore}
            loader={<Processing />}
            pullDownToRefreshThreshold={50}
            className="grid-article grid-news"
            endMessage={ <EndOfData tag={'article'} cssclass={'there-is-no-more'} message={'There is no more content.'} /> }
            >
            {
            news.map((item,ind)=> <NewsSingle key={item.id} ind={ind/currentPageNo} id={item.id} title={item.title.rendered} slug={item.slug} excerpt={item.excerpt.rendered} excerpt_title={item.excerpt_title} fimg_url={item.fimg_url} comment_count={item.comment_count} date={item.date} /> )
            }
            </InfiniteScroll>
            
            {
            errorLoading && <Processing message='An error occured. Connection failed. Please refresh' cssclass='error' />
            }
        </section>
    }
    
      </>
  )
}

export default CategoryArticlesPageContent

