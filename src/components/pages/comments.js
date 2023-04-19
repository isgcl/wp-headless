import React, { useState, useEffect } from 'react'
import axios from 'axios'
import parseHtml from 'html-react-parser'
import Processing from '../processing'
import moment from 'moment'

const Comments = ({id,count})=> {
 
  let fetchUri = process.env.REACT_APP_WP_HEADLESS_URI+'comments/?post='
  
  const [isLoading,setIsLoading] = useState(true)
  const [comments,setComments] = useState([])

  useEffect(()=>{
    if (id) axios(fetchUri+id)
    .then(res => {
        setComments(res.data)
        setIsLoading(false)
    })
    // eslint-disable-next-line
  },[id])
  
  return (
    <>   {
            !isLoading && <h2> <i className='heady icon-comment-empty'></i> {count} {count <= 1 ? 'Comment' : 'Comments'} </h2>
         }
        { isLoading ? <Processing message='Comments loading please wait...' /> :
            <ul>
                {
            comments.map( 
                (comment,ind)=> comment.parent === 0 && <li key={ind} id={`comment-${comment.id}`}> <i className='heady icon-feather'></i> <time>{moment(comment.date).format('DD MMMM, YYYY')}</time> {comment.author_name}: <br /> 
                {
                    parseHtml(comment.content.rendered)
                }
                  {
                    comments.map((subcomment,ix)=> subcomment.parent === comment.id && <div className='sub-comment' key={ix}><i className='heady icon-feather'></i> <time>{moment(subcomment.date).format('DD MMMM, YYYY')}</time> {subcomment.author_name} {
                        parseHtml(subcomment.content.rendered)
                    }  </div>) 
                  }
                </li>)
                }
            </ul>    
        }
    </>
  )
}
export default Comments