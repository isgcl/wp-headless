import React, { useState, useEffect } from 'react'
import axios from 'axios'
import parseHtml from 'html-react-parser'
import Processing from '../processing'
import moment from 'moment'
import CommentSingle from './comment-single'

const Comments = ({id,count,inpopup})=> {
 
  let fetchUri = process.env.REACT_APP_WP_HEADLESS_URI+'comments/?post='
  
  const [isLoading,setIsLoading] = useState(true)
  const [comments,setComments] = useState([])

  
  
  useEffect(()=>{

        /* bi sıkıntı var, onScroll event sapıttırıyor sanırım */
    const scrollToOnPage = (offset)=>{
        if (offset !== undefined) offset = 100
        window.scrollTo({
            behavior: "smooth",
            top: document.getElementById("comments").getBoundingClientRect().top -
            document.body.getBoundingClientRect().top - offset
        });
    }

    const scrollToOnDiv = (offset)=>{
        document.querySelector('#comment-place-holder').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
        });
    }

    !isLoading && !inpopup && scrollToOnPage(100)
    !isLoading && inpopup && scrollToOnDiv()
   // console.log('comments.length',comments)
  },[isLoading,inpopup])
  

  useEffect(()=>{
    if (id) axios(fetchUri+id)
    .then(res => {
        setComments(res.data)
        setIsLoading(false)
    })
    // eslint-disable-next-line
  },[id])
  
  return (
    <>   
        { isLoading ? <Processing message='Comments loading please wait...' /> :
             <div className='comments' id='comments'>
                <i id='comment-place-holder'></i>
                <h2> <i className='heady icon-comment-empty'></i> {count} {count <= 1 ? 'Comment' : 'Comments'} </h2>
                {
            comments.map( 
                (comment,ind)=> comment.parent === 0 && 
                <CommentSingle className='comment' key={comment.id} id={comment.id} postid={id} date={moment(comment.date).format('DD MMMM, YYYY')} author={comment.author_name} comment={parseHtml(comment.content.rendered)} avatar_uri={comment.author_avatar_urls[96]} comments={comments} />)
                }
            </div>
        }
    </>
  )
}
export default Comments