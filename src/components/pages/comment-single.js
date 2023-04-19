import React, { useEffect, useState } from 'react'
import moment from 'moment'
import parseHtml from 'html-react-parser'
import CommentReplyForm from '../formik/formik-comment-reply'


const CommentSingle = ({comments,className,id,date,author,comment,avatar_uri,postid})=> {

  const [showReplyForm,setShowReplyForm] = useState(false)
  const [subCommentID,setSubCommentID] = useState(null)

  useEffect(()=>{
    // console.log('useEffect run count?')
    const checkSubComments = (id,comments)=> {
        return comments.map((comment)=> comment.parent === id && setSubCommentID(comment.id) )
      }
    
    checkSubComments(id,comments)
    //console.log('subCommentID',subCommentID)
  },[id,comments,subCommentID])
  

  

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
                <h3>You replying to: {author}'s #{id} comment </h3>
                <CommentReplyForm replyid={id} postid={postid} setShowReplyForm={setShowReplyForm} />
            </div>
            }

            { 
            subCommentID !== null && 
            
            comments.map((comment)=> comment.id === subCommentID &&
            <CommentSingle className='sub-comment' key={comment.id} id={comment.id} postid={postid} date={moment(comment.date).format('DD MMMM, YYYY')} author={comment.author_name} comment={parseHtml(comment.content.rendered)} avatar_uri={comment.author_avatar_urls[96]} comments={comments} />)

            }
    </div>
     </>
  )
}

export default CommentSingle