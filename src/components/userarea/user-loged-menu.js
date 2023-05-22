import React, {useContext, useEffect, useState} from 'react'
import WPContext from '../../context/WPContext'
import axios from 'axios'
import Confirmbox from '../tool/confirmbox'


const UserLogedMenu = ()=> {
  
  const [isConfirmBoxVisible,setConfirmBoxVisible] = useState(false)
  const [isUserDataReady,setUserDataReady] = useState(false)

  const {
    isUserLogedIn,
    setUserLogedIn,
    isUserMenuVisible,
    setUserMenuVisible,
    logedUserData,
    setLogedUserData,
    logedUserExtentedData,
    setLogedUserExtentedData
    } = useContext(WPContext)

  const logOut = ()=> {
      
      setLogedUserData({
        'token':null,
        'user_email': null,
        'user_nicename' : null,
        'user_display_name' : null
      })

      localStorage.removeItem('token');
      localStorage.removeItem('user_nicename');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_display_name');
      localStorage.removeItem('logedUserExtentedData');
      
      delete axios.defaults.headers.common["Authorization"];

      setUserLogedIn(false)

  }

  const {user_display_name,user_nicename,user_email} = logedUserData

  

  const getUserExtentedData = async ()=>{
    let fetchUri = process.env.REACT_APP_WP_HEADLESS_USER_ME_URI
    if (isUserLogedIn) await axios.post(fetchUri)
    .then(res => {
        setLogedUserExtentedData(res.data)
        localStorage.setItem('logedUserExtentedData',JSON.stringify(res.data))
        setUserDataReady(true)
        // console.log(res.data)
    }).catch(err => {
        console.error(err)
        if (err.response.data.code === 'jwt_auth_invalid_token') logOut()
    })
  }

  

  useEffect(()=>{
    getUserExtentedData()
    // eslint-disable-next-line
  },[isUserLogedIn])


 

  return (
    <>
    <button title='Open your personal menu' type='button' className={isUserMenuVisible ? 'go-user-menu active' : 'go-user-menu' }  onClick={()=> setUserMenuVisible(!isUserMenuVisible)}><i className='heady icon-user-maskot'></i> <span>@{user_nicename}</span></button>
    <div className={isUserMenuVisible ? 'user-menu active': 'user-menu'}>
        {
            isUserDataReady && logedUserExtentedData !== undefined && <p className='user-avatar'><img src={logedUserExtentedData.avatar_urls[96]} alt={user_display_name} /></p>
        }
        <p>Hello <strong title={user_email}>{user_display_name}</strong> <small>@{user_nicename}</small></p>
        <p><button type='button' className='go-logout' onClick={()=> setConfirmBoxVisible(true)}><i className='heady icon-logout'></i> Log out</button></p>    
        {
            isConfirmBoxVisible &&
            <Confirmbox title={'Are you sure?'} message={'Please confirm to logout.'} icon={'user-blink'} cancelFn={setConfirmBoxVisible} confirmFn={logOut} cancelButtonText={'Cancel'} confirmButtonText={'Confirm'} />
        }
        <button title='Close' className='closeme' type='button' onClick={()=>setUserMenuVisible(false)}><i className='heady icon-cancel'></i></button>
    </div>
    </>
  )
}
export default UserLogedMenu