import React, { useState, useEffect } from 'react'
import axios from 'axios'
import parseHtml from 'html-react-parser'
import Processing from '../processing'

const Comments = ({id})=> {
 
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
            !isLoading && <h2>Yorumlar...</h2>
        }
        { isLoading ? <Processing message='Comments loading please wait...' /> :
            
            comments.map( 
                (comment,ind)=> comment.parent === 0 && <div key={ind} id={`comment-${comment.id}`}>{comment.id}: 
                {
                    parseHtml(comment.content.rendered)
                }
                  {
                    comments.map((subcomment,ix)=> subcomment.parent === comment.id && <div key={ix}> Alt Yorum ID: {subcomment.id} {
                        parseHtml(subcomment.content.rendered)
                    }  </div>) 
                  }
                </div>)
        }
    </>
  )
}
export default Comments