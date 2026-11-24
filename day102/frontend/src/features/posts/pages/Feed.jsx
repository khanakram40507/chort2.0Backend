import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../components/post'
import { usePost } from '../hook/usePost'
import Nav from '../../shared/components/Nav'


const Feed = () => {

    const {feed,handleGetFeed,loading,handleLikePost,handleUnLikePost}=usePost();

    useEffect(()=>{
        handleGetFeed()
    }, []);

    if(loading || !feed){
        return (
            <main><h1>Feed is loading</h1></main>
        )
    }
    console.log(feed);

    return (
        <main className='feed-page'>
            <Nav/>
            <div className="feed">
                <div className="posts">
                    {feed.map((post,index)=>{
                        return <Post key={index} post={post} loading={loading} handleLikePost={handleLikePost} handleUnLikePost={handleUnLikePost}/>
                    })}
                   

                </div>

            </div>
        </main>
    )
}

export default Feed
