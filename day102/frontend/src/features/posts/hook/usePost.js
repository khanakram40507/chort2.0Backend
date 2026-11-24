import {getFeed,createPost,likePost,unLikePost} from "../services/post.api.js"
import{ PostContext } from "../post.context.jsx"
import { useContext ,useEffect} from "react";

export const usePost=()=>{
    const { post, setPost, loading, setLoading, feed, setFeed } = useContext(PostContext);

    const handleGetFeed=async()=>{
        setLoading(true)
        const response=await getFeed()
        setFeed(response.posts)
        setLoading(false)
    }


    const handleCreatePost=async(imageFile,caption)=>{
        setLoading(true)
        const data =await createPost(imageFile,caption)
        setFeed([data.post,...feed])
        setLoading(false)
    }

    useEffect(()=>{
        handleGetFeed()
    },[])

    const handleLikePost=async(postId)=>{
        setLoading(true)
        const data=await likePost(postId)
        setLoading(false)
    }

    const handleUnLikePost=async(postId)=>{
        setLoading(true)
        const data=await unLikePost(postId)
        setLoading(false)
    }


    return { loading,feed,post,handleGetFeed,handleCreatePost,handleLikePost,handleUnLikePost }
}