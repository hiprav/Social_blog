import { Grid } from '@mui/material'
import React from 'react'
import Navigation from './Navigation/Navigation'
import HomeSection from './Home/MiddlePart/HomeSection'
import RightPart from './RightPart/RightPart'
//import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Profile from './Profile/Profile'
import TwitDetail from './Home/MiddlePart/TwitDetail'
import Explore from './Home/MiddlePart/Explore'
import Lists from './Home/Lists'
import Communities from './Home/MiddlePart/Communities'
import Messages from './Home/MiddlePart/Messages'
import Notifications from './Home/MiddlePart/Notifications'


const HomePage = () => {
  //  const {auth,theme}=useSelector(store=>store);
  return (
    <Grid container className='px-5 lg:px-37 justify-between ' item xs={12}>

      <Grid item xs={0} lg={2.5} className='hidden lg:block  w-full relative '>
        <Navigation />

      </Grid>
      <Grid item xs={12} lg={6} className={`px-5 lg:px-9 border  j`}>
        <Routes>
          <Route path='/' element={<HomeSection />}></Route>
          <Route path='/home' element={<HomeSection />}></Route>
          <Route path='/explore' element={<Explore/>}></Route>
          <Route path='/lists' element={<Lists/>}></Route>
          <Route path='/messages' element={<Messages/>}></Route>
          <Route path='/notifications' element={<Notifications/>}></Route>
          <Route path='/communities' element={<Communities/>}></Route>
          {/* <Route path='/profile' element={<Profile/>}></Route> */}
          <Route path='/profile/:id' element={<Profile />}></Route>
          <Route path='/twit/:id' element={<TwitDetail />}></Route>

        </Routes>

      </Grid>
      <Grid item xs={0} lg={3} className='hidden lg:block '>
        <RightPart />
      </Grid>

    </Grid>
  )
}

export default HomePage