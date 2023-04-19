import React, { useEffect, useContext } from 'react'
import axios from 'axios';
import WPContext from '../../context/WPContext';

let fetchUri = process.env.REACT_APP_WP_HEADLESS_URI+'posts/?slug='

const NewsPopupFetch = ({slug,setPopupCall}) => {


    const {
        setNewsPopupOpen,
        setNewsPopupData
    } = useContext(WPContext)

    useEffect(()=>{
        if (slug) axios(fetchUri+slug)
        .then(res => {
            setNewsPopupData(res.data[0])
            //console.log('res.data[0]',res.data[0])
            setNewsPopupOpen(true)
            setPopupCall(false)
        }).catch(err => {
            // console.error(err)
            setNewsPopupOpen(false)
        })
         // eslint-disable-next-line
      },[slug])

    return (
        <></>
       )
    
}
export default NewsPopupFetch