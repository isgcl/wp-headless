import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import parseHtml from 'html-react-parser'
import CommentReplyForm from '../formik/formik-comment-reply'
import WPContext from '../../context/WPContext'


const CommentSingle = ({comments,className,id,date,author,comment,avatar_uri,postid})=> {

  const [showReplyForm,setShowReplyForm] = useState(false)
  const [subCommentsID,setSubCommentsID] = useState([])
  const {isUserLogedIn} = useContext(WPContext)
  

  useEffect(()=>{
    // console.log('useEffect run count?')
    const checkSubComments = (id,comments)=> {
        return comments.map((comment)=> comment.parent === id && setSubCommentsID((prev)=>[...prev,comment.id]) )
      }
    checkSubComments(id,comments)
    // eslint-disable-next-line
  },[id])
  

  

  return (
    <>
    <div className={'comment '+className} id={'comment-'+id}>
        <div className='comment-header'> 
        {
            avatar_uri && <picture><img className='comment-avatar' src={avatar_uri} alt='author' /></picture>
        }
            <div className='author-meta'><strong>{author}</strong> <time>{date}</time></div>
            
        </div>
        <div className='comment-content'>
            {comment}
            <div className='action' onClick={()=> setShowReplyForm(!showReplyForm)}><button type='button' className={showReplyForm ? 'go-reply cancel' : 'go-reply'}><i className='heady icon-feather'></i> {showReplyForm ? 'Cancel': 'Reply'}</button></div>
        </div>
        
            { 
            showReplyForm &&
            <div className='reply-form'>
              {
                isUserLogedIn ? <h3>You are replying to: {author}'s comment </h3> : <h3>Oopps!</h3>
              }
              <CommentReplyForm replyid={id} postid={postid} setShowReplyForm={setShowReplyForm} />
            </div>
            }

            { 
            subCommentsID !== null &&
            comments.map((comment)=> subCommentsID.includes(comment.id)  &&
            <CommentSingle className='sub-comment' key={comment.id} id={comment.id} postid={postid} date={moment(comment.date).format('DD MMMM, YYYY')} author={comment.author_name} comment={parseHtml(comment.content.rendered)} avatar_uri={comment.author_avatar_urls[96]} comments={comments} />)

            }
    </div>
     </>
  )
}

export default CommentSingle