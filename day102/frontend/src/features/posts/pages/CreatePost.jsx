import React from 'react'
import { useState, useRef } from 'react'
import "../style/createpost.scss"
import { usePost } from '../hook/usePost.js'
import {useNavigate} from "react-router"

const CreatePost = () => {

    const [caption, setCaption] = useState('');
    const postImageInputFieldRef = useRef(null);
    
    const {loading, handleCreatePost} = usePost();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const file = postImageInputFieldRef.current.files[0];
        await handleCreatePost(file, caption);
        navigate('/');
    };

    if (loading) {
        return (
            <div className='loading'>
                <p>Creating post...</p>
            </div>
        );
    }

    return (
        <main className='create-post-page'>
            <div className="form-container">
                <form
                    onSubmit={handleSubmit}
                >
                    <h1>Create Post</h1>
                    <label className="post-image-label" htmlFor="postImage">Select the Image</label>
                    <input
                        ref={postImageInputFieldRef}
                        hidden type="file" name="postImage" id='postImage' />

                    <input
                        value={caption}
                        onChange={(e) => {
                            setCaption(e.target.value)
                        }}
                        type="text" name="caption" id='caption' placeholder="Write a caption..." />
                    <button type='submit' className='button primary-button'>Create Post</button>
                </form>
            </div>

        </main>
    )
}

export default CreatePost
