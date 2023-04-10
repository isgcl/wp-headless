import React, { useState, useEffect, useRef } from 'react'
import Processing from '../processing'
import axios from 'axios'
import NewsSingle from './news-single'



const NewsPageContent = ()=> {
  

  const [loading,setLoading] = useState(true)
  const [errorLoading,setErrorLoading] = useState(false)
  const [news,setNews] = useState([])
  const [isPostsLastPage,setPostsLastPage] = useState(false)
  const [currentPageNo,setCurrentPageNo] = useState(1)


  window.addEventListener('scroll',()=>{

    // var x = getOffset( document.getElementById('get-news') ).left;
    let mybutton = document.getElementById('get-news'), y = getOffset( mybutton ).top;
    //console.log('butonun sol',x,'butonun üst',y);
    //console.log('Win scrollY',window.scrollY)
    //console.log('Win Height',window.innerHeight)
    //console.log('Win TOTAL: ', window.scrollY+window.innerHeight)
    // y < window.scrollY+window.innerHeight && console.log('--------> FIRE ----------->','currentPageNo',currentPageNo)
    if (y < window.scrollY+window.innerHeight) {
      //!isPostsLastPage && console.log('isPostsLastPage',isPostsLastPage)
      // mybutton.click()
      !isPostsLastPage && console.log('ulen etme be')
    }
  })
  
  const getOffset = ( el )=> {
      let _x = 0;
      let _y = 0;
      while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
      }
      return { top: _y, left: _x };
  }
  
  
  const getNewsPosts = async ()=>{
    await axios.get(process.env.REACT_APP_WP_HEADLESS_URI+'posts/?page='+currentPageNo)
    .then(res => {
        setNews((prevdata)=>[...prevdata,...res.data])
        setLoading(false)
        setCurrentPageNo((prev)=>prev+1)
        console.log('CurrentPageNo',currentPageNo)
    }).catch(error => {
      console.error(error)
      if (error.code === 'ERR_BAD_REQUEST') {
        setPostsLastPage(true)
      } else {
        setErrorLoading(true)
      }
    }) 
  }


  useEffect(()=>{
    !isPostsLastPage && getNewsPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  /*
  useEffect(()=>{
    if (news) localStorage.setItem('_news',JSON.stringify(news))
  },[news])
  */
  return (
    <section id='news'>
        
        {
          errorLoading && <Processing message='An error occured. Connection failed. Please refresh' cssclass='error' />
        }
        {
          
            loading ? <Processing /> : <div className='grid-article grid-news'>
             { news.map((item,ind)=> <NewsSingle key={item.id} ind={ind} currentpage={currentPageNo} id={item.id} title={item.title.rendered} slug={item.slug} excerpt={item.excerpt.rendered} excerpt_title={item.excerpt_title} fimg_url={item.fimg_url} /> ) }
            </div>   
            
        }
        {
          isPostsLastPage && <p>Artık herhangi bir nesne görüntülenemez çünkü bişey kalmadı bebiş...</p>
        }
        <p><button id='get-news' type='button' onClick={getNewsPosts}>Get More News</button></p>

        
      </section>
  )
}

export default NewsPageContent

