import React from 'react'
import { RouterProvider } from 'react-router'
import AppRoutes from './AppRoutes'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { PostContextProvider } from './features/posts/post.context.jsx'

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <AppRoutes/>
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App
