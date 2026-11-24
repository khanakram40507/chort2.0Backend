import axios from "axios";


const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function getFeed(){
    const response=await api.get("/api/post/feed")
    return response.data;   // here it will return all the posts .
}


export async function createPost(imageFile, caption) {

    const formData = new FormData()

    formData.append("image", imageFile)
    formData.append('caption', caption)

    const response = await api.post("/api/post", formData)

    return response.data
}


export async function likePost(postId) {
    const response = await api.post(`/api/post/like/${postId}`)
    // Refresh the feed after liking a post
    return response.data
}

export async function unLikePost(postId) {
    const response = await api.post(`/api/post/unlike/${postId}`)
     // Refresh the feed after unliking a post
    return response.data
}