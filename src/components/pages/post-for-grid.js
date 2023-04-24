import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NewsSingle from './news-single'
import Processing from '../processing'
import { Link } from 'react-router-dom'

const PostsForGrid = ({catslug,postcount,catname,catimg,ind})=> {

  const [isLoading,setIsLoading] = useState(false)
  const [posts,setPosts] = useState([])
  const [errorLoading,setErrorLoading] = useState(false)

  const getCategoryPosts = async ()=>{
    await axios.get(process.env.REACT_APP_WP_HEADLESS_URI+'posts/?per_page='+postcount+'&category_slug='+catslug)
    .then(res => {
        setPosts((prevdata)=>[...prevdata,...res.data])
        setIsLoading(false)
    }).catch(error => {
        console.error(error)
        setErrorLoading(true)
    }) 
  }


  useEffect(()=>{
    getCategoryPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    
  return (
    <section id={`category-posts-${catslug}`} className={ ind % 2 === 0 ? 'grid-article grid-news grid-catposts' : 'grid-article grid-news grid-catposts zebra' }>
        {   isLoading ? <Processing message='Loading...' /> :
            posts.map((item,ind)=> <NewsSingle key={item.id} ind={ind} id={item.id} title={item.title.rendered} slug={item.slug} excerpt={item.excerpt.rendered} excerpt_title={item.excerpt_title} fimg_url={item.fimg_url} comment_count={item.comment_count} date={item.date} /> )
        }
        {
            !isLoading && 
            <>
            <article className='go-to-more'>
                { catimg && <img className='cat-thumbnail' alt={catname} src={catimg} />}
                <Link to={`/cat/${catslug}`}> More <em>{catname}</em> articles <i className='heady icon-right-big'></i> </Link>
            </article>
            </>
        }
        {
          errorLoading && <Processing message='An error occured. Connection failed. Please refresh' cssclass='error' />
        }
    </section>
  )
}
export default PostsForGrid