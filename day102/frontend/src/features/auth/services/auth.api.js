import axios from "axios";



//* axios.create() creates a custom Axios object.
const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true                 //^Include credentials such as cookies when making cross-origin requests.
});

export async function register(username, email, password) {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await api.post("/register", {
            username,
            email,
            password
        });

        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function login(username, password) {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await api.post("/login", {
            username,
            password
        });

        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getMe(){
    // eslint-disable-next-line no-useless-catch
    try{
        const response=await api.get("/getme")
        return response.data
    }
    catch(err){
        throw err
    }
}


// post method  for create post
export  async function createPost(ImageFile, caption){
    const formData=new FormData();
    formData.append("image",ImageFile)
    formData.append("caption",caption)

    const response=await api.post("/create-post",formData)

    return response.data;  // here it will return the created post object.
}