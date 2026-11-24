import {BrowserRouter,Route,Routes} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import HomePage from './features/auth/pages/HomePage'
import Feed from './features/posts/pages/Feed'
import CreatePost from './features/posts/pages/CreatePost'



function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path='/login' element={<Login/>}  />
                <Route path='/register' element={<Register/>}/>
                <Route path='/' element={<Feed/>}/>
                <Route path='/create-post' element={<CreatePost/>}/>

            </Routes>

    </BrowserRouter>
) 
}

export default AppRoutes;