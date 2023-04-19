import React, { useState, useEffect } from 'react'
import axios from 'axios'
import parseHtml from 'html-react-parser'
import Processing from '../processing'
import moment from 'moment'
import CommentSingle from './comment-single'
import CommentReplyForm from '../formik/formik-comment-reply'
import EndOfData from '../infotext/end-of-data'


const Comments = ({id,count,inpopup})=> {
 
  const [comments,setComments] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [showReplyForm,setShowReplyForm] = useState(false)
  const [currentPageNo,setCurrentPageNo] = useState(1)
  const [isFinished,setIsFinished] = useState(false)


  let fetchUri = process.env.REACT_APP_WP_HEADLESS_URI+'comments/?page='+currentPageNo+'&post='
  
  useEffect(()=>{

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

  const getComments = async ()=>{
    await axios(fetchUri+id)
    .then(res => {
        if (res.data.length > 0) {
            setComments((prev)=>[...prev,...res.data])
            setCurrentPageNo(currentPageNo+1)
            setIsLoading(false)
        } 
        if (res.data.length < 10) {
          console.log('Log- Finito')
           setIsFinished(true)
        }
        
    }).catch(err => {
        console.log(err)
        setIsFinished(true)
    })
  } 

  useEffect(()=>{
    if (id && count > 0) { 
        getComments()
    } else {
        setIsLoading(false)
        setShowReplyForm(true)
    }
    // eslint-disable-next-line
  },[id])
  
  return (
    <>   
        { isLoading ? <Processing message='Comments loading please wait...' /> :
             <div className='comments' id='comments'>
                {
                  count > 0 && <button type='button' className='go-write-comment' onClick={()=> setShowReplyForm(!showReplyForm)}> <i class="heady icon-feather"></i> { showReplyForm ? 'Cancel' : 'Reply' } </button>
                }
                <i id='comment-place-holder'></i> 
                <h2> <i className='heady icon-comment-empty'></i> {count} {count <= 1 ? 'Comment' : 'Comments'} </h2>
                {
                    showReplyForm && <CommentReplyForm replyid={0} postid={id} setShowReplyForm={setShowReplyForm} />
                }
                {
                count > 0 &&
                comments.map( 
                    (comment,ind)=> comment.parent === 0 && 
                    <CommentSingle className='comment' key={comment.id} id={comment.id} postid={id} date={moment(comment.date).format('DD MMMM, YYYY')} author={comment.author_name} comment={parseHtml(comment.content.rendered)} avatar_uri={comment.author_avatar_urls[96]} comments={comments} />)
                }
                {
                    count > 10 && !isFinished &&
                    <p><button type='button' className='go-more-comments' onClick={()=>getComments()}><i className='heady icon-arrows-cw'></i> Load More Comment</button></p>
                }
                {
                  count > 10 && isFinished && <EndOfData message={'No more comments.'} tag={'p'} />  
                }
            </div>
        }
    </>
  )
}
export default Comments