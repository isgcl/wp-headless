import React, { createContext, useState } from "react"


const CommentsContext = createContext()

export const CommentsProvider = ({children})=> {

    const [comments,setComments] = useState([])

    const values = {
        comments,
        setComments
    }
    return <CommentsContext.Provider value={values}>{children}</CommentsContext.Provider>
}

export default CommentsContext