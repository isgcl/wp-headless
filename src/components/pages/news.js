import React, { useState, useEffect } from 'react'
import Processing from '../processing'
import axios from 'axios'
import NewsSingle from './news-single'
import InfiniteScroll from 'react-infinite-scroll-component';
import EndOfData from '../infotext/end-of-data';


const NewsPageContent = ()=> {
  

  // const [loading,setLoading] = useState(true)
  const [errorLoading,setErrorLoading] = useState(false)
  const [news,setNews] = useState([])
  const [hasMore,setHasMore] = useState(true)
  const [currentPageNo,setCurrentPageNo] = useState(1)


  
  const getNewsPosts = async ()=>{
    await axios.get(process.env.REACT_APP_WP_HEADLESS_URI+'posts/?page='+currentPageNo)
    .then(res => {
        setNews((prevdata)=>[...prevdata,...res.data])
        //setLoading(false)
        setCurrentPageNo((prev)=>prev+1)
        console.log('CurrentPageNo',currentPageNo)
    }).catch(error => {
      console.error(error)
      if (error.code === 'ERR_BAD_REQUEST') {
        setHasMore(false)
      } else {
        setErrorLoading(true)
      }
    }) 
  }


  useEffect(()=>{
    getNewsPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  /*
  useEffect(()=>{
    if (news) localStorage.setItem('_news',JSON.stringify(news))
  },[news])
  */
  return (
    <section id='news'>
        <InfiniteScroll
          dataLength={news.length}
          next={getNewsPosts}
          hasMore={hasMore}
          loader={<Processing />}
          className="grid-article grid-news"
          endMessage={ <EndOfData tag={'article'} cssclass={'iste-benim-hatam'} message={'Hepsi bu gadder'} /> }
        >
         { news.map((item,ind)=> <NewsSingle key={item.id} ind={ind/currentPageNo} id={item.id} title={item.title.rendered} slug={item.slug} excerpt={item.excerpt.rendered} excerpt_title={item.excerpt_title} fimg_url={item.fimg_url} /> ) }
        </InfiniteScroll>
        
        {
          errorLoading && <Processing message='An error occured. Connection failed. Please refresh' cssclass='error' />
        }
      </section>
  )
}

export default NewsPageContent

