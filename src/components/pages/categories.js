import React, { useState, useEffect } from 'react'
import Processing from '../processing'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
// import EndOfData from '../infotext/end-of-data';
import { Link } from 'react-router-dom'
import parseHtml from 'html-react-parser';
import PostsForGrid from './post-for-grid';


const CategoriesPageContent = ({display, postcount})=> {
  

  const [loading,setLoading] = useState(true)
  const [errorLoading,setErrorLoading] = useState(false)
  const [categories,setCategories] = useState([])
  const [hasMore,setHasMore] = useState(true)
  const [currentPageNo,setCurrentPageNo] = useState(1)

  const noAuth = {
    headers : {
        Authorization : null
    }
  }
  
  const getCategories = async ()=>{
    await axios.get(process.env.REACT_APP_WP_HEADLESS_URI+'categories/?hide_empty=true&page='+currentPageNo,noAuth)
    .then(res => {
        if (res.data.length > 0) {
            setCategories([...categories, ...res.data]);
            setCurrentPageNo(currentPageNo + 1);
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
    }).finally(res=>{
        setLoading(false)
    }) 
  }

  useEffect(()=>{
    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[false]);

  return (
    <>
    {
        loading ? 
          <Processing message={'Loading...'} /> 
        :
          <section id='categories'>
            <InfiniteScroll
              dataLength={categories.length}
              next={getCategories}
              hasMore={hasMore}
              loader={<Processing message={'Loading categories...'} />}
              className= { display === 'postin' ? 'category-selection' : 'grid-article grid-categories'}
              endMessage={ <></> }
            >
            { (display === undefined || display === 'title') &&
              categories.map((cat,ind)=> cat.count > 0 && <article key={ind}><h2>{parseHtml(cat.name)}</h2> <Link to={`/cat/${cat.slug}`} className='stick'>{parseHtml(cat.name)}</Link></article> )
            }
            { display === 'excerpt' &&
              categories.map((cat,ind)=> cat.count > 0 && <article key={ind}><h2>{parseHtml(cat.name)}</h2> {cat.description ? `${parseHtml(cat.description)}` : null } <Link to={`/cat/${cat.slug}`} className='stick'>{parseHtml(cat.name)}</Link></article> )
            }
            { display === 'thumbnail' &&
              categories.map((cat,ind)=> cat.count > 0 && <article key={ind} className={ind % 3 === 2 && 'pick'}><h2>{parseHtml(cat.name)}</h2> <picture><img src={cat.acf.cat_img_url} alt={parseHtml(cat.name)} /></picture> {cat.description ? <p>{parseHtml(cat.description)}</p> : null } <Link to={`/cat/${cat.slug}`} className='stick'>{parseHtml(cat.name)}</Link></article> )
            }
            { display === 'postin' &&
              categories.map((cat,ind)=> cat.count > 0 &&
              <>
                    <h2><span><em>{parseHtml(cat.name)}</em></span> <Link to={`/cat/${cat.slug}`} className='cat-link'> See all {parseHtml(cat.name)} <i className='heady icon-right-big'></i> </Link> </h2>
                    <PostsForGrid key={ind} ind={ind} postcount={postcount} catslug={cat.slug} catname={parseHtml(cat.name)} catimg={cat.acf.cat_img_url} />
              </>
                )
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

export default CategoriesPageContent

