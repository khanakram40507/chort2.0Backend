import {createContext, useState} from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const PostContext=createContext();

export function PostContextProvider({children}){

    //post,loading ,feed are golbal state which we want to share with all the components in the post feature.
    const [post,setPost]=useState([])
    const [loading,setLoading]=useState(false)
    const [feed,setFeed]=useState([])

    return (
        <PostContext.Provider value={{post,setPost,loading,setLoading,feed,setFeed}}>
            {children}
        </PostContext.Provider>
    )
}