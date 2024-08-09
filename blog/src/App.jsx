import { useEffect, useState } from 'react'
import Homepage from'./Components/HomePage'
import './App.css'
import { Route, RouterProvider, Routes, useNavigate } from 'react-router-dom'
import Authentication from './Components/Authentication/Authentication'
import VerifiedSuccess from './Components/VerifiedSuccess/VerifiedSuccess'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import HomePage from './Components/HomePage'
import Profile from './Components/Profile/Profile'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from './store/Action'



function App() {
  const jwt=localStorage.getItem("jwt")
  const {auth}=useSelector(store=>store)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(()=>{

    if(jwt){
      dispatch(getUserProfile(jwt))
      navigate('/')
    }
  
  },[auth.jwt,jwt])

  return (
  <>
      <CssBaseline />
      <Box sx={{}}>
        {/* <Button variant='content' color='success'>Check Theme</Button> */}
          <Routes>
        <Route path='/*' element={  auth.user? <Homepage/>:<Authentication/>}></Route>
        <Route path='/signin' element={<Authentication/>}></Route>
        <Route path='/signup' element={<Authentication/>}></Route>
        <Route path='/verified' element={<VerifiedSuccess/>}></Route>
       
      </Routes>
      </Box>
</>
  )
}

export default App
